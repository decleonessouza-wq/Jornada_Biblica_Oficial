import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { BibleBook } from "../../domain/bible/bibleBooks";
import { colors } from "../../theme/colors";
import { BibleReaderHeader } from "../components/BibleReaderHeader";
import { BibleVerseList } from "../components/BibleVerseList";
import {
  parseOfflineBibleReaderRouteParams,
  type OfflineBibleReaderRouteParams,
} from "../reader/bibleReaderContracts";
import type {
  BibleChapterRecord,
  BibleInstalledVersion,
  BibleRepository,
} from "../repositories/bibleRepository";
import { createSQLiteBibleRepository } from "../repositories/sqliteBibleRepository";

type BibleReaderScreenProps = Readonly<{
  params: OfflineBibleReaderRouteParams;
  onRequestBack?: () => void;
}>;

type ReaderStatus =
  | "loading"
  | "ready"
  | "invalidParams"
  | "versionUnavailable"
  | "chapterMissing"
  | "error";

type ReaderData = Readonly<{
  version: BibleInstalledVersion;
  book: BibleBook;
  chapter: BibleChapterRecord;
}>;

const GENERIC_LOAD_ERROR =
  "Não foi possível carregar este capítulo agora. Tente novamente.";

export default function BibleReaderScreen({
  params,
  onRequestBack,
}: BibleReaderScreenProps) {
  const repositoryRef = useRef<BibleRepository | null>(null);
  const generationRef = useRef(0);

  const [status, setStatus] = useState<ReaderStatus>("loading");
  const [data, setData] = useState<ReaderData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadReader = useCallback(async () => {
    const generation = generationRef.current + 1;
    generationRef.current = generation;

    setStatus("loading");
    setData(null);
    setErrorMessage(null);

    const parsedParams = parseOfflineBibleReaderRouteParams(params);

    if (!parsedParams) {
      setStatus("invalidParams");
      return;
    }

    try {
      const repository = await createSQLiteBibleRepository();

      if (generationRef.current !== generation) {
        return;
      }

      repositoryRef.current = repository;

      const versionAvailable = await repository.hasVersion(
        parsedParams.versionId,
      );

      if (generationRef.current !== generation) {
        return;
      }

      if (!versionAvailable) {
        setStatus("versionUnavailable");
        return;
      }

      const [installedVersions, book, chapter] = await Promise.all([
        repository.listInstalledVersions(),
        repository.getBook(
          parsedParams.versionId,
          parsedParams.bookId,
        ),
        repository.getChapter(
          parsedParams.versionId,
          parsedParams.bookId,
          parsedParams.chapter,
        ),
      ]);

      if (generationRef.current !== generation) {
        return;
      }

      const version = installedVersions.find(
        (candidate) =>
          candidate.id === parsedParams.versionId && candidate.enabled,
      );

      if (!version) {
        setStatus("versionUnavailable");
        return;
      }

      if (!book) {
        setStatus("error");
        setErrorMessage(
          "O livro selecionado não está disponível nesta versão.",
        );
        return;
      }

      if (!chapter) {
        setStatus("chapterMissing");
        return;
      }

      if (
        chapter.versionId !== parsedParams.versionId ||
        chapter.bookId !== parsedParams.bookId ||
        chapter.chapter !== parsedParams.chapter
      ) {
        throw new Error("BIBLE_READER_CHAPTER_IDENTITY_MISMATCH");
      }

      setData({
        version,
        book,
        chapter,
      });
      setStatus("ready");
    } catch (error) {
      if (generationRef.current !== generation) {
        return;
      }

      console.warn("BIBLE_READER_LOAD_FAILED", error);
      repositoryRef.current = null;
      setData(null);
      setStatus("error");
      setErrorMessage(GENERIC_LOAD_ERROR);
    }
  }, [params.bookId, params.chapter, params.versionId]);

  useEffect(() => {
    void loadReader();

    return () => {
      generationRef.current += 1;
    };
  }, [loadReader]);

  if (status === "loading") {
    return (
      <ReaderState
        title="Carregando capítulo"
        message="Preparando a leitura bíblica disponível no aparelho."
        loading
        onRequestBack={onRequestBack}
      />
    );
  }

  if (status === "invalidParams") {
    return (
      <ReaderState
        title="Referência inválida"
        message="Não foi possível validar o livro, o capítulo ou a versão informados."
        onRequestBack={onRequestBack}
      />
    );
  }

  if (status === "versionUnavailable") {
    return (
      <ReaderState
        title="Versão indisponível"
        message="A versão bíblica selecionada não está disponível offline neste aparelho."
        onRetry={() => void loadReader()}
        onRequestBack={onRequestBack}
      />
    );
  }

  if (status === "chapterMissing") {
    return (
      <ReaderState
        title="Capítulo não encontrado"
        message="O capítulo selecionado não foi encontrado na versão instalada."
        onRetry={() => void loadReader()}
        onRequestBack={onRequestBack}
      />
    );
  }

  if (status === "error" || !data) {
    return (
      <ReaderState
        title="Não foi possível abrir a leitura"
        message={errorMessage ?? GENERIC_LOAD_ERROR}
        onRetry={() => void loadReader()}
        onRequestBack={onRequestBack}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <BibleReaderHeader
        version={data.version}
        book={data.book}
        chapter={data.chapter.chapter}
        onRequestBack={onRequestBack}
      />

      <BibleVerseList verses={data.chapter.verses} />
    </View>
  );
}

type ReaderStateProps = Readonly<{
  title: string;
  message: string;
  loading?: boolean;
  onRetry?: () => void;
  onRequestBack?: () => void;
}>;

function ReaderState({
  title,
  message,
  loading = false,
  onRetry,
  onRequestBack,
}: ReaderStateProps) {
  return (
    <View style={styles.stateScreen}>
      {onRequestBack && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          onPress={onRequestBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      )}

      <View style={styles.stateContent}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            accessibilityLabel="Carregando leitura bíblica"
          />
        )}

        <Text style={styles.stateTitle}>{title}</Text>
        <Text style={styles.stateMessage}>{message}</Text>

        {onRetry && !loading && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tentar carregar o capítulo novamente"
            onPress={onRetry}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.retryButtonPressed,
            ]}
          >
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  stateScreen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  stateContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingBottom: 64,
  },
  stateTitle: {
    marginTop: 14,
    color: colors.textStrong,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  stateMessage: {
    marginTop: 7,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    minHeight: 44,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  retryButtonText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: "700",
  },
});
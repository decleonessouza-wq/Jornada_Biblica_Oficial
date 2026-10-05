import type {
  DevotionalAuthorIdentity,
  DevotionalBibleReference,
  DevotionalBlock,
  DevotionalContentType,
  DevotionalFormat,
  DevotionalGovernance,
  DevotionalId,
  DevotionalSourceMetadata,
  DevotionalTrackPlacement,
} from "../../domain/devotionals/devotional";

export type DevotionalContentPackage = Readonly<{
  id: DevotionalId;

  contentType: DevotionalContentType;
  format: DevotionalFormat;
  placement: DevotionalTrackPlacement;

  title: string;
  subtitle: string | null;
  summary: string | null;
  audience: string | null;

  author: DevotionalAuthorIdentity;

  heroImage: string | null;

  blocks: readonly DevotionalBlock[];
  bibleReferences: readonly DevotionalBibleReference[];

  reflectionPrompt: string | null;

  governance: DevotionalGovernance;
  source: DevotionalSourceMetadata;
}>;

export function isDevotionalRuntimeEligible(
  content: Pick<DevotionalContentPackage, "governance">,
): boolean {
  const { governance } = content;

  return (
    governance.editorialStatus === "PUBLISHED" &&
    governance.contentReview === "APPROVED" &&
    governance.theologicalReview === "APPROVED" &&
    governance.publicDisplayAuthorization === "AUTHORIZED" &&
    governance.publicationAuthorization === "AUTHORIZED"
  );
}

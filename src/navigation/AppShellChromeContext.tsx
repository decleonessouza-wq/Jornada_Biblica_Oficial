import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import {
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

const CHROME_ANIMATION_DURATION_MS = 180;
const CHROME_TRANSITION_GUARD_MS = 240;
const TOP_FORCE_VISIBLE_PX = 12;
const HIDE_MIN_OFFSET_PX = 48;
const HIDE_ACCUMULATED_DOWN_PX = 28;
const SHOW_ACCUMULATED_UP_PX = 18;
const MIN_DIRECTION_DELTA_PX = 1;

type ScrollDirection = "up" | "down" | null;

type AppShellChromeContextValue = {
  chromeProgress: SharedValue<number>;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  resetChrome: () => void;
};

const AppShellChromeContext =
  createContext<AppShellChromeContextValue | null>(null);

export function AppShellChromeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const chromeProgress = useSharedValue(0);

  const lastOffsetRef = useRef<number | null>(null);
  const directionRef = useRef<ScrollDirection>(null);
  const directionAnchorRef = useRef(0);
  const hiddenTargetRef = useRef(false);
  const transitionUntilRef = useRef(0);

  const beginTransitionGuard = useCallback(() => {
    transitionUntilRef.current =
      Date.now() + CHROME_TRANSITION_GUARD_MS;
  }, []);

  const setChromeHidden = useCallback(
    (hidden: boolean) => {
      if (hiddenTargetRef.current === hidden) {
        return;
      }

      hiddenTargetRef.current = hidden;
      directionRef.current = null;
      beginTransitionGuard();

      chromeProgress.value = withTiming(hidden ? 1 : 0, {
        duration: CHROME_ANIMATION_DURATION_MS,
      });
    },
    [beginTransitionGuard, chromeProgress]
  );

  const resetChrome = useCallback(() => {
    lastOffsetRef.current = null;
    directionRef.current = null;
    directionAnchorRef.current = 0;
    hiddenTargetRef.current = false;
    beginTransitionGuard();

    chromeProgress.value = withTiming(0, {
      duration: CHROME_ANIMATION_DURATION_MS,
    });
  }, [beginTransitionGuard, chromeProgress]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = Math.max(0, event.nativeEvent.contentOffset.y);

      if (Date.now() < transitionUntilRef.current) {
        lastOffsetRef.current = offsetY;
        directionRef.current = null;
        directionAnchorRef.current = offsetY;
        return;
      }

      if (offsetY <= TOP_FORCE_VISIBLE_PX) {
        lastOffsetRef.current = offsetY;
        directionRef.current = null;
        directionAnchorRef.current = offsetY;
        setChromeHidden(false);
        return;
      }

      const lastOffset = lastOffsetRef.current;

      if (lastOffset === null) {
        lastOffsetRef.current = offsetY;
        directionAnchorRef.current = offsetY;
        return;
      }

      const delta = offsetY - lastOffset;
      lastOffsetRef.current = offsetY;

      if (Math.abs(delta) < MIN_DIRECTION_DELTA_PX) {
        return;
      }

      const nextDirection: ScrollDirection = delta > 0 ? "down" : "up";

      if (directionRef.current !== nextDirection) {
        directionRef.current = nextDirection;
        directionAnchorRef.current = offsetY;
        return;
      }

      if (nextDirection === "down") {
        const distanceDown = offsetY - directionAnchorRef.current;

        if (
          offsetY > HIDE_MIN_OFFSET_PX &&
          distanceDown >= HIDE_ACCUMULATED_DOWN_PX
        ) {
          setChromeHidden(true);
          directionAnchorRef.current = offsetY;
        }

        return;
      }

      const distanceUp = directionAnchorRef.current - offsetY;

      if (distanceUp >= SHOW_ACCUMULATED_UP_PX) {
        setChromeHidden(false);
        directionAnchorRef.current = offsetY;
      }
    },
    [setChromeHidden]
  );

  const value = useMemo<AppShellChromeContextValue>(
    () => ({
      chromeProgress,
      handleScroll,
      resetChrome,
    }),
    [chromeProgress, handleScroll, resetChrome]
  );

  return (
    <AppShellChromeContext.Provider value={value}>
      {children}
    </AppShellChromeContext.Provider>
  );
}

export function useAppShellChrome() {
  const context = useContext(AppShellChromeContext);

  if (!context) {
    throw new Error(
      "useAppShellChrome deve ser usado dentro de AppShellChromeProvider."
    );
  }

  return context;
}

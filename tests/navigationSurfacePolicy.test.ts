import {
  CURRENT_HARPA_RUNTIME_READY,
  PRIMARY_HYMNAL_NAVIGATION,
  PROFILE_NAVIGATION,
} from "../src/navigation/navigationSurfacePolicy";

describe("Navigation surface policy", () => {
  it("reserves the definitive primary slot for Harpa while runtime remains blocked", () => {
    expect(
      CURRENT_HARPA_RUNTIME_READY,
    ).toBe(false);

    expect(
      PRIMARY_HYMNAL_NAVIGATION,
    ).toEqual({
      label: "Harpa",
      location: "PRIMARY_TAB",
      availability: "RUNTIME_BLOCKED",
      runtimeReady: false,
    });

    expect(
      Object.isFrozen(
        PRIMARY_HYMNAL_NAVIGATION,
      ),
    ).toBe(true);
  });

  it("places Perfil in the Drawer without pretending that a screen exists", () => {
    expect(
      PROFILE_NAVIGATION,
    ).toEqual({
      label: "Perfil",
      location: "DRAWER",
      availability:
        "SCREEN_NOT_IMPLEMENTED",
    });

    expect(
      Object.isFrozen(
        PROFILE_NAVIGATION,
      ),
    ).toBe(true);
  });
});

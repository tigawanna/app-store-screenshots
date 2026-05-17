export type Device =
  | "iphone"
  | "ipad"
  | "android"
  | "android-7"
  | "android-10"
  | "feature-graphic";

export type Orientation = "portrait" | "landscape";

export type Platform = "ios" | "android";

// Layouts the editor can render. Vary across slides for visual rhythm.
export type SlideLayout =
  | "hero"             // centered device, headline above
  | "device-bottom"    // headline top, device bottom-center
  | "device-top"       // device top, headline bottom (contrast)
  | "two-devices"      // back + front phones, headline above
  | "no-device"        // big headline + decorative blob, no device
  | "split-landscape"  // landscape tablets only: caption left + device right
  | "feature-graphic"; // 1024×500 banner with icon + name + tagline

// Per-element rect in canvas pixel space. Optional rotation in degrees and zIndex.
export type ElementTransform = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  zIndex?: number;
};

export type ElementId = "caption" | "device" | "deviceSecondary";

export type Slide = {
  id: string;
  layout: SlideLayout;
  label: string;       // tiny uppercase caption above headline
  headline: string;    // multi-line; newlines are intentional
  screenshot: string;  // path under /screenshots/ (or "" for none)
  screenshotSecondary?: string; // for two-devices layout
  inverted?: boolean;  // dark background variant
  // Per-element overrides; when present, replaces layout default placement.
  transforms?: Partial<Record<ElementId, ElementTransform>>;
};

export type ThemeId = "clean-light" | "dark-bold" | "warm-editorial" | "ocean-fresh";

export type Theme = {
  id: ThemeId;
  name: string;
  bg: string;          // primary background
  bgAlt: string;       // inverted background
  fg: string;          // text on bg
  fgAlt: string;       // text on bgAlt
  accent: string;
  muted: string;
};

export type ProjectState = {
  appName: string;
  themeId: ThemeId;
  locale: string;
  device: Device;
  orientation: Orientation;
  // Per-device slide decks so platform switching preserves work
  slidesByDevice: Record<Device, Slide[]>;
  appIcon?: string;    // path under /public (e.g. /app-icon.png)
};

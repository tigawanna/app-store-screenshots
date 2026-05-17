import type { Device, ProjectState, Slide } from "./types";

let _id = 0;
export const nid = () => `s_${Date.now().toString(36)}_${(_id++).toString(36)}`;

function makeStarterSlides(): Slide[] {
  return [
    {
      id: nid(),
      layout: "hero",
      label: "MEET YOUR APP",
      headline: "Sell one\nidea per slide.",
      screenshot: "",
    },
    {
      id: nid(),
      layout: "device-bottom",
      label: "FEATURE 01",
      headline: "Your headline\nlives here.",
      screenshot: "",
    },
    {
      id: nid(),
      layout: "two-devices",
      label: "FEATURE 02",
      headline: "Show two\nscreens at once.",
      screenshot: "",
      screenshotSecondary: "",
    },
    {
      id: nid(),
      layout: "device-top",
      label: "FEATURE 03",
      headline: "Flip the contrast\nfor visual rhythm.",
      screenshot: "",
      inverted: true,
    },
    {
      id: nid(),
      layout: "no-device",
      label: "MORE",
      headline: "And so\nmuch more.",
      screenshot: "",
    },
  ];
}

function ipadStarter(): Slide[] {
  return [
    {
      id: nid(),
      layout: "hero",
      label: "MEET YOUR APP",
      headline: "Made for\nthe big screen.",
      screenshot: "",
    },
    {
      id: nid(),
      layout: "device-bottom",
      label: "FEATURE 01",
      headline: "Built for\nfocus.",
      screenshot: "",
    },
    {
      id: nid(),
      layout: "device-top",
      label: "FEATURE 02",
      headline: "Always within reach.",
      screenshot: "",
      inverted: true,
    },
  ];
}

function tabletStarter(kind: "7" | "10"): Slide[] {
  return [
    {
      id: nid(),
      layout: "hero",
      label: "MEET YOUR APP",
      headline: kind === "7" ? "Pocket-sized\npower." : "Made for\nthe big screen.",
      screenshot: "",
    },
    {
      id: nid(),
      layout: "split-landscape",
      label: "FEATURE 01",
      headline: "Wide canvas,\nbigger ideas.",
      screenshot: "",
    },
  ];
}

function fgStarter(): Slide[] {
  return [
    {
      id: nid(),
      layout: "feature-graphic",
      label: "",
      headline: "Your tagline goes here.",
      screenshot: "",
    },
  ];
}

export const DEFAULT_PROJECT: ProjectState = {
  appName: "My App",
  themeId: "clean-light",
  locale: "en",
  device: "iphone",
  orientation: "portrait",
  appIcon: "",
  slidesByDevice: {
    iphone: makeStarterSlides(),
    android: makeStarterSlides(),
    ipad: ipadStarter(),
    "android-7": tabletStarter("7"),
    "android-10": tabletStarter("10"),
    "feature-graphic": fgStarter(),
  },
};

export function newSlide(layout: Slide["layout"] = "device-bottom"): Slide {
  return {
    id: nid(),
    layout,
    label: "NEW",
    headline: "Edit this\nheadline.",
    screenshot: "",
  };
}

export function detectPlatform(device: Device): "ios" | "android" {
  return device === "iphone" || device === "ipad" ? "ios" : "android";
}

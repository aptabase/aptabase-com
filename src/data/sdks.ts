/**
 * Single source of truth for the SDK catalogue. Used by /docs, llms.txt, the
 * Markdown twins and (for install/package details) the /for-* pages.
 *
 * `page` links to the framework landing page in src/lib/frameworks.ts when
 * one exists.
 */

export type SdkGroup = "desktop" | "mobile" | "web" | "games" | "other";

export interface Sdk {
  id: string;
  name: string;
  group: SdkGroup;
  /** Package name / registry as a human-readable string. */
  package: string;
  /** Install command or one-line instruction. */
  install: string;
  repo: string;
  /** Framework landing page on aptabase.com, if any. */
  page?: string;
  /** Maintained outside the aptabase GitHub org. */
  community?: boolean;
}

export const sdkGroups: { id: SdkGroup; name: string }[] = [
  { id: "mobile", name: "Mobile" },
  { id: "desktop", name: "Desktop" },
  { id: "web", name: "Web" },
  { id: "games", name: "Games" },
  { id: "other", name: "Other" },
];

export const sdks: Sdk[] = [
  // Mobile
  {
    id: "swift",
    name: "Swift (iOS, macOS, watchOS, tvOS)",
    group: "mobile",
    package: "Aptabase (Swift Package Manager)",
    install: "Add https://github.com/aptabase/aptabase-swift.git via SPM or Xcode",
    repo: "https://github.com/aptabase/aptabase-swift",
    page: "/for-swift",
  },
  {
    id: "kotlin",
    name: "Kotlin (Android)",
    group: "mobile",
    package: "com.github.aptabase:aptabase-kotlin (JitPack)",
    install: 'implementation("com.github.aptabase:aptabase-kotlin:0.0.8")',
    repo: "https://github.com/aptabase/aptabase-kotlin",
    page: "/for-android",
  },
  {
    id: "flutter",
    name: "Flutter",
    group: "mobile",
    package: "aptabase_flutter (pub.dev)",
    install: "flutter pub add aptabase_flutter",
    repo: "https://github.com/aptabase/aptabase_flutter",
    page: "/for-flutter",
  },
  {
    id: "react-native",
    name: "React Native",
    group: "mobile",
    package: "@aptabase/react-native",
    install: "npm add @aptabase/react-native",
    repo: "https://github.com/aptabase/aptabase-react-native",
    page: "/for-react-native",
  },
  {
    id: "nativescript",
    name: "NativeScript",
    group: "mobile",
    package: "@nicogaldo/nativescript-aptabase",
    install: "npm add @nicogaldo/nativescript-aptabase",
    repo: "https://github.com/nstudio/nativescript-plugins/tree/main/packages/nativescript-aptabase",
    page: "/for-nativescript",
    community: true,
  },

  // Desktop
  {
    id: "electron",
    name: "Electron",
    group: "desktop",
    package: "@aptabase/electron",
    install: "npm add @aptabase/electron",
    repo: "https://github.com/aptabase/aptabase-electron",
    page: "/for-electron",
  },
  {
    id: "tauri",
    name: "Tauri",
    group: "desktop",
    package: "tauri-plugin-aptabase (Rust) + @aptabase/tauri (JavaScript)",
    install: "cargo add tauri-plugin-aptabase && npm add @aptabase/tauri",
    repo: "https://github.com/aptabase/tauri-plugin-aptabase",
    page: "/for-tauri",
  },
  {
    id: "maui",
    name: ".NET MAUI",
    group: "desktop",
    package: "Aptabase.Maui (NuGet)",
    install: "dotnet add package Aptabase.Maui",
    repo: "https://github.com/aptabase/aptabase-maui",
    page: "/for-maui",
  },

  // Web
  {
    id: "web",
    name: "Web apps (SPA)",
    group: "web",
    package: "@aptabase/web",
    install: "npm add @aptabase/web",
    repo: "https://github.com/aptabase/aptabase-js",
    page: "/for-webapps",
  },
  {
    id: "react",
    name: "React / Next.js",
    group: "web",
    package: "@aptabase/react",
    install: "npm add @aptabase/react",
    repo: "https://github.com/aptabase/aptabase-js",
    page: "/for-nextjs",
  },
  {
    id: "angular",
    name: "Angular",
    group: "web",
    package: "@aptabase/angular",
    install: "npm add @aptabase/angular",
    repo: "https://github.com/aptabase/aptabase-js/blob/main/packages/angular/README.md",
    page: "/for-angular",
  },
  {
    id: "browser",
    name: "Browser extensions",
    group: "web",
    package: "@aptabase/browser",
    install: "npm add @aptabase/browser",
    repo: "https://github.com/aptabase/aptabase-js",
    page: "/for-browser-extensions",
  },

  // Games
  {
    id: "unity",
    name: "Unity",
    group: "games",
    package: "Unity Package Manager (git URL)",
    install:
      "Package Manager → Add package from git URL: https://github.com/aptabase/aptabase-unity.git",
    repo: "https://github.com/aptabase/aptabase-unity",
    page: "/for-unity",
  },
  {
    id: "unreal",
    name: "Unreal Engine",
    group: "games",
    package: "Plugin (C++ project)",
    install:
      "Clone https://github.com/aptabase/aptabase-unreal into your project's Plugins/ folder",
    repo: "https://github.com/aptabase/aptabase-unreal",
    page: "/for-unreal",
  },
  {
    id: "godot",
    name: "Godot (4.2+)",
    group: "games",
    package: "addons/aptabase (autoload singleton)",
    install: "Copy addons/aptabase into your project and enable the plugin",
    repo: "https://github.com/aptabase/aptabase-godot",
  },

  // Other
  {
    id: "python",
    name: "Python",
    group: "other",
    package: "aptabase (PyPI)",
    install: "pip install aptabase",
    repo: "https://github.com/aptabase/aptabase-python",
    page: "/for-python",
  },
  {
    id: "cpp",
    name: "C++",
    group: "other",
    package: "CMake subdirectory",
    install: "add_subdirectory(path/to/aptabase-cpp)",
    repo: "https://github.com/aptabase/aptabase-cpp",
  },
];

export const sdksInGroup = (group: SdkGroup) => sdks.filter((s) => s.group === group);
export const sdkForPage = (page: string) => sdks.find((s) => s.page === page);

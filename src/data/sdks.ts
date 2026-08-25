/**
 * Single source of truth for every SDK: catalogue data (package, install,
 * repo), the landing-page copy for /for-<slug>, and the quickstart snippets.
 *
 * Consumers: /docs, /integrations, the homepage logo strip, the footer,
 * /for-<slug> (+ its .md twin), llms.txt and llms-full.txt.
 *
 * Keep this module free of imports so it can be used from anywhere.
 */

export type SdkGroup = "desktop" | "mobile" | "web" | "games" | "other";

export type UseCaseIcon =
  "click" | "language" | "mobile" | "desktop" | "gamepad" | "chart";

export interface UseCase {
  icon: UseCaseIcon;
  title: string;
  description: string;
}

/** One step of the quickstart. `code` is optional for prose-only steps. */
export interface Snippet {
  title: string;
  /** Text before the code (inline `code` and URLs are rendered). */
  intro?: string;
  lang?: string;
  code?: string;
  /** Text after the code. */
  outro?: string;
}

/** Landing page at /for-<slug>. */
export interface SdkPage {
  slug: string;
  /** "Swift Apps" — used in "Analytics for {title}". */
  title: string;
  /** Link text for the SDK in the hero. */
  sdkName: string;
  image: string;
  textColor: string;
  example: string;
  exampleLang: string;
  useCases: UseCase[];
}

export interface Sdk {
  id: string;
  name: string;
  group: SdkGroup;
  /** Package name / registry as a human-readable string. */
  package: string;
  /** Install command or one-line instruction. */
  install: string;
  repo: string;
  /** Maintained outside the aptabase GitHub org. */
  community?: boolean;
  requires?: string;
  platforms?: string;
  description?: string;
  snippets: Snippet[];
  notes?: string[];
  page?: SdkPage;
}

export const sdkGroups: { id: SdkGroup; name: string }[] = [
  { id: "mobile", name: "Mobile" },
  { id: "desktop", name: "Desktop" },
  { id: "web", name: "Web" },
  { id: "games", name: "Games" },
  { id: "other", name: "Other" },
];

const KEY = "<YOUR_APP_KEY>";

const featureUsage = (what: string): UseCase => ({
  icon: "click",
  title: "Feature Usage",
  description: `Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your ${what}'s user experience.`,
});

const locationAndLanguage = (what: string, where: string): UseCase => ({
  icon: "language",
  title: "Location and Language",
  description: `Understanding the geographical distribution of your user base can significantly inform the decision to localize your ${what}, thereby enhancing its global accessibility and visibility on ${where}.`,
});

const osVersions = (icon: UseCaseIcon, systems: string): UseCase => ({
  icon,
  title: "Which OS versions do my users have?",
  description: `Aptabase efficiently gathers data such as the names of operating systems such as ${systems}, and their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.`,
});

const growthAndAdoption = (what: string): UseCase => ({
  icon: "chart",
  title: "Growth and Adoption",
  description: `${what} may lag in user updates due to the need for manual intervention during the update process. However, with Aptabase, you can swiftly determine the adoption rate of your app's newest version. This vital information aids you in making strategic decisions regarding the appropriate timing to phase out older versions.`,
});

const browsers: UseCase = {
  icon: "desktop",
  title: "What browsers are my users on?",
  description:
    "Aptabase efficiently gathers data such as the names of Browsers, alongside their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used browsers.",
};

const gameInteraction = (what: string): UseCase => ({
  icon: "click",
  title: "Game Interaction",
  description: `Are you aware of what users spend most of their time on your game? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your ${what} user experience.`,
});

const gameDevices: UseCase = {
  icon: "gamepad",
  title: "What devices and versions are my users on?",
  description:
    "Aptabase efficiently gathers data such as the names of operating systems such as Windows, PlayStation, Xbox, etc., and their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
};

const androidPermission =
  'Android: add `<uses-permission android:name="android.permission.INTERNET" />` to `AndroidManifest.xml`.';

export const sdks: Sdk[] = [
  // ---------------------------------------------------------------- Mobile
  {
    id: "swift",
    name: "Swift (iOS, macOS, watchOS, tvOS)",
    group: "mobile",
    package: "Aptabase (Swift Package Manager)",
    install:
      "Add https://github.com/aptabase/aptabase-swift.git via SPM or Xcode",
    repo: "https://github.com/aptabase/aptabase-swift",
    snippets: [
      {
        title: "Initialization",
        lang: "swift",
        code: `import SwiftUI
import Aptabase

@main
struct ExampleApp: App {
    init() {
        Aptabase.shared.initialize(appKey: "${KEY}")
    }

    var body: some Scene {
        WindowGroup {
            MainView()
        }
    }
}`,
      },
      {
        title: "Track events",
        lang: "swift",
        code: `import Aptabase

Aptabase.shared.trackEvent("app_started")
Aptabase.shared.trackEvent("screen_view", with: ["name": "Settings"])`,
      },
    ],
    notes: [
      'macOS: enable "Outgoing Connections (Client)" under App Sandbox.',
      "For App Store submission, see the Apple App Privacy guide: https://aptabase.com/docs/apple-app-privacy",
    ],
    page: {
      slug: "swift",
      title: "Swift Apps",
      sdkName: "Swift SDK for Aptabase",
      image: "/tools/apple.svg",
      textColor: "text-[#F05138]",
      exampleLang: "swift",
      example: `Aptabase.shared.trackEvent("play_music", with: [
  "name": "Here comes the sun"
])`,
      useCases: [
        featureUsage("Swift app"),
        locationAndLanguage("Swift app", "the Apple App Store"),
        osVersions("mobile", "iOS, iPadOS, macOS, etc."),
      ],
    },
  },
  {
    id: "kotlin",
    name: "Kotlin (Android)",
    group: "mobile",
    package: "com.github.aptabase:aptabase-kotlin (JitPack)",
    install: 'implementation("com.github.aptabase:aptabase-kotlin:0.0.8")',
    repo: "https://github.com/aptabase/aptabase-kotlin",
    snippets: [
      {
        title: "Setup",
        intro: "Add the JitPack repository in `settings.gradle.kts`:",
        lang: "kotlin",
        code: `dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://www.jitpack.io") }
    }
}`,
        outro:
          'Then add the dependency in your module-level `build.gradle.kts`: `implementation("com.github.aptabase:aptabase-kotlin:0.0.8")`.',
      },
      {
        title: "Initialization",
        intro: "Initialize in your `Application` class:",
        lang: "kotlin",
        code: `class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        Aptabase.instance.initialize(applicationContext, "${KEY}")
    }
}`,
      },
      {
        title: "Track events",
        lang: "kotlin",
        code: `Aptabase.instance.trackEvent("app_started")
Aptabase.instance.trackEvent("screen_view", mapOf("name" to "Settings"))`,
      },
    ],
    page: {
      slug: "android",
      title: "Android Apps",
      sdkName: "Kotlin SDK for Aptabase",
      image: "/tools/android.svg",
      textColor: "text-[#3DDB85]",
      exampleLang: "kotlin",
      example: `Aptabase.instance.trackEvent("play_music", mapOf<String, Any>(
  "name" to "here_comes_the_sun"
))`,
      useCases: [
        featureUsage("Android/Kotlin app"),
        locationAndLanguage("Android/Kotlin app", "the Google Play Store"),
        {
          icon: "mobile",
          title: "What Android versions are my users on?",
          description:
            "Aptabase proficiently collects data related to the various versions of Android utilized by your users. Such invaluable insights empower you to streamline your efforts in creating superior user experiences, meticulously customized to the most prevalent Android versions.",
        },
      ],
    },
  },
  {
    id: "flutter",
    name: "Flutter",
    group: "mobile",
    package: "aptabase_flutter (pub.dev)",
    install: "flutter pub add aptabase_flutter",
    repo: "https://github.com/aptabase/aptabase_flutter",
    platforms: "Android, iOS, macOS, Web, Linux, Windows",
    snippets: [
      {
        title: "Initialization",
        intro: "In `main.dart`:",
        lang: "dart",
        code: `import 'package:aptabase_flutter/aptabase_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Aptabase.init("${KEY}");
  runApp(const MyApp());
}`,
        outro:
          "The `main` function must be `async` and call `WidgetsFlutterBinding.ensureInitialized()` before init.",
      },
      {
        title: "Track events",
        lang: "dart",
        code: `import 'package:aptabase_flutter/aptabase_flutter.dart';

Aptabase.instance.trackEvent("app_started");
Aptabase.instance.trackEvent("screen_view", {"name": "Settings"});`,
      },
    ],
    notes: [androidPermission],
    page: {
      slug: "flutter",
      title: "Flutter Apps",
      sdkName: "Flutter SDK for Aptabase",
      image: "/tools/flutter.svg",
      textColor: "text-[#42A5F5]",
      exampleLang: "dart",
      example: `Aptabase.instance.trackEvent("play_music", {
  "name": "here_comes_the_sun"
});`,
      useCases: [
        featureUsage("Flutter app"),
        locationAndLanguage(
          "Flutter app",
          "the Apple App Store and Google Play Store",
        ),
        osVersions("mobile", "Android, iOS, iPadOS, macOS, etc."),
      ],
    },
  },
  {
    id: "react-native",
    name: "React Native",
    group: "mobile",
    package: "@aptabase/react-native",
    install: "npm add @aptabase/react-native",
    repo: "https://github.com/aptabase/aptabase-react-native",
    snippets: [
      {
        title: "Initialization",
        lang: "jsx",
        code: `import Aptabase from "@aptabase/react-native";

Aptabase.init("${KEY}");

export default function App() {
  return <MyApp />;
}`,
      },
      {
        title: "Track events",
        lang: "js",
        code: `import { trackEvent } from "@aptabase/react-native";

trackEvent("app_started");
trackEvent("screen_view", { name: "Settings" });`,
      },
    ],
    notes: [
      androidPermission,
      "Expo: events sent from Expo Go will not have an App Version. Set `appVersion` in the `init()` options during development, or build a standalone app.",
      "To stop tracking: `Aptabase.dispose()`.",
    ],
    page: {
      slug: "react-native",
      title: "React Native Apps",
      sdkName: "React Native SDK for Aptabase",
      image: "/tools/react-native.svg",
      textColor: "text-[#61DAFB]",
      exampleLang: "typescript",
      example: `trackEvent("play_music", {
  name: "Here comes the sun"
});`,
      useCases: [
        featureUsage("React Native app"),
        locationAndLanguage(
          "React Native app",
          "the Apple App Store and Google Play Store",
        ),
        osVersions("mobile", "Android, iOS, iPadOS, macOS, etc."),
      ],
    },
  },
  {
    id: "nativescript",
    name: "NativeScript",
    group: "mobile",
    package: "@nicogaldo/nativescript-aptabase",
    install: "npm add @nicogaldo/nativescript-aptabase",
    repo: "https://github.com/nstudio/nativescript-plugins/tree/main/packages/nativescript-aptabase",
    community: true,
    snippets: [
      {
        title: "Track events",
        intro:
          "Community-maintained plugin by nstudio; see the README for setup and initialization.",
        lang: "typescript",
        code: `Aptabase.track("play_music", {
  name: "Here comes the sun"
});`,
      },
    ],
    page: {
      slug: "nativescript",
      title: "NativeScript Apps",
      sdkName: "NativeScript SDK for Aptabase",
      image: "/tools/nativescript.svg",
      textColor: "text-[#65ADF1]",
      exampleLang: "typescript",
      example: `Aptabase.track("play_music", {
  name: "Here comes the sun"
});`,
      useCases: [
        featureUsage("NativeScript app"),
        locationAndLanguage(
          "NativeScript app",
          "the Apple App Store and Google Play Store",
        ),
        osVersions("mobile", "Android, iOS, iPadOS, macOS, etc."),
      ],
    },
  },

  // --------------------------------------------------------------- Desktop
  {
    id: "electron",
    name: "Electron",
    group: "desktop",
    package: "@aptabase/electron",
    install: "npm add @aptabase/electron",
    repo: "https://github.com/aptabase/aptabase-electron",
    snippets: [
      {
        title: "Initialization (main process)",
        lang: "js",
        code: `import { initialize } from "@aptabase/electron/main";

initialize("${KEY}");

app.whenReady().then(() => {
  // ... rest of app initialization
});`,
      },
      {
        title: "Track events",
        intro:
          "The `trackEvent` function is available under separate import paths depending on the process: `@aptabase/electron/main` for the main process and `@aptabase/electron/renderer` for the renderer process.",
        lang: "js",
        code: `import { trackEvent } from "@aptabase/electron/renderer";

trackEvent("app_started");
trackEvent("screen_view", { name: "Settings" });`,
      },
    ],
    page: {
      slug: "electron",
      title: "Electron Apps",
      sdkName: "Electron SDK for Aptabase",
      image: "/tools/electron.svg",
      textColor: "text-[#2DD0ED]",
      exampleLang: "typescript",
      example: `trackEvent("play_music", {
  name: "Here comes the sun"
});`,
      useCases: [
        featureUsage("Electron app"),
        growthAndAdoption("Electron applications"),
        osVersions("desktop", "Windows, macOS and various Linux distributions"),
      ],
    },
  },
  {
    id: "tauri",
    name: "Tauri",
    group: "desktop",
    package: "tauri-plugin-aptabase (Rust) + @aptabase/tauri (JavaScript)",
    install: "cargo add tauri-plugin-aptabase && npm add @aptabase/tauri",
    repo: "https://github.com/aptabase/tauri-plugin-aptabase",
    snippets: [
      {
        title: "Initialization (Rust)",
        intro: "Register the plugin in your Tauri builder:",
        lang: "rust",
        code: `#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_aptabase::Builder::new("${KEY}").build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}`,
        outro: "Add `aptabase:allow-track-event` to your Access Control List.",
      },
      {
        title: "Track events (Rust)",
        intro:
          "Import the `EventTracker` trait to call `track_event` on `App`, `AppHandle` or `Window`:",
        lang: "rust",
        code: `use tauri_plugin_aptabase::EventTracker;

app.track_event("app_started", None);
app.track_event("screen_view", Some(serde_json::json!({ "name": "Settings" })));`,
        outro:
          "Call `flush_events_blocking()` before the app exits to make sure all events are sent.",
      },
      {
        title: "Track events (JavaScript)",
        lang: "js",
        code: `import { trackEvent } from "@aptabase/tauri";

trackEvent("save_settings");
trackEvent("screen_view", { name: "Settings" });`,
      },
    ],
    page: {
      slug: "tauri",
      title: "Tauri Apps",
      sdkName: "tauri-plugin-aptabase",
      image: "/tools/tauri.svg",
      textColor: "text-[#FFC131]",
      exampleLang: "typescript",
      example: `trackEvent("play_music", {
  name: "Here comes the sun"
});`,
      useCases: [
        featureUsage("Tauri app"),
        growthAndAdoption("Tauri apps"),
        osVersions("desktop", "Windows, macOS and various Linux distributions"),
      ],
    },
  },
  {
    id: "maui",
    name: ".NET MAUI",
    group: "desktop",
    package: "Aptabase.Maui (NuGet)",
    install: "dotnet add package Aptabase.Maui",
    repo: "https://github.com/aptabase/aptabase-maui",
    snippets: [
      {
        title: "Initialization",
        intro: "In `MauiProgram.cs`:",
        lang: "csharp",
        code: `public static MauiApp CreateMauiApp()
{
    var builder = MauiApp.CreateBuilder();
    builder
        .UseMauiApp<App>()
        .UseAptabase("${KEY}", new AptabaseOptions
        {
#if DEBUG
            IsDebugMode = true,
#else
            IsDebugMode = false,
#endif
        });
    // ...
}`,
      },
      {
        title: "Track events",
        intro:
          "`UseAptabase` registers `IAptabaseClient` in the DI container. Inject it into your pages or view models:",
        lang: "csharp",
        code: `public partial class MainPage : ContentPage
{
    IAptabaseClient _aptabase;

    public MainPage(IAptabaseClient aptabase)
    {
        InitializeComponent();
        _aptabase = aptabase;
    }

    private void OnButtonClicked(object sender, EventArgs e)
    {
        _aptabase.TrackEvent("button_clicked");
        _aptabase.TrackEvent("screen_view", new() { { "name", "Settings" } });
    }
}`,
      },
    ],
    page: {
      slug: "maui",
      title: ".NET MAUI Apps",
      sdkName: ".NET MAUI SDK for Aptabase",
      image: "/tools/dotnet.svg",
      textColor: "text-[#512BD4]",
      exampleLang: "csharp",
      example: `_aptabase.TrackEvent("play_music", new() {
    { "name", "Here comes the sun" }
});`,
      useCases: [
        featureUsage(".NET MAUI app"),
        locationAndLanguage(
          ".NET MAUI app",
          "the Apple App Store and Google Play Store",
        ),
        osVersions("mobile", "Windows, Android, iOS, iPadOS, macOS, etc."),
      ],
    },
  },

  // ------------------------------------------------------------------- Web
  {
    id: "web",
    name: "Web apps (SPA)",
    group: "web",
    package: "@aptabase/web (~1 kB)",
    install: "npm add @aptabase/web",
    repo: "https://github.com/aptabase/aptabase-js",
    description:
      "Designed for Single-Page Applications. Each page reload starts a new session.",
    snippets: [
      {
        title: "Initialization",
        lang: "js",
        code: `import { init } from "@aptabase/web";

init("${KEY}");`,
        outro: 'Optional second parameter: `{ appVersion: "1.0.0" }`.',
      },
      {
        title: "Track events",
        lang: "js",
        code: `import { trackEvent } from "@aptabase/web";

trackEvent("app_started");
trackEvent("screen_view", { name: "Settings" });`,
      },
    ],
    page: {
      slug: "webapps",
      title: "Web Apps",
      sdkName: "JavaScript SDK for Aptabase",
      image: "/tools/javascript.svg",
      textColor: "text-[#F7DF1E]",
      exampleLang: "typescript",
      example: `trackEvent("settings_changed", {
  theme: "dark"
});`,
      useCases: [
        featureUsage("Web app"),
        locationAndLanguage("Web app", "that market"),
        browsers,
      ],
    },
  },
  {
    id: "react",
    name: "React / Next.js",
    group: "web",
    package: "@aptabase/react (~1 kB)",
    install: "npm add @aptabase/react",
    repo: "https://github.com/aptabase/aptabase-js",
    snippets: [
      {
        title: "Next.js App Router",
        intro: "Wrap your root layout:",
        lang: "jsx",
        code: `import { AptabaseProvider } from "@aptabase/react";

export default function RootLayout({ children }) {
  return (
    <AptabaseProvider appKey="${KEY}">
      <html lang="en">
        <body>{children}</body>
      </html>
    </AptabaseProvider>
  );
}`,
      },
      {
        title: "Next.js Pages Router",
        intro: "Wrap in `_app`:",
        lang: "jsx",
        code: `import { AptabaseProvider } from "@aptabase/react";

export default function App({ Component, pageProps }) {
  return (
    <AptabaseProvider appKey="${KEY}">
      <Component {...pageProps} />
    </AptabaseProvider>
  );
}`,
      },
      {
        title: "Track events",
        intro: "Use the `useAptabase` hook in any component:",
        lang: "jsx",
        code: `import { useAptabase } from "@aptabase/react";

function MyComponent() {
  const { trackEvent } = useAptabase();

  trackEvent("app_started");
  trackEvent("screen_view", { name: "Settings" });
}`,
        outro:
          "Also works with Remix, CRA and Vite — wrap the root with `<AptabaseProvider>`.",
      },
    ],
    page: {
      slug: "nextjs",
      title: "Next.js Apps",
      sdkName: "Next.js SDK for Aptabase",
      image: "/tools/nextjs.svg",
      textColor: "text-[#2563EB]",
      exampleLang: "typescript",
      example: `trackEvent("settings_changed", {
  theme: "dark"
});`,
      useCases: [
        featureUsage("Next.js app"),
        locationAndLanguage("Web app", "that market"),
        browsers,
      ],
    },
  },
  {
    id: "angular",
    name: "Angular",
    group: "web",
    package: "@aptabase/angular",
    install: "npm add @aptabase/angular",
    repo: "https://github.com/aptabase/aptabase-js/blob/main/packages/angular/README.md",
    snippets: [
      {
        title: "Standalone API setup",
        lang: "typescript",
        code: `import { provideAptabaseAnalytics } from "@aptabase/angular";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAptabaseAnalytics("${KEY}"),
  ],
};`,
      },
      {
        title: "NgModules setup",
        lang: "typescript",
        code: `import { AptabaseAnalyticsModule } from "@aptabase/angular";

@NgModule({
  imports: [AptabaseAnalyticsModule.forRoot("${KEY}")],
})
export class AppModule {}`,
      },
      {
        title: "Track events",
        intro: "Inject `AptabaseAnalyticsService` in your component:",
        lang: "typescript",
        code: `import { AptabaseAnalyticsService } from "@aptabase/angular";

@Component({ ... })
export class MyComponent {
  constructor(private _analyticsService: AptabaseAnalyticsService) {}

  onClick() {
    this._analyticsService.trackEvent("button_clicked");
    this._analyticsService.trackEvent("screen_view", { name: "Settings" });
  }
}`,
      },
    ],
    page: {
      slug: "angular",
      title: "Angular Apps",
      sdkName: "Angular SDK for Aptabase",
      image: "/tools/angular.svg",
      textColor: "text-[#2563EB]",
      exampleLang: "typescript",
      example: `this._analyticsService.trackEvent("settings_changed", { theme: "dark" });`,
      useCases: [
        featureUsage("Angular app"),
        locationAndLanguage("Web app", "that market"),
        browsers,
      ],
    },
  },
  {
    id: "browser",
    name: "Browser extensions",
    group: "web",
    package: "@aptabase/browser (~1 kB)",
    install: "npm add @aptabase/browser",
    repo: "https://github.com/aptabase/aptabase-js",
    snippets: [
      {
        title: "Initialization",
        intro: "Initialize in your background script:",
        lang: "js",
        code: `import { init } from "@aptabase/browser";

init("${KEY}");`,
        outro:
          "Optional second parameter: `{ isDebug: true }`. By default the SDK detects dev mode by checking whether the extension was installed from a store.",
      },
      {
        title: "Track events",
        lang: "js",
        code: `import { trackEvent } from "@aptabase/browser";

trackEvent("extension_installed");
trackEvent("popup_opened", { page: "settings" });`,
      },
    ],
    page: {
      slug: "browser-extensions",
      title: "Browser Extensions",
      sdkName: "Browser Extension SDK for Aptabase",
      image: "/tools/chrome.svg",
      textColor: "text-[#34a853]",
      exampleLang: "typescript",
      example: `trackEvent("settings_changed", {
  theme: "dark"
});`,
      useCases: [
        featureUsage("extension"),
        locationAndLanguage(
          "extension",
          "the various browser extension stores",
        ),
        {
          icon: "mobile",
          title: "Which browser versions do my users have?",
          description:
            "Aptabase efficiently gathers data such as the names of browsers such as Chrome, Firefox, Edge and Safari, alongside their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used browsers and versions.",
        },
      ],
    },
  },

  // ----------------------------------------------------------------- Games
  {
    id: "unity",
    name: "Unity",
    group: "games",
    package: "Unity Package Manager (git URL)",
    install:
      "Package Manager → Add package from git URL: https://github.com/aptabase/aptabase-unity.git",
    repo: "https://github.com/aptabase/aptabase-unity",
    snippets: [
      {
        title: "Configuration",
        intro:
          "Set your App Key in the settings asset at `Aptabase/Resources/AptabaseSettings.Asset`. Events are batched and sent every 60 seconds in production and every 2 seconds in development; override this via the `FlushInterval` field.",
      },
      {
        title: "Track events",
        lang: "csharp",
        code: `Aptabase.TrackEvent("app_started");
Aptabase.TrackEvent("screen_view", new Dictionary<string, object>
{
    { "name", "Settings" }
});`,
        outro: "Manual flush: `Aptabase.Flush();`",
      },
    ],
    page: {
      slug: "unity",
      title: "Unity Games",
      sdkName: "Unity SDK for Aptabase",
      image: "/tools/unity.svg",
      textColor: "text-[#2563EB]",
      exampleLang: "csharp",
      example: `Aptabase.TrackEvent("game_started", new Dictionary<string, object>
{
  {"difficulty", "Hard"}
});`,
      useCases: [
        gameInteraction("Unity games"),
        locationAndLanguage("Unity games", "that market"),
        gameDevices,
      ],
    },
  },
  {
    id: "unreal",
    name: "Unreal Engine",
    group: "games",
    package: "Plugin (C++ project)",
    install:
      "Clone https://github.com/aptabase/aptabase-unreal into your project's Plugins/ folder",
    repo: "https://github.com/aptabase/aptabase-unreal",
    snippets: [
      {
        title: "Setup",
        intro:
          'Enable the plugin (Toolbar > Edit > Plugins > search "Aptabase" > Enable), then add to `Config/DefaultEngine.ini`:',
        lang: "ini",
        code: `[Analytics]
ProviderModuleName=Aptabase`,
        outro:
          "Finally, set your App Key in Project Settings > Analytics > Aptabase.",
      },
      {
        title: "Track events (C++)",
        lang: "cpp",
        code: `TArray<FAnalyticsEventAttribute> Attributes;
Attributes.Emplace(TEXT("name"), TEXT("Settings"));

FAnalytics::Get().GetDefaultConfiguredProvider()->RecordEvent(TEXT("screen_view"), Attributes);`,
      },
      {
        title: "Track events (Blueprints)",
        intro:
          'Use the "Record Event with Attributes" node. The Blueprint Analytics Plugin is recommended for provider-agnostic tracking.',
      },
    ],
    page: {
      slug: "unreal",
      title: "Unreal Games",
      sdkName: "Unreal Plugin for Aptabase",
      image: "/tools/unreal.svg",
      textColor: "text-[#2563EB]",
      exampleLang: "cpp",
      example: `FAnalytics::Get().
  GetDefaultConfiguredProvider()->
  RecordEvent(TEXT("Game Started"), Attributes);`,
      useCases: [
        gameInteraction("Unreal games"),
        locationAndLanguage("Unreal games", "that market"),
        gameDevices,
      ],
    },
  },
  {
    id: "godot",
    name: "Godot",
    group: "games",
    package: "addons/aptabase (autoload singleton)",
    install: "Copy addons/aptabase into your project and enable the plugin",
    repo: "https://github.com/aptabase/aptabase-godot",
    requires: "Godot 4.2+",
    snippets: [
      {
        title: "Initialization and tracking",
        intro:
          "Copy the `addons/aptabase` folder into your project's `addons/` directory and enable the plugin under Project > Project Settings > Plugins. That registers an `Aptabase` autoload singleton:",
        lang: "gdscript",
        code: `func _ready() -> void:
    Aptabase.init("${KEY}", {"app_version": "1.2.3"})
    Aptabase.track("app_started")
    Aptabase.track("level_completed", {"level": 3, "score": 1200})`,
        outro:
          "Options: `is_debug` (default: `OS.is_debug_build()`), `max_batch_size` (25), `flush_interval` (10s), `timeout` (30s). Events are batched and sent in the background; a failed request is logged and retried and never affects the game.",
      },
    ],
    page: {
      slug: "godot",
      title: "Godot Games",
      sdkName: "Godot SDK for Aptabase",
      image: "/tools/godot.svg",
      textColor: "text-[#478CBF]",
      exampleLang: "gdscript",
      example: `Aptabase.track("level_completed", {
  "level": 3,
  "score": 1200,
})`,
      useCases: [
        gameInteraction("Godot games"),
        locationAndLanguage("Godot games", "that market"),
        gameDevices,
      ],
    },
  },

  // ----------------------------------------------------------------- Other
  {
    id: "python",
    name: "Python",
    group: "other",
    package: "aptabase (PyPI)",
    install: "pip install aptabase",
    repo: "https://github.com/aptabase/aptabase-python",
    requires: "Python 3.11+",
    snippets: [
      {
        title: "Initialization and tracking",
        intro: "The SDK is fully async, built with `httpx` and `asyncio`:",
        lang: "python",
        code: `import asyncio
from aptabase import Aptabase

async def main():
    async with Aptabase("${KEY}") as client:
        await client.track("app_started")
        await client.track("screen_view", {"name": "Settings"})

asyncio.run(main())`,
      },
      {
        title: "Configuration options",
        lang: "python",
        code: `client = Aptabase(
    app_key="${KEY}",
    app_version="1.0.0",
    is_debug=False,
    max_batch_size=25,
    flush_interval=10.0,
    timeout=30.0
)`,
      },
      {
        title: "Manual lifecycle",
        lang: "python",
        code: `client = Aptabase("${KEY}")
await client.start()
try:
    await client.track("event")
finally:
    await client.stop()`,
      },
    ],
    page: {
      slug: "python",
      title: "Python Apps",
      sdkName: "Python SDK for Aptabase",
      image: "/tools/python.svg",
      textColor: "text-[#3772FF]",
      exampleLang: "python",
      example: `await client.track("user_action", {
    "action": "button_click",
})`,
      useCases: [
        featureUsage("Python app"),
        locationAndLanguage(
          "Python app",
          "the Apple App Store and Google Play Store",
        ),
        osVersions("mobile", "Windows, Android, iOS, iPadOS, macOS, etc."),
      ],
    },
  },
  {
    id: "cpp",
    name: "C++",
    group: "other",
    package: "CMake subdirectory",
    install: "add_subdirectory(path/to/aptabase-cpp)",
    repo: "https://github.com/aptabase/aptabase-cpp",
    snippets: [
      {
        title: "CMake integration",
        intro: "Choose a networking backend:",
        lang: "cmake",
        code: `# Option A: cpp-httplib
set(CMAKE_APTABASE_USE_HTTPLIB ON)
add_subdirectory(path/to/aptabase-cpp)

# Option B: Boost.Asio
set(CMAKE_APTABASE_USE_BOOST ON)
add_subdirectory(path/to/aptabase-cpp)`,
      },
      {
        title: "Initialization and tracking",
        lang: "cpp",
        code: `#include <aptabase/analytics.hpp>
#include <aptabase/net/httplib.hpp>

int main() {
    Aptabase::Analytics aptabase(
        std::make_unique<Aptabase::HttplibHttpClient>(),
        "${KEY}",
        "https://your.aptabase.url",
        true // is_debug
    );

    aptabase.StartSession();
    aptabase.RecordEvent("app_started");
    aptabase.RecordEvent("screen_view", {{"name", "Settings"}});
    aptabase.EndSession();
}`,
        outro: "Event attributes support `std::string`, `float` and `double`.",
      },
    ],
    page: {
      slug: "cpp",
      title: "C++ Apps",
      sdkName: "C++ SDK for Aptabase",
      image: "/tools/cpp.svg",
      textColor: "text-[#00599C]",
      exampleLang: "cpp",
      example: `aptabase.RecordEvent("play_music", {
  {"name", "Here comes the sun"}
});`,
      useCases: [
        featureUsage("C++ app"),
        growthAndAdoption("Native C++ applications"),
        osVersions("desktop", "Windows, macOS and various Linux distributions"),
      ],
    },
  },
];

export const sdksInGroup = (group: SdkGroup) =>
  sdks.filter((s) => s.group === group);

/** SDKs that have a /for-<slug> landing page, in catalogue order. */
export const sdkPages = sdks.filter(
  (s): s is Sdk & { page: SdkPage } => s.page !== undefined,
);

export const sdkHref = (sdk: Sdk) =>
  sdk.page ? `/for-${sdk.page.slug}` : undefined;

export const sdkBySlug = (slug: string) =>
  sdkPages.find((s) => s.page.slug === slug);

/** True when `install` is a literal command worth showing in a code block. */
export const installIsCommand = (sdk: Sdk) =>
  /^(npm|cargo|dotnet|flutter|pip|implementation\(|add_subdirectory)/.test(
    sdk.install,
  );

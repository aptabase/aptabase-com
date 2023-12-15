import IconClick from "@tabler/icons/click.svg?raw";
import IconLanguage from "@tabler/icons/language.svg?raw";
import IconMobile from "@tabler/icons/device-mobile.svg?raw";
import IconDesktop from "@tabler/icons/device-desktop.svg?raw";
import IconGamePad2 from "@tabler/icons/device-gamepad-2.svg?raw";
import IconChartHistogram from "@tabler/icons/chart-histogram.svg?raw";

export default [
  {
    slug: "swift",
    name: "Native iOS (Swift)",
    title: "Swift Apps",
    image: "/tools/apple.svg",
    href: "/for-swift",
    sdkName: "Swift SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-swift",
    sdkCodeExample: `Aptabase.shared.trackEvent("play_music", with: [
  "name": "Here comes the sun"
])`,
    sdkLanguage: "swift",
    textColor: "text-[#F05138]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your Swift app's user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your Swift app, thereby enhancing its global accessibility and visibility on the Apple App Store.",
      },
      {
        icon: IconMobile,
        title: "Which OS versions do my users have?",
        description:
          "Aptabase efficiently gathers data such as the names of operating systems such as iOS, iPadOS, macOS, etc., and their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
      },
    ],
  },
  {
    slug: "android",
    name: "Native Android (Kotlin)",
    title: "Android Apps",
    image: "/tools/android.svg",
    href: "/for-android",
    sdkName: "Kotlin SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-kotlin",
    sdkCodeExample: `Aptabase.instance.trackEvent("play_music", mapOf<String, Any>(
  "name" to "here_comes_the_sun"
))`,
    sdkLanguage: "kotlin",
    textColor: "text-[#3DDB85]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your Android/Kotlin app's user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your Android/Kotlin app, thereby enhancing its global accessibility and visibility on the Google Play Store.",
      },
      {
        icon: IconMobile,
        title: "What Android versions are my users on?",
        description:
          "Aptabase proficiently collects data related to the various versions of Android utilized by your users. Such invaluable insights empower you to streamline your efforts in creating superior user experiences, meticulously customized to the most prevalent Android versions.",
      },
    ],
  },
  {
    slug: "flutter",
    name: "Flutter",
    title: "Flutter Apps",
    image: "/tools/flutter.svg",
    href: "/for-flutter",
    sdkName: "Flutter SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase_flutter",
    sdkCodeExample: `Aptabase.instance.trackEvent("play_music", {
  "name": "here_comes_the_sun"
});`,
    sdkLanguage: "dart",
    textColor: "text-[#42A5F5]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your Flutter app's user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your Flutter app, thereby enhancing its global accessibility and visibility on the Apple App Store and Google Play Store.",
      },
      {
        icon: IconMobile,
        title: "Which OS versions do my users have?",
        description:
          "Aptabase efficiently gathers data such as the names of operating systems such as Android, iOS, iPadOS, macOS, etc., and their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
      },
    ],
  },
  {
    slug: "electron",
    name: "Electron",
    title: "Electron Apps",
    image: "/tools/electron.svg",
    href: "/for-electron",
    sdkName: "Electron SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-electron",
    sdkCodeExample: `trackEvent("play_music", {
  name: "Here comes the sun"
});`,
    sdkLanguage: "typescript",
    textColor: "text-[#2DD0ED]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your Electron app's user experience.",
      },
      {
        icon: IconChartHistogram,
        title: "Growth and Adoption",
        description:
          "Electron applications may lag in user updates due to the need for manual intervention during the update process. However, with Aptabase, you can swiftly determine the adoption rate of your app's newest version. This vital information aids you in making strategic decisions regarding the appropriate timing to phase out older versions.",
      },
      {
        icon: IconDesktop,
        title: "Which OS versions do my users have?",
        description:
          "Aptabase efficiently gathers data such as the names of operating systems such as Windows, macOS and various Linux distributions, alongside their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
      },
    ],
  },
  {
    slug: "nativescript",
    name: "NativeScript",
    title: "NativeScript Apps",
    image: "/tools/nativescript.svg",
    href: "/for-nativescript",
    sdkName: "NativeScript SDK for Aptabase",
    sdkUrl:
      "https://github.com/nstudio/nativescript-plugins/tree/main/packages/nativescript-aptabase",
    sdkCodeExample: `Aptabase.track("play_music", {
  name: "Here comes the sun"
});`,
    sdkLanguage: "typescript",
    textColor: "text-[#65ADF1]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your NativeScript app's user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your NativeScript app, thereby enhancing its global accessibility and visibility on the Apple App Store and Google Play Store.",
      },
      {
        icon: IconMobile,
        title: "Which OS versions do my users have?",
        description:
          "Aptabase efficiently gathers data such as the names of operating systems such as Android, iOS, iPadOS, macOS, etc., and their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
      },
    ],
  },
  {
    slug: "tauri",
    name: "Tauri",
    title: "Tauri Apps",
    image: "/tools/tauri.svg",
    href: "/for-tauri",
    sdkName: "tauri-plugin-aptabase",
    sdkUrl: "https://github.com/aptabase/tauri-plugin-aptabase",
    sdkCodeExample: `trackEvent("play_music", {
  name: "Here comes the sun"
});`,
    sdkLanguage: "typescript",
    textColor: "text-[#FFC131]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your Tauri app's user experience.",
      },
      {
        icon: IconChartHistogram,
        title: "Growth and Adoption",
        description:
          "Tauri apps may lag in user updates due to the need for manual intervention during the update process. However, with Aptabase, you can swiftly determine the adoption rate of your app's newest version. This vital information aids you in making strategic decisions regarding the appropriate timing to phase out older versions.",
      },
      {
        icon: IconDesktop,
        title: "Which OS versions do my users have?",
        description:
          "Aptabase efficiently gathers data such as the names of operating systems such ash Windows, macOS and various Linux distributions, alongside their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
      },
    ],
  },
  {
    slug: "react-native",
    name: "React Native",
    title: "React Native Apps",
    image: "/tools/react-native.svg",
    href: "/for-react-native",
    sdkName: "React Native SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-react-native",
    sdkCodeExample: `trackEvent("play_music", {
  name: "Here comes the sun"
});`,
    sdkLanguage: "typescript",
    textColor: "text-[#61DAFB]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your React Native app's user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your React Native app, thereby enhancing its global accessibility and visibility on the Apple App Store and Google Play Store.",
      },
      {
        icon: IconMobile,
        title: "Which OS versions do my users have?",
        description:
          "Aptabase efficiently gathers data such as the names of operating systems such as Android, iOS, iPadOS, macOS, etc., and their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
      },
    ],
  },
  {
    slug: "webapps",
    name: "Web App",
    title: "Web Apps",
    image: "/tools/javascript.svg",
    href: "/for-webapps",
    sdkName: "JavaScript SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-js",
    sdkCodeExample: `trackEvent("settings_changed", {
  theme: "dark"
});`,
    sdkLanguage: "typescript",
    textColor: "text-[#F7DF1E]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your Web app's user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your Web app, thereby enhancing its global accessibility and visibility on that market.",
      },
      {
        icon: IconDesktop,
        title: "What browsers are my users on?",
        description:
          "Aptabase efficiently gathers data such as the names of Browsers, alongside their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used browsers.",
      },
    ],
  },
  {
    slug: "nextjs",
    name: "Next.js",
    title: "Next.js Apps",
    image: "/tools/nextjs.svg",
    href: "/for-nextjs",
    sdkName: "Next.js SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-js",
    sdkCodeExample: `trackEvent("settings_changed", {
  theme: "dark"
});`,
    sdkLanguage: "typescript",
    textColor: "text-[#2563EB]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your Next.js app's user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your Web app, thereby enhancing its global accessibility and visibility on that market.",
      },
      {
        icon: IconDesktop,
        title: "What browsers are my users on?",
        description:
          "Aptabase efficiently gathers data such as the names of Browsers, alongside their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used browsers.",
      },
    ],
  },
  {
    slug: "browser-extensions",
    name: "Browser",
    title: "Browser Extensions",
    image: "/tools/chrome.svg",
    href: "/for-browser-extensions",
    sdkName: "Browser Extension SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-js",
    sdkCodeExample: `trackEvent("settings_changed", {
  theme: "dark"
});`,
    sdkLanguage: "typescript",
    textColor: "text-[#34a853]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your extension's user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your extension, thereby enhancing its global accessibility and visibility on the various browser extension stores.",
      },
      {
        icon: IconMobile,
        title: "Which browser versions do my users have?",
        description:
          "Aptabase efficiently gathers data such as the names of browsers such as Chrome, Firefox, Edge and Safari, alongside their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used browsers and versions.",
      },
    ],
  },
  {
    slug: "maui",
    name: ".NET MAUI",
    title: ".NET MAUI Apps",
    image: "/tools/dotnet.svg",
    href: "/for-maui",
    sdkName: ".NET MAUI SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-maui",
    sdkCodeExample: `_aptabase.TrackEvent("play_music", new() {
    { "name", "Here comes the sun" }
});`,
    sdkLanguage: "csharp",
    textColor: "text-[#512BD4]",
    useCases: [
      {
        icon: IconClick,
        title: "Feature Usage",
        description:
          "Are you aware of the features in your app that users engage with most frequently? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your .NET MAUI app's user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your .NET MAUI app, thereby enhancing its global accessibility and visibility on the Apple App Store and Google Play Store.",
      },
      {
        icon: IconMobile,
        title: "Which OS versions do my users have?",
        description:
          "Aptabase efficiently gathers data such as the names of operating systems such as Windows, Android, iOS, iPadOS, macOS, etc., and their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
      },
    ],
  },
  {
    slug: "unreal",
    name: "Unreal Engine",
    title: "Unreal Games",
    image: "/tools/unreal.svg",
    href: "/for-unreal",
    sdkName: "Unreal Plugin for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-unreal",
    sdkCodeExample: `FAnalytics::Get().
  GetDefaultConfiguredProvider()->
  RecordEvent(TEXT("Game Started"), Attributes);`,
    sdkLanguage: "cpp",
    textColor: "text-[#2563EB]",
    useCases: [
      {
        icon: IconClick,
        title: "Game Interaction",
        description:
          "Are you aware of what users spend most of their time on your game? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your Unreal games user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your Unreal games, thereby enhancing its global accessibility and visibility on that market.",
      },
      {
        icon: IconGamePad2,
        title: "What devices and versions are my users on?",
        description:
          "Aptabase efficiently gathers data such as the names of operating systems such as Windows, PlayStation, Xbox, etc., and their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
      },
    ],
  },
  {
    slug: "unity",
    name: "Unity",
    title: "Unity Games",
    image: "/tools/unity.svg",
    href: "/for-unity",
    sdkName: "Unity SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-unity",
    sdkCodeExample: `Aptabase.TrackEvent("game_started", new Dictionary<string, object>
{
  {"difficulty", "Hard"}
});`,
    sdkLanguage: "csharp",
    textColor: "text-[#2563EB]",
    useCases: [
      {
        icon: IconClick,
        title: "Game Interaction",
        description:
          "Are you aware of what users spend most of their time on your game? What configurations that majority of your users prefer? Gaining insights into these areas allows you to make well-informed decisions on future focus points for enhancing your Unity games user experience.",
      },
      {
        icon: IconLanguage,
        title: "Location and Language",
        description:
          "Understanding the geographical distribution of your user base can significantly inform the decision to localize your Unity games, thereby enhancing its global accessibility and visibility on that market.",
      },
      {
        icon: IconGamePad2,
        title: "What devices and versions are my users on?",
        description:
          "Aptabase efficiently gathers data such as the names of operating systems such as Windows, PlayStation, Xbox, etc., and their respective versions. This valuable insight enables you to concentrate on crafting enhanced user experiences tailored to the most widely used OS and versions.",
      },
    ],
  },
];

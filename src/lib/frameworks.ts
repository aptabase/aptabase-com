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
    textColor: "text-[#027AFF]",
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
  },
  {
    slug: "webapps",
    name: "Web App",
    title: "Web Apps",
    image: "/tools/javascript.svg",
    href: "/for-webapps",
    sdkName: "JavaScript SDK for Aptabase",
    sdkUrl: "https://github.com/aptabase/aptabase-js",
    sdkCodeExample: `trackEvent("play_music", {
  name: "Here comes the sun"
});`,
    sdkLanguage: "typescript",
    textColor: "text-[#F7DF1E]",
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
  },
];

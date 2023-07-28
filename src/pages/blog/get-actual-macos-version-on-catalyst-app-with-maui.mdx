---
title: "How to get the actual macOS version on a Catalyst app with .NET MAUI"
description: "Confused as to why your .NET MAUI app is returning the iOS version on a Mac Catalyst app? Learn how to get the actual macOS version on a Mac Catalyst app."
slug: get-actual-macos-version-on-catalyst-app-with-maui
publishedDate: "2023-04-19T00:00:00.000Z"
layout: ../../layouts/BlogPostLayout.astro
category: Debug
tags: [".NET MAUI", "macOS", "Mac Catalyst"]
cta: "for-maui"
---

There's this wierd thing called `Mac Catalyst` that looks like a macOS app, but it's actually an iOS app.

That's basically how you get to build a macOS app with .NET MAUI, you build an iOS app and then you run it on a macOS machine. Awesome!

When I was building my first macOS app with .NET MAUI, I wanted to get the actual macOS version. I naturally tried to use the `DeviceInfo.Current.VersionString` property, which is how Microsoft recommends you get the OS version on iOS and Android.

- Did it work on macOS? Yeap 🎉
- But did it return the correct macOS version? No, it returned the iOS version 🤷‍♂️

Wait, what? I was confused. I get that this is an iOS app running on macOS, but why is it returning the iOS version?

What I found after some research it that `Mac Catalyst` has it's own versioning system, which seems to be based on the iOS version, but it's translated to a macOS a version on a 1-1 basis.

There's this [question](https://stackoverflow.com/questions/63581114/mac-catalyst-version) on StackOverflow that maps a few of the older macCatalyst versions to the actual macOS versions.

```
macCatalyst 13.0 = macOS 10.15 (Catalina)
macCatalyst 13.4 = macOS 10.15.4
macCatalyst 14.0 = macOS 11.0 (Big Sur)
macCatalyst 14.7 = macOS 11.6
macCatalyst 15.0 = macOS 12.0 (Monterey)
macCatalyst 15.3 = macOS 12.2 and 12.2.1
macCatalyst 15.4 = macOS 12.3
macCatalyst 15.5 = macOS 12.4
macCatalyst 15.6 = macOS 12.5
```

During my tests, I was also able to find that `macCatalyst 16.4 = macOS 13.3`. So while it's possible to map from one to the other, it's tedious and error prone.

So on my next attempt was: Can I get the actual macOS version without going through the `DeviceInfo` class?

Having used Objective-C before, I knew that `NSProcessInfo` had a `operatingSystemVersion` property that returns a `NSOperatingSystemVersion` struct with the major, minor and patch version numbers, which is exactly what I needed.

And it turns out that .NET MAUI can access these Objective-C classes and methods through C#, which is super handy. In the end I ended up with this code:

```csharp
    private string GetOsVersion()
    {
#if MACCATALYST
        var osVersion = Foundation.NSProcessInfo.ProcessInfo.OperatingSystemVersion;
        return $"{osVersion.Major}.{osVersion.Minor}.{osVersion.PatchVersion}";
#else
        return DeviceInfo.Current.VersionString;
#endif
    }
```

It basically use conditional compilation to check if the app is running on `Mac Catalyst` and if it is, it uses the `NSProcessInfo` class to get the macOS version, otherwise it uses the `DeviceInfo` class which returns the iOS or Android version.

The conditional compilation is necessary because the `Foundation` namespace may not be available on other platform targetted by the app.

And that's it! The `GetOsVersion` now returns the actual macOS version on a Mac Catalyst app ✅!

I hope this post was helpful. If you have any questions or suggestions, feel free to reach out to me on [Twitter](https://twitter.com/goenning), I'd love to hear from you!

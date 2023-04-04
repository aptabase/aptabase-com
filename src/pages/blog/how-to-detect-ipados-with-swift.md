---
title: How to detect iPadOS with Swift
description: "iPadOS is an operating system based on iOS and this short post will show you how to detect iPadOS with Swift."
slug: how-to-detect-ipados-with-swift
publishedDate: "2023-04-03T00:00:00.000Z"
layout: ../../layouts/BlogPostLayout.astro
category: Tips
tags: ["Swift", "iOS"]
cta: "for-swift"
---

The iPadOS was first introduced in 2019 and it is an operating system based on iOS. In some cases you might want to add some extra functionality to your app when running on iPadOS, or maybe you want to show a different UI. This short post will show you how to detect iPadOS with Swift.

The `UIUserInterfaceIdiom` enum is what you want to use to detect the user interface idiom, which can be accessed via the `userInterfaceIdiom` property on the `UIDevice` class. The `UIUserInterfaceIdiom` enum has a `pad` option which you can use to detect if the device is an iPad.

```swift
if UIDevice.current.userInterfaceIdiom == .pad {
    print("This is an iPad!")
}
```

But wait, there is more! Just because it's an iPad doesn't mean it's running iPadOS. Its only since the iOS 13 release that the iPad has been able to run iPadOS. So if you want to detect iPadOS specifically you can use the `systemVersion` property on the `UIDevice` class to check if the version is greater than or equal to 13.

```swift
if #available(iOS 13.0, *) {
    if UIDevice.current.userInterfaceIdiom == .pad {
        print("This is an iPad, and it's running iPadOS!")
    }
}
```

### What about the `UIDevice.current.systemName`?

This property returns the name of the operating system. As of 2023, this property correctly returns `iPadOS` for iPad devices running iPadOS. But this was not always the case, up until iPadOS 15 this property would return `iOS`.

If you're targeting iOS 15 or later you can use this property to detect iPadOS. But if you're targeting iOS 14 or earlier you should use the method described above.

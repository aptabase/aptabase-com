---
title: Where to find log files on Tauri Apps
description: "Building a tauri app and don't know where to find the logs? This short post will show you where to find the logs for your Tauri app."
slug: where-to-find-tauri-logs
publishedDate: "2023-04-01T00:00:00.000Z"
layout: ../../layouts/BlogPostLayout.astro
category: Tips
tags: ["Tauri"]
cta: "for-tauri"
---

It might be surprising to some on why would I write a blog post about log files for Tauri apps. But I've struggled way too many times to find the logs for my apps and I'm sure I'm not the only one.

First of all I'd highly recommend using the official `log` plugin for Tauri. If you're not yet using it, definitely check it out on our [Complete Guide to Logging with Tauri](/blog/complete-guide-tauri-log).

Back to the main question, where are the logs for Tauri apps? Well, it depends on the platform you're running your app on.

| Platform | Location                                 | Example                                                |
| -------- | ---------------------------------------- | ------------------------------------------------------ |
| macOS    | `$HOME/Library/Logs/{bundleIdentifier}`  | `/Users/Bob/Library/Logs/com.domain.appname`           |
| Windows  | `%APPDATA%\${bundleIdentifier}\logs`     | `C:\Users\Bob\AppData\Roaming\com.domain.appname\logs` |
| Linux    | `$HOME/.config/${bundleIdentifier}/logs` | `/home/bob/.config/com.domain.appname\logs`            |

But what is the `bundleIdentifier`? This is configured in your `tauri.conf.json` file. For example, if you have the following config, the bundle identifier would be `com.domain.appname`.

```json
{
  "$schema": "../node_modules/@tauri-apps/cli/schema.json",
  "build": {
    "beforeBuildCommand": "npm run build:vite",
    "beforeDevCommand": "npm run dev:vite",
    "devPath": "http://localhost:5173",
    "distDir": "../dist"
  },
  "package": {
    "productName": "YourAppName",
    "version": "1.3.2"
  },
  "tauri": {
    "bundle": {
      "active": true,
      "category": "DeveloperTool",
      "identifier": "com.domain.appname",
      ...
```

Hopefully this short post will help you find the logs for your Tauri apps, which is often needed when asking users to report issues and share the log files.

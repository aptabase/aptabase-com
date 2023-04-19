---
title: "No parameterless constructor defined for type MainPage on .NET MAUI"
description: "Got this exception when trying to inject a service on a ContentPage? This post will show you how to fix it in seconds."
slug: no-parameterless-constructor-defined-for-type-mainpage-on-net-maui
publishedDate: "2023-04-19T00:00:00.000Z"
layout: ../../layouts/BlogPostLayout.astro
category: Debug
tags: [".NET MAUI", "Dependency Injection"]
cta: "for-maui"
---

I spent hours trying to get a basic MAUI Hello World app to work with Dependency Injection and I couldn't find any clear documentation on what was wrong with it, hence why I'm writing this post, hopefully it'll help you spend less time debugging your MAUI app.

This is the exception I was getting:

```
System.MissingMethodException:
No parameterless constructor defined for type 'HelloWorld.MainPage'.
```

I'm familiar with `AppBuilder` concept, so the `MauiApp.CreateBuilder` felt very natural to me. I created a new project, registered some interfaces and classes on my MAUI dependency injection container using the `builder.Services.AddSingleton<T>` method and then I tried to inject my service on my `MainPage` constructor, something basic for ASP.NET Core apps, except you'd have a `Controller` instead of a `ContentPage`.

The `MainPage` looked like this:

```csharp
public partial class MainPage : ContentPage
{
	IMyClient _client;
    int count = 0;

	public MainPage(IMyClient client)
	{
		InitializeComponent();
		_client = client;
	}
}
```

But when I tried to run the app, I got the following exception:

```
System.MissingMethodException:
No parameterless constructor defined for type 'HelloWorld.MainPage'.
```

The message is quite clear, it's looking for a constructor without parameters, which I don't have because I need that `IMyClient` to be injected.

It turns out that on a ASP.NET Core app, controllers are added to the dependency injection container using the `AddControllers` method, which you usually get by default from the template, so you probably don't even notice it. But on a MAUI app, the `ContentPage` classes are NOT added to the dependency injection container by default, so I needed to add them myself.

The fix was a single-liner on my `MauiProgram.cs` after hours of troubleshooting and Googling 😅

```csharp
builder.Services.AddSingleton<MainPage>();
```

If I had dozens or hundreds of page, I'd probably abstract that in a `builder.Services.AddContentPages` extension method, but for now, I'm fine with that.

I hope this helps you save some time debugging your MAUI app!

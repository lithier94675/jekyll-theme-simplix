# Simplix

👋 Hi, there! This is my first Jekyll theme. It consists of simple layouts and available in both dark and light mode.

## Supported features

Besides styling basic HTML elements and code syntax highlighting, this theme also has many more features:

- Dark theme support
- Mobile-friendly layout
- Emphasize blockquote based on their alert type
- Code preview for HTML/ Markdown/ [ABCJS](https://www.abcjs.net)/ [Mermaid](https://mermaid.js.org)/ [PlantUML](https://plantuml.com) code
- Support for complex table and third-party media
- Math expression support using [KaTeX](https://katex.org)
- Compatibility on IE11 (although no one asked 🐧)

## Installation

<details>
  <summary>Install as a gem-based theme</summary>
  <ol>
    <li>
      <p>Add this line to your site's `Gemfile`:</p>
      <pre><code>gem "jekyll-theme-simplix"</span></code></pre>
    </li>
    <li>
      <p>Then add this line to your site's `_config.yml`:</p>
      <pre><code>theme: jekyll-theme-simplix</code></pre>
    </li>
    <li>
      <p>Run this command to install missing dependencies:</p>
      <pre><code>bundle install</code></pre>
    </li>
  </ol>
</details>

<details>
  <summary>Install as a remote theme</summary>
  <ol>
    <li>
      <p>Add this line to your site's `Gemfile` (make sure to remove/comment the line of the first step in the gem-based option):</p>
      <pre><code>gem "jekyll-remote-theme"</code></pre>
    </li>
    <li>
      <p>Then add these options in `_config.yml`:</p>
      <pre><code>remote_theme: lithier94675/jekyll-theme-simplix

plugins:
  \- jekyll-remote-theme</code></pre>
    </li>
    <li>
      <p>Run this command and you are ready to go!</p>
      <pre><code>bundle install</code></pre>
    </li>
  </ol>
</details>

<details>
  <summary>Install by copying files (not recommended)</summary>
  <ul>
    <li>Simply clone this repository or copy some/ all of its files into your site folder. You should update them manually as these files don't rely on RubyGems or Git system.</li>
  </ul>
</details>

## Customization

To change specific color based on page layout (`home` or `post`) and page theme (light or dark), add these lines to your `_config.yml`:

```yml
title_bg:
  home:
    - aliceblue # This is index [0] representing light theme
    - purple    # This is for dark theme
  post:
    - white     # These values can be any valid CSS background expression
    - magenta   # Make sure to use values compatible for most browsers
```

Or add these lines to the front matter of specific pages:

```yml
title_bg_light: lightblue
title_bg_dark: maroon
```

You can also make the background cover the whole page, too! Add this line to the front matter of any pages you want or `_config.yml`:

```yml
title_bg_fill: true # or any value other than falsy
```

To add your own links to the navigation menu, add these lines to your `_config.yml`:

```yml
navigation:
  - title: Posts
    url: /posts
    icon: article # Use icon names from Phosphor Icons
  - title: About
    url: # ...
```

## Demo

To check out all supported features of this project, please take a look at [the demo](https://lithier94675.github.io/jekyll-theme-simplix).

> [!NOTE]
> For mobile users who have to use DevTools without a computer, please use [Eruda](https://eruda.liriliri.io) by setting `JEKYLL_ENV=development` or add this line to `_config.yml`:
>
> ```yml
> debug: true
> ```

## Credits

- Fonts: [Google Fonts](https://fonts.google.com) and their corresponding creators
- Icons: [Phosphor Icons](https://phosphoricons.com)
- Extensions: [Jekyll Spaceship](https://github.com/jeffreytse/jekyll-spaceship)

## Support

If you found a feature functioning incorrectly or have a suggestion, feel free to open an issue in this repository.

## License

This project is licensed under **Creative Commons 1.0 License**. See [LICENSE](./LICENSE) for more information.

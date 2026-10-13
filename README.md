# Gledis Guri — research website

A static Jekyll site for GitHub Pages, with a research portfolio, publications and open research repositories.

## Editing

- `index.md` contains the homepage.
- `_data/repos.json` contains the five repository summaries, topics, links and illustration choices.
- `proj.md` and `_includes/repo-card.html` render the GitHub repos page at the existing `/proj` address.
- `pub.md`, `pack.md`, `about.md`, `contact.md` and `cv.md` contain the other pages.
- `assets/css/style.css` defines the shared visual design and responsive layouts.
- `assets/js/site.js` handles the mobile menu, repository filters and automatic figure animation.
- `_includes/art/` contains the original underwater world, trawling boat, microscope, fish, DNA and model illustrations.
- `assets/js/marine-figures.js` adds pointer interactions to those illustrations.

## Preview

With Jekyll installed:

```sh
jekyll serve
```

Then visit the local address printed by Jekyll. GitHub Pages builds the site from the source; generated output does not need to be committed.

## Interactive figures

The custom scientific SVG illustrations use the shared pointer, spring, reduced-motion and visibility engine from Hairline. The unchanged engine is retained as `assets/vendor/hairline/kernel.js`, alongside the original `@lucasmarkes/hairline` version 0.5.0 library, licensed under MIT. Its license is retained in `assets/vendor/hairline/LICENSE`. The figures illustrate research themes and do not show study data. They respond to the pointer; the figures also animate automatically while visible, and respect reduced-motion preferences.

No external JavaScript service, API key or runtime package installation is required for visitors. The research content and repository links remain available without JavaScript.

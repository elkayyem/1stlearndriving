# 1st Learn Driving School

A modern, responsive one-page marketing website for 1st Learn Driving School —
automatic driving lessons in Emsworth, Portsmouth and the surrounding areas.

Built as a static site with plain HTML, CSS and vanilla JavaScript — no build step.

## Running locally

Open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```bash
# Python
python -m http.server 8123

# Node
npx serve .
```

Then visit `http://localhost:8123/`.

## Structure

- `index.html` — the full single-page site
- `colors_and_type.css` — design-system foundations (colors, type, spacing, tokens)
- `site.css` — layout, components, motion and responsive rules
- `main.js` — reveal-on-scroll, animated counters, sticky nav, mobile menu, scroll-spy, contact form
- `assets/` — logo and imagery

## Features

- Sticky navigation with scroll-spy active highlighting and a mobile hamburger menu
- Smooth in-page anchor scrolling
- Reveal-on-scroll animations and animated statistic counters
- Sections: hero, why us, how it works, pricing, reviews, about, contact, CTA, footer
- Fully responsive down to mobile (375px), respects `prefers-reduced-motion`

> The contact form is a front-end demo (shows a success message on submit) and is not yet wired to a backend.

# Architecture Review

## Target Structure

```text
/pages
  /[locale]
    /about-us
    /course
    /order
    /privacy
    /schedule
/components
  /course
  /layout
  /seo
  /ui
/content
  /courses
    /entries
/lib
  /content
  /courses
  /i18n
/styles
  tokens.css
```

## Refactor Direction

- Keep the current Pages Router intact to avoid breaking exported static routes.
- Centralize locale config, SEO, navigation, and course data access under `lib/`.
- Introduce `content/courses` as the normalization boundary in front of legacy JSON.
- Support gradual migration with modular overrides under `content/courses/entries`.
- Move reusable presentation into `components/ui` and `components/layout`.
- Keep legacy components working, but migrate pages and course list/detail flows to the new foundation first.
- Treat `datas/courses.json` as a repository source, not a UI import.

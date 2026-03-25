# Course Content

This folder is the long-term home for course content.

## Current Strategy

- `entries/index.js` is the primary course registry.
- `source.js` normalizes the modular dataset into the repository shape.
- `datas/courses.json` is now archival legacy data and is no longer read at runtime.

## Target Structure

```text
content/courses/
  entries/
    index.js
    2024-001-fundamental-docker/
      en.js
      th.js
    2024-002-fundamental-kubernetes/
      en.js
      th.js
    2024-003-fundamental-api/
      en.js
      th.js
    2024-004-fundamental-api/
      en.js
      th.js
    2024-005-fundamental-api/
      en.js
      th.js
    2024-006-fundamental-api/
      en.js
      th.js
    2024-007-modern-web-frontend-with-react/
      en.js
      th.js
    2024-011-code-craft-tntro-to-web-development-with-html-css-js/
      en.js
      th.js
    2024-012-container-conquest-dominate-with-docker-workshop/
      en.js
      th.js
    2024-014-pixel-pioneers-nextjs-react-masterclass/
      en.js
      th.js
    2024-015-excel-vanguard-cutting-edge-functions/
      en.js
      th.js
    2024-016-data-storyteller-visual-narratives-with-power-bi/
      en.js
      th.js
    2025-001-orchestrate-docker-kubernetes-bootcamp/
      en.js
      th.js
    2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action/
      en.js
      th.js
    test-ac/
      en.js
      th.js
    test-dks/
      en.js
      th.js
```

## Migration Approach

1. Add one course entry under `entries/`.
2. Export it from `entries/index.js`.
3. Keep the file pair `en.js` and `th.js` aligned with the normalized course shape.
4. Treat `datas/courses.json` as historical backup only.

## Migrated Example

- `2025-001-orchestrate-docker-kubernetes-bootcamp`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2025-001-orchestrate-docker-kubernetes-bootcamp/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2025-001-orchestrate-docker-kubernetes-bootcamp/th.js)
- `2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action/th.js)
- `2024-001-fundamental-docker`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-001-fundamental-docker/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-001-fundamental-docker/th.js)
- `2024-002-fundamental-kubernetes`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-002-fundamental-kubernetes/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-002-fundamental-kubernetes/th.js)
- `2024-007-modern-web-frontend-with-react`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-007-modern-web-frontend-with-react/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-007-modern-web-frontend-with-react/th.js)
- `2024-003-fundamental-api`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-003-fundamental-api/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-003-fundamental-api/th.js)
- `2024-004-fundamental-api`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-004-fundamental-api/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-004-fundamental-api/th.js)
- `2024-005-fundamental-api`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-005-fundamental-api/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-005-fundamental-api/th.js)
- `2024-006-fundamental-api`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-006-fundamental-api/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-006-fundamental-api/th.js)
- `2024-011-code-craft-tntro-to-web-development-with-html-css-js`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-011-code-craft-tntro-to-web-development-with-html-css-js/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-011-code-craft-tntro-to-web-development-with-html-css-js/th.js)
- `2024-012-container-conquest-dominate-with-docker-workshop`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-012-container-conquest-dominate-with-docker-workshop/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-012-container-conquest-dominate-with-docker-workshop/th.js)
- `2024-014-pixel-pioneers-nextjs-react-masterclass`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-014-pixel-pioneers-nextjs-react-masterclass/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-014-pixel-pioneers-nextjs-react-masterclass/th.js)
- `2024-015-excel-vanguard-cutting-edge-functions`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-015-excel-vanguard-cutting-edge-functions/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-015-excel-vanguard-cutting-edge-functions/th.js)
- `2024-016-data-storyteller-visual-narratives-with-power-bi`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-016-data-storyteller-visual-narratives-with-power-bi/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/2024-016-data-storyteller-visual-narratives-with-power-bi/th.js)
- `test-ac`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/test-ac/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/test-ac/th.js)
- `test-dks`
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/test-dks/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/entries/test-dks/th.js)

## Override Shape

```js
export const myCourse = {
  '2025-001-orchestrate-docker-kubernetes-bootcamp': {
    en: {
      title: 'Updated title',
      overview: 'Updated overview',
    },
    th: {
      title: 'ชื่อใหม่',
    },
  },
};
```

Then register it in `modularCourseEntries` in `entries/index.js`.

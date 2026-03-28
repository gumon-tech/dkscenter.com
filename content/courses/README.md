# Course Content

This folder is the long-term home for course content.

## Current Strategy

- `registry.js` is the primary course registry and supports both split and legacy sources.
- `source.js` normalizes all course sources into the repository/runtime shape.
- `entries/index.js` now acts as the legacy registry during migration.
- `datas/courses.json` is archival legacy data and is no longer read at runtime.

## Target Structure

```text
content/courses/
  registry.js
  normalization/
    compose-course.js
  shared/
    2025-001-orchestrate-docker-kubernetes-bootcamp.js
  locales/
    2025-001-orchestrate-docker-kubernetes-bootcamp/
      en.js
      th.js
  schedules/
    2025-001-orchestrate-docker-kubernetes-bootcamp.js
  entries/
    index.js
    ...
```

## Migration Approach

1. Add shared metadata under `shared/`.
2. Add localized content under `locales/<courseKey>/en.js` and `th.js`.
3. Add session data under `schedules/`.
4. Register the course in `registry.js`.
5. Keep legacy entries only for courses that have not been migrated yet.

## Migrated Example

- `2025-001-orchestrate-docker-kubernetes-bootcamp`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2025-001-orchestrate-docker-kubernetes-bootcamp.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2025-001-orchestrate-docker-kubernetes-bootcamp/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2025-001-orchestrate-docker-kubernetes-bootcamp/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2025-001-orchestrate-docker-kubernetes-bootcamp.js)
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

## Split Source Shape

- `shared/<courseKey>.js`
  - course metadata used by every locale
- `locales/<courseKey>/en.js`
- `locales/<courseKey>/th.js`
  - localized editorial content only
- `schedules/<courseKey>.js`
  - public session data only

The normalization layer combines these sources back into the runtime course shape used by the repository and UI.

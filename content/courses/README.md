# Course Content

This folder is the long-term home for course content.

## Current Strategy

- `registry.js` is the primary course registry for all courses.
- `source.js` normalizes split course sources into the repository/runtime shape.
- Legacy entry files and archival `datas/courses.json` have been retired.

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
```

## Migration Approach

1. Add shared metadata under `shared/`.
2. Add localized content under `locales/<courseKey>/en.js` and `th.js`.
3. Add session data under `schedules/`.
4. Register the course in `registry.js`.
5. Keep all future updates in split files only.

## Migrated Example

- `2025-001-orchestrate-docker-kubernetes-bootcamp`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2025-001-orchestrate-docker-kubernetes-bootcamp.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2025-001-orchestrate-docker-kubernetes-bootcamp/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2025-001-orchestrate-docker-kubernetes-bootcamp/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2025-001-orchestrate-docker-kubernetes-bootcamp.js)
- `2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action.js)
- `2024-001-fundamental-docker`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-001-fundamental-docker.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-001-fundamental-docker/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-001-fundamental-docker/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-001-fundamental-docker.js)
- `2024-002-fundamental-kubernetes`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-002-fundamental-kubernetes.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-002-fundamental-kubernetes/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-002-fundamental-kubernetes/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-002-fundamental-kubernetes.js)
- `2024-007-modern-web-frontend-with-react`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-007-modern-web-frontend-with-react.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-007-modern-web-frontend-with-react/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-007-modern-web-frontend-with-react/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-007-modern-web-frontend-with-react.js)
- `2024-003-fundamental-api`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-003-fundamental-api.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-003-fundamental-api/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-003-fundamental-api/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-003-fundamental-api.js)
- `2024-004-fundamental-api`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-004-fundamental-api.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-004-fundamental-api/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-004-fundamental-api/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-004-fundamental-api.js)
- `2024-005-fundamental-api`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-005-fundamental-api.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-005-fundamental-api/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-005-fundamental-api/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-005-fundamental-api.js)
- `2024-006-fundamental-api`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-006-fundamental-api.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-006-fundamental-api/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-006-fundamental-api/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-006-fundamental-api.js)
- `2024-011-code-craft-tntro-to-web-development-with-html-css-js`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-011-code-craft-tntro-to-web-development-with-html-css-js.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-011-code-craft-tntro-to-web-development-with-html-css-js/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-011-code-craft-tntro-to-web-development-with-html-css-js/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-011-code-craft-tntro-to-web-development-with-html-css-js.js)
- `2024-012-container-conquest-dominate-with-docker-workshop`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-012-container-conquest-dominate-with-docker-workshop.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-012-container-conquest-dominate-with-docker-workshop/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-012-container-conquest-dominate-with-docker-workshop/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-012-container-conquest-dominate-with-docker-workshop.js)
- `2024-014-pixel-pioneers-nextjs-react-masterclass`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-014-pixel-pioneers-nextjs-react-masterclass.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-014-pixel-pioneers-nextjs-react-masterclass/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-014-pixel-pioneers-nextjs-react-masterclass/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-014-pixel-pioneers-nextjs-react-masterclass.js)
- `2024-015-excel-vanguard-cutting-edge-functions`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-015-excel-vanguard-cutting-edge-functions.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-015-excel-vanguard-cutting-edge-functions/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-015-excel-vanguard-cutting-edge-functions/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-015-excel-vanguard-cutting-edge-functions.js)
- `2024-016-data-storyteller-visual-narratives-with-power-bi`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/2024-016-data-storyteller-visual-narratives-with-power-bi.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-016-data-storyteller-visual-narratives-with-power-bi/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/2024-016-data-storyteller-visual-narratives-with-power-bi/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/2024-016-data-storyteller-visual-narratives-with-power-bi.js)
- `test-ac`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/test-ac.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/test-ac/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/test-ac/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/test-ac.js)
- `test-dks`
  - [shared.js](/Users/komphet/dev/dkscenter.com/content/courses/shared/test-dks.js)
  - [en.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/test-dks/en.js)
  - [th.js](/Users/komphet/dev/dkscenter.com/content/courses/locales/test-dks/th.js)
  - [schedules.js](/Users/komphet/dev/dkscenter.com/content/courses/schedules/test-dks.js)

## Split Source Shape

- `shared/<courseKey>.js`
  - course metadata used by every locale
- `locales/<courseKey>/en.js`
- `locales/<courseKey>/th.js`
  - localized editorial content only
- `schedules/<courseKey>.js`
  - public session data only

The normalization layer combines these sources back into the runtime course shape used by the repository and UI. Legacy runtime sources are no longer used.

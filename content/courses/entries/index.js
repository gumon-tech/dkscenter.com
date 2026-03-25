/**
 * Modular course entries are the primary course content source.
 *
 * Shape:
 * {
 *   [courseKey]: {
 *     [locale]: {
 *       title?: string,
 *       overview?: string,
 *       publicSchedule?: [],
 *       ...
 *     }
 *   }
 * }
 *
 * Keep this object explicit and per-course so new content can be added without
 * touching a large shared blob.
 */
import courseEn2025001 from './2025-001-orchestrate-docker-kubernetes-bootcamp/en.js';
import courseTh2025001 from './2025-001-orchestrate-docker-kubernetes-bootcamp/th.js';
import courseEn2025002 from './2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action/en.js';
import courseTh2025002 from './2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action/th.js';
import courseEn2024001 from './2024-001-fundamental-docker/en.js';
import courseTh2024001 from './2024-001-fundamental-docker/th.js';
import courseEn2024002 from './2024-002-fundamental-kubernetes/en.js';
import courseTh2024002 from './2024-002-fundamental-kubernetes/th.js';
import courseEn2024003 from './2024-003-fundamental-api/en.js';
import courseTh2024003 from './2024-003-fundamental-api/th.js';
import courseEn2024004 from './2024-004-fundamental-api/en.js';
import courseTh2024004 from './2024-004-fundamental-api/th.js';
import courseEn2024005 from './2024-005-fundamental-api/en.js';
import courseTh2024005 from './2024-005-fundamental-api/th.js';
import courseEn2024006 from './2024-006-fundamental-api/en.js';
import courseTh2024006 from './2024-006-fundamental-api/th.js';
import courseEn2024007 from './2024-007-modern-web-frontend-with-react/en.js';
import courseTh2024007 from './2024-007-modern-web-frontend-with-react/th.js';
import courseEn2024011 from './2024-011-code-craft-tntro-to-web-development-with-html-css-js/en.js';
import courseTh2024011 from './2024-011-code-craft-tntro-to-web-development-with-html-css-js/th.js';
import courseEn2024012 from './2024-012-container-conquest-dominate-with-docker-workshop/en.js';
import courseTh2024012 from './2024-012-container-conquest-dominate-with-docker-workshop/th.js';
import courseEn2024014 from './2024-014-pixel-pioneers-nextjs-react-masterclass/en.js';
import courseTh2024014 from './2024-014-pixel-pioneers-nextjs-react-masterclass/th.js';
import courseEn2024015 from './2024-015-excel-vanguard-cutting-edge-functions/en.js';
import courseTh2024015 from './2024-015-excel-vanguard-cutting-edge-functions/th.js';
import courseEn2024016 from './2024-016-data-storyteller-visual-narratives-with-power-bi/en.js';
import courseTh2024016 from './2024-016-data-storyteller-visual-narratives-with-power-bi/th.js';
import courseEnTestAc from './test-ac/en.js';
import courseThTestAc from './test-ac/th.js';
import courseEnTestDks from './test-dks/en.js';
import courseThTestDks from './test-dks/th.js';

export const modularCourseEntries = {
  '2024-001-fundamental-docker': {
    en: courseEn2024001,
    th: courseTh2024001,
  },
  '2024-002-fundamental-kubernetes': {
    en: courseEn2024002,
    th: courseTh2024002,
  },
  '2024-003-fundamental-api': {
    en: courseEn2024003,
    th: courseTh2024003,
  },
  '2024-004-fundamental-api': {
    en: courseEn2024004,
    th: courseTh2024004,
  },
  '2024-005-fundamental-api': {
    en: courseEn2024005,
    th: courseTh2024005,
  },
  '2024-006-fundamental-api': {
    en: courseEn2024006,
    th: courseTh2024006,
  },
  '2024-007-modern-web-frontend-with-react': {
    en: courseEn2024007,
    th: courseTh2024007,
  },
  '2024-011-code-craft-tntro-to-web-development-with-html-css-js': {
    en: courseEn2024011,
    th: courseTh2024011,
  },
  '2024-012-container-conquest-dominate-with-docker-workshop': {
    en: courseEn2024012,
    th: courseTh2024012,
  },
  '2024-014-pixel-pioneers-nextjs-react-masterclass': {
    en: courseEn2024014,
    th: courseTh2024014,
  },
  '2024-015-excel-vanguard-cutting-edge-functions': {
    en: courseEn2024015,
    th: courseTh2024015,
  },
  '2024-016-data-storyteller-visual-narratives-with-power-bi': {
    en: courseEn2024016,
    th: courseTh2024016,
  },
  '2025-001-orchestrate-docker-kubernetes-bootcamp': {
    en: courseEn2025001,
    th: courseTh2025001,
  },
  '2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action': {
    en: courseEn2025002,
    th: courseTh2025002,
  },
  'test-ac': {
    en: courseEnTestAc,
    th: courseThTestAc,
  },
  'test-dks': {
    en: courseEnTestDks,
    th: courseThTestDks,
  },
};

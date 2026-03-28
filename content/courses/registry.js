import { legacyCourseEntries } from './entries';
import shared2024014 from './shared/2024-014-pixel-pioneers-nextjs-react-masterclass';
import shared2024007 from './shared/2024-007-modern-web-frontend-with-react';
import shared2024001 from './shared/2024-001-fundamental-docker';
import shared2024002 from './shared/2024-002-fundamental-kubernetes';
import shared2024003 from './shared/2024-003-fundamental-api';
import shared2024004 from './shared/2024-004-fundamental-api';
import shared2024005 from './shared/2024-005-fundamental-api';
import shared2024006 from './shared/2024-006-fundamental-api';
import shared2024011 from './shared/2024-011-code-craft-tntro-to-web-development-with-html-css-js';
import shared2024012 from './shared/2024-012-container-conquest-dominate-with-docker-workshop';
import shared2025001 from './shared/2025-001-orchestrate-docker-kubernetes-bootcamp';
import shared2025002 from './shared/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action';
import shared2026003 from './shared/2026-003-ai-assisted-software-engineering';
import shared2024015 from './shared/2024-015-excel-vanguard-cutting-edge-functions';
import shared2024016 from './shared/2024-016-data-storyteller-visual-narratives-with-power-bi';
import sharedTestAc from './shared/test-ac';
import sharedTestDks from './shared/test-dks';
import courseEn2024001 from './locales/2024-001-fundamental-docker/en';
import courseTh2024001 from './locales/2024-001-fundamental-docker/th';
import courseEn2024002 from './locales/2024-002-fundamental-kubernetes/en';
import courseTh2024002 from './locales/2024-002-fundamental-kubernetes/th';
import courseEn2024003 from './locales/2024-003-fundamental-api/en';
import courseTh2024003 from './locales/2024-003-fundamental-api/th';
import courseEn2024004 from './locales/2024-004-fundamental-api/en';
import courseTh2024004 from './locales/2024-004-fundamental-api/th';
import courseEn2024005 from './locales/2024-005-fundamental-api/en';
import courseTh2024005 from './locales/2024-005-fundamental-api/th';
import courseEn2024006 from './locales/2024-006-fundamental-api/en';
import courseTh2024006 from './locales/2024-006-fundamental-api/th';
import courseEn2024007 from './locales/2024-007-modern-web-frontend-with-react/en';
import courseTh2024007 from './locales/2024-007-modern-web-frontend-with-react/th';
import courseEn2024011 from './locales/2024-011-code-craft-tntro-to-web-development-with-html-css-js/en';
import courseTh2024011 from './locales/2024-011-code-craft-tntro-to-web-development-with-html-css-js/th';
import courseEn2024012 from './locales/2024-012-container-conquest-dominate-with-docker-workshop/en';
import courseTh2024012 from './locales/2024-012-container-conquest-dominate-with-docker-workshop/th';
import courseEn2024014 from './locales/2024-014-pixel-pioneers-nextjs-react-masterclass/en';
import courseTh2024014 from './locales/2024-014-pixel-pioneers-nextjs-react-masterclass/th';
import courseEn2025001 from './locales/2025-001-orchestrate-docker-kubernetes-bootcamp/en';
import courseTh2025001 from './locales/2025-001-orchestrate-docker-kubernetes-bootcamp/th';
import courseEn2025002 from './locales/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action/en';
import courseTh2025002 from './locales/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action/th';
import courseEn2026003 from './locales/2026-003-ai-assisted-software-engineering/en';
import courseTh2026003 from './locales/2026-003-ai-assisted-software-engineering/th';
import courseEn2024015 from './locales/2024-015-excel-vanguard-cutting-edge-functions/en';
import courseTh2024015 from './locales/2024-015-excel-vanguard-cutting-edge-functions/th';
import courseEn2024016 from './locales/2024-016-data-storyteller-visual-narratives-with-power-bi/en';
import courseTh2024016 from './locales/2024-016-data-storyteller-visual-narratives-with-power-bi/th';
import courseEnTestAc from './locales/test-ac/en';
import courseThTestAc from './locales/test-ac/th';
import courseEnTestDks from './locales/test-dks/en';
import courseThTestDks from './locales/test-dks/th';
import schedules2024001 from './schedules/2024-001-fundamental-docker';
import schedules2024002 from './schedules/2024-002-fundamental-kubernetes';
import schedules2024003 from './schedules/2024-003-fundamental-api';
import schedules2024004 from './schedules/2024-004-fundamental-api';
import schedules2024005 from './schedules/2024-005-fundamental-api';
import schedules2024006 from './schedules/2024-006-fundamental-api';
import schedules2024007 from './schedules/2024-007-modern-web-frontend-with-react';
import schedules2024011 from './schedules/2024-011-code-craft-tntro-to-web-development-with-html-css-js';
import schedules2024012 from './schedules/2024-012-container-conquest-dominate-with-docker-workshop';
import schedules2024014 from './schedules/2024-014-pixel-pioneers-nextjs-react-masterclass';
import schedules2025001 from './schedules/2025-001-orchestrate-docker-kubernetes-bootcamp';
import schedules2025002 from './schedules/2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action';
import schedules2026003 from './schedules/2026-003-ai-assisted-software-engineering';
import schedules2024015 from './schedules/2024-015-excel-vanguard-cutting-edge-functions';
import schedules2024016 from './schedules/2024-016-data-storyteller-visual-narratives-with-power-bi';
import schedulesTestAc from './schedules/test-ac';
import schedulesTestDks from './schedules/test-dks';

const splitCourseRegistry = {
  '2024-001-fundamental-docker': {
    mode: 'split',
    shared: shared2024001,
    locales: {
      en: courseEn2024001,
      th: courseTh2024001,
    },
    schedules: schedules2024001,
  },
  '2024-002-fundamental-kubernetes': {
    mode: 'split',
    shared: shared2024002,
    locales: {
      en: courseEn2024002,
      th: courseTh2024002,
    },
    schedules: schedules2024002,
  },
  '2024-003-fundamental-api': {
    mode: 'split',
    shared: shared2024003,
    locales: {
      en: courseEn2024003,
      th: courseTh2024003,
    },
    schedules: schedules2024003,
  },
  '2024-004-fundamental-api': {
    mode: 'split',
    shared: shared2024004,
    locales: {
      en: courseEn2024004,
      th: courseTh2024004,
    },
    schedules: schedules2024004,
  },
  '2024-005-fundamental-api': {
    mode: 'split',
    shared: shared2024005,
    locales: {
      en: courseEn2024005,
      th: courseTh2024005,
    },
    schedules: schedules2024005,
  },
  '2024-006-fundamental-api': {
    mode: 'split',
    shared: shared2024006,
    locales: {
      en: courseEn2024006,
      th: courseTh2024006,
    },
    schedules: schedules2024006,
  },
  '2024-007-modern-web-frontend-with-react': {
    mode: 'split',
    shared: shared2024007,
    locales: {
      en: courseEn2024007,
      th: courseTh2024007,
    },
    schedules: schedules2024007,
  },
  '2024-011-code-craft-tntro-to-web-development-with-html-css-js': {
    mode: 'split',
    shared: shared2024011,
    locales: {
      en: courseEn2024011,
      th: courseTh2024011,
    },
    schedules: schedules2024011,
  },
  '2024-012-container-conquest-dominate-with-docker-workshop': {
    mode: 'split',
    shared: shared2024012,
    locales: {
      en: courseEn2024012,
      th: courseTh2024012,
    },
    schedules: schedules2024012,
  },
  '2024-014-pixel-pioneers-nextjs-react-masterclass': {
    mode: 'split',
    shared: shared2024014,
    locales: {
      en: courseEn2024014,
      th: courseTh2024014,
    },
    schedules: schedules2024014,
  },
  '2024-015-excel-vanguard-cutting-edge-functions': {
    mode: 'split',
    shared: shared2024015,
    locales: {
      en: courseEn2024015,
      th: courseTh2024015,
    },
    schedules: schedules2024015,
  },
  '2024-016-data-storyteller-visual-narratives-with-power-bi': {
    mode: 'split',
    shared: shared2024016,
    locales: {
      en: courseEn2024016,
      th: courseTh2024016,
    },
    schedules: schedules2024016,
  },
  '2025-001-orchestrate-docker-kubernetes-bootcamp': {
    mode: 'split',
    shared: shared2025001,
    locales: {
      en: courseEn2025001,
      th: courseTh2025001,
    },
    schedules: schedules2025001,
  },
  '2025-002-event-driven-odyssey-kafka-nest-and-graphql-in-action': {
    mode: 'split',
    shared: shared2025002,
    locales: {
      en: courseEn2025002,
      th: courseTh2025002,
    },
    schedules: schedules2025002,
  },
  '2026-003-ai-assisted-software-engineering': {
    mode: 'split',
    shared: shared2026003,
    locales: {
      en: courseEn2026003,
      th: courseTh2026003,
    },
    schedules: schedules2026003,
  },
  'test-ac': {
    mode: 'split',
    shared: sharedTestAc,
    locales: {
      en: courseEnTestAc,
      th: courseThTestAc,
    },
    schedules: schedulesTestAc,
  },
  'test-dks': {
    mode: 'split',
    shared: sharedTestDks,
    locales: {
      en: courseEnTestDks,
      th: courseThTestDks,
    },
    schedules: schedulesTestDks,
  },
};

const legacyRegistry = Object.fromEntries(
  Object.entries(legacyCourseEntries).map(([courseKey, locales]) => [
    courseKey,
    {
      mode: 'legacy',
      legacy: locales,
    },
  ]),
);

export const courseRegistry = {
  ...legacyRegistry,
  ...splitCourseRegistry,
};

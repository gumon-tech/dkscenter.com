/**
 * Normalized course content shape used by the repository and UI layer.
 *
 * {
 *   [courseKey]: {
 *     [locale]: {
 *       id: string,
 *       key: string,
 *       slug: string,
 *       locale: string,
 *       language: string,
 *       brand: string,
 *       code: string,
 *       title: string,
 *       overview: string,
 *       duration: string,
 *       imageUrl: string | null,
 *       detailUrl: string | null,
 *       lastUpdate: string | null,
 *       isActive: boolean,
 *       objectives: string[],
 *       audience: string[],
 *       whoShouldAttend: string[],
 *       prerequisites: string[],
 *       participantsWillReceive: string[],
 *       outline: { title: string, descriptions: string[] }[],
 *       curriculum: { title: string, descriptions: string[] }[],
 *       publicSchedule: {
 *         scheduleKey: string,
 *         title: string,
 *         eventStart: string,
 *         eventEnd: string,
 *         ticketUrl?: string | null,
 *         saleStart?: string | null,
 *         saleEnd?: string | null,
 *         isActive: boolean,
 *         isSoldOut?: boolean,
 *         location?: string,
 *       }[],
 *       documents: { title: string, fileUrl: string }[],
 *     }
 *   }
 * }
 */

export const COURSE_CONTENT_SCHEMA_VERSION = 1;

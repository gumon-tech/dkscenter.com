import React from 'react';
import { useEffect, useState } from 'react';
import FeaturedCourseSection from './home/featured-course-section';
import { getCoursesWithUpcomingSchedules } from '../lib/courses/repository';
import {
  formatCourseDateRange,
  formatCourseTime,
} from '../lib/courses/formatters';
import {
  getPrimaryDisplaySessionData,
  getSessionDeliveryLabel,
} from '../lib/courses/sessions';

const FALLBACK_COURSE_PATH = '/course/2024-007-modern-web-frontend-with-react';

const HighlightCourse = ({ i18next }) => {
  const { i18n } = i18next;
  const currentLanguage = i18n.language || 'th';

  const [highlightCourse, setHighlightCourse] = useState({});
  const [highlightSchedule, setHighlightSchedule] = useState({});
  const [courseRef, setCourseHref] = useState(FALLBACK_COURSE_PATH);

  useEffect(() => {
    const courses = getCoursesWithUpcomingSchedules(currentLanguage);
    const [featuredCourse] = courses;

    if (featuredCourse) {
      const { session } = getPrimaryDisplaySessionData(featuredCourse);
      setHighlightCourse(featuredCourse);
      setHighlightSchedule(session || {});
      setCourseHref('/course/' + featuredCourse.key);
      return;
    }

    setHighlightCourse({});
    setHighlightSchedule({});
    setCourseHref(FALLBACK_COURSE_PATH);
  }, [currentLanguage]);

  const deliveryLabel = getSessionDeliveryLabel(
    highlightSchedule,
    currentLanguage,
  );

  const dateRange =
    highlightSchedule?.eventStart && highlightSchedule?.eventEnd
      ? formatCourseDateRange(
          highlightSchedule.eventStart,
          highlightSchedule.eventEnd,
          currentLanguage,
        )
      : currentLanguage === 'th'
        ? 'เร็วๆ นี้'
        : 'Coming soon';

  const timeRange =
    highlightSchedule?.eventStart && highlightSchedule?.eventEnd
      ? `${formatCourseTime(
          highlightSchedule.eventStart,
          currentLanguage,
        )}–${formatCourseTime(highlightSchedule.eventEnd, currentLanguage)}`
      : currentLanguage === 'th'
        ? '09:00–17:00'
        : '09:00–17:00';

  const courseSummary =
    highlightCourse?.overview ||
    (currentLanguage === 'th'
      ? 'คอร์สเด่นสำหรับทีมเทคที่ต้องการอัปสกิลแบบใช้งานได้จริง พร้อมโครงสร้างเนื้อหาที่ชัดเจน อ่านง่าย และตัดสินใจสมัครได้เร็วขึ้น'
      : 'A featured course for tech teams that want practical, immediately useful skills with clearer structure and an easier path to registration.');

  const cohortLabel =
    highlightSchedule?.title?.match(/(\d+\/\d{4})$/)?.[1] ||
    (currentLanguage === 'th' ? 'รุ่นถัดไป' : 'Next cohort');

  const registerHref =
    highlightSchedule?.ticketUrl ||
    (highlightSchedule?.scheduleKey
      ? `/course/${highlightCourse?.key}/schedule/${highlightSchedule.scheduleKey}`
      : courseRef);

  const facts = [
    {
      label: currentLanguage === 'th' ? 'วันที่' : 'Date',
      value: dateRange,
    },
    {
      label: currentLanguage === 'th' ? 'เวลา' : 'Time',
      value: timeRange,
    },
    {
      label: currentLanguage === 'th' ? 'ผู้สอน' : 'Instructor',
      value:
        highlightCourse?.brand ||
        (currentLanguage === 'th'
          ? 'ทีมวิทยากร DKS Center'
          : 'DKS Center Instructor Team'),
    },
    {
      label: currentLanguage === 'th' ? 'สถานที่' : 'Venue',
      value:
        highlightSchedule?.location ||
        (currentLanguage === 'th'
          ? 'แจ้งสถานที่อีกครั้ง'
          : 'Location to be announced'),
      href: highlightSchedule?.locationUrl || null,
    },
  ];

  return (
    <FeaturedCourseSection
      eyebrow={
        currentLanguage === 'th' ? 'คอร์สที่กำลังจะจัด' : 'Upcoming course'
      }
      title="Featured Upcoming Course"
      description={
        currentLanguage === 'th'
          ? 'คอร์สเด่นรอบถัดไปสำหรับทีมเทคที่ต้องการอัปสกิลแบบใช้งานได้จริง'
          : 'A featured upcoming course for teams who want practical, immediately usable skills.'
      }
      viewAllLabel={
        currentLanguage === 'th' ? 'ดูคอร์สทั้งหมด' : 'View all courses'
      }
      viewAllHref="/course"
      course={{
        title:
          highlightCourse?.title || 'Orchestrate Docker & Kubernetes Bootcamp',
        image: highlightCourse?.imageUrl,
        imageAlt: highlightCourse?.title || 'DKS Center',
        badges: ['Upcoming', deliveryLabel || 'Onsite', cohortLabel],
        meta: `${dateRange} • ${timeRange}`,
        summary: courseSummary,
        facts,
        primaryCta: {
          label: currentLanguage === 'th' ? 'ลงทะเบียน' : 'Register',
          href: registerHref,
          external: Boolean(highlightSchedule?.ticketUrl),
        },
        secondaryCta: {
          label:
            currentLanguage === 'th'
              ? 'ดูรายละเอียดคอร์ส'
              : 'View course details',
          href: courseRef,
        },
      }}
    />
  );
};

export default HighlightCourse;

import React, { useEffect } from 'react';
import Container from './container';
import Breadcrumb from './breadcrumb';
import dayjs from 'dayjs';
import CourseDetailLink from './courseDetailLink';
import { gtmEvent } from '/lib/gtm';
import { normalizeBrand } from '/lib/brand';

const CourseDetail = ({ courseData, i18next }) => {
  const { t } = i18next;

  useEffect(() => {
    if (!courseData?.title) return;

    gtmEvent('view_item', {
      brand_owner: normalizeBrand(courseData?.brand),
      items: [
        {
          item_name: courseData.title,
          item_category: 'course',
          item_id: courseData?.code || courseData?.key,
          item_brand: normalizeBrand(courseData?.brand),
        },
      ],
    });
  }, [courseData?.title, courseData?.code, courseData?.key]);

  return !courseData ? (
    <Container>
      <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
      {t('course-detail-1')}
    </Container>
  ) : (
    <Container>
      <Breadcrumb
        paths={[
          { title: 'Training Course', path: '/course' },
          { title: courseData.code, path: `/course/${courseData?.key}` },
        ]}
      />
      <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
        {courseData.title}
      </h2>
      {courseData.lastUpdate && (
        <div className="text-sm font-bold tracking-wider text-indigo-700 dark:text-indigo-400 uppercase mt-2">
          {t('course-detail-2')}{' '}
          {dayjs(courseData.lastUpdate).format('D MMM YYYY, HH:mm')}
        </div>
      )}

      <div className="flex flex-wrap">
        <div className="md:w-full xl:basis-8/12 lg:pr-5">
          <p className="my-5 text-gray-700 dark:text-gray-400">
            {courseData.overview}
          </p>
          {courseData.imageUrl && (
            <img
              src={courseData.imageUrl}
              className="w-full"
              alt={courseData.title}
            />
          )}
          {courseData.objectives && courseData.objectives.length > 0 && (
            <>
              <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                {t('course-detail-3')}
              </h3>
              <ul className="list-disc text-gray-700 dark:text-gray-400 p-5">
                {courseData.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </>
          )}
          {courseData.whoShouldAttend &&
            courseData.whoShouldAttend.length > 0 && (
              <>
                <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                  {t('course-detail-4')}
                </h3>
                <ul className="list-disc text-gray-700 dark:text-gray-400 p-5">
                  {courseData.whoShouldAttend.map((whoShouldAttend, index) => (
                    <li key={index}>{whoShouldAttend}</li>
                  ))}
                </ul>
              </>
            )}
          {courseData.prerequisites && courseData.prerequisites.length > 0 && (
            <>
              <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                {t('course-detail-5')}
              </h3>
              <ul className="list-disc text-gray-700 dark:text-gray-400 p-5">
                {courseData.prerequisites.map((prerequisite, index) => (
                  <li key={index}>{prerequisite}</li>
                ))}
              </ul>
            </>
          )}
          {courseData.participantsWillReceive &&
            courseData.participantsWillReceive.length > 0 && (
              <>
                <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                  {t('course-detail-6')}
                </h3>
                <ul className="list-disc text-gray-700 dark:text-gray-400 p-5">
                  {courseData.participantsWillReceive.map(
                    (participantsWillReceive, index) => (
                      <li key={index}>{participantsWillReceive}</li>
                    ),
                  )}
                </ul>
              </>
            )}
          {courseData.outline && courseData.outline.length > 0 && (
            <>
              <h3 className="text-3xl mt-5 text-blue-700 dark:text-blue-400 font-bold">
                {t('course-detail-7')}
              </h3>
              <ol className="list-decimal text-gray-700 dark:text-gray-400 p-5">
                {courseData.outline.map((outline, index) => (
                  <li key={index}>
                    {outline.title}

                    {outline.descriptions &&
                      outline.descriptions.length > 0 && (
                        <ul className="list-disc text-gray-700 dark:text-gray-400 px-5">
                          {outline.descriptions.map((description, index) => (
                            <li key={index}>{description}</li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
        <CourseDetailLink
          className="md:w-full xl:basis-4/12"
          courseData={courseData}
          i18next={i18next}
          registerBottom
        />
        <CourseDetailLink
          className="hidden xl:block xl:basis-8/12"
          courseData={courseData}
          i18next={i18next}
          registerRight
        />
      </div>
    </Container>
  );
};

export default CourseDetail;

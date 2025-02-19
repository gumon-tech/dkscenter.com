import { RedirectRender } from '/lib/redirect';
import { useRouter } from 'next/router';
import Head from 'next/head';
import courses from '/datas/courses.json';

export const getStaticPaths = () => {
  const courseDatas = Object.values(courses);
  const paths = [];
  for (const courseData of courseDatas) {
    const courseLocaleDatas = Object.values(courseData);
    for (const courseLocaleData of courseLocaleDatas) {
      for (const publicSchedule of courseLocaleData.publicSchedule) {
        if (publicSchedule.isActive === true && publicSchedule.scheduleKey) {
          paths.push({
            params: {
              courseKey: courseLocaleData.key,
              scheduleKey: publicSchedule.scheduleKey,
            },
          });
        }
      }
    }
  }
  return { paths, fallback: false };
};

export const getStaticProps = (context) => {
  const courseKey = context.params?.courseKey || '';
  const courseData = courses[courseKey];
  return { props: { courseData } };
};

const Home = ({ courseData }) => {
  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}${asPath}`;
  const domain = origin;
  const courseLocaleData = courseData.en;

  return RedirectRender(
    <>
      <Head>
        <title>
          {`${courseLocaleData.title} | DKS Center - Digital Knowledge Sharing Center`}
        </title>
        <meta
          name="description"
          content={`${courseLocaleData.title} | ${courseLocaleData.overview}`}
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph Protocol */}
        <meta
          property="og:title"
          content={`${courseLocaleData.title} | DKS Center - Digital Knowledge Sharing Center`}
        />
        <meta
          property="og:description"
          content={`${courseLocaleData.title} | ${courseLocaleData.overview}`}
        />
        <meta
          property="og:image"
          content={domain + courseLocaleData.imageUrl}
        />
        <meta property="og:url" content={URL} />

        {/* Twitter Card */}
        <meta
          name="twitter:title"
          content={`${courseLocaleData.title} | DKS Center - Digital Knowledge Sharing Center`}
        />
        <meta
          name="twitter:description"
          content={`${courseLocaleData.title} | ${courseLocaleData.overview}`}
        />
        <meta
          name="twitter:image"
          content={domain + courseLocaleData.imageUrl}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    </>,
  );
};

export default Home;

import { Redirect } from "/lib/redirect";
import courses from "../../datas/courses.json";

export const getStaticPaths = () => {
  const courseKeyList = Object.keys(courses);
  const paths = [];
  for (const courseKey of courseKeyList) {
    paths.push({
      params: { courseKey: courseKey },
    });
  }
  return { paths, fallback: false };
};

export const getStaticProps = (context) => {
  const courseKey = context.params?.courseKey || "";
  const courseData = courses[courseKey];
  return { props: { courseData } };
};

export default Redirect;

import { Redirect } from "/lib/redirect";
import courses from "/datas/courses.json";

export const getStaticPaths = () => {
  const courseDatas =  Object.values(courses)
  const paths = [];
  for (const courseData of courseDatas) {
    const courseLocaleDatas =  Object.values(courseData)
    for (const courseLocaleData of courseLocaleDatas) {
      for (const publicSchedule of courseLocaleData.publicSchedule) {
        if(publicSchedule.isActive === true && publicSchedule.scheduleKey){
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
  const courseKey = context.params?.courseKey || "";
  const courseData = courses[courseKey];
  return { props: { courseData } };
};


export default Redirect;

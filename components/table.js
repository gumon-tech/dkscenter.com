import React from 'react'
import Link from "next/link";

import { getActiveCourses } from '../utils/course';
import { getSchedule } from '../utils/dateTime';


export default function Table() {
  const courses = getActiveCourses()

  return <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="relative rounded-xl overflow-auto">
      <div className="shadow-sm table-overflow overflow-hidden my-8">
        <table className="border-collapse table-auto w-full text-base">
          <thead>
            <tr>
              <th className="font-bold text-xl border-b dark:border-slate-600  text-slate-400  dark:text-slate-200 text-center p-4">
                Course
              </th>
              <th className="font-bold text-xl border-b dark:border-slate-600  text-slate-400  dark:text-slate-200 text-center p-4 ">
                Code
              </th>
              <th className="font-bold text-xl border-b dark:border-slate-600  text-slate-400  dark:text-slate-200 text-center p-4 ">
                Duration
              </th>
              <th className="font-bold text-xl border-b dark:border-slate-600  text-slate-400  dark:text-slate-200 text-center p-4 ">
                Schedule
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {courses.map(course => {
              return <tr key={course.key}>
                <td className="font-bold border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-200 ">
                  <Link href={`/course/${course.key}`} className="hover:text-cyan-600">
                    {course.title}
                  </Link>
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {course.code}
                </td>
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                  {course.duration}
                </td>
               
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                  {course.publicSchedule.map(schedule => {
                    return <div className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <div>{schedule.title}</div>
                      <div className="font-bold">{getSchedule(schedule.eventStart, schedule.eventEnd)}</div>
                    </div>
                  })}
                </td>
              </tr>
            })}


          </tbody>
        </table>
      </div>
    </div>
    {/* </div> */}
  </div>

}
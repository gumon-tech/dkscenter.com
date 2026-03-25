/* eslint-disable react/prop-types */
import React from 'react';
import Dotdotdot from 'react-dotdotdot';
import Card from '../ui/card';
import Button from '../ui/button';
import Link from '../link';

export default function CourseCard({ courseData, ctaLabel }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div
        className="h-60 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${courseData.imageUrl || '/img/logo_2_sq.png'})`,
        }}
      />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <Link href={`/course/${courseData.key}`}>
            <h3 className="text-2xl font-semibold tracking-tight text-text transition hover:text-primary">
              {courseData.title}
            </h3>
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {courseData.code} / {courseData.duration}
          </p>
        </div>

        <Dotdotdot clamp={4}>
          <p className="text-sm leading-7 text-muted">{courseData.overview}</p>
        </Dotdotdot>

        <div className="mt-auto pt-2">
          <Button
            as={Link}
            href={`/course/${courseData.key}`}
            className="w-full"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}

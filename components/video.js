import React, { useState } from 'react';
import Container from './container';
import { Course } from '../types/course';

const Video = ({ course }) => {
  const [playVideo, setPlayVideo] = useState(false);
  let backgroundImage = `url(course/2024-007/poster/cover-image2-01-01.png)`;
  if (course?.imageUrl) {
    backgroundImage = `url(${course?.imageUrl})`;
  }
  return (
    <Container>
      <div className="w-full max-w-4xl mx-auto overflow-hidden lg:mb-20 rounded-2xl ">
        <div
          onClick={() => setPlayVideo(!playVideo)}
          style={{
            backgroundImage: backgroundImage,
          }}
          className="relative cursor-pointer aspect-w-16 aspect-h-9 bg-center bg-contain"
        >
          <div className="absolute cursor-pointer aspect-w-16 aspect-h-9 bg-black opacity-60"></div>
          {!playVideo && (
            <button className="absolute inset-auto w-16 h-16 text-white transform -translate-x-1/2 -translate-y-1/2 lg:w-28 lg:h-28 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16  lg:w-28 lg:h-28"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Play Video</span>
            </button>
          )}
          {playVideo && (
            <iframe
              src="https://www.youtube-nocookie.com/embed/i1ZPPIcU2-E?controls=0&autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Video;

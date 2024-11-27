import { useEffect } from 'react';
import { useRouter } from 'next/router';
import languageDetector from './languageDetector';

export const useRedirect = ({ to, render }) => {
  const router = useRouter();
  to = to || router.asPath;

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect();
    if (to.startsWith('/' + detectedLng) && router.route === '/404') {
      // prevent endless loop
      router.replace('/' + detectedLng + router.route);
      return;
    }

    languageDetector.cache(detectedLng);
    router.replace('/' + detectedLng + to);
  });

  return render;
};

export const Redirect = () => {
  useRedirect({
    render: <></>,
  });
  return <></>;
};

export const RedirectRender = (render) => {
  useRedirect({
    render: render,
  });
  return render;
};

// eslint-disable-next-line react/display-name
export const getRedirect = (to) => () => {
  useRedirect({
    to: to,
    render: <></>,
  });
  return <></>;
};

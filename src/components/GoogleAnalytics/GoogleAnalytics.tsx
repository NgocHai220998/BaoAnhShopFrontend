/* eslint-disable react/no-danger */
import React from 'react';
// eslint-disable-next-line no-undef
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

interface GoogleAnalyticsProps {
  className?: string
}

const GoogleAnalytics: React.FunctionComponent<GoogleAnalyticsProps> = (props: GoogleAnalyticsProps) => {
  return (
    <div>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </script>
    </div>
  );
};

export default GoogleAnalytics;
import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="140" r="120" />
    <rect x="0" y="278" rx="11" ry="11" width="280" height="30" />
    <rect x="0" y="326" rx="10" ry="10" width="280" height="81" />
    <rect x="7" y="427" rx="7" ry="7" width="99" height="35" />
    <rect x="139" y="418" rx="29" ry="29" width="137" height="52" />
  </ContentLoader>
);

export default Skeleton;

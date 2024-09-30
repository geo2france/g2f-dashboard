import * as React from 'react';

const SVGMock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return <svg {...props} />;
};

export default SVGMock;

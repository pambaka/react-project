import { ReactNode } from 'react';

function SvgImage({ url }: { url: string }): ReactNode {
  return (
    <svg>
      <use xlinkHref={url}></use>
    </svg>
  );
}

export default SvgImage;

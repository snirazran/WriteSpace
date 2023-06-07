import { FC, HTMLAttributes, ImgHTMLAttributes, forwardRef } from 'react';

type Props = {} & ImgHTMLAttributes<HTMLImageElement>;

const Image = forwardRef<ImgHTMLAttributes<HTMLImageElement>, Props>(
  (props, ref) => {
    return <img ref={ref as any} {...props} />;
  }
);
export default Image;

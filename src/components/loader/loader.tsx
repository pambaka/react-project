import './loader.css';
import { ReactNode, useEffect, useRef } from 'react';

function Loader(props: { isLoading: boolean }): ReactNode {
  const loaderRef = useRef<HTMLDivElement>(null);

  const show = () => {
    if (loaderRef.current) loaderRef.current.classList.add('visible');
  };

  const hide = () => {
    if (loaderRef.current) loaderRef.current.classList.remove('visible');
  };

  useEffect(() => {
    if (props.isLoading) show();
    else hide();
  });

  return (
    <div className="loader-backdrop" ref={loaderRef}>
      <div className="loader"></div>
    </div>
  );
}

export default Loader;

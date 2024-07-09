import './loader.css';
import { Component, ReactNode, createRef } from 'react';

class Loader extends Component {
  private static loaderRef = createRef<HTMLDivElement>();

  static show = () => {
    if (this.loaderRef.current) this.loaderRef.current.classList.add('visible');
  };

  static hide = () => {
    if (this.loaderRef.current) this.loaderRef.current.classList.remove('visible');
  };

  render(): ReactNode {
    return (
      <div className="loader-backdrop" ref={Loader.loaderRef}>
        <div className="loader"></div>
      </div>
    );
  }
}

export default Loader;

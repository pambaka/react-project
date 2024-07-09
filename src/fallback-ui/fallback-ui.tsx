import './fallback-ui.css';
import { Component, ReactNode } from 'react';

class FallbackUi extends Component {
  render(): ReactNode {
    return <p className="fallback-text">Something went wrong, please reload the page</p>;
  }
}

export default FallbackUi;

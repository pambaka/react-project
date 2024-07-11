import './fallback-ui.css';
import { ReactNode } from 'react';

function FallbackUi(): ReactNode {
  return <p className="fallback-text">Something went wrong, please reload the page</p>;
}

export default FallbackUi;

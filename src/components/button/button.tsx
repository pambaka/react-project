import './button.css';
import { ReactNode } from 'react';

function Button(props: { buttonText: string; callback: () => void }): ReactNode {
  return (
    <button className="button" onClick={props.callback}>
      <span>{props.buttonText}</span>
    </button>
  );
}

export default Button;

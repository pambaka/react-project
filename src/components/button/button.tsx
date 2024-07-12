import './button.css';
import { ReactNode } from 'react';

function Button(props: { buttonText: string; callback: () => void; isDisabled?: boolean }): ReactNode {
  return (
    <button className="button" onClick={props.callback} disabled={false || props.isDisabled}>
      <span>{props.buttonText}</span>
    </button>
  );
}

export default Button;

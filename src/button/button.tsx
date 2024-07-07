import './button.css';
import { Component, ReactNode } from 'react';

class Button extends Component<{ buttonText: string; callback: () => void }> {
  render(): ReactNode {
    return (
      <button className="button" onClick={this.props.callback}>
        <span>{this.props.buttonText}</span>
      </button>
    );
  }
}

export default Button;

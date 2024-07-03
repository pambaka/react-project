import { Component } from 'react';
import './button.css';

class Button extends Component<{ buttonText: string; callback: () => void }> {
  render() {
    return (
      <button className="button" onClick={this.props.callback}>
        <span>{this.props.buttonText}</span>
      </button>
    );
  }
}

export default Button;

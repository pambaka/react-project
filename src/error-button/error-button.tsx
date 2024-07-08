import { ReactNode } from 'react';
import Button from '../button/button';

class ErrorButton extends Button {
  state = { isButtonPressed: false };

  render(): ReactNode {
    if (this.state.isButtonPressed) throw new Error('This is a fallback UI test');
    else return <Button buttonText="Throw error" callback={() => this.setState({ isButtonPressed: true })}></Button>;
  }
}

export default ErrorButton;

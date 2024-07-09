import { ReactNode, useState } from 'react';
import Button from '../button/button';

function ErrorButton(): ReactNode {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  if (isButtonPressed) throw new Error('This is a fallback UI test');
  else return <Button buttonText="Throw error" callback={() => setIsButtonPressed(true)}></Button>;
}

export default ErrorButton;

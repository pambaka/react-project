import { Component, ErrorInfo, ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`${error.toString()} \n Component Stack: ${errorInfo.componentStack}`);
  }

  render(): ReactNode {
    if (this.state.hasError) return this.props.fallback;

    return this.props.children;
  }
}

export default ErrorBoundary;

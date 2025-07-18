import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary :', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col h-screen bg-cyan-100 text-blue-700 p-4 rounded items-center justify-center">
          <h1 className="text-lg font-bold">Something went wrong.</h1>
          <p>Press the button to try again</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => this.setState({ hasError: false })}
          >
            Restore
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

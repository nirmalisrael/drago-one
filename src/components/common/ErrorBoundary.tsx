import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log error info here if needed
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-6xl font-bold">Oops!</h1>
          <p className="text-2xl">Something went wrong.</p>
          <p className="text-lg">
            Try refreshing the page or contact us if the problem persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

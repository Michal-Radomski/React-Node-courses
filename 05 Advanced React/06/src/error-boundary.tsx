import React from "react";

export class ErrorBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    console.log("error:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log("Error: ", error);
  }

  render() {
    console.log("this.state:", this.state);
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

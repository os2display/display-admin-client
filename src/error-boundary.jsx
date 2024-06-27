import React, { Component } from "react";
import PropTypes from "prop-types";
import "./error-boundary.scss";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { errorHandler = null } = this.props;

    if (errorHandler) {
      errorHandler(error, errorInfo);
    }
  }

  render() {
    const { hasError } = this.state;
    const { errorText } = this.props;

    if (hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-loader">{errorText}</div>
        </div>
      );
    }

    const { children } = this.props;
    return <>{children}</>;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  errorText: PropTypes.string.isRequired,
  errorHandler: PropTypes.func,
};

export default ErrorBoundary;

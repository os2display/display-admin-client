/* eslint-disable react/prop-types */
import React from "react";
import { Spinner } from "react-bootstrap";

/**
 * The loading wrapper
 *
 * @param {object} Component - The component that is wrapped
 * @returns {object} The wrapper component.
 */
function ListLoading(Component) {
  return function WithLoadingComponent({
    isLoading,
    loadingMessage,
    ...props
  }) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    if (!isLoading) return <Component {...props} />;
    return (
      <div className="d-flex m-5 justify-content-center">
        <Spinner animation="border" className="m-2" />
        {loadingMessage && <h2 className="m-2">{loadingMessage}</h2>}
      </div>
    );
  };
}

export default ListLoading;

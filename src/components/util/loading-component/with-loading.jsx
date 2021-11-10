/* eslint-disable react/prop-types */
import React from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

/**
 * The loading wrapper
 *
 * @param {object} Component - The component that is wrapped
 * @returns {object} The wrapper component.
 */
function WithLoading(Component) {
  return function WithLoadingComponent({
    isLoading,
    loadingMessage,
    ...props
  }) {
    const { t } = useTranslation("common");
    // eslint-disable-next-line react/jsx-props-no-spreading
    if (!isLoading) return <Component {...props} />;
    return (
      <div className="d-flex m-5 justify-content-center">
        <Spinner animation="border" className="mr-3" />
        <h2>{loadingMessage || t("with-loading.loading-data-message")}</h2>
      </div>
    );
  };
}

export default WithLoading;

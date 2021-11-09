import React from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";


function WithLoading(Component) {
  return function WithLoadingComponent({ isLoading, loadingMessage, ...props }) {
    const { t } = useTranslation("common");
    if (!isLoading) return <Component {...props} />;
    return (
      <div className="d-flex m-5">
        <Spinner animation="border" className="mr-3" />
        <h2>{loadingMessage?loadingMessage : t("with-loading.loading-data-message")}</h2>
      </div>
    );
  };
}
export default WithLoading;

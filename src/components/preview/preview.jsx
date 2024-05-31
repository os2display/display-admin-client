import { React, JSX, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

/**
 * The preview component.
 *
 * @param {object} props The props.
 * @param {string} props.id The id to preview.
 * @param {string} props.mode The mode: screen, playlist, slide
 * @returns {JSX.Element} The preview component
 */
function Preview({ id, mode }) {
  const { t } = useTranslation("common", { keyPrefix: "preview" });

  const [previewClientUrl, setPreviewClientUrl] = useState(null);

  useEffect(() => {
    // TODO: Get base from config.
    const base = "https://display-client.local.itkdev.dk/";

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("preview", mode);
    urlSearchParams.set("preview-id", id);
    urlSearchParams.set("preview-token", localStorage.getItem("api-token"));
    const tenantEntry = localStorage.getItem("selected-tenant");
    urlSearchParams.set("preview-tenant", JSON.parse(tenantEntry).tenantKey);

    setPreviewClientUrl(`${base}?${urlSearchParams}`);
  }, []);

  return (
    <>
      {typeof previewClientUrl === "string" && (
        <div style={{ width: "960px", height: "540px", overflow: "hidden" }}>
          <iframe
            title={t("preview-title")}
            src={previewClientUrl}
            style={{
              transform: "scale(.5)",
              height: "1080px",
              width: "1920px",
              left: 0,
              transformOrigin: "0 0",
            }}
          />
        </div>
      )}
    </>
  );
}

Preview.propTypes = {
  id: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
};

export default Preview;

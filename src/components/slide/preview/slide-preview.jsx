import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import idFromUrl from "../../util/helpers/id-from-url";
import {
  api,
  useGetV1SlidesByIdQuery,
  useGetV1TemplatesByIdQuery,
} from "../../../redux/api/api.generated";
import { displayError } from "../../util/list/toast-component/display-toast";
import RemoteComponentWrapper from "./remote-component-wrapper";
import LoadingComponent from "../../util/loading-component/loading-component";
import "./slide-preview.scss";

/**
 * Slide preview
 *
 * @returns {object} The slide preview
 */
function SlidePreview() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [resources, setResources] = useState();
  const [content, setContent] = useState();
  const [mediaData, setMediaData] = useState();
  const { id, templateId } = useParams();
  const {
    data,
    error: loadingError,
    isLoading,
  } = useGetV1SlidesByIdQuery({ id });

  const {
    data: templateData,
    error: loadingTemplateError,
    isLoadingTemplate,
  } = useGetV1TemplatesByIdQuery({
    id: templateId,
  });

  useEffect(() => {
    if (loadingTemplateError) {
      displayError(
        t("slide-preview.error-messages.loading-template-error", {
          error: loadingTemplateError.data
            ? loadingTemplateError.data["hydra:description"]
            : loadingTemplateError.error,
        })
      );
    }
  }, [loadingTemplateError]);

  useEffect(() => {
    if (loadingError) {
      displayError(
        t("slide-preview.error-messages.loading-content-error", {
          error: loadingError.data
            ? loadingError.data["hydra:description"]
            : loadingError.error,
        })
      );
    }
  }, [loadingError]);

  useEffect(() => {
    if (data) {
      setContent(data);
      // Upload media already added to the slide.
      const promises = [];

      data.media.forEach((media) => {
        promises.push(
          dispatch(
            api.endpoints.getV1MediaById.initiate({ id: idFromUrl(media) })
          )
        );
      });

      Promise.all(promises).then((results) => {
        const newMediaData = {};

        results.forEach((result) => {
          newMediaData[result.data["@id"]] = { ...result.data };
        });

        setMediaData(newMediaData);
      });
    }
  }, [data]);

  useEffect(() => {
    if (templateData) {
      setResources(templateData.resources);
    }
  }, [templateData]);

  return (
    <>
      <LoadingComponent
        isLoading={isLoading || isLoadingTemplate}
        loadingMessage={t("slide-preview.loading-messages.loading")}
      />
      {content && resources && mediaData && (
        <RemoteComponentWrapper
          url={resources?.component}
          slide={content}
          showPreview
          mediaData={mediaData}
          displayHeader={false}
        />
      )}
    </>
  );
}

export default SlidePreview;

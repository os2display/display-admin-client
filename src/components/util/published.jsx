import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import localeDa from "dayjs/locale/da";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTranslation } from "react-i18next";
import {
  calculateIsPublished,
  currentlyPlaying,
  willPlayInTheFuture,
} from "./helpers/published-helper";
/**
 * @param {object} props The props.
 * @param {object} props.published Object with from and to.
 * @returns {object} The published yes/no component.
 */
function Published({ published }) {
  const { t } = useTranslation("common", { keyPrefix: "published" });
  const [isPublished, setIsPublished] = useState(false);
  const [publishedStyleClass, setPublishedStyleClass] = useState("");

  useEffect(() => {
    dayjs.extend(localizedFormat);
  }, []);

  useEffect(() => {
    const isPlaylistPublished = calculateIsPublished(published);
    setIsPublished(isPlaylistPublished);

    if (!currentlyPlaying(published) && !willPlayInTheFuture(published)) {
      setPublishedStyleClass("text-muted");
    }
  }, [published]);

  if (!published.from && !published.to) {
    return (
      <div className={publishedStyleClass}>
        {isPublished ? t("yes") : t("no")}
      </div>
    );
  }

  let publishedFrom = "-";
  let publishedTo = "-";

  if (published.from) {
    publishedFrom = dayjs(published.from).locale(localeDa).format("LLLL");
  }

  if (published.to) {
    publishedTo = dayjs(published.to).locale(localeDa).format("LLLL");
  }

  return (
    <>
      <div className={publishedStyleClass}>
        {t("from")}: {publishedFrom}
      </div>
      <div className={publishedStyleClass}>
        {t("to")}: {publishedTo}
      </div>
    </>
  );
}

Published.propTypes = {
  published: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
};

export default Published;

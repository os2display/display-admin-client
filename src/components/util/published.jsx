import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

/**
 * @param {object} props The props.
 * @param {object} props.published Object with from and to.
 * @returns {object} The published yes/no component.
 */
function Published({ published }) {
  const { t } = useTranslation("common");
  const [isPublished, setIsPublished] = useState(false);

  /**
   * Check published state.
   *
   * @param {object} publishedState - The published state.
   * @returns {boolean} - Published true/false.
   */
  function calculateIsPublished(publishedState) {
    const now = dayjs(new Date());
    const from = publishedState?.from ? dayjs(publishedState.from) : null;
    const to = publishedState?.to ? dayjs(publishedState.to) : null;

    if (from !== null && to !== null) {
      return now.isAfter(from) && now.isBefore(to);
    }
    if (from !== null && to === null) {
      return now.isAfter(from);
    }
    if (from === null && to !== null) {
      return now.isBefore(to);
    }
    return true;
  }

  useEffect(() => {
    setIsPublished(calculateIsPublished(published));
  }, [published]);

  return <div>{isPublished ? t("published.yes") : t("published.no")}</div>;
}

Published.propTypes = {
  published: PropTypes.shape({
    from: PropTypes.number,
    to: PropTypes.number,
  }).isRequired,
};

export default Published;

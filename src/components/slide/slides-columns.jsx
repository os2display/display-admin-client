import { React } from "react";
import { useTranslation } from "react-i18next";
import TemplateLabelInList from "../util/template-label-in-list";
import ListButton from "../util/list/list-button";
import Published from "../util/published";
import ColumnHoc from "../util/column-hoc";
import SelectColumnHoc from "../util/select-column-hoc";

/**
 * Columns for slides lists.
 *
 * @param {object} props - The props.
 * @param {Function} props.listButtonCallback - The callback for getting data in
 *   the list button
 * @returns {object} The columns for the slides lists.
 */
function getSlidesColumns({ listButtonCallback }) {
  const { t } = useTranslation("common", { keyPrefix: "slides-list" });

  const columns = [
    {
      // eslint-disable-next-line react/prop-types
      content: ({ templateInfo }) => (
        <TemplateLabelInList templateInfo={templateInfo} />
      ),
      key: "template",
      label: t("columns.template"),
    },
    {
      key: "playlists",
      // eslint-disable-next-line react/prop-types
      content: ({ onPlaylists }) => (
        <ListButton
          callback={() => listButtonCallback(onPlaylists)}
          inputData={onPlaylists}
        />
      ),
      label: t("columns.slide-on-playlists"),
    },
    {
      key: "published",
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
      label: t("columns.published"),
    },
  ];

  return columns;
}

const SlideColumns = ColumnHoc(getSlidesColumns);
const SelectSlideColumns = SelectColumnHoc(getSlidesColumns);

export { SelectSlideColumns, SlideColumns };

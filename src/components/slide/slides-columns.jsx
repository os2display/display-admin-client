import { React } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import TemplateLabelInList from "../util/template-label-in-list";
import ListButton from "../util/list/list-button";
import ColumnHoc from "../util/column-hoc";
import SelectColumnHoc from "../util/select-column-hoc";
import PublishingStatus from "../util/publishingStatus";
import DateValue from "../util/date-value";

/**
 * Columns for slides lists.
 *
 * @param {object} props - The props.
 * @param {Function} props.apiCall - The api to call
 * @param {string} props.infoModalRedirect - The url for redirecting in the info modal.
 * @param {string} props.infoModalTitle - The info modal title.
 * @param {string} props.dataKey The data key for mapping the data. the list button
 * @param {object} props.hideColumns Columns to hide.
 * @param {object} props.sortColumns Columns to sort.
 * @returns {object} The columns for the slides lists.
 */
function getSlidesColumns({
  apiCall,
  infoModalRedirect,
  infoModalTitle,
  dataKey,
  hideColumns = {},
  sortColumns = {},
}) {
  const { t } = useTranslation("common", { keyPrefix: "slides-list" });

  const columns = [];

  if (!hideColumns?.title) {
    columns.push({
      path: "title",
      label: t("columns.name"),
    });
  }

  if (!hideColumns?.createdBy) {
    columns.push({
      path: "createdBy",
      label: t("columns.created-by"),
    });
  }

  if (!hideColumns?.template) {
    columns.push({
      // eslint-disable-next-line react/prop-types
      content: ({ templateInfo }) => (
        <TemplateLabelInList templateInfo={templateInfo} />
      ),
      key: "template",
      label: t("columns.template"),
    });
  }

  if (!hideColumns?.playlists) {
    columns.push({
      key: "playlists",
      // eslint-disable-next-line react/prop-types
      content: ({ onPlaylists }) => (
        <ListButton
          apiCall={apiCall}
          redirectTo={infoModalRedirect}
          displayData={onPlaylists}
          modalTitle={infoModalTitle}
          dataKey={dataKey}
        />
      ),
      label: t("columns.slide-on-playlists"),
    });
  }

  if (!hideColumns?.publishingFrom) {
    columns.push({
      key: "publishing-from",
      content: ({ published }) => <DateValue date={published.from} />,
      label: t("columns.publishing-from"),
    });
  }

  if (!hideColumns?.publishingTo) {
    columns.push({
      key: "publishing-to",
      content: ({ published }) => <DateValue date={published.to} />,
      label: t("columns.publishing-to"),
      actions: sortColumns.publishedTo ? (
        <Button
          type="button"
          className=" btn-sm ms-2 p-0 ps-1 pe-1 btn-secondary"
          onClick={sortColumns.publishedTo}
        >
          ↓
        </Button>
      ) : null,
    });
  }

  if (!hideColumns?.status) {
    columns.push({
      key: "status",
      content: ({ published }) => <PublishingStatus published={published} />,
      label: t("columns.status"),
      actions: sortColumns.status ? (
        <Button
          type="button"
          className=" btn-sm ms-2 p-0 ps-1 pe-1 btn-secondary"
          onClick={sortColumns.status}
        >
          ↓
        </Button>
      ) : null,
    });
  }

  return columns;
}

const SlideColumns = ColumnHoc(getSlidesColumns, true);
const SelectSlideColumns = SelectColumnHoc(getSlidesColumns, true);

export { SelectSlideColumns, SlideColumns };

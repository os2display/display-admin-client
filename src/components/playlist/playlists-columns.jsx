import { React, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import UserContext from "../../context/user-context";
import ListButton from "../util/list/list-button";
import CheckboxForList from "../util/list/checkbox-for-list";
import Published from "../util/published";
import LinkForList from "../util/list/link-for-list";

/**
 * Columns for playlists lists.
 *
 * @param {object} props - The props.
 * @param {boolean} props.editNewTab - Open edit dialog in new tab.
 * @param {Function} props.listButtonCallback - The callback for getting data in
 * @param {Function} props.apiCall - The api to call
 * @param {Function} props.selectedRows Rows that are selected for deletion
 * @param {Function} props.handleSelected Callback on selected
 * @param {Function} props.handleDelete Callback on delete
 * @returns {object} The columns for the playlists lists.
 */
function getPlaylistColumns({
  editNewTab,
  listButtonCallback,
  apiCall,
  selectedRows,
  handleSelected,
  handleDelete,
}) {
  const context = useContext(UserContext);

  const { t } = useTranslation("common", {
    keyPrefix: "playlists-columns",
  });

  const columns = [
    {
      key: "pick",
      render: () => {
        return false;
      },
      content: (d) => (
        <CheckboxForList
          selected={selectedRows.indexOf(d) > -1}
          onSelected={() => handleSelected(d)}
        />
      ),
    },
    {
      path: "title",
      label: t("name"),
    },
    {
      path: "createdBy",
      label: t("created-by"),
    },
    {
      path: "published",
      label: t("published"),
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
    },
    {
      key: "slides",
      label: t("number-of-slides"),
      render: ({ tenants }) => {
        return tenants.find(
          (tenant) => tenant.tenantKey === context.selectedTenant.get.tenantKey
        );
      },
      // eslint-disable-next-line react/prop-types
      content: ({ slides }) => (
        <ListButton
          callback={listButtonCallback}
          inputData={slides}
          apiCall={apiCall}
        />
      ),
    },
    {
      key: "edit",
      render: ({ tenants }) => {
        return tenants.find(
          (tenant) => tenant.tenantKey === context.selectedTenant.get.tenantKey
        );
      },
      // eslint-disable-next-line react/prop-types
      content: ({ "@id": id }) => (
        <LinkForList id={id} param="playlist/edit" targetBlank={editNewTab} />
      ),
    },
    {
      key: "delete",
      content: (d) => (
        <Button
          disabled={selectedRows.length > 0}
          variant="danger"
          className="remove-from-list"
          onClick={() => handleDelete(d)}
        >
          {t("delete-button")}
        </Button>
      ),
    },
  ];

  return columns;
}

export default getPlaylistColumns;

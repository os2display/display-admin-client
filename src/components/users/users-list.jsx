import { React, useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import List from "../util/list/list";
import ListContext from "../../context/list-context";
import UserContext from "../../context/user-context";
import useModal from "../../context/modal-context/modal-context-hook";
import { UserColumns } from "./user-columns";
import ContentBody from "../util/content-body/content-body";
import idFromUrl from "../util/helpers/id-from-url";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import {
  useDeleteV1UsersByIdMutation,
  useGetV1UsersQuery,
} from "../../redux/api/api.generated";

/**
 * The users list component.
 *
 * @returns {object} The users list.
 */
function UsersList() {
  const { t } = useTranslation("common", { keyPrefix: "users-list" });
  const { selected, setSelected } = useModal();
  const {
    searchText: { get: searchText },
    page: { get: page },
    createdBy: { get: createdBy },
  } = useContext(ListContext);
  const context = useContext(UserContext);

  // Local state
  const [isDeleting, setIsDeleting] = useState(false);
  const [listData, setListData] = useState();
  const [loadingMessage, setLoadingMessage] = useState(
    t("loading-messages.loading-users")
  );
  const [items, setItems] = useState([]);

  // Delete call
  const [DeleteV1User, { isSuccess: isDeleteSuccess, error: isDeleteError }] =
    useDeleteV1UsersByIdMutation();

  // Get method
  const {
    data,
    error: usersGetError,
    isLoading,
    refetch,
  } = useGetV1UsersQuery({
    page,
    order: { createdAt: "desc" },
    fullName: searchText,
    createdBy,
  });

  useEffect(() => {
    if (data) {
      setListData(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [searchText, page, createdBy]);

  /** Deletes multiple users. */
  useEffect(() => {
    if (isDeleting && selected.length > 0) {
      const userToDelete = selected[0];
      setSelected(selected.slice(1));
      const userToDeleteId = idFromUrl(userToDelete.id);
      DeleteV1User({ id: userToDeleteId });
    }
  }, [isDeleting, isDeleteSuccess]);

  // Sets success messages in local storage, because the page is reloaded
  useEffect(() => {
    if (isDeleteSuccess && selected.length === 0) {
      displaySuccess(t("success-messages.user-delete"));
      refetch();
      setIsDeleting(false);
    }
  }, [isDeleteSuccess]);

  // If the tenant is changed, data should be refetched
  useEffect(() => {
    if (context.selectedTenant.get) {
      refetch();
    }
  }, [context.selectedTenant.get]);

  // Display error on unsuccessful deletion
  useEffect(() => {
    if (isDeleteError) {
      setIsDeleting(false);
      displayError(t("error-messages.user-delete-error"), isDeleteError);
    }
  }, [isDeleteError]);

  /** Starts the deletion process. */
  const handleDelete = () => {
    setIsDeleting(true);
    setLoadingMessage(t("loading-messages.deleting-user"));
  };

  // Error with retrieving list of users
  useEffect(() => {
    if (usersGetError) {
      displayError(t("error-messages.users-load-error"), usersGetError);
    }
  }, [usersGetError]);

  // The columns for the table.
  const columns = UserColumns({ handleDelete });

  useEffect(() => {
    if (listData) {
      // Set title from fullName, for use with delete modal.
      const newItems = [...(listData["hydra:member"] ?? [])].map((el) => {
        return {
          ...el,
          title: el.fullName,
        };
      });

      setItems(newItems);
    }
  }, [listData]);

  return (
    <>
      <Row className="align-items-center justify-content-between my-3">
        <Col>
          <h1>{t("header")}</h1>
        </Col>
      </Row>
      <ContentBody>
        <>
          {listData && (
            <List
              columns={columns}
              totalItems={listData["hydra:totalItems"]}
              data={items}
              handleDelete={handleDelete}
              deleteSuccess={isDeleteSuccess || false}
              isLoading={isLoading || isDeleting}
              loadingMessage={loadingMessage}
              showCreatedByFilter={false}
              displaySearch={false}
            />
          )}
        </>
      </ContentBody>
    </>
  );
}

export default UsersList;

import { React, useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import List from "../util/list/list";
import ListContext from "../../context/list-context";
import UserContext from "../../context/user-context";
import useModal from "../../context/modal-context/modal-context-hook";
import { SelectActivationCodeColumns, ActivationCodeColumns } from "./activation-code-columns";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import idFromUrl from "../util/helpers/id-from-url";
import {
  displaySuccess,
  displayError,
} from "../util/list/toast-component/display-toast";
import {
  api,
  useDeleteExternalUserActivationCodeItemMutation,
  useDeleteV1ExternalUsersByIdMutation, useGetExternalUserActivationCodeCollectionQuery, useGetV1ExternalUsersQuery
} from "../../redux/api/api.generated";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

/**
 * The Activation Code list component.
 *
 * @returns {object} The users list.
 */
function ActivationCodeList() {
  const { t } = useTranslation("common", { keyPrefix: "activation-code-list" });
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

  // Delete call
  const [
    DeleteV1ExternalUser,
    { isSuccess: isDeleteSuccess, error: isDeleteError },
  ] = useDeleteExternalUserActivationCodeItemMutation();

  // Get method
  const {
    data,
    error: usersGetError,
    isLoading,
    refetch,
  } = useGetExternalUserActivationCodeCollectionQuery({
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
      DeleteV1ExternalUser({ id: userToDeleteId });
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

  const dispatch = useDispatch();

  const refreshCallback = (id) => {
    dispatch(
      api.endpoints.postV1ExternalUserActivationCodesByIdRefreshCode.initiate({
        id,
        externalUserActivationCode: JSON.stringify({}),
      })
    )
      .then((response) => {
        if (response.data) {
          refetch();
        }
      })
      .catch((err) => {
        setError(true);
        displayError(t("error-refreshing-code"), err);
      });
  };

  // The columns for the table.
  const columns = ActivationCodeColumns({ handleDelete });

  columns.push({
    path: '@id',
    dataFunction: (id) => {
      const activationCodeId = idFromUrl(id);

      return <Button
        variant="primary"
        className="refresh-activation-code"
        onClick={() => refreshCallback(activationCodeId)}
      >
        {t("refresh-button")}
      </Button>
    },
    label: ""
  });

  return (
    <>
      <ContentHeader
        title={t("header")}
        newBtnTitle={t("create-activation-codes")}
        newBtnLink="/activation/create"
      />
      <ContentBody>
        <>
          {listData && (
            <List
              columns={columns}
              totalItems={listData["hydra:totalItems"]}
              data={listData["hydra:member"]}
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

export default ActivationCodeList;

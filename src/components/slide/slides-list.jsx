import { React, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CheckboxForList from "../util/list/checkbox-for-list";
import List from "../util/list/list";
import idFromUrl from "../util/helpers/id-from-url";
import selectedHelper from "../util/helpers/selectedHelper";
import DeleteModal from "../delete-modal/delete-modal";
import InfoModal from "../info-modal/info-modal";
import Published from "./published";
import LinkForList from "../util/list/link-for-list";
import ListButton from "../util/list/list-button";
import ContentHeader from "../util/content-header/content-header";
import ContentBody from "../util/content-body/content-body";
import TemplateLabelInList from "./template-label-in-list";
import {
  useGetV1SlidesQuery,
  useDeleteV1SlidesByIdMutation,
  useGetV1PlaylistsByIdQuery,
} from "../../redux/api/api.generated";
import { displayError,displaySuccess} from "../util/list/toast-component/display-toast";

/**
 * The slides list component.
 *
 * @returns {object} The slides list
 */
function SlidesList() {
  const { t } = useTranslation("common");

  // Local state
  const [isDeleting, setIsDeleting] = useState(false);
  const [slides, setSlides] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    t("slides-list.loading-messages.loading-slides")
  );
  const [sortBy, setSortBy] = useState();
  const [deletingSlideTitle, setDeletingSlideTitle] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [onPlaylists, setOnPlaylists] = useState();
  const [page, setPage] = useState();
  const [isPublished, setIsPublished] = useState();
  const [slidesToDelete, setSlidesToDelete] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [searchText, setSearchText] = useState();

  const {
    data,
    error: slidesGetError,
    isLoading,
  } = useGetV1SlidesQuery({
    page,
    orderBy: sortBy?.path,
    order: sortBy?.order,
    title: searchText,
    published: isPublished,
  });

  // Delete call
  const [DeleteV1Slides, { isSuccess: isDeleteSuccess, error: deleteError }] =
    useDeleteV1SlidesByIdMutation();

  /** Deletes multiple slides. */
  useEffect(() => {
    if (slidesToDelete.length > 0) {
      setIsDeleting(true);
      const slideToDelete = slidesToDelete.splice(0, 1).shift();
      const slideToDeleteId = idFromUrl(slideToDelete["@id"]);
      setDeletingSlideTitle(slideToDelete.title);
      setLoadingMessage(
        t("slides-list.loading-messages.deleting-slide", {
          title: slideToDelete.title,
        })
      );
      DeleteV1Slides({ id: slideToDeleteId });
    } else if (isDeleteSuccess) {
      setIsDeleting(false);
      setPage(0)
      displaySuccess(t("slides-list.success-messages.slide-delete", {title:deletingSlideTitle}))
    }
  }, [slidesToDelete, isDeleteSuccess]);

  useEffect(() => {
    if (deleteError) {
      setIsDeleting(false);
      displayError(
        t("slides-list.error-messages.slide-delete-error", {
          title: deletingSlideTitle,
          error: deleteError.error
            ? deleteError.error
            : deleteError.data["hydra:description"],
        })
      );
    }
  }, [deleteError]);

  useEffect(() => {
    if (data) {
      console.log(data)
      setSlides(data["hydra:member"]);
    }
  }, [data]);

  /**
   * Sets the selected row in state.
   *
   * @param {object} data The selected row.
   */
  function handleSelected(data) {
    setSelectedRows(selectedHelper(data, [...selectedRows]));
  }

  /** Clears the selected rows. */
  function clearSelectedRows() {
    setSelectedRows([]);
  }

  /**
   * Opens the delete modal
   *
   * @param {object} item The item to delete
   */
  function openDeleteModal(item) {
    if (item) {
      setSelectedRows([{ "@id": item["@id"], title: item.title }]);
    }
    setShowDeleteModal(true);
  }

  /** Deletes slide(s), and closes modal. */
  function handleDelete() {
    setSlidesToDelete(selectedRows);
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /** Closes the delete modal. */
  function onCloseDeleteModal() {
    clearSelectedRows();
    setShowDeleteModal(false);
  }

  /** @param {Array} playlistData The array of playlists. */
  function openInfoModal(playlistData) {
    setOnPlaylists(playlistData);
    setShowInfoModal(true);
  }

  /** Closes the info modal. */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setOnPlaylists();
  }

  /**
   * Sets next page.
   *
   * @param {number} pageNumber - The next page.
   */
  function onChangePage(pageNumber) {
    setPage(pageNumber);
  }

  /**
   * Sets is published
   *
   * @param {number} localIsPublished - Whether the slide is published.
   */
  function onIsPublished(localIsPublished) {
    if (localIsPublished === "all") {
      setIsPublished(undefined);
    } else {
      setIsPublished(localIsPublished === "published");
    }
  }

  /**
   * Handles sort.
   *
   * @param {object} localSortBy - How the data should be sorted.
   */
  function onChangeSort(localSortBy) {
    setSortBy(localSortBy);
  }

  /**
   * Handles search.
   *
   * @param {object} localSearchText - The search text.
   */
  function onSearch(localSearchText) {
    setSearchText(localSearchText);
  }

  // The columns for the table.
  const columns = [
    {
      key: "pick",
      label: t("slides-list.columns.pick"),
      content: (data) => (
        <CheckboxForList
          onSelected={() => handleSelected(data)}
          selected={selectedRows.indexOf(data) > -1}
        />
      ),
    },
    {
      path: "title",
      sort: true,
      label: t("slides-list.columns.name"),
    },
    {
      // eslint-disable-next-line react/prop-types
      content: ({ templateInfo }) => (
        <TemplateLabelInList templateInfo={templateInfo} />
      ),
      key: "template",
      label: t("slides-list.columns.template"),
    },
    {
      key: "playlists",
      // eslint-disable-next-line react/prop-types
      content: ({ onPlaylists: localOnPlaylists }) => (
        <ListButton callback={openInfoModal} inputData={localOnPlaylists} />
      ),
      label: t("slides-list.columns.slide-on-playlists"),
    },
    {
      key: "published",
      // eslint-disable-next-line react/prop-types
      content: ({ published }) => <Published published={published} />,
      label: t("slides-list.columns.published"),
    },
    {
      key: "edit",
      content: (data) =>
        LinkForList(data["@id"], "slide/edit", t("slides-list.edit-button")),
    },
    {
      key: "delete",
      content: (data) => (
        <Button
          variant="danger"
          disabled={selectedRows.length > 0}
          onClick={() => openDeleteModal(data)}
        >
          {t("slides-list.delete-button")}
        </Button>
      ),
    },
  ];

  return (
    <>
      <ContentHeader
        title={t("slides-list.header")}
        newBtnTitle={t("slides-list.create-new-slide")}
        newBtnLink="/slide/create"
      />
      {slides.length > 0 && (
        <ContentBody>
          <List
            columns={columns}
            totalItems={data["hydra:totalItems"]}
            currentPage={page}
            handlePageChange={onChangePage}
            selectedRows={selectedRows}
            data={slides}
            clearSelectedRows={clearSelectedRows}
            handleDelete={openDeleteModal}
            error={slidesGetError || false}
            isLoading={isLoading || isDeleting}
            loadingMessage={loadingMessage}
            handleSort={onChangeSort}
            handleSearch={onSearch}
            handleIsPublished={onIsPublished}
            displayPublished
          />
        </ContentBody>
      )}
      <DeleteModal
        show={showDeleteModal}
        onClose={onCloseDeleteModal}
        handleAccept={handleDelete}
        selectedRows={selectedRows}
      />
      <InfoModal
        show={showInfoModal}
        apiCall={useGetV1PlaylistsByIdQuery}
        onClose={onCloseInfoModal}
        dataStructureToDisplay={onPlaylists}
        modalTitle={t("slides-list.info-modal.slide-on-playlists")}
      />
    </>
  );
}

export default SlidesList;

import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import ModalDialog from "../util/modal/modal-dialog";
import TitleFetcher from "./title-fetcher";
import idFromUrl from "../util/helpers/id-from-url";
/**
 * Info modal component, that displays an info string.
 *
 * @param {object} props Props.
 * @param {boolean} props.show Whether to show the modal.
 * @param {Function} props.onClose Callback on close modal.
 * @param {Function} props.apiCall ApiCall for data.
 * @param {Array} props.dataStructureToDisplay The playlists to list.
 * @param {string} props.modalTitle The info modal string.
 * @param {string} props.dataKey The data key for mapping the data.
 * @returns {object} The modal.
 */
function InfoModal({
  show,
  onClose,
  apiCall,
  dataStructureToDisplay,
  modalTitle,
  dataKey,
}) {
  if (!show) {
    return <></>;
  }
  const { t } = useTranslation("common");
  const paginationVariables = 5;
  const [totalItems, setTotalItems] = useState(dataStructureToDisplay.length);
  const [paginatedDataStructure, setPaginatedDataStructure] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [page, setPage] = useState(1);
  let data;
  if (!Array.isArray(dataStructureToDisplay)) {
    data = apiCall({
      id: idFromUrl(dataStructureToDisplay),
      page,
      itemsPerPage: 5,
    });
  }

  useEffect(() => {
    if (Array.isArray(dataStructureToDisplay)) {
      setPaginatedDataStructure(
        dataStructureToDisplay.slice(0, page * paginationVariables)
      );
      setTotalItems(dataStructureToDisplay.length);
    }
  }, []);

  /** Set loaded data into form state. */
  useEffect(() => {
    if (data?.data) {
      const mappedData = [
        ...(fetchedData || []),
        ...data.data["hydra:member"].map((item) => {
          return dataKey ? item[dataKey] : item;
        }),
      ];
      setFetchedData(mappedData);
      setTotalItems(data.data["hydra:totalItems"]);
    }
  }, [data]);

  /** Displays more list entries. */
  function displayMore() {
    setPage(page + 1);
    if (Array.isArray(dataStructureToDisplay)) {
      let dataStructureToDisplayCopy = dataStructureToDisplay;
      dataStructureToDisplayCopy = dataStructureToDisplayCopy.slice(
        0,
        page * paginationVariables
      );
      setPaginatedDataStructure(dataStructureToDisplayCopy);
    }
  }

  return (
    <Modal animation={false} show size="m" onHide={onClose} id="info-modal">
      <ModalDialog
        title={modalTitle}
        onClose={onClose}
        showAcceptButton={false}
        declineText={t("info-modal.decline-text")}
      >
        <ul>
          <>
            {paginatedDataStructure &&
              paginatedDataStructure.map((item) => (
                <TitleFetcher apiCall={apiCall} dataUrl={item} key={item} />
              ))}
            {fetchedData &&
              fetchedData.map((item) => <li key={item.title}>{item.title}</li>)}
          </>
        </ul>
        {page * paginationVariables < totalItems && (
          <Button variant="primary" onClick={() => displayMore()}>
            {t("info-modal.show-more-elements")}
          </Button>
        )}
      </ModalDialog>
    </Modal>
  );
}
InfoModal.defaultProps = {
  dataStructureToDisplay: [],
  dataKey: "",
};

InfoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  dataStructureToDisplay: PropTypes.oneOfType(
    PropTypes.shape({}),
    PropTypes.string
  ),
  apiCall: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  dataKey: PropTypes.string,
};

export default InfoModal;

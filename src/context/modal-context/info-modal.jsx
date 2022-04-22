import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalDialog from "../../components/util/modal/modal-dialog";
import TitleFetcher from "./title-fetcher";
import idFromUrl from "../../components/util/helpers/id-from-url";

/**
 * Info modal component, that displays an info string.
 *
 * @param {object} props Props.
 * @param {Function} props.unSetModal - Close the modal.
 * @param {Function} props.apiCall ApiCall for data.
 * @param {Array} props.displayData The playlists to list.
 * @param {string} props.modalTitle The info modal string.
 * @param {string} props.dataKey The data key for mapping the data.
 * @param {string} props.redirectTo Redirect link to.
 * @returns {object} The modal.
 */
function InfoModal({
  unSetModal,
  apiCall,
  displayData,
  modalTitle,
  dataKey,
  redirectTo,
}) {
  const { t } = useTranslation("common");
  const paginationVariables = 5;
  const [totalItems, setTotalItems] = useState(displayData.length);
  const [paginatedDataStructure, setPaginatedDataStructure] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [page, setPage] = useState(1);
  let data;
  if (!Array.isArray(displayData)) {
    data = apiCall({
      id: idFromUrl(displayData),
      page,
      itemsPerPage: 5,
    });
  }

  useEffect(() => {
    if (Array.isArray(displayData)) {
      setPaginatedDataStructure(
        displayData.slice(0, page * paginationVariables)
      );
      setTotalItems(displayData.length);
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
    if (Array.isArray(displayData)) {
      let displayDataCopy = displayData;
      displayDataCopy = displayDataCopy.slice(0, page * paginationVariables);
      setPaginatedDataStructure(displayDataCopy);
    }
  }

  return (
    <Modal animation={false} show size="m" onHide={unSetModal} id="info-modal">
      <ModalDialog
        title={modalTitle}
        onClose={unSetModal}
        showAcceptButton={false}
        declineText={t("info-modal.decline-text")}
      >
        <ul>
          <>
            {paginatedDataStructure &&
              paginatedDataStructure.map((item) => (
                <TitleFetcher
                  redirectTo={redirectTo}
                  apiCall={apiCall}
                  dataUrl={item}
                  key={item}
                />
              ))}
            {fetchedData &&
              fetchedData.map((item) => (
                <li key={item["@id"]}>
                  <Link
                    to={`${redirectTo}/${idFromUrl(item["@id"])}`}
                    target="_blank"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
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
  displayData: [],
  dataKey: "",
};

InfoModal.propTypes = {
  displayData: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  apiCall: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  dataKey: PropTypes.string,
  redirectTo: PropTypes.string.isRequired,
  unSetModal: PropTypes.func.isRequired,
};

export default InfoModal;

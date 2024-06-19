import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
  displayData = [],
  modalTitle,
  dataKey = "",
  redirectTo,
}) {
  const { t } = useTranslation("common");
  const [fetchedData, setFetchedData] = useState([]);
  let data;
  if (!Array.isArray(displayData)) {
    data = apiCall({
      id: idFromUrl(displayData),
      itemsPerPage: 30,
    });
  }

  /** Set loaded data into form state. */
  useEffect(() => {
    if (data?.data) {
      const mappedData = data.data["hydra:member"].map((item) => {
        return dataKey ? item[dataKey] : item;
      });

      setFetchedData(mappedData);
    }
  }, [data]);

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
            {Array.isArray(displayData) &&
              displayData.map((displayItem) => (
                <TitleFetcher
                  redirectTo={redirectTo}
                  apiCall={apiCall}
                  dataUrl={displayItem}
                  key={displayItem}
                />
              ))}
            {fetchedData.map((item) => (
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
      </ModalDialog>
    </Modal>
  );
}

InfoModal.propTypes = {
  displayData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  apiCall: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  dataKey: PropTypes.string,
  redirectTo: PropTypes.string.isRequired,
  unSetModal: PropTypes.func.isRequired,
};

export default InfoModal;

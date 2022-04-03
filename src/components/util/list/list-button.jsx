import { React, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import idFromUrl from "../helpers/id-from-url";
import useModal from "../../../context/modal-context/modal-context-hook";
/**
 * @param {object} props - The props.
 * @param {Function} props.apiCall - The api to call
 * @param {Array | string} props.displayData - Either an array of data, or an
 *   url for getting data.
 * @param {string} props.redirectTo - The url for redirecting in the info modal.
 * @param {string} props.modalTitle - The info modal title.
 * @param {string} props.dataKey The data key for mapping the data.
 * @returns {object} - The list button.
 */
function ListButton({ apiCall, redirectTo, displayData, modalTitle, dataKey }) {
  const { setModal } = useModal();
  const [label, setLabel] = useState("");
  let data;
  if (!Array.isArray(displayData)) {
    data = apiCall({
      id: idFromUrl(displayData),
      page: 1,
      itemsPerPage: 0,
    });
  }

  useEffect(() => {
    if (Array.isArray(displayData)) {
      setLabel(displayData.length.toString());
    }
    return () => {
      setLabel("");
    };
  }, []);

  /** Set label. */
  useEffect(() => {
    if (data?.data) {
      setLabel(data.data["hydra:totalItems"].toString());
    }
    return () => {
      setLabel("");
    };
  }, [data]);

  return (
    <>
      {label && (
        <button
          className="btn btn-secondary list-button"
          type="button"
          disabled={label === "0"}
          onClick={() =>
            setModal({
              info: true,
              redirectTo,
              apiCall,
              displayData,
              modalTitle,
              dataKey,
            })
          }
        >
          {label}
        </button>
      )}
      {!label && (
        <div style={{ height: "38px" }}>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
        </div>
      )}
    </>
  );
}

ListButton.defaultProps = {
  apiCall: () => {},
  dataKey: "",
};

ListButton.propTypes = {
  displayData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any).isRequired,
    PropTypes.string,
  ]).isRequired,
  apiCall: PropTypes.func,
  dataKey: PropTypes.string,
  modalTitle: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default ListButton;

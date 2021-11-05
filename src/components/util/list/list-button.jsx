import { React, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import idFromUrl from "../helpers/id-from-url";
/**
 * @param {object} props - The props.
 * @param {Function} props.callback - The callback function
 * @param {object} props.inputData - The data for callback
 * @param {Function} props.apiCall - The api to call
 * @returns {object} - The list button.
 */
function ListButton({ callback, inputData, apiCall }) {
  const [label, setLabel] = useState("");
  let data;
  if (!Array.isArray(inputData)) {
    data = apiCall({ id: idFromUrl(inputData), page: 1, itemsPerPage: 0 });
  }

  useEffect(() => {
    if (Array.isArray(inputData)) {
      setLabel(inputData.length.toString());
    }
  }, []);

  /** Set label. */
  useEffect(() => {
    if (data?.data) {
      setLabel(data.data["hydra:totalItems"].toString());
    }
  }, [data]);

  return (
    <>
      {label && (
        <button
          className="btn btn-secondary"
          type="button"
          disabled={label === "0"}
          onClick={() => callback(inputData)}
        >
          {label}
        </button>
      )}
      {!label && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="m-1"
        />
      )}
    </>
  );
}

ListButton.defaultProps = {
  apiCall: () => {},
};

ListButton.propTypes = {
  inputData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.any).isRequired,
    PropTypes.string,
  ]).isRequired,
  apiCall: PropTypes.func,
  callback: PropTypes.func.isRequired,
};

export default ListButton;

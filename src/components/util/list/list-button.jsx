import { React } from "react";
import Spinner from "react-bootstrap/Spinner";
/**
 * @param {Function} callback
 * The callback function
 * @param {object} data
 * The data for callback
 * @returns {object}
 * The list button.
 */
function ListButton(callback, data) {
  return (
    <>
      {data && (
        <button
          className="btn btn-secondary"
          type="button"
          disabled={data.length === 0}
          onClick={() => callback(data)}
        >
          {data.length}
        </button>
      )}
      {!data && (
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

export default ListButton;

import { React } from "react";
import Spinner from "react-bootstrap/Spinner";
/**
 * @param {Function} callback
 * The callback function
 * @param {object} apiGetCall
 * The function to call to get relevant data.
 * @param {string} id
 * The id for fetching.
 * @returns {object}
 * The list button.
 */
function ListButton(callback, apiGetCall, id) {
  const { data } = apiGetCall({ id });

  return (
    <>
      {data && (
        <button
          className="btn btn-secondary"
          type="button"
          disabled={data.length === 0}
          onClick={() => callback(data["hydra:member"])}
        >
          {data["hydra:member"].length}
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

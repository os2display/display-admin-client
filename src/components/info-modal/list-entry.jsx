import { React } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import idFromUrl from "../util/helpers/id-from-url";

/**
 * Info modal component, that displays an info string.
 *
 * @param {object} props
 * Props.
 * @param {Function} props.apiCall
 * apiCall for data.
 * @param {string} props.dataUrl
 * The url to get the data from.
 * @returns {object}
 * A list entry with the title of called element.
 */
function ListEntry({ apiCall, dataUrl }) {
  const { data } = apiCall({ id: idFromUrl(dataUrl) });

  return (
    <>
      {data && <li key={data["@id"]}>{data.title}</li>}
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

ListEntry.propTypes = {
  apiCall: PropTypes.func.isRequired,
  dataUrl: PropTypes.string.isRequired,
};

export default ListEntry;

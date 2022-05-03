import { React } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import idFromUrl from "../../components/util/helpers/id-from-url";

/**
 * List entry component.
 *
 * @param {object} props Props.
 * @param {Function} props.apiCall ApiCall for data.
 * @param {string} props.dataUrl The url to get the data from.
 * @param {string} props.redirectTo Redirect link to.
 * @returns {object} A list entry with the title of called element.
 */
function TitleFetcher({ apiCall, dataUrl, redirectTo }) {
  const { data } = apiCall({ id: idFromUrl(dataUrl) });

  return (
    <>
      {data && (
        <li key={data["@id"]}>
          <Link to={`${redirectTo}/${idFromUrl(data["@id"])}`} target="_blank">
            {data.title}
          </Link>
        </li>
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

TitleFetcher.propTypes = {
  apiCall: PropTypes.func.isRequired,
  dataUrl: PropTypes.string.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default TitleFetcher;

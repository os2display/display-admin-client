import { React } from "react";
import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";
import { useGetV1TemplatesByIdQuery } from "../../redux/api/api.generated";
import idFromUrl from "./helpers/id-from-url";

/**
 * @param {object} props The props.
 * @param {object} props.path Template path.
 * @returns {object} The template title.
 */
function TemplateLabelInList({ path }) {
  // template id created below.
  const id = idFromUrl(path);

  const { data } = useGetV1TemplatesByIdQuery({
    id,
  });

  return (
    <>
      {data && <div>{data.title}</div>}

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

TemplateLabelInList.propTypes = {
  path: PropTypes.string.isRequired,
};

export default TemplateLabelInList;

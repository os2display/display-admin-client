import { React } from "react";
import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";
import { useGetV2TemplatesByIdQuery } from "../../redux/api/api.generated.ts";
import idFromUrl from "./helpers/id-from-url";
/**
 * @param {object} props The props.
 * @param {object} props.templateInfo Object containing template id.
 * @returns {object} The template title.
 */
function TemplateLabelInList({ templateInfo }) {
  // template id created below.
  const id = idFromUrl(templateInfo["@id"]);

  const { data } = useGetV2TemplatesByIdQuery({
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
  templateInfo: PropTypes.shape({
    "@id": PropTypes.string,
  }).isRequired,
};

export default TemplateLabelInList;

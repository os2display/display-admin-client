import { React } from "react";
import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";
import { useGetV1TemplatesByIdQuery } from "../../redux/api/api.generated";
/**
 * @param {object} props
 * The props.
 * @param {object} props.template
 * Object containing template id.
 * @param props.templateInfo
 * @returns {object}
 * The template title.
 */
function TemplateLabelInList({ templateInfo }) {
  // template id created below.
  const id = templateInfo["@id"].substring(
    templateInfo["@id"].lastIndexOf("/") + 1,
    templateInfo["@id"].length
  );

  const { data } = useGetV1TemplatesByIdQuery({
    id,
  });

  return (
    <>
      {data && <div>{data.title}</div>}{" "}
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
  template: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TemplateLabelInList;

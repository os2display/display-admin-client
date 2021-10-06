import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import RenderFormElement from "../util/forms/render-form-element";
import { useGetV1TemplatesByIdQuery } from "../../redux/api/api.generated";
import idFromUrl from "../util/helpers/id-from-url";
/**
 * @param {object} props
 * The props.
 * @param {object} props.slide
 * The slide element
 * @param {Function} props.handleInput
 * Callback on input.
 * @returns {object}
 * The template.
 */
function TemplateRender({ slide, handleInput }) {
  const id = idFromUrl(slide.templateInfo);
  const [templateData, setTemplateData] = useState([]);

  const { data } = useGetV1TemplatesByIdQuery({
    id,
  });

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data) {
      setTemplateData([]);
    }
  }, [data]);

  return (
    <>
      {templateData && (
        <>
          Todo template data section
          {templateData.map((template) => (
            <RenderFormElement
              key={template.name}
              data={template}
              onChange={handleInput}
              slide={slide}
            />
          ))}
        </>
      )}
    </>
  );
}

TemplateRender.propTypes = {
  slide: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default TemplateRender;

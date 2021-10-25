import { React } from "react";
import PropTypes from "prop-types";
import RenderFormElement from "../util/forms/render-form-element";

/**
 * Content form.
 *
 * @param {object} props - The props.
 * @param {object} props.content - The slide content.
 * @param {Function} props.handleInput - Callback on input.
 * @returns {object} - The template.
 */
function ContentForm({ content, contentFormElements, handleInput }) {
  return (
    <>
      {contentFormElements && (
        <>
          {contentFormElements.map((formElement) => (
            <RenderFormElement
              key={formElement.name}
              data={formElement}
              onChange={handleInput}
              formStateObject={content}
              requiredFieldCallback={() => {return false}}
            />
          ))}
        </>
      )}
    </>
  );
}

ContentForm.propTypes = {
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  contentFormElements: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default ContentForm;

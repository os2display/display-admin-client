import { React } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.title
 * The title
 * @param {Array} props.buttons
 * The buttons list
 * @returns {object}
 * The Content header.
 */
function ContentHeader({ title, buttons }) {
  return (
    <Row className="align-items-center justify-content-between my-3">
      <Col>
        <h1>{title}</h1>
      </Col>
      <Col xs="auto">
        {buttons.map((button) => (
          <>
            {!button.invisible && (
              <Button
                style={{ marginLeft: "0.5rem" }}
                onClick={button.onClickEvent}
                href={button.link}
              >
                {button.title}
              </Button>
            )}
          </>
        ))}
      </Col>
    </Row>
  );
}

ContentHeader.propTypes = {
  title: PropTypes.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string,
      onClickEvent: PropTypes.func,
    })
  ).isRequired,
};

export default ContentHeader;

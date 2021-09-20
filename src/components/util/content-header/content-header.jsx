import { React } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// @TODO: Missing description.
/**
 * @param {object} props The props.
 * @param {string} props.title The title
 * @param {string} props.newBtnTitle The button title
 * @param {string} props.newBtnLink The button link
 * @returns {object} The Content header.
 */
function ContentHeader({ title, newBtnTitle, newBtnLink }) {
  return (
    <Row className="align-items-center justify-content-between my-3">
      <Col>
        <h1>{title}</h1>
      </Col>
      {newBtnTitle && (
        <Col xs="auto">
          <Button htef={newBtnLink}>{newBtnTitle}</Button>
        </Col>
      )}
    </Row>
  );
}

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  newBtnTitle: PropTypes.string.isRequired,
  newBtnLink: PropTypes.string.isRequired,
};

export default ContentHeader;

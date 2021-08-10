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
 * @param {Array} props.newBtnTitle
 * The button title
 * @param {Array} props.newBtnLink
 * The button link
 * @returns {object}
 * The Content header.
 */
function ContentHeader({ title, newBtnTitle, newBtnLink }) {
  return (
    <Row className="align-items-center justify-content-between my-3">
      <Col>
        <h1>{title}</h1>
      </Col>
      <Col xs="auto">
        <Button htef={newBtnLink}>{newBtnTitle}</Button>
      </Col>
    </Row>
  );
}

ContentHeader.propTypes = {
  title: PropTypes.isRequired,
  newBtnTitle: PropTypes.isRequired,
  newBtnLink: PropTypes.isRequired,
};

export default ContentHeader;

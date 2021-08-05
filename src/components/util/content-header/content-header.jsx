import { React } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/button";
import Col from "react-bootstrap/col";
import Row from "react-bootstrap/row";

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
    <Row className="align-items-center my-3">
      <Col>
        <h1>{title}</h1>
      </Col>
      <Col md="auto">
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

import { React } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

/**
 * A content header for lists.
 *
 * @param {object} props The props.
 * @param {string} props.title The title
 * @param {string} props.newBtnTitle The button title
 * @param {string} props.newBtnLink The button link
 * @param {Array} props.children The children being passed from parent
 * @returns {object} The Content header.
 */
function ContentHeader({ title, newBtnTitle, newBtnLink, children }) {
  const navigate = useNavigate();

  return (
    <Row className="align-items-center justify-content-between my-3">
      <Col>
        <h1>{title}</h1>
      </Col>
      {children}
      {newBtnTitle && (
        <Col xs="auto">
          <Button onClick={() => navigate(newBtnLink)}>
            <FontAwesomeIcon className="me-1" icon={faPlusCircle} />
            {newBtnTitle}
          </Button>
        </Col>
      )}
    </Row>
  );
}

ContentHeader.defaultProps = {
  children: <></>,
};

ContentHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  newBtnTitle: PropTypes.string.isRequired,
  newBtnLink: PropTypes.string.isRequired,
};

export default ContentHeader;

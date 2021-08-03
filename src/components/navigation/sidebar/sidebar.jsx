import { React } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import NavItems from "../nav-items/nav-items";
/**
 * The sidebar component.
 *
 * @returns {object}
 *   The SideBar
 */
function SideBar() {
  return (
    <Col
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      sm={2}
    >
      <Navbar variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <NavItems />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Col>
  );
}

export default SideBar;

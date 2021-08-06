import { React } from "react";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import NavItems from "../nav-items/nav-items";
import "./sidebar.scss";
/**
 * The sidebar component.
 *
 * @returns {object}
 *   The SideBar
 */
function SideBar() {
  return (
    <Col className="bg-light border-end d-none d-md-block" sm={2}>
      {/* <Navbar variant="light" expand="lg"> */}
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      {/* <Navbar.Collapse id="basic-navbar-nav"> */}
      <Nav
        variant="light"
        className="sidebar-nav flex-column w-100 py-3 sticky-md-top"
      >
        <NavItems />
      </Nav>
      {/* </Navbar.Collapse> */}
      {/* </Navbar> */}
    </Col>
  );
}

export default SideBar;

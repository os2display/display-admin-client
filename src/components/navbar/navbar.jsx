import { React } from "react";
import { FormattedMessage } from "react-intl";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * The side bar component.
 *
 * @returns {object}
 *   The NavBar
 */
function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="left">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Item>
            <Link
              className="navbar-brand"
              style={{ color: "black" }}
              to="/tags"
            >
              <FormattedMessage id="navbar_tags" defaultMessage="navbar_tags" />
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className="navbar-brand"
              style={{ color: "black" }}
              to="/slides"
            >
              <FormattedMessage
                id="navbar_slides"
                defaultMessage="navbar_slides"
              />
            </Link>
          </Nav.Item>
          <NavDropdown
            title={
              <FormattedMessage
                id="navbar_screens"
                defaultMessage="navbar_screens"
              />
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item>
              <Link
                className="navbar-brand"
                style={{ color: "black" }}
                to="/screens"
              >
                <FormattedMessage
                  id="navbar_screens"
                  defaultMessage="navbar_screens"
                />
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link
                className="navbar-brand"
                style={{ color: "black" }}
                to="/groups"
              >
                <FormattedMessage
                  id="navbar_groups"
                  defaultMessage="navbar_groups"
                />
              </Link>
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Item>
            <Link
              className="navbar-brand"
              style={{ color: "black" }}
              to="/categories"
            >
              <FormattedMessage
                id="navbar_categories"
                defaultMessage="navbar_categories"
              />
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;

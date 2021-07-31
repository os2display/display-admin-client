import { React } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
/**
 * The side bar component.
 *
 * @returns {object}
 *   The NavBar
 */
function NavBar() {
  const [t] = useTranslation("common");
  return (
    <Navbar bg="light" expand="lg" className="left">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title={t("navbar.content")} id="navbar_content">
              <NavDropdown.Item>
                <Link
                  className="navbar-brand"
                  id="navbar_content_tags"
                  style={{ color: "black" }}
                  to="/tags"
                >
                  {t("navbar.content-tags")}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  className="navbar-brand"
                  id="navbar_content_media"
                  style={{ color: "black" }}
                  to="/media-list"
                >
                  {t("navbar.content-media")}
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Item>
              <Link
                className="navbar-brand"
                id="navbar_slides"
                style={{ color: "black" }}
                to="/slides"
              >
                {t("navbar.slides")}
              </Link>
            </Nav.Item>
            <NavDropdown title={t("navbar.screens")} id="navbar_screens">
              <NavDropdown.Item>
                <Link
                  className="navbar-brand"
                  id="navbar_screens_screens"
                  style={{ color: "black" }}
                  to="/screens"
                >
                  {t("navbar.screens-screens")}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  className="navbar-brand"
                  id="navbar_screens_groups"
                  style={{ color: "black" }}
                  to="/groups"
                >
                  {t("navbar.screens-groups")}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  className="navbar-brand"
                  id="navbar_screens_locations"
                  style={{ color: "black" }}
                  to="/locations"
                >
                  {t("navbar.screens-locations")}
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={t("navbar.playlists")} id="navbar_playlists">
              <NavDropdown.Item>
                <Link
                  className="navbar-brand"
                  id="navbar_playlists_playlists"
                  style={{ color: "black" }}
                  to="/playlists"
                >
                  {t("navbar.playlists-playlists")}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  className="navbar-brand"
                  id="navbar_playlists_categories"
                  style={{ color: "black" }}
                  to="/categories"
                >
                  {t("navbar.playlists-categories")}
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

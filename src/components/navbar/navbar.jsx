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
              <NavDropdown.Item href="/slides" id="navbar_content_slides">
                {t("navbar.content-slides")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/tags" id="navbar_content_tags">
                {t("navbar.content-tags")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/media-list" id="navbar_content_media">
                {t("navbar.content-media")}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={t("navbar.playlists")} id="navbar_playlists">
              <NavDropdown.Item
                href="/playlists"
                id="navbar_playlists_playlists"
              >
                {t("navbar.playlists-playlists")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/categories"
                id="navbar_playlists_categories"
              >
                {t("navbar.playlists-categories")}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={t("navbar.screens")} id="navbar_screens">
              <NavDropdown.Item href="/screens" id="navbar_screens_screens">
                {t("navbar.screens-screens")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/groups" id="navbar_screens_groups">
                {t("navbar.screens-groups")}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/locations" id="navbar_screens_locations">
                {t("navbar.screens-locations")}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

import { React } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
/**
 * The nav items.
 *
 * @returns {object}
 *   nav items
 */
function NavItems() {
  const [t] = useTranslation("common");
  return (
    <>
      <NavDropdown title={t("navbar.content")} id="navbar_content">
        <NavDropdown.Item>
          <Link id="navbar_content_tags" to="/tags">
            {t("navbar.content-tags")}
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <Link id="navbar_content_media" to="/media-list">
            {t("navbar.content-media")}
          </Link>
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Item>
        <Link id="navbar_slides" to="/slides">
          {t("navbar.slides")}
        </Link>
      </Nav.Item>
      <NavDropdown title={t("navbar.screens")} id="navbar_screens">
        <NavDropdown.Item>
          <Link id="navbar_screens_screens" to="/screens">
            {t("navbar.screens-screens")}
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <Link id="navbar_screens_groups" to="/groups">
            {t("navbar.screens-groups")}
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <Link id="navbar_screens_locations" to="/locations">
            {t("navbar.screens-locations")}
          </Link>
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title={t("navbar.playlists")} id="navbar_playlists">
        <NavDropdown.Item>
          <Link id="navbar_playlists_playlists" to="/playlists">
            {t("navbar.playlists-playlists")}
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <Link id="navbar_playlists_categories" to="/categories">
            {t("navbar.playlists-categories")}
          </Link>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
}

export default NavItems;

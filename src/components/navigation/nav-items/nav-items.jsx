import { React } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faDesktop,
  faStream,
  faPhotoVideo,
  faPlusCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
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
      <Nav.Item>
        <Link id="navbar_dashboard" className="nav-link" to="/dashboard">
          <FontAwesomeIcon className="me-2" icon={faTachometerAlt} />
          {t("nav-items.dashboard")}
        </Link>
      </Nav.Item>
      <hr />
      <Nav.Item>
        <Link id="nav-items_slides" className="nav-link d-inline" to="/slides">
          <FontAwesomeIcon className="me-2" icon={faPhotoVideo} />
          {t("nav-items.content-slides")}
        </Link>
        <Link className="nav-link d-inline" to="/slides/new">
          <FontAwesomeIcon className="me-1" icon={faPlusCircle} />
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          id="nav-items_content_tags"
          className="nav-link ms-4 small"
          to="/tags"
        >
          {t("nav-items.content-tags")}
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          id="nav-items_content_media"
          className="nav-link ms-4 small"
          to="/media-list"
        >
          {t("nav-items.content-media")}
        </Link>
      </Nav.Item>
      <hr />
      <Nav.Item>
        <Link
          id="nav-items_screens_screens"
          className="nav-link d-inline"
          to="/screens"
        >
          <FontAwesomeIcon className="me-2" icon={faDesktop} />
          {t("nav-items.screens-screens")}
        </Link>
        <Link className="nav-link d-inline" to="/screens/new">
          <FontAwesomeIcon className="me-1" icon={faPlusCircle} />
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          id="nav-items_screens_groups"
          className="nav-link ms-4 small"
          to="/groups"
        >
          {t("nav-items.screens-groups")}
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          id="nav-items_screens_locations"
          className="nav-link ms-4 small"
          to="/locations"
        >
          {t("nav-items.screens-locations")}
        </Link>
      </Nav.Item>
      <hr />
      <Nav.Item>
        <Link
          id="nav-items_playlists_playlists"
          className="nav-link d-inline"
          to="/playlists"
        >
          <FontAwesomeIcon className="me-2" icon={faStream} />
          {t("nav-items.playlists-playlists")}
        </Link>
        <Link className="nav-link d-inline" to="/screens/new">
          <FontAwesomeIcon className="me-1" icon={faPlusCircle} />
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          id="nav-items_playlists_categories"
          className="nav-link ms-4 small"
          to="/categories"
        >
          {t("nav-items.playlists-categories")}
        </Link>
      </Nav.Item>
      <hr />
      <Nav.Item>
        <Link id="nav-items_settings" className="nav-link" to="/settings">
          <FontAwesomeIcon className="me-2" icon={faCog} />
          {t("nav-items.settings")}
        </Link>
      </Nav.Item>
    </>
  );
}

export default NavItems;

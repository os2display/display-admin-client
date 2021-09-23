import { React } from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // Icon for the dashboard item:
  // faTachometerAlt,
  faDesktop,
  faStream,
  faPhotoVideo,
  faPlusCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "./nav-items.scss";
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
      {/* TODO: Dashboard is hidden for now */}
      {/* <Nav.Item>
        <Link id="navbar_dashboard" className="nav-link" to="/dashboard">
          <FontAwesomeIcon className="me-2" icon={faTachometerAlt} />
          {t("nav-items.dashboard")}
        </Link>
      </Nav.Item>
      <hr className="d-none d-md-block" /> */}

      {/* TODO: Show active item based on Route */}
      <Nav.Item>
        <NavLink
          id="nav-items_content_slides"
          className="nav-link"
          to="/slides"
        >
          <FontAwesomeIcon className="me-2" icon={faPhotoVideo} />
          {t("nav-items.content-slides")}
          <Link className="nav-add-new" to="/slide/new">
            <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
          </Link>
        </NavLink>
      </Nav.Item>
      <Nav.Item className="nav-second-level">
        <NavLink id="nav-items_content_tags" className="nav-link" to="/tags">
          {t("nav-items.content-tags")}
        </NavLink>
      </Nav.Item>
      <Nav.Item className="nav-second-level">
        <NavLink
          id="nav-items_content_media"
          className="nav-link"
          to="/media-list"
        >
          {t("nav-items.content-media")}
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          id="nav-items_playlists_playlists"
          className="nav-link"
          to="/playlists/list"
        >
          <FontAwesomeIcon className="me-2" icon={faStream} />
          {t("nav-items.playlists-playlists")}
          <Link className="nav-add-new" to="/playlists/create">
            <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
          </Link>
        </NavLink>
      </Nav.Item>
      <Nav.Item className="nav-second-level">
        <NavLink
          id="nav-items_playlists_categories"
          className="nav-link"
          to="/categories"
        >
          {t("nav-items.playlists-categories")}
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          id="nav-items_screens_screens"
          className="nav-link"
          to="/screen/list"
        >
          <FontAwesomeIcon className="me-2" icon={faDesktop} />
          {t("nav-items.screens-screens")}
          <Link className="nav-add-new" to="/screen/create">
            <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
          </Link>
        </NavLink>
      </Nav.Item>
      <Nav.Item className="nav-second-level">
        <NavLink
          id="nav-items_screens_groups"
          className="nav-link"
          to="/groups"
        >
          {t("nav-items.screens-groups")}
        </NavLink>
      </Nav.Item>
      <Nav.Item className="nav-second-level">
        <NavLink
          id="nav-items_screens_locations"
          className="nav-link"
          to="/locations"
        >
          {t("nav-items.screens-locations")}
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink id="nav-items_settings" className="nav-link" to="/settings">
          <FontAwesomeIcon className="me-2" icon={faCog} />
          {t("nav-items.configuration")}
        </NavLink>
      </Nav.Item>
      <Nav.Item className="nav-second-level">
        <NavLink
          id="nav-items_configuration_themes"
          className="nav-link"
          to="/themes"
        >
          {t("nav-items.configuration-themes")}
        </NavLink>
      </Nav.Item>
      <Nav.Item className="nav-second-level">
        <NavLink
          id="nav-items_configuration_users"
          className="nav-link"
          to="/users"
        >
          {t("nav-items.configuration-users")}
        </NavLink>
      </Nav.Item>
    </>
  );
}

export default NavItems;

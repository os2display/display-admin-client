import { React, useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faStream,
  faPhotoVideo,
  faPlusCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../../context/user-context";
import RestrictedNavRoute from "./restricted-nav-route";
import "./nav-items.scss";

/**
 * The nav items.
 *
 * @returns {object} Nav items
 */
function NavItems() {
  const [t] = useTranslation("common");
  const context = useContext(UserContext);

  return (
    <>
      {context.accessConfig?.get && (
        <>
          <Nav.Item className="nav-item">
            <NavLink
              id="nav-items_content_slides"
              className="nav-link"
              to="/slide/list"
            >
              <FontAwesomeIcon className="me-2" icon={faPhotoVideo} />
              {t("nav-items.content-slides")}
            </NavLink>
            <Link className="nav-add-new" to="/slide/create">
              <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
            </Link>
          </Nav.Item>
          <Nav.Item className="nav-second-level">
            <NavLink
              id="nav-items_content_media"
              className="nav-link"
              to="/media/list"
            >
              {t("nav-items.content-media")}
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              id="nav-items_playlists_playlists"
              className="nav-link"
              to="/playlist/list"
            >
              <FontAwesomeIcon className="me-2" icon={faStream} />
              {t("nav-items.playlists-playlists")}
            </NavLink>
            <Link className="nav-add-new" to="/playlist/create">
              <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
            </Link>
          </Nav.Item>
          <RestrictedNavRoute roles={context.accessConfig.get.campaign.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                id="nav-items_content_media"
                className="nav-link"
                to="/campaign/list"
              >
                {t("nav-items.playlists-campaigns")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={context.accessConfig.get.campaign.roles}>
            <Nav.Item>
              <NavLink
                id="nav-items_screens_screens"
                className="nav-link"
                to="/screen/list"
              >
                <FontAwesomeIcon className="me-2" icon={faDesktop} />
                {t("nav-items.screens-screens")}
              </NavLink>
              <Link className="nav-add-new" to="/screen/create">
                <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
              </Link>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={context.accessConfig.get.groups.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                id="nav-items_screens_groups"
                className="nav-link"
                to="/group/list"
              >
                {t("nav-items.screens-groups")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={context.accessConfig.get.settings.roles}>
            <Nav.Item>
              <NavLink
                id="nav-items_settings"
                className="nav-link"
                to="/settings"
              >
                <FontAwesomeIcon className="me-2" icon={faCog} />
                {t("nav-items.configuration")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={context.accessConfig.get.settings.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                id="nav-items_configuration_themes"
                className="nav-link"
                to="/themes/list"
              >
                {t("nav-items.configuration-themes")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={context.accessConfig.get.settings.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                id="nav-items_configuration_users"
                className="nav-link"
                to="/users"
              >
                {t("nav-items.configuration-users")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
        </>
      )}
    </>
  );
}

export default NavItems;

import { React, useContext, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faUsers,
  faStream,
  faPhotoVideo,
  faPlusCircle,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import ListContext from "../../../context/list-context";
import UserContext from "../../../context/user-context";
import useModal from "../../../context/modal-context/modal-context-hook";
import RestrictedNavRoute from "./restricted-nav-route";
import "./nav-items.scss";

/**
 * The nav items.
 *
 * @returns {object} Nav items
 */
function NavItems() {
  const { t } = useTranslation("common", { keyPrefix: "nav-items" });
  const { setSelected } = useModal();
  const { page, createdBy, isPublished } = useContext(ListContext);
  const { pathname } = useLocation();
  const {
    accessConfig: { get: accessConfig },
  } = useContext(UserContext);

  // Reset list context and selected on page change.
  useEffect(() => {
    setSelected([]);
    if (page) {
      page.set(1);
    }
    if (createdBy) {
      createdBy.set("all");
    }
    if (isPublished) {
      isPublished.set(undefined);
    }
  }, [pathname]);

  return (
    <>
      <Nav.Item>
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "disabled" : ""}`}
          to="/slide/list"
        >
          <FontAwesomeIcon className="me-2" icon={faPhotoVideo} />
          {t("content-slides")}
        </NavLink>
        <Link
          className="nav-add-new"
          aria-label={t("add-new-slide-aria-label")}
          to="/slide/create"
        >
          <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
        </Link>
      </Nav.Item>
      <Nav.Item className="nav-second-level">
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "disabled" : ""}`}
          to="/media/list"
        >
          {t("content-media")}
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "disabled" : ""}`}
          to="/playlist/list"
        >
          <FontAwesomeIcon className="me-2" icon={faStream} />
          {t("playlists-playlists")}
        </NavLink>
        <Link
          aria-label={t("add-new-playlist-aria-label")}
          className="nav-add-new"
          to="/playlist/create"
        >
          <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
        </Link>
      </Nav.Item>
      {accessConfig?.campaign?.roles && (
        <>
          <RestrictedNavRoute roles={accessConfig.campaign.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/campaign/list"
              >
                {t("playlists-campaigns")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
        </>
      )}
      {accessConfig?.shared?.roles && (
        <>
          <RestrictedNavRoute roles={accessConfig.shared?.roles ?? []}>
            <Nav.Item className="nav-second-level">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/shared/list"
              >
                {t("shared-playlists")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
        </>
      )}
      {accessConfig?.campaign?.roles && (
        <>
          <RestrictedNavRoute roles={accessConfig.campaign.roles}>
            <Nav.Item>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/screen/list"
              >
                <FontAwesomeIcon className="me-2" icon={faDesktop} />
                {t("screens-screens")}
              </NavLink>
              <Link
                aria-label={t("add-new-screen-aria-label")}
                className="nav-add-new"
                to="/screen/create"
              >
                <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
              </Link>
            </Nav.Item>
          </RestrictedNavRoute>
        </>
      )}
      {accessConfig?.groups?.roles && (
        <>
          <RestrictedNavRoute roles={accessConfig.groups.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/group/list"
              >
                {t("screens-groups")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
        </>
      )}
      {accessConfig?.users?.roles && (
        <>
          <RestrictedNavRoute roles={accessConfig.users.roles}>
            <Nav.Item>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/users/list"
              >
                <FontAwesomeIcon className="me-2" icon={faUsers} />
                {t("users")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={accessConfig.users.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/activation/list"
              >
                {t("activation-codes")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
        </>
      )}
      {accessConfig?.settings?.roles && (
        <>
          <RestrictedNavRoute roles={accessConfig.settings.roles}>
            <Nav.Item>
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
              >
                <FontAwesomeIcon className="me-2" icon={faCog} />
                {t("configuration")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={accessConfig.settings.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/themes/list"
              >
                {t("configuration-themes")}
              </NavLink>
            </Nav.Item>
            <Nav.Item className="nav-second-level">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/feed-sources/list"
              >
                {t("configuration-feedsources")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
        </>
      )}
    </>
  );
}

export default NavItems;

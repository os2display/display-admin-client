import { React, useContext, useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
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
  faHome,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import ListContext from "../../../context/list-context";
import UserContext from "../../../context/user-context";
import useModal from "../../../context/modal-context/modal-context-hook";
import RestrictedNavRoute from "./restricted-nav-route";
import localStorageKeys from "../../util/local-storage-keys";
import { api } from "../../../redux/api/api.generated";
import "./nav-items.scss";

/**
 * The nav items.
 *
 * @returns {object} Nav items
 */
function NavItems() {
  const { SELECTED_TENANT } = localStorageKeys;
  const [tenantDropdownDisabled, setTenantDropdownDisabled] = useState(false);
  const { t } = useTranslation("common", { keyPrefix: "nav-items" });
  const { setSelected } = useModal();
  const { page, createdBy, isPublished } = useContext(ListContext);
  const { pathname } = useLocation();
  const {
    tenants: { get: tenants },
    selectedTenant: { set: setSelectedTenant, get: selectedTenant },
    accessConfig: { get: accessConfig },
  } = useContext(UserContext);

  const dispatch = useDispatch();

  /**
   * Change tenant on select tenant
   *
   * @param {object} props - The props.
   * @param {object} props.target Event target
   */
  function onTenantChange({ target }) {
    dispatch(api.endpoints.tenantChangedClearCache.initiate());
    const newTenant = tenants.find(({ tenantKey }) => tenantKey === target.id);
    setSelectedTenant(newTenant);
    localStorage.setItem(SELECTED_TENANT, JSON.stringify(newTenant));
  }

  // Reset list context and selected on page change.
  useEffect(() => {
    const matches = pathname.match(/(\/edit|\/create)/i);
    setTenantDropdownDisabled(matches !== null);
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
      {accessConfig && (
        <>
          <Nav.Item>
            <NavLink
              id="nav-items_content_slides"
              className={({ isActive }) =>
                `nav-link ${isActive ? "disabled" : ""}`
              }
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
              id="nav-items_content_media"
              className={({ isActive }) =>
                `nav-link ${isActive ? "disabled" : ""}`
              }
              to="/media/list"
            >
              {t("content-media")}
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              id="nav-items_playlists_playlists"
              className={({ isActive }) =>
                `nav-link ${isActive ? "disabled" : ""}`
              }
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
          <RestrictedNavRoute roles={accessConfig.campaign.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                id="nav-items_content_media"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/campaign/list"
              >
                {t("playlists-campaigns")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={accessConfig.shared.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                id="nav-items_content_shared_playlists"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/shared/list"
              >
                {t("shared-playlists")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={accessConfig.campaign.roles}>
            <Nav.Item>
              <NavLink
                id="nav-items_screens_screens"
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
          <RestrictedNavRoute roles={accessConfig.groups.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                id="nav-items_screens_groups"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/group/list"
              >
                {t("screens-groups")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={accessConfig.externalUsers.roles}>
            <Nav.Item>
              <NavLink
                id="nav-items_external_users"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/users/list"
              >
                <FontAwesomeIcon className="me-2" icon={faUsers} />
                {t("external-users")}
              </NavLink>
              <Link
                aria-label={t("add-new-external-user-aria-label")}
                className="nav-add-new"
                to="/users/create"
              >
                <FontAwesomeIcon className="ms-3" icon={faPlusCircle} />
              </Link>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={accessConfig.locations.roles}>
            <Nav.Item className="d-flex">
              <NavLink
                id="nav-items_locations"
                className={({ isActive }) =>
                  `nav-link d-flex ${isActive ? "disabled" : ""}`
                }
                to="/locations/list"
              >
                <FontAwesomeIcon className="me-2" icon={faHome} />
                {t("locations")}
              </NavLink>
              {tenants && tenants.length > 1 && (
                <NavDropdown
                  className="location-dropdown"
                  menuVariant="dark"
                  aria-label={t("change-location-aria-label")}
                >
                  {tenants.map(({ tenantKey, title }) => (
                    <NavDropdown.Item
                      onClick={(target) => onTenantChange(target)}
                      disabled={tenantDropdownDisabled}
                      id={tenantKey}
                      key={tenantKey}
                    >
                      <FontAwesomeIcon
                        className="me-1"
                        style={{
                          color:
                            tenantKey === selectedTenant.tenantKey
                              ? "#6c757d"
                              : "transparent",
                        }}
                        icon={faCheck}
                      />
                      {title}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              )}
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={accessConfig.settings.roles}>
            <Nav.Item>
              <NavLink
                id="nav-items_settings"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/themes/list"
              >
                <FontAwesomeIcon className="me-2" icon={faCog} />
                {t("configuration")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
          <RestrictedNavRoute roles={accessConfig.settings.roles}>
            <Nav.Item className="nav-second-level">
              <NavLink
                id="nav-items_configuration_themes"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "disabled" : ""}`
                }
                to="/themes/list"
              >
                {t("configuration-themes")}
              </NavLink>
            </Nav.Item>
          </RestrictedNavRoute>
        </>
      )}
    </>
  );
}

export default NavItems;

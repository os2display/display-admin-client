import { React, useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPhotoVideo,
  faDesktop,
  faStream,
  faUserCircle,
  faSignOutAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import NavItems from "../nav-items/nav-items";
import UserContext from "../../../context/user-context";
import localStorageKeys from "../../util/local-storage-keys";
import { api } from "../../../redux/api/api.generated";
import { displayError } from "../../util/list/toast-component/display-toast";
import "./top-bar.scss";

/**
 * The top bar navigation component.
 *
 * @returns {object} The top bar navigation component
 */
function TopBar() {
  const { t } = useTranslation("common");
  const context = useContext(UserContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tenantChangeDisabled, setTenantChangeDisabled] = useState(false);

  /**
   * Change tenant on select tenant
   *
   * @param {object} props - The props.
   * @param {object} props.target Event target
   */
  function onTenantChange({ target }) {
    dispatch(api.endpoints.tenantChangedClearCache.initiate());
    context.selectedTenant.set(
      context.tenants.get.find((tenant) => tenant.tenantKey === target.id)
    );
    localStorage.setItem(
      localStorageKeys.SELECTED_TENANT,
      JSON.stringify(
        context.tenants.get.find((tenant) => tenant.tenantKey === target.id)
      )
    );
  }

  useEffect(() => {
    const { pathname } = location;
    const matches = pathname.match(/(\/edit|\/create)/i);

    setTenantChangeDisabled(matches !== null);
  }, [location]);

  return (
    <Navbar
      id="topbar"
      variant="light"
      bg="white"
      expand="lg"
      className="border-bottom shadow-sm"
    >
      <Navbar.Brand
        href="/admin"
        id="top-bar-brand"
        className="col-lg-2 d-lg-none ms-3"
      >
        {t("topbar.brand")}
      </Navbar.Brand>
      <>
        {!context.tenants.get && (
          <div className="name ms-3">
            {context.userName.get} ({context.selectedTenant.get?.title})
          </div>
        )}
        {context.tenants?.get && (
          <Dropdown className="user-dropdown">
            <Dropdown.Toggle
              variant="link"
              id="topbar_user"
              className="text-dark text-decoration-none"
            >
              <FontAwesomeIcon
                className="me-1 fa-lg text-dark text-muted"
                icon={faUserCircle}
              />
              <span className="user-dropdown-name">
                {context.userName?.get} ({context.selectedTenant?.get?.title})
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "100%" }}>
              {context.tenants.get.map((tenant) => (
                <Dropdown.Item
                  onClick={(target) => {
                    if (tenantChangeDisabled) {
                      displayError(
                        t(`topbar.error-messages.tenant-change-disabled`),
                        null
                      );
                    } else {
                      onTenantChange(target);
                    }
                  }}
                  id={tenant.tenantKey}
                  key={tenant.tenantKey}
                  className="dropdown-item"
                >
                  <FontAwesomeIcon
                    className="me-1"
                    style={{
                      color:
                        tenant.tenantKey ===
                        context.selectedTenant.get.tenantKey
                          ? "#6c757d"
                          : "transparent",
                    }}
                    icon={faCheck}
                  />
                  {tenant.title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        id="basic-navbar-nav-burger"
        className="me-3"
      />
      <Navbar.Collapse id="basic-navbar-nav" className="px-3">
        <Nav variant="dark" className="topbar-nav d-none d-md-block d-lg-none">
          <NavItems />
        </Nav>
        <Nav className="ms-md-auto mt-3 mt-md-0">
          <Nav.Item className="add-new-dropdown">
            <Dropdown
              style={{ width: "100%" }}
              className="me-md-3 mb-2 mb-md-0"
            >
              <Dropdown.Toggle
                style={{ width: "100%" }}
                variant="primary"
                id="topbar_add"
              >
                <FontAwesomeIcon className="me-1" icon={faPlusCircle} />
                {t("topbar.add")}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link
                  id="nav-add-new-slide"
                  className="dropdown-item"
                  to="/slide/create"
                >
                  <FontAwesomeIcon className="me-2" icon={faPhotoVideo} />
                  {t("topbar.add-slide")}
                </Link>

                <Link
                  id="nav-add-new-playlist"
                  className="dropdown-item"
                  to="/playlist/create"
                >
                  <FontAwesomeIcon className="me-2" icon={faStream} />
                  {t("topbar.add-playlist")}
                </Link>
                <Link
                  id="nav-add-new-screen"
                  className="dropdown-item"
                  to="/screen/create"
                >
                  <FontAwesomeIcon className="me-2" icon={faDesktop} />
                  {t("topbar.add-screen")}
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
          <Nav.Item>
            <Link
              id="topbar_signout"
              className="btn btn-dark me-1 mb-1"
              to="/logout"
            >
              <FontAwesomeIcon className="me-1" icon={faSignOutAlt} />
              {t("topbar.signout")}
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopBar;

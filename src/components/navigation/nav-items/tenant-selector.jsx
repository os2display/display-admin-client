import { React, useContext } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import UserContext from "../../../context/user-context";
import RestrictedNavRoute from "./restricted-nav-route";
import localStorageKeys from "../../util/local-storage-keys";
import "./tenant-selector.scss";

/**
 * The TenantSelector component.
 *
 * @returns {object} The TenantSelector
 */
function TenantSelector() {
  const {
    tenants: { get: tenants },
    selectedTenant: { set: setSelectedTenant, get: selectedTenant },
    accessConfig: { get: accessConfig },
  } = useContext(UserContext);
  const { t } = useTranslation("common", { keyPrefix: "tenant-selector" });

  /**
   * Change tenant on select tenant
   *
   * @param {object} props - The props.
   * @param {object} props.target Event target
   */
  function onTenantChange({ target }) {
    const newTenant = tenants.find(({ tenantKey }) => tenantKey === target.id);
    setSelectedTenant(newTenant);
    localStorage.setItem(
      localStorageKeys.SELECTED_TENANT,
      JSON.stringify(newTenant)
    );
  }

  return (
    <>
      {accessConfig?.locations?.roles && (
        <RestrictedNavRoute roles={accessConfig?.locations?.roles ?? []}>
          <Nav.Item className="text-white mb-2 mt-2">
            <div className="ps-3 text-white-50">{t("tenant")}</div>
            <div className="ps-2 text-white fw-bold">
              {tenants && (
                <>
                  {tenants.length === 1 && (
                    <div className="tenant-selector-one-tenant">
                      {selectedTenant.title}
                    </div>
                  )}
                  {tenants.length > 1 && (
                    <NavDropdown
                      title={selectedTenant.title}
                      menuvariant="dark"
                      className="tenant-dropdown"
                      aria-label={t("change-location-aria-label")}
                      id="tenant-dropdown"
                    >
                      {tenants.map(({ tenantKey, title }) => (
                        <NavDropdown.Item
                          onClick={(target) => onTenantChange(target)}
                          id={tenantKey}
                          key={tenantKey}
                        >
                          {title}
                        </NavDropdown.Item>
                      ))}
                    </NavDropdown>
                  )}
                </>
              )}
            </div>
          </Nav.Item>
        </RestrictedNavRoute>
      )}
    </>
  );
}

export default TenantSelector;

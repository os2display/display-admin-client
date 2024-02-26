import { React, useContext } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import UserContext from "../../../context/user-context";
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
    <Nav.Item className="text-white mb-2 mt-4">
      <div className="text-white">{t("tenant")}</div>
      <div className="text-white fw-bold">
        {tenants && (
          <>
            {tenants.length === 1 && (
              <div className="mt-1 mb-1">{selectedTenant.title}</div>
            )}
            {tenants.length > 1 && (
              <NavDropdown
                title={selectedTenant.title}
                menuvariant="dark"
                className="tenant-dropdown"
                aria-label={t("change-tenant-aria-label")}
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
  );
}

export default TenantSelector;

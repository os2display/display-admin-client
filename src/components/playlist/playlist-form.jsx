import { React, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Alert, Button } from "react-bootstrap";
import UserContext from "../../context/user-context";
import Schedule from "../util/schedule/schedule";
import { useGetV2TenantsQuery } from "../../redux/api/api.generated.ts";
import ContentBody from "../util/content-body/content-body";
import TenantsDropdown from "../util/forms/multiselect-dropdown/tenants/tenants-dropdown";
import Preview from "../preview";
import idFromUrl from "../util/helpers/id-from-url";

/**
 * The playlist form component.
 *
 * @param {object} props - The props.
 * @param {object} props.playlist The playlist object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {boolean} props.highlightSharedSection - Hightlight section concerning
 *   shared info
 * @returns {object} The playlist form.
 */
function PlaylistForm({ playlist, handleInput, highlightSharedSection }) {
  const { t } = useTranslation("common");
  const context = useContext(UserContext);
  const [displayPreview, setDisplayPreview] = useState(null);

  const { data: tenants } = useGetV2TenantsQuery({
    itemsPerPage: 30,
  });

  return (
    <>
      {playlist && tenants && (
        <>
          <ContentBody>
            <h2 className="h4">{t("playlist-form.schedule-header")}</h2>
            <Schedule
              schedules={playlist.schedules}
              onChange={(schedules) =>
                handleInput({ target: { id: "schedules", value: schedules } })
              }
            />
          </ContentBody>
          <ContentBody
            id="shared-section"
            highlightSection={highlightSharedSection}
          >
            <h2 className="h4">{t("playlist-form.share-playlist")}</h2>
            <TenantsDropdown
              name="tenants"
              handleTenantSelection={handleInput}
              selected={playlist.tenants}
              data={tenants["hydra:member"].filter(({ tenantKey }) => {
                return context.selectedTenant.get.tenantKey !== tenantKey;
              })}
            />
            <Alert className="mt-3 text-dark" variant="warning">
              {t("playlist-form.warning")}
            </Alert>
          </ContentBody>

          <ContentBody>
            <h2 className="h4">{t("playlist-preview")}</h2>
            {displayPreview && (
              <>
                <Preview id={idFromUrl(playlist["@id"])} mode="playlist" />
                <Alert
                  key="playlist-preview-about"
                  variant="info"
                  className="mt-3"
                >
                  {t("playlist-preview-about")}
                </Alert>
              </>
            )}
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => setDisplayPreview(!displayPreview)}
            >
              {displayPreview
                ? t("playlist-preview-close")
                : t("playlist-preview-open")}
            </Button>
          </ContentBody>
        </>
      )}
    </>
  );
}

PlaylistForm.defaultProps = {
  highlightSharedSection: false,
  playlist: null,
};

PlaylistForm.propTypes = {
  playlist: PropTypes.shape({
    "@id": PropTypes.string,
    schedules: PropTypes.arrayOf(
      PropTypes.shape({
        duration: PropTypes.number,
        id: PropTypes.string,
        rrule: PropTypes.string,
      })
    ),
    tenants: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        modifiedAt: PropTypes.string,
        modifiedBy: PropTypes.string,
        tenantKey: PropTypes.string,
        title: PropTypes.string,
        userRoleTenants: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string,
            roles: PropTypes.arrayOf(PropTypes.string),
            tenantKey: PropTypes.string,
            title: PropTypes.string,
          })
        ),
      })
    ),
  }),
  handleInput: PropTypes.func.isRequired,
  highlightSharedSection: PropTypes.bool,
};

export default PlaylistForm;

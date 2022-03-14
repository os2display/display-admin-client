import { React } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import Schedule from "../util/schedule/schedule";
import { useGetV1TenantsQuery } from '../../redux/api/api.generated';
import ContentBody from "../util/content-body/content-body";
import TenantsDropdown from '../util/forms/multiselect-dropdown/tenants/tenants-dropdown';

/**
 * The playlist form component.
 *
 * @param {object} props - The props.
 * @param {object} props.playlist The playlist object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @returns {object} The playlist form.
 */
function PlaylistForm({ playlist, handleInput, highlightSharedSection }) {
  const { t } = useTranslation("common");

  const { data: tenants } = useGetV1TenantsQuery({
    itemsPerPage: 100,
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
          <ContentBody highlightSection={highlightSharedSection}>
            <h2 className="h4">{t("playlist-form.share-playlist")}</h2>
              <TenantsDropdown
                    name="tenants"
                    handleTenantSelection={handleInput}
                    selected={playlist.tenants}
                    data={tenants["hydra:member"]}
              ></TenantsDropdown>
              <Alert className="mt-3 text-dark" variant="warning">
                {t("playlist-form.warning")}
              </Alert>
          </ContentBody>
        </>
      )}
    </>
  );
}

PlaylistForm.propTypes = {
  playlist: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default PlaylistForm;

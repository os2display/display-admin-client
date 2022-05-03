import { React } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import idFromUrl from "../util/helpers/id-from-url";
import { useGetV1CampaignsByIdScreenGroupsQuery } from "../../redux/api/api.generated";
import ContentBody from "../util/content-body/content-body";
import SelectScreensTable from "../util/multi-and-table/select-screens-table";
import SelectGroupsTable from "../util/multi-and-table/select-groups-table";

/**
 * The campaign form component.
 *
 * @param {object} props - The props.
 * @param {object} props.campaign The campaign object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @returns {object} The campaign form.
 */
function CampaignForm({ campaign, handleInput }) {
  const { t } = useTranslation("common");

  return (
    <>
      {campaign && (
        <>
          <ContentBody>
            <h2 className="h4">{t("campaign-form.title-campaign-screens")}</h2>
            <SelectScreensTable
              handleChange={handleInput}
              name="screens"
              campaignId={idFromUrl(campaign["@id"])}
            />
          </ContentBody>
          <ContentBody>
            <h2 className="h4">{t("campaign-form.title-campaign-groups")}</h2>
            <SelectGroupsTable
              handleChange={handleInput}
              name="groups"
              getSelectedMethod={useGetV1CampaignsByIdScreenGroupsQuery}
              id={idFromUrl(campaign["@id"])}
            />
          </ContentBody>
        </>
      )}
    </>
  );
}
CampaignForm.propTypes = {
  campaign: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
};

export default CampaignForm;

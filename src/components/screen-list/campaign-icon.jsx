import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import idFromUrl from "../util/helpers/id-from-url";
import calculateIsPublished from "../util/helpers/calculate-is-published";
import {
  api,
  useGetV2ScreensByIdCampaignsQuery,
  useGetV2ScreensByIdScreenGroupsQuery,
} from "../../redux/api/api.generated.ts";

/**
 * An icon to show if the screen has an active campaign.
 *
 * @param {object} props - The props.
 * @param {string} props.id The id of the screen.
 * @returns {object} The campaign icon.
 */
function CampaignIcon({ id }) {
  const { t } = useTranslation("common", { keyPrefix: "campaign-icon" });
  const dispatch = useDispatch();
  const [isOverriddenByCampaign, setIsOverriddenByCampaign] = useState(false);
  const [screenCampaignsChecked, setScreenCampaignsChecked] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const { data: campaigns } = useGetV2ScreensByIdCampaignsQuery({ id });
  const { data: groups } = useGetV2ScreensByIdScreenGroupsQuery({ id });

  useEffect(() => {
    if (campaigns) {
      setAllCampaigns(
        campaigns["hydra:member"].map(({ campaign }) => campaign)
      );
      setScreenCampaignsChecked(true);
    }
  }, [campaigns]);

  useEffect(() => {
    if (groups && !isOverriddenByCampaign && screenCampaignsChecked) {
      groups["hydra:member"].forEach((group) => {
        dispatch(
          api.endpoints.getV2ScreenGroupsByIdCampaigns.initiate({
            id: idFromUrl(group["@id"]),
          })
        ).then((result) => {
          let allCampaignsCopy = [...allCampaigns];
          if (allCampaignsCopy.length > 0 && result.data) {
            allCampaignsCopy = allCampaignsCopy.concat(
              result.data["hydra:member"].map(({ campaign }) => campaign)
            );
          }
          setAllCampaigns(allCampaignsCopy);
        });
      });
    }
  }, [groups, screenCampaignsChecked]);

  useEffect(() => {
    if (allCampaigns.length > 0 && !isOverriddenByCampaign) {
      allCampaigns.forEach(({ published }) => {
        if (calculateIsPublished(published)) {
          setIsOverriddenByCampaign(true);
        }
      });
    }
  }, [allCampaigns]);

  return isOverriddenByCampaign
    ? t("overridden-by-campaign")
    : t("not-overridden-by-campaign");
}

CampaignIcon.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CampaignIcon;

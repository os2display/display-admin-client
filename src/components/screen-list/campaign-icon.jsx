import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import idFromUrl from "../util/helpers/id-from-url";
import calculateIsPublished from '../util/helpers/calculate-is-published';
import {
  api,
  useGetV1ScreensByIdCampaignsQuery,
  useGetV1ScreensByIdScreenGroupsQuery,
} from "../../redux/api/api.generated";

/**
 * @param {object} props The props.
 * @param {boolean} props.screen Whether it is overridden by
 *   campaign or not.
 * @param screen
 * @returns {object} The published yes/no component.
 */
function CampaignIcon(id) {
  const dispatch = useDispatch();
  const [isOverriddenByCampaign, setIsOverriddenByCampaign] = useState(false);
  const [screenCampaignsChecked, setScreenCampaignsChecked] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const { data: campaigns } = useGetV1ScreensByIdCampaignsQuery({ id });
  const { data: groups } = useGetV1ScreensByIdScreenGroupsQuery({ id });

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
          api.endpoints.getV1ScreenGroupsByIdCampaigns.initiate({
            id: idFromUrl(group["@id"]),
          })
        ).then((result) => {
          let allCampaignsCopy = [...allCampaigns];
          allCampaignsCopy = allCampaignsCopy.concat(
            result.data["hydra:member"].map(({ campaign }) => campaign)
          );
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

  return (
    <FontAwesomeIcon
      icon={faExclamationCircle}
      style={isOverriddenByCampaign ? { color: "red" } : { color: "grey" }}
    />
  );
}

CampaignIcon.propTypes = {
  overriddenByCampaign: PropTypes.bool.isRequired,
};

export default CampaignIcon;

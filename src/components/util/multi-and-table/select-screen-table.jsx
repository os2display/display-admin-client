import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Table from "../table/table";
import ScreensDropdown from "../forms/multiselect-dropdown/screens/screens-dropdown";
import CampaignIcon from "../../screen-list/campaign-icon";
import LiveIcon from "../../screen-list/live-icon";
import ListButton from "../list/list-button";
import InfoModal from "../../info-modal/info-modal";
import { useGetV1ScreensQuery } from "../../../redux/api/api.generated";
/**
 * A multiselect and table for screens.
 *
 * @param {string} props
 * the props.
 * @param {string} props.name
 * The name for the input
 * @param {string} props.selectedDataEndpoint
 * The data for the multidropdown.
 * @param {Array} props.errors
 * A list of errors, or null.
 * @returns {object}
 * An input.
 */
function SelectScreenTable({
  handleChange,
  name,
  selectedDataEndpoint,
  errors,
}) {
  const { t } = useTranslation("common");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [inGroups, setInGroups] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const { data, isLoading } = useGetV1ScreensQuery({});

  // Sets the selected data form endpoint ids.
  useEffect(() => {
    if (selectedDataEndpoint.length > 0 && data) {
      const localMappedSelected = data["hydra:member"].filter((item) =>
        selectedDataEndpoint.includes(item["@id"])
      );
      setSelectedData(localMappedSelected);
    }
  }, [selectedDataEndpoint, data]);

  /**
   * @param {Array} groupsArray
   * The array of groups.
   */
  function openInfoModal(groupsArray) {
    setInGroups(groupsArray);
    setShowInfoModal(true);
  }
  /**
   * Closes the info modal.
   */
  function onCloseInfoModal() {
    setShowInfoModal(false);
    setInGroups();
  }
  /**
   * Removes screen from list of screens.
   *
   * @param {object} removeItem
   * The item to remove.
   */
  function removeFromList(removeItem) {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item["@id"];
      })
      .indexOf(removeItem["@id"]);
    const selectedDataCopy = [...selectedData];
    selectedDataCopy.splice(indexOfItemToRemove, 1);
    setSelectedData(selectedDataCopy);

    const target = {
      value: selectedDataCopy.map((item) => item["@id"]),
      id: name,
    };
    handleChange({ target });
  }

  /**
   * Fetches data for the multi component // @TODO:
   *
   * @param {string} filter - the filter.
   */
  function onFilter(filter) {
    console.log(filter); // eslint-disable-line no-console
  }

  /**
   * Adds screen to list of screens.
   *
   * @param {object} props - the props.
   * @param {object} props.target - the target.
   */
  function handleAdd({ target }) {
    const { value, name: localName } = target;
    setSelectedData(value);
    handleChange({ name: localName, value: value.map((item) => item["@id"]) });
  }

  // The columns for the table.
  const columns = [
    {
      path: "live",
      label: t("select-screen-table.columns.live"),
      content: (screen) => LiveIcon(screen),
    },
    {
      path: "name",
      label: t("select-screen-table.columns.name"),
    },
    {
      path: "onFollowingGroups",
      content: (screen) =>
        ListButton(
          openInfoModal,
          screen.onFollowingGroups,
          screen.onFollowingGroups?.length,
          screen.onFollowingGroups?.length === 0
        ),
      key: "groups",
      label: t("select-screen-table.columns.on-groups"),
    },
    {
      path: "size",
      label: t("select-screen-table.columns.size"),
    },
    {
      path: "dimensions",
      label: t("select-screen-table.columns.dimensions"),
    },
    {
      path: "overriddenByCampaign",
      label: t("select-screen-table.columns.campaign"),
      content: (screen) => CampaignIcon(screen),
    },
    {
      key: "delete",
      content: (screen) => (
        <Button variant="danger" onClick={() => removeFromList(screen)}>
          {t("select-screen-table.remove-from-list")}
        </Button>
      ),
    },
  ];

  return (
    <>
      {!isLoading && data && data["hydra:member"] && (
        <>
          <ScreensDropdown
            errors={errors}
            name={name}
            data={data["hydra:member"]}
            handleScreenSelection={handleAdd}
            selected={selectedData}
            filterCallback={onFilter}
          />
          {selectedData.length > 0 && (
            <Table columns={columns} data={selectedData} />
          )}
          <InfoModal
            show={showInfoModal}
            onClose={onCloseInfoModal}
            dataStructureToDisplay={inGroups}
            modalTitle={t("select-screen-table.info-modal.screen-in-groups")}
          />
        </>
      )}
    </>
  );
}

SelectScreenTable.defaultProps = {
  errors: [],
};

SelectScreenTable.propTypes = {
  name: PropTypes.string.isRequired,
  selectedDataEndpoint: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SelectScreenTable;

import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { SelectSlideColumns } from "../../slide/slides-columns";
import DragAndDropTable from "../drag-and-drop-table/drag-and-drop-table";
import SlidesDropdown from "../forms/multiselect-dropdown/slides/slides-dropdown";
import {
  useGetV1SlidesQuery,
  useGetV1PlaylistsByIdSlidesQuery,
  useGetV1PlaylistsByIdQuery,
} from "../../../redux/api/api.generated";

/**
 * A multiselect and table for slides.
 *
 * @param {string} props - The props.
 * @param {Function} props.handleChange - The callback on change.
 * @param {string} props.name - The name for the input
 * @param {string} props.slideId - The slide id.
 * @returns {object} - A select slides table.
 */
function SelectSlidesTable({ handleChange, name, slideId }) {
  const { t } = useTranslation("common");
  const [selectedData, setSelectedData] = useState();
  const [searchText, setSearchText] = useState("");

  const { data: slides } = useGetV1SlidesQuery({
    title: searchText,
    itemsPerPage: 100,
    order: { createdAt: "desc" },
  });

  const { data } = useGetV1PlaylistsByIdSlidesQuery({ id: slideId });

  /** Map loaded data. */
  useEffect(() => {
    if (data) {
      setSelectedData(
        data["hydra:member"].map(({ slide }) => {
          return slide;
        })
      );
    }
  }, [data]);

  /**
   * Adds group to list of groups.
   *
   * @param {object} props - The props.
   * @param {object} props.target - The target.
   */
  const handleAdd = ({ target }) => {
    const { value, id } = target;
    setSelectedData(value);
    handleChange({
      target: { id, value: value.map((item) => item["@id"]) },
    });
  };

  /**
   * Fetches data for the multi component
   *
   * @param {string} filter - The filter.
   */
  const onFilter = (filter) => {
    setSearchText(filter);
  };

  /**
   * Removes playlist from list of groups.
   *
   * @param {object} removeItem The item to remove.
   */
  const removeFromList = (removeItem) => {
    const indexOfItemToRemove = selectedData
      .map((item) => {
        return item["@id"];
      })
      .indexOf(removeItem);
    const selectedDataCopy = [...selectedData];
    selectedDataCopy.splice(indexOfItemToRemove, 1);
    setSelectedData(selectedDataCopy);

    const target = {
      value: selectedDataCopy.map((item) => item["@id"]),
      id: name,
    };
    handleChange({ target });
  };
  /* eslint-disable-next-line no-unused-vars */
  const columns = SelectSlideColumns({
    handleDelete: removeFromList,
    apiCall: useGetV1PlaylistsByIdQuery,
    editTarget: "slide",
    infoModalRedirect: "/playlist/edit",
    infoModalTitle: t("select-slides-table.info-modal.slide-on-playlists"),
  });

  return (
    <>
      {slides && slides["hydra:member"] && (
        <>
          <SlidesDropdown
            name={name}
            handleSlideSelection={handleAdd}
            selected={selectedData}
            data={slides["hydra:member"]}
            filterCallback={onFilter}
          />
          {selectedData?.length > 0 && (
            <>
              <DragAndDropTable
                columns={columns}
                onDropped={handleAdd}
                name={name}
                data={selectedData}
              />
              <small>{t("select-slides-table.edit-slides-help-text")}</small>
            </>
          )}
        </>
      )}
    </>
  );
}

SelectSlidesTable.defaultProps = {
  slideId: "",
};

SelectSlidesTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  slideId: PropTypes.string,
};

export default SelectSlidesTable;

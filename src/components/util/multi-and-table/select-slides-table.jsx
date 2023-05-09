import { React, useEffect, useState } from "react";
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
import PlaylistGanttChart from "../../playlist/playlist-gantt-chart";
import PaginationButton from "../forms/multiselect-dropdown/pagination-button";

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
  const { t } = useTranslation("common", { keyPrefix: "select-slides-table" });
  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);

  const { data: slides } = useGetV1SlidesQuery({
    title: searchText,
    itemsPerPage: 30,
    order: { createdAt: "desc" },
  });

  const { data } = useGetV1PlaylistsByIdSlidesQuery({
    id: slideId,
    itemsPerPage: 10,
    page,
  });

  useEffect(() => {
    if (data) {
      setTotalItems(data["hydra:totalItems"]);
      const newSlides = data["hydra:member"].map(({ slide }) => {
        return slide;
      });
      setSelectedData([...selectedData, ...newSlides]);
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
    infoModalTitle: t("info-modal.slide-on-playlists"),
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
                totalItems={totalItems}
                label={t("more-slides")}
                callback={() => setPage(page + 1)}
              />
              <small>{t("edit-slides-help-text")}</small>
              <PlaylistGanttChart slides={selectedData} />
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

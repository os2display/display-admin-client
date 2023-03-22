import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { SelectSlideColumns } from "../../slide/slides-columns";
import DragAndDropTable from "../drag-and-drop-table/drag-and-drop-table";
import SlidesDropdown from "../forms/multiselect-dropdown/slides/slides-dropdown";
import {
  api,
  useGetV1PlaylistsByIdQuery,
  useGetV1SlidesQuery,
} from "../../../redux/api/api.generated";
import PlaylistGanttChart from "../../playlist/playlist-gantt-chart";
import { displayError } from "../list/toast-component/display-toast";

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
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState();
  const [searchText, setSearchText] = useState("");

  const { data: slides } = useGetV1SlidesQuery({
    title: searchText,
    itemsPerPage: 30,
    order: { createdAt: "desc" },
  });

  const resultCompleteCallback = (data) => {
    setSelectedData(data.map(({ slide }) => slide));
  };

  const getPlaylistSlides = (data, page, itemsPerPage) => {
    dispatch(
      api.endpoints.getV1PlaylistsByIdSlides.initiate({
        id: slideId,
        itemsPerPage,
        page,
      })
    )
      .then((result) => {
        if (result.isSuccess) {
          const newData = [...data, ...result.data["hydra:member"]];

          if (page * itemsPerPage < result.data["hydra:totalItems"]) {
            getPlaylistSlides(newData, page + 1, itemsPerPage);
          } else {
            resultCompleteCallback(newData);
          }
        }
      })
      .catch((error) => {
        displayError(t("error-messages.load-selected-slides-error"), error);
      });
  };

  useEffect(() => {
    getPlaylistSlides([], 1, 30);
  }, []);

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

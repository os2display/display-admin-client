import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Alert, Button, Card } from "react-bootstrap";
import dayjs from "dayjs";
import { SelectSlideColumns } from "../../slide/slides-columns";
import DragAndDropTable from "../drag-and-drop-table/drag-and-drop-table";
import SlidesDropdown from "../forms/multiselect-dropdown/slides/slides-dropdown";
import {
  useGetV2SlidesQuery,
  useGetV2PlaylistsByIdSlidesQuery,
  useGetV2PlaylistsByIdQuery,
} from "../../../redux/api/api.generated.ts";
import PlaylistGanttChart from "../../playlist/playlist-gantt-chart";

/**
 * A multiselect and table for slides.
 *
 * @param {string} props - The props.
 * @param {Function} props.handleChange - The callback on change.
 * @param {string} props.name - The name for the input
 * @param {string} props.slideId - The slide id.
 * @returns {object} - A select slides table.
 */
function SelectSlidesTable({ handleChange, name, slideId = "" }) {
  const { t } = useTranslation("common", { keyPrefix: "select-slides-table" });
  const [searchText, setSearchText] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);

  const { data: slides } = useGetV2SlidesQuery({
    title: searchText,
    itemsPerPage: 30,
    order: { createdAt: "desc" },
  });

  const { data } = useGetV2PlaylistsByIdSlidesQuery(
    {
      id: slideId,
      itemsPerPage: 30,
      page,
    },
    { skip: !slideId }
  );

  const changeOrderByStatus = () => {
    const expired = [];
    const active = [];
    const future = [];

    const now = dayjs(new Date());

    selectedData.forEach((entry) => {
      const { published } = entry;
      const from = published.from ? dayjs(published.from) : null;
      const to = published.to ? dayjs(published.to) : null;

      if (to !== null && to.isBefore(now)) {
        expired.push(entry);
      } else if (from !== null && from.isAfter(now)) {
        future.push(entry);
      } else {
        active.push(entry);
      }
    });

    setSelectedData([...expired, ...active, ...future]);
  };

  const changeOrderByExpirationDate = () => {
    const newData = [...selectedData];

    newData.sort((a, b) => {
      if (a.published?.to === null) {
        return 1;
      }
      if (b.published?.to === null) {
        return -1;
      }

      return a.published.to > b.published?.to ? 1 : -1;
    });

    setSelectedData(newData);
  };

  useEffect(() => {
    if (data) {
      setTotalItems(data["hydra:totalItems"]);
      const newSlides = data["hydra:member"].map(({ slide }) => {
        return slide;
      });

      setSelectedData([...selectedData, ...newSlides]);

      // Get all selected slides. If a next page is defined, get the next page.
      if (data["hydra:view"]["hydra:next"]) {
        setPage(page + 1);
      }
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
    apiCall: useGetV2PlaylistsByIdQuery,
    editTarget: "slide",
    infoModalRedirect: "/playlist/edit",
    infoModalTitle: t("info-modal.slide-on-playlists"),
    hideColumns: {
      createdBy: true,
      template: true,
      playlists: true,
    },
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

              <div className="border mt-3 mb-3 card">
                <div className="mb-2 card-header">{t("change-order-by-status-headline")}</div>
                <div className="card-body">
                  <Button type="button" className="btn btn-secondary mb-1 btn-sm me-2" onClick={changeOrderByStatus}>
                    {t("change-order-by-status")}
                  </Button>
                  <Button type="button" className="btn btn-secondary mb-1 btn-sm" onClick={changeOrderByExpirationDate}>
                    {t("change-order-by-expiration-date")}
                  </Button>
                </div>
                <div className="card-footer"><small>{t("change-order-by-status-helptext")}</small></div>
              </div>

              <PlaylistGanttChart slides={selectedData} />
            </>
          )}
        </>
      )}
    </>
  );
}

SelectSlidesTable.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  slideId: PropTypes.string,
};

export default SelectSlidesTable;

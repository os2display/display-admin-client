import { React, useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Table from "../table/table";
import SearchBox from "../search-box";
import DeleteModal from "../../delete-modal/delete-modal";
import Pagination from "../paginate/pagination";
import paginate from "../paginate/paginate";
import ColumnProptypes from "../../proptypes/column-proptypes";
import SelectedCellsProptypes from "../../proptypes/selected-cells-proptypes";
import ConsolidateModal from "../../consolidate-modal/consoliate-modal";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.data
 * The data for the list.
 * @param {Array} props.columns
 * The columns for the table.
 * @param {Array} props.selectedCells
 * The selected cells, for styling.
 * @returns {object}
 *   The List.
 */
function List({ data, columns, selectedCells }) {
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search).get("search");
  const [searchText, setSearchText] = useState(searchParams);
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConsolidateModal, setShowConsolidateModal] = useState(false);

  /**
   * @param {string} newSearchText
   * Updates the search text state and url.
   */
  function handleSearch(newSearchText) {
    const params = new URLSearchParams({ search: newSearchText });
    history.replace({ search: params.toString() });
    setSearchText(newSearchText);
  }
  /**
   * If they search or filter, the pagination is reset.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, sortBy]);

  /**
   * Closes delete modal.
   */
  function onCloseDeleteModal() {
    setShowDeleteModal(false);
  }

  /**
   * Closes consolidate modal.
   */
  function onCloseConsolidateModal() {
    setShowConsolidateModal(false);
  }

  /**
   * @param {number} page
   * updates pagination page.
   */
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  /**
   * @param {object} sortColumn
   * updates sortcolumn.
   */
  function handleSort(sortColumn) {
    setSortBy(sortColumn);
  }

  /**
   * @param {object} dataToFilter
   * Search filter function.
   *    @returns {boolean}
   *   Whether the searchtext is in the data entry.
   */
  function filterDataFromSearchInput(dataToFilter) {
    const dataValuesString = Object.values(dataToFilter).join(" ");
    return dataValuesString
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase());
  }
  /**
   * @param {string|number} a
   * sort parameter a
   * @param {string|number} b
   * sort parameter b
   * @returns {number}
   *   Sorting number.
   */
  function sortData(a, b) {
    let sortVarA = a[sortBy.path];
    let sortVarB = b[sortBy.path];

    sortVarA =
      typeof sortVarA === "string" ? sortVarA.toLocaleLowerCase() : sortVarA;
    sortVarB =
      typeof sortVarB === "string" ? sortVarB.toLocaleLowerCase() : sortVarB;
    if (sortVarA < sortVarB) {
      return -1;
    }
    if (sortVarA > sortVarB) {
      return 1;
    }

    return 0;
  }
  /**
   * @returns {object}
   *   returns object of paginated data array and length of data.
   */
  function getTableData() {
    let returnValue = data;
    if (searchText) {
      returnValue = returnValue.filter(filterDataFromSearchInput);
    }
    if (sortBy) {
      returnValue = returnValue.sort(sortData);
    }
    if (sortBy.order === "desc") {
      returnValue = returnValue.reverse();
    }
    const paginated = paginate(returnValue, currentPage, pageSize);
    return { data: paginated, length: returnValue.length };
  }

  /**
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the property.
   * @param {number} props.id
   * The id of the property
   */
  function handleDelete() {
    console.log(`deleted a bunch of stuff`); // eslint-disable-line
    setShowDeleteModal(false);
  }

  /**
   * @param {object} props
   * The props.
   * @param {string} props.name
   * The name of the property.
   * @param {number} props.id
   * The id of the property
   */
  function handleConsolidate({ id, name }) {
    console.log(`consolidated a bunch of stuff`); // eslint-disable-line
    setShowConsolidateModal(false);
  }

  return (
    <>
      <Row className="mt-2 mb-2">
        <Col>
          <SearchBox value={searchText} onChange={handleSearch} />
        </Col>
        <Col className="d-flex justify-content-end">
          <div className="ml-4">
            <Button
              variant="danger"
              disabled={!selectedCells.length > 0}
              onClick={() => setShowDeleteModal(true)}
            >
              Slet
            </Button>
          </div>
          <div className="ml-4">
            <Button
              className="ml-2"
              disabled={!selectedCells.length > 0}
              onClick={() => setShowConsolidateModal(true)}
              variant="success"
            >
              Konsolider
            </Button>
          </div>
        </Col>
      </Row>

      <Table
        onSort={handleSort}
        data={getTableData().data}
        sortColumn={sortBy}
        columns={columns}
        selectedCells={selectedCells}
      />
      <Pagination
        itemsCount={getTableData().length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <DeleteModal
        show={showDeleteModal}
        handleAccept={handleDelete}
        onClose={onCloseDeleteModal}
        selectedCells={selectedCells}
      />
      <ConsolidateModal
        show={showConsolidateModal}
        handleAccept={handleConsolidate}
        onClose={onCloseConsolidateModal}
        selectedCells={selectedCells}
      />
    </>
  );
}

List.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  selectedCells: SelectedCellsProptypes.isRequired,
};
export default List;

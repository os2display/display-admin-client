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

function List({ data, columns, selectedCells }) {
  const { search } = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(search).get("search");
  const [searchText, setSearchText] = useState(searchParams);
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  function handleSearch(newSearchText) {
    const params = new URLSearchParams({ search: newSearchText });
    history.replace({ search: params.toString() });
    setSearchText(newSearchText);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, sortBy]);

  function onCloseModal() {
    setShowDeleteModal(false);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleSort(sortColumn) {
    setSortBy(sortColumn);
  }

  function filterDataFromSearchInput(dataToFilter) {
    const dataValuesString = Object.values(dataToFilter).join(" ");
    return dataValuesString
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase());
  }
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
        onClose={onCloseModal}
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

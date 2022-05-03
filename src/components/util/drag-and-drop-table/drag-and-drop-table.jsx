import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import TableHeader from "../table/table-header";
import ColumnProptypes from "../../proptypes/column-proptypes";
import "./drag-and-drop-table.scss";

/**
 * @param {object} props The props.
 * @param {Array} props.columns The columns for the table.
 * @param {Array} props.data The data to display in the table.
 * @param {string} props.name The id of the form element
 * @param {Function} props.onDropped Callback for when an items is dropped and
 *   the list is reordered.
 * @returns {object} The drag and drop table.
 */
function DragAndDropTable({ columns, data, name, onDropped }) {
  const { t } = useTranslation("common", {
    keyPrefix: "drag-and-drop-table",
  });

  /**
   * Renders a cell with the content received.
   *
   * @param {object} item The item to render.
   * @param {object} column The column to render.
   * @returns {object | string} Returns a rendered jsx object, or the path.
   */
  function renderCell(item, column) {
    if (column.render && !column.render(item)) {
      return t("not-available");
    }
    if (column.content) {
      return column.content(item);
    }
    return item[column.path];
  }

  /**
   * Reorders an array after drag and drop.
   *
   * @param {Array} listOfPlaylists The data to reorder
   * @param {number} startIndex Start index of the dropped element
   * @param {number} endIndex End index of the dropped element
   * @returns {Array} Array of reordered elements after drag and drop.
   */
  function reorder(listOfPlaylists, startIndex, endIndex) {
    const [removed] = listOfPlaylists.splice(startIndex, 1);
    listOfPlaylists.splice(endIndex, 0, removed);

    return listOfPlaylists;
  }

  /**
   * Called when an item is dropped, callback with reordered data.
   *
   * @param {object} result The result object of the drag and drop, has
   *   destination, source (startindex) and index (endindex).
   */
  function onDragEnd(result) {
    // If dropped outside the list, return
    if (!result.destination) {
      return;
    }

    const reorderedListOfPlaylists = reorder(
      data,
      result.source.index,
      result.destination.index
    );
    const target = { value: reorderedListOfPlaylists, id: name };
    onDropped({ target });
  }

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightgrey" : "white",
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 10 * 2,
    margin: `0 0 ${10}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div className="table-responsive">
      <Table id="drag-and-drop-table">
        <TableHeader columns={columns} draggable />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <tbody
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <>
                  {data.map((item, index) => (
                    <Draggable
                      key={item["@id"]}
                      draggableId={item.title}
                      index={index}
                    >
                      {(providedDraggable, providedSnapshot) => (
                        <tr
                          ref={providedDraggable.innerRef}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          style={getItemStyle(
                            providedSnapshot.isDragging,
                            providedDraggable.draggableProps.style
                          )}
                        >
                          <td>
                            <FontAwesomeIcon
                              className="table-draggable-grip me-1"
                              icon={faGripVertical}
                            />
                          </td>
                          {columns.map((column) => (
                            <td key={item["@id"] + (column.path || column.key)}>
                              {renderCell(item, column)}
                            </td>
                          ))}
                        </tr>
                      )}
                    </Draggable>
                  ))}
                </>
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
      <small id="aria-label-for-drag-and-drop">{t("help-text")}</small>
    </div>
  );
}

DragAndDropTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  name: PropTypes.string.isRequired,
  onDropped: PropTypes.func.isRequired,
};
export default DragAndDropTable;

import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Table } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ColumnProptypes from "../../proptypes/column-proptypes";
import TableHeader from "../table/table-header";

/**
 * @param {object} props
 * The props.
 * @param {Array} props.columns
 * The columns for the table.
 * @param {Array} props.data
 * The data to display in the table.
 * @param {string} props.formId
 * The id of the form element
 * @param {Function} props.onDropped
 * Callback for when an items is dropped and the list is reordered.
 * @returns {object}
 * The drag and drop table.
 */
function DragAndDropTable({ columns, data, formId, onDropped }) {
  /**
   * Renders a cell with the content received.
   *
   * @param {object} item
   * The item to render.
   * @param {object} column
   * the column to render.
   * @returns {object|string}
   * returns a rendered jsx object, or the path.
   */
  function renderCell(item, column) {
    if (column.content) {
      return column.content(item);
    }
    return item[column.path];
  }

  /**
   * Reorders an array after drag and drop.
   *
   * @param {Array} listOfPlaylists
   * The data to reorder
   * @param {number} startIndex
   * Start index of the dropped element
   * @param {number} endIndex
   * End index of the dropped element
   * @returns {Array}
   * Array of reordered elements after drag and drop.
   */
  function reorder(listOfPlaylists, startIndex, endIndex) {
    const [removed] = listOfPlaylists.splice(startIndex, 1);
    listOfPlaylists.splice(endIndex, 0, removed);

    return listOfPlaylists;
  }

  /**
   * Called when an item is dropped, callback with reordered data.
   *
   * @param {object} result
   * The result object of the drag and drop, has
   * destination, source (startindex) and index (endindex).
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
    const target = { value: reorderedListOfPlaylists, id: formId };
    onDropped({ target });
  }

  return (
    <div>
      <Table>
        <TableHeader columns={columns} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <tbody
                data-rbd-droppable-id="droppable"
                data-rbd-droppable-context-id="1"
                ref={provided.innerRef}
              >
                <>
                  {data.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.name}
                      index={index}
                    >
                      {(providedDraggable) => (
                        <tr
                          ref={providedDraggable.innerRef}
                          data-rbd-draggable-context-id="1"
                          data-rbd-draggable-id={item.name}
                          tabIndex="0"
                          role="button"
                          aria-describedby="aria-label-for-drag-and-drop"
                          data-rbd-drag-handle-draggable-id={item.name}
                          data-rbd-drag-handle-context-id="1"
                          draggable="false"
                          style={providedDraggable.draggableProps.style}
                        >
                          {columns.map((column) => (
                            <td key={item.id + (column.path || column.key)}>
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
      <small id="aria-label-for-drag-and-drop" className="form-text">
        <FormattedMessage
          id="drag_and_drop_helptext"
          defaultMessage="drag_and_drop_helptext"
        />
      </small>
    </div>
  );
}

DragAndDropTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
  ).isRequired,
  columns: ColumnProptypes.isRequired,
  formId: PropTypes.string.isRequired,
  onDropped: PropTypes.func.isRequired,
};
export default DragAndDropTable;

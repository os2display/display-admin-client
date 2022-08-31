import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import Calendar from "./calendar";
import idFromUrl from "../util/helpers/id-from-url";
import { api } from "../../redux/api/api.generated";

<Spinner animation="border" className="loading-spinner" />;
/**
 * @param {object} props The props.
 * @param {object} props.item The playlist.
 * @returns {object} The calendar list.
 */
function PlaylistCalendarCell({ item: playlist }) {
  const [dataForCalendar, setDataForCalendar] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      api.endpoints.getV1PlaylistsByIdSlides.initiate({
        id: idFromUrl(playlist["@id"]),
      })
    ).then((result) => {
      let slides = [];
      if (result.data) {
        // As playlists default to being published, if they have no values for
        // from / to, I here create today (from), and a year from today (to).
        const today = new Date();

        const inAYear = new Date(
          today.getFullYear() + 1,
          today.getMonth(),
          today.getDate()
        );
        slides = result.data["hydra:member"].map(({ slide }) => {
          return {
            title: slide.title,
            category: slide["@id"],
            categoryTitle: slide.title,
            from: slide.published?.from || today,
            to: slide.published?.to || inAYear,
            id: slide["@id"],
            color: "lightblue",
            black: "#000",
          };
        });
      }

      return setDataForCalendar(slides);
    });
  }, []);

  return (
    <>
      <tr key={playlist["@id"]}>
        <td colSpan="100%">
          <>
            <h2 className="h4">{playlist.title}</h2>
            {dataForCalendar && (
              <Calendar
                id={playlist["@id"]}
                data={dataForCalendar}
                component="slide"
              />
            )}
            {!dataForCalendar && (
              <Spinner animation="border" className="loading-spinner" />
            )}
          </>
        </td>
      </tr>
    </>
  );
}

PlaylistCalendarCell.defaultProps = {
  item: {},
};

PlaylistCalendarCell.propTypes = {
  item: PropTypes.shape({
    "@id": PropTypes.string,
    title: PropTypes.string,
  }),
};
export default PlaylistCalendarCell;

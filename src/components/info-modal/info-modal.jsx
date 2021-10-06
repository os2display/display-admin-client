import { React, useState, useEffect } from "react";
import PropTypes, { array } from "prop-types";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import ModalDialog from "../util/modal/modal-dialog";
import TitleFetcher from "./title-fetcher";
import idFromUrl from "../util/helpers/id-from-url";
/**
 * Info modal component, that displays an info string.
 *
 * @param {object} props
 * Props.
 * @param {boolean} props.show
 * Whether to show the modal.
 * @param {Function} props.onClose
 * Callback on close modal.
 * @param {Function} props.apiCall
 * apiCall for data.
 * @param {Array} props.dataStructureToDisplay
 * The playlists to list.
 * @param {string} props.modalTitle
 * The info modal string.
 * @returns {object}
 * The modal.
 */
function InfoModal({
  show,
  onClose,
  apiCall,
  dataStructureToDisplay,
  modalTitle,
}) {
  if (!show) {
    return <></>;
  }
  const { t } = useTranslation("common");
  const paginationVariables = 10;
  const [totalItems, setTotalItems] = useState(dataStructureToDisplay.length);
  const [paginatedDataStructure, setPaginatedDataStructure] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [page, setPage] = useState(1);
  let data;
  if (!Array.isArray(dataStructureToDisplay)) {
    data = apiCall({ id: idFromUrl(dataStructureToDisplay), page: page });
  }

  useEffect(() => {
    if (Array.isArray(dataStructureToDisplay)) {
      setPaginatedDataStructure(
        dataStructureToDisplay.slice(0, page * paginationVariables)
      );
      setTotalItems(dataStructureToDisplay.length);
    }
  }, []);

  /**
   * Set loaded data into form state.
   */
  useEffect(() => {
    if (data?.data) {
      let sdf = {
        "@context": "/contexts/Slide",
        "@id": "/v1/slides",
        "@type": "hydra:Collection",
        "hydra:member": [
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AYV",
            title: "Officia aut enim iusto quae.",
            description:
              "Quia excepturi ipsum culpa dolorum similique a. Quae veniam qui qui aspernatur ut. Nesciunt eius est minus quis. Consequatur eligendi minus aut ea.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN73Z",
              options: [],
            },
            onPlaylists: [],
            duration: 100293,
            published: {
              from: "2021-11-02T11:50:41Z",
              to: "2020-12-22T19:14:12Z",
            },
            media: [
              "/v1/media/01FHA5HVWF7PP245DFDY5AC4NP",
              "/v1/media/01FHA5HVWGGTFE0HJ99GSKC54D",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AYW",
            title: "Molestiae autem id nobis.",
            description:
              "Repudiandae id aliquam reprehenderit. Tempora ipsam error vel laudantium qui assumenda a iusto. Dolor nihil dolore unde nihil ducimus rerum. Similique et perferendis distinctio minima fugit corrupti.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN73W",
              options: [],
            },
            onPlaylists: [],
            duration: 38823,
            published: {
              from: "2021-09-27T14:12:45Z",
              to: "2021-07-24T01:33:07Z",
            },
            media: [
              "/v1/media/01FHA5HVWF7PP245DFDY5AC4NE",
              "/v1/media/01FHA5HVWGGTFE0HJ99GSKC54J",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AYX",
            title: "Quo autem id ut.",
            description:
              "Et ipsam molestiae ipsam consequatur quaerat minima. Corrupti veritatis aspernatur neque et quia saepe itaque. Laborum aut commodi et.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTAD1",
              options: [],
            },
            onPlaylists: [],
            duration: 74675,
            published: {
              from: "2020-10-12T21:17:47Z",
              to: "2021-12-03T18:21:26Z",
            },
            media: [
              "/v1/media/01FHA5HVWEBQTGEE9DEAQDSGYF",
              "/v1/media/01FHA5HVWEBQTGEE9DEAQDSGYJ",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AYY",
            title: "Nihil dolores et maxime tempora.",
            description:
              "Aut totam molestiae assumenda. Doloremque ab unde a cumque culpa voluptatum molestias. Totam similique voluptatum mollitia ab quo error rerum.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN73X",
              options: [],
            },
            onPlaylists: ["/v1/playlists/01FHA5HVVB81CKQS96J4DJ7D6X"],
            duration: 31993,
            published: {
              from: "2021-03-28T03:19:13Z",
              to: "2020-12-29T11:14:56Z",
            },
            media: [
              "/v1/media/01FHA5HVWDQDH4WP0RVX7FKJV4",
              "/v1/media/01FHA5HVWEBQTGEE9DEAQDSGYJ",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AYZ",
            title: "Ut ducimus suscipit quia nostrum.",
            description:
              "Ex voluptas aut neque sit numquam vel est. Ab doloribus cupiditate excepturi non.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN73Z",
              options: [],
            },
            onPlaylists: ["/v1/playlists/01FHA5HVVB81CKQS96J4DJ7D6Y"],
            duration: 77738,
            published: {
              from: "2021-07-21T22:24:47Z",
              to: "2021-01-18T11:01:52Z",
            },
            media: [
              "/v1/media/01FHA5HVW99AFGH907RJA8FV9N",
              "/v1/media/01FHA5HVWF7PP245DFDY5AC4NM",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AZ0",
            title: "Explicabo assumenda sit repellat sint.",
            description:
              "Et totam adipisci et odit. Tempora aut quidem quam dignissimos adipisci. Beatae laboriosam possimus ut voluptatibus et maiores ex ratione. Consequatur est est et eveniet porro non.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTACS",
              options: [],
            },
            onPlaylists: [],
            duration: 27739,
            published: {
              from: "2021-01-04T14:04:48Z",
              to: "2021-03-14T19:04:54Z",
            },
            media: [
              "/v1/media/01FHA5HVWDQDH4WP0RVX7FKJV9",
              "/v1/media/01FHA5HVWHZ52JF754SBJ74NSP",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AZ1",
            title: "Dolores distinctio velit fugiat.",
            description:
              "Aut saepe reprehenderit quis modi molestias qui expedita delectus. Magni qui animi aut minus deleniti illo blanditiis. Quia illum et pariatur enim animi.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN740",
              options: [],
            },
            onPlaylists: [],
            duration: 33021,
            published: {
              from: "2021-06-05T00:50:15Z",
              to: "2021-02-19T18:57:54Z",
            },
            media: [
              "/v1/media/01FHA5HVWEBQTGEE9DEAQDSGYG",
              "/v1/media/01FHA5HVWEBQTGEE9DEAQDSGYN",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AZ2",
            title: "Earum natus eum rerum.",
            description:
              "Eius illo qui sunt sapiente numquam est dolore veritatis. Occaecati sequi quod assumenda praesentium amet ut. Voluptatem autem ratione hic nihil eligendi.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTACV",
              options: [],
            },
            onPlaylists: [],
            duration: 51587,
            published: {
              from: "2021-10-09T02:34:34Z",
              to: "2021-09-19T22:12:40Z",
            },
            media: [
              "/v1/media/01FHA5HVWF7PP245DFDY5AC4NH",
              "/v1/media/01FHA5HVWF7PP245DFDY5AC4NK",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AZ3",
            title: "Pariatur eius voluptatem deleniti molestias sunt.",
            description:
              "Amet corrupti dolorem rem doloremque voluptas aperiam. Veniam reiciendis ex quaerat. Aspernatur et placeat tenetur et minus.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTAD1",
              options: [],
            },
            onPlaylists: [],
            duration: 52429,
            published: {
              from: "2021-03-23T08:56:22Z",
              to: "2020-11-27T07:19:28Z",
            },
            media: [
              "/v1/media/01FHA5HVW99AFGH907RJA8FV9W",
              "/v1/media/01FHA5HVWHZ52JF754SBJ74NSR",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AZ4",
            title: "Est accusantium placeat.",
            description:
              "Dolor iure corporis nulla repellat. Qui saepe ipsam minima deleniti iure porro impedit aut. Deserunt sit vitae eligendi omnis ex tempore aut et. Vero blanditiis atque ad qui et autem iure nisi.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTACS",
              options: [],
            },
            onPlaylists: [],
            duration: 21748,
            published: {
              from: "2020-11-18T07:20:53Z",
              to: "2021-11-15T05:49:07Z",
            },
            media: [
              "/v1/media/01FHA5HVW8GAXBMDX0ENYN31TN",
              "/v1/media/01FHA5HVWDQDH4WP0RVX7FKJTX",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AZ5",
            title: "Qui a consequatur praesentium nobis.",
            description:
              "Dolorem nihil eius magni aspernatur tenetur rerum. Sequi dolore distinctio est perspiciatis autem tempore. Ut quae iste reprehenderit.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN73X",
              options: [],
            },
            onPlaylists: ["/v1/playlists/01FHA5HVVB81CKQS96J4DJ7D6T"],
            duration: 60441,
            published: {
              from: "2021-11-20T10:06:43Z",
              to: "2021-11-13T20:24:04Z",
            },
            media: [
              "/v1/media/01FHA5HVWDQDH4WP0RVX7FKJV7",
              "/v1/media/01FHA5HVWF7PP245DFDY5AC4NN",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTQDGBM0H6K1TWD7AZ6",
            title: "Nulla rerum eaque qui consectetur omnis.",
            description:
              "Provident vero ullam voluptatem dolores quasi quis. Eum rerum quasi excepturi optio. Beatae esse et ex fuga quis. Quod est aliquid aut.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTAD1",
              options: [],
            },
            onPlaylists: [],
            duration: 52863,
            published: {
              from: "2021-04-07T16:47:41Z",
              to: "2021-11-09T10:23:23Z",
            },
            media: [
              "/v1/media/01FHA5HVWC60VR2GVBH5K530FS",
              "/v1/media/01FHA5HVWEBQTGEE9DEAQDSGYE",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTRRX21A1E8QCHKVJHN",
            title: "Ducimus est mollitia rerum est.",
            description:
              "Quo fugiat harum sapiente repellat quo. Reprehenderit deleniti dignissimos libero doloribus quis provident. Aut aspernatur voluptatem et dolorum et omnis. Quia accusamus ea ea alias dolorem.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTAD0",
              options: [],
            },
            onPlaylists: [],
            duration: 37194,
            published: {
              from: "2021-10-21T12:06:23Z",
              to: "2020-11-13T02:59:35Z",
            },
            media: [
              "/v1/media/01FHA5HVWAZMG399XJQ04ZYVRT",
              "/v1/media/01FHA5HVWEBQTGEE9DEAQDSGYG",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTRRX21A1E8QCHKVJHP",
            title: "Nesciunt sint rerum molestias quisquam.",
            description:
              "Veniam ut explicabo exercitationem aut non id. Atque eum odit nihil ut dolores. Est dolore rerum est inventore sunt ipsam.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN73Y",
              options: [],
            },
            onPlaylists: [],
            duration: 36096,
            published: {
              from: "2021-04-09T05:48:24Z",
              to: "2021-05-05T07:16:29Z",
            },
            media: [
              "/v1/media/01FHA5HVWEBQTGEE9DEAQDSGYM",
              "/v1/media/01FHA5HVWGGTFE0HJ99GSKC54C",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTRRX21A1E8QCHKVJHQ",
            title: "Quos officiis voluptatibus.",
            description:
              "Enim quia in numquam odio quam ipsum. Sit harum repellendus voluptates autem. Qui incidunt aut illo voluptatem. Aut omnis dignissimos maiores voluptatem esse quasi.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN73W",
              options: [],
            },
            onPlaylists: [],
            duration: 45851,
            published: {
              from: "2021-08-13T05:16:55Z",
              to: "2021-04-26T00:13:45Z",
            },
            media: [
              "/v1/media/01FHA5HVW99AFGH907RJA8FV9J",
              "/v1/media/01FHA5HVWBB6YAHX1CR4BVB9N5",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTRRX21A1E8QCHKVJHR",
            title: "Expedita numquam dolorem quidem ullam quasi.",
            description:
              "Fugit quis deserunt minus alias nobis laboriosam. Voluptatem itaque voluptatem sapiente. Qui quis numquam voluptatem culpa.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN73Z",
              options: [],
            },
            onPlaylists: ["/v1/playlists/01FHA5HVVB81CKQS96J4DJ7D6V"],
            duration: 93695,
            published: {
              from: "2021-01-10T06:24:26Z",
              to: "2020-11-05T02:33:41Z",
            },
            media: [
              "/v1/media/01FHA5HVWC60VR2GVBH5K530FP",
              "/v1/media/01FHA5HVWDQDH4WP0RVX7FKJV5",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTRRX21A1E8QCHKVJHS",
            title: "Sit doloremque omnis nesciunt doloremque.",
            description:
              "Commodi earum eius porro ipsa est. Quia sapiente qui aperiam. Magnam quia et itaque molestias ea iste. Non animi nisi fugit magnam suscipit distinctio aut.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTACS",
              options: [],
            },
            onPlaylists: [],
            duration: 101043,
            published: {
              from: "2021-08-30T03:56:47Z",
              to: "2021-11-07T12:25:36Z",
            },
            media: [
              "/v1/media/01FHA5HVWAZMG399XJQ04ZYVRW",
              "/v1/media/01FHA5HVWGGTFE0HJ99GSKC54H",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTRRX21A1E8QCHKVJHT",
            title: "Facilis enim voluptatem accusantium.",
            description:
              "Nemo totam doloribus culpa unde. Dolor et a quisquam qui. Culpa voluptatum error eius nam cupiditate.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTACV",
              options: [],
            },
            onPlaylists: [],
            duration: 22148,
            published: {
              from: "2021-03-16T08:01:40Z",
              to: "2021-08-14T18:12:06Z",
            },
            media: [
              "/v1/media/01FHA5HVWAZMG399XJQ04ZYVRW",
              "/v1/media/01FHA5HVWGGTFE0HJ99GSKC54B",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTRRX21A1E8QCHKVJHV",
            title: "Ut iusto nostrum cum quae voluptates.",
            description:
              "Aliquam maiores quia numquam ea voluptas aut qui placeat. Dolor doloremque qui quis sapiente velit rerum eligendi. Rem nemo natus architecto eum. Id dolor voluptatem ut.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTACY",
              options: [],
            },
            onPlaylists: [],
            duration: 114389,
            published: {
              from: "2020-10-25T18:05:26Z",
              to: "2021-08-12T06:12:58Z",
            },
            media: [
              "/v1/media/01FHA5HVWDQDH4WP0RVX7FKJV8",
              "/v1/media/01FHA5HVWEBQTGEE9DEAQDSGYE",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTRRX21A1E8QCHKVJHW",
            title: "Ea quaerat consectetur et.",
            description:
              "Quo minus eaque in autem perferendis quidem optio. Rerum assumenda quia aut quo hic et. Et vitae voluptatem tempora illo esse possimus maiores.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTPXCVD48WZMDYNN73Y",
              options: [],
            },
            onPlaylists: [],
            duration: 7987,
            published: {
              from: "2021-01-08T14:20:01Z",
              to: "2021-05-11T11:41:10Z",
            },
            media: [
              "/v1/media/01FHA5HVW99AFGH907RJA8FV9V",
              "/v1/media/01FHA5HVWAZMG399XJQ04ZYVRT",
            ],
            content: [],
          },
          {
            "@type": "Slide",
            "@id": "/v1/slides/01FHA5HVTRRX21A1E8QCHKVJHX",
            title: "Maxime dolor est cupiditate possimus laboriosam.",
            description:
              "Porro quia ut eligendi ut autem voluptatem sit. Culpa dicta eos doloribus eligendi. Consequatur consequatur dolores exercitationem minima et. Est et impedit excepturi id nostrum tempora quia qui.",
            created: "2021-10-06T06:44:47Z",
            modified: "2021-10-06T06:44:47Z",
            modifiedBy: "",
            createdBy: "",
            templateInfo: {
              "@id": "/v1/templates/01FHA5HVTN9JZZHGR01PGJTACP",
              options: [],
            },
            onPlaylists: [],
            duration: 73400,
            published: {
              from: "2021-11-18T09:46:47Z",
              to: "2021-05-27T00:39:20Z",
            },
            media: [
              "/v1/media/01FHA5HVW99AFGH907RJA8FV9J",
              "/v1/media/01FHA5HVWC60VR2GVBH5K530FP",
            ],
            content: [],
          },
        ],
        "hydra:totalItems": 100,
        "hydra:view": {
          "@id": "/v1/slides?itemsPerPage=21&page=1",
          "@type": "hydra:PartialCollectionView",
          "hydra:first": "/v1/slides?itemsPerPage=21&page=1",
          "hydra:last": "/v1/slides?itemsPerPage=21&page=5",
          "hydra:next": "/v1/slides?itemsPerPage=21&page=2",
        },
      };
      setFetchedData(sdf["hydra:member"]);
      setTotalItems(sdf["hydra:totalItems"]);
    }
  }, [data]);

  /**
   * Displays more list entries.
   */
  function displayMore() {
    setPage(page + 1);
    if (Array.isArray(dataStructureToDisplay)) {
      let dataStructureToDisplayCopy = dataStructureToDisplay;
      dataStructureToDisplayCopy = dataStructureToDisplayCopy.slice(
        0,
        page * paginationVariables
      );
      setPaginatedDataStructure(dataStructureToDisplayCopy);
    }
  }

  return (
    <Modal scrollable show size="m" onHide={onClose} id="info-modal">
      <ModalDialog
        title={modalTitle}
        onClose={onClose}
        showAcceptButton={false}
        declineText={t("info-modal.decline-text")}
      >
        <ul>
          <>
            {paginatedDataStructure &&
              paginatedDataStructure.map((item) => (
                <TitleFetcher apiCall={apiCall} dataUrl={item} key={item} />
              ))}
            {fetchedData && fetchedData.map((item) => <li>{item.title}</li>)}
          </>
        </ul>
        {page * paginationVariables < totalItems && (
          <Button variant="primary" onClick={() => displayMore()}>
            {t("info-modal.show-more-elements")}
          </Button>
        )}
      </ModalDialog>
    </Modal>
  );
}
InfoModal.defaultProps = {
  dataStructureToDisplay: [],
};

InfoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  dataStructureToDisplay: PropTypes.arrayOf(PropTypes.string),
  apiCall: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
};

export default InfoModal;

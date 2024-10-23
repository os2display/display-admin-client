import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {React} from "react";

function Tooltip({ id, content }) {
  return <>
    <a data-tooltip-id={id} className="ms-1 me-1">
      <FontAwesomeIcon icon={faQuestionCircle} className="text-secondary"/>
    </a>
    <ReactTooltip
      id={id}
      openOnClick={true}
      content={content}
    />
  </>;
}

export default Tooltip;

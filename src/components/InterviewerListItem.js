import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

function InterviewerLitItem(props) {

  const interviewerListClass = classNames(
    "interviewers__item-image", {
    "interviewers__item--selected": props.selected === true,
    "interviewers__item--selected-image": props.selected && props.avatar
  }
  );

  return (
    <li className={interviewerListClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

export default InterviewerLitItem;
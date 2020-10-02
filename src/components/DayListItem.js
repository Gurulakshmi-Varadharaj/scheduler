import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  let text = "";
  const formatSpots = () => {
    if (props.spots === 0) {
      text = "no spots remaining";
    } else if (props.spots === 1) {
      text = `${props.spots} spot remaining`;
    } else {
      text = `${props.spots} spots remaining`;
    }
    return text;
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  )
}

export default DayListItem;
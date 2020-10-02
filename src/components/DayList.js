import React from "react";

//Importing DayListItem which is implemented for one item and 
//it is used to list all the items using DayList
import DayListItem from "components/DayListItem";

function DayList(props) {
  const listDay = props.days.map(day =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />
  );

  return <ul>{listDay}</ul>;
}

export default DayList;
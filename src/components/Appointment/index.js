import React from "react";

import "components/Appointment/styles.scss";

//Importing required Components to display Appointment
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {!props.interview ? <Empty /> : <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
    </article>
  );
}

export default Appointment;
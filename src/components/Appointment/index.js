import React from "react";

import "components/Appointment/styles.scss";

//Importing required Components to display Appointment
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

import { useVisualMode } from "hooks/useVisualMode";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  let { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(res => {
        transition(SHOW);
      });
  };

  //Render the component based on the custom Hook retun value
  return (
    < article className="appointment" >
      <Header time={props.time} />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {
        mode === CREATE && (
          <Form
            save={save}
            interviewers={props.interviewers}
            onSave={() => props.onSave}
            onCancel={() => back()}
          />
        )
      }
      {
        mode === SAVING && (
          <Status message="Saving" />
        )
      }
      {
        mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )
      }
    </article >
  );
}

export default Appointment;
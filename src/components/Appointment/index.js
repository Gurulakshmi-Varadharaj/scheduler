import React from "react";

import "components/Appointment/styles.scss";

//Importing required Components to display Appointment
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import { useVisualMode } from "hooks/useVisualMode";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(res => {
        transition(SHOW);
      })
      .catch(error => {
        transition(ERROR_SAVE, true)
      });
  };

  function cancel() {
    const interview = null;
    transition(DELETING);
    props.cancelInterview(props.id, interview)
      .then(res => {
        transition(EMPTY);
      })
      .catch(res => {
        transition(ERROR_DELETE, true);
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
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )
      }
      {
        mode === CONFIRM && (
          <Confirm
            cancel={cancel}
            message="Delete the appointment?"
            onConfirm={() => props.onConfirm}
            onCancel={() => back()}
          />
        )
      }
      {
        mode === DELETING && (
          <Status message="Deleting" />
        )
      }
      {
        mode === EDIT && (
          <Form
            save={save}
            name={props.interview.student}
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            onSave={() => props.onSave}
            onCancel={() => back()}
          />
        )
      }
      {
        mode === ERROR_SAVE && (
          <Error
            message="Could not save appointment."
            onClose={() => back()} />
        )
      }
      {
        mode === ERROR_DELETE && (
          <Error
            message="Could not delete appointment."
            onClose={() => back()} />
        )
      }
    </article >
  );
}

export default Appointment;
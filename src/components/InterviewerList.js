import React from "react";

import "components/InterviewerList.scss"

import InterviewerListItem from "components/InterviewerListItem"

import protoTypes from "prop-types";

//Validating Props


function InterviewerList(props) {
  const lisfOfInterviwers = props.interviewers.map(interviewer =>
    < InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {lisfOfInterviwers}
      </ul>
    </section>
  );
}

InterviewerList.protoTypes = {
  interviewers: protoTypes.array.isRequired
};

export default InterviewerList;
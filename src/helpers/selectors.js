const getAppointmentsForDay = (state, day) => {
  const result = [];
  const filteredAppointment = state.days.filter(stateDay => stateDay.name === day);
  if (filteredAppointment.length > 0) {
    for (let appointment of filteredAppointment[0].appointments) {
      for (let key in state.appointments) {
        if (appointment == key) {
          result.push(state.appointments[key]);
        }
      }
    }
  }
  return result;
};

const getInterviewersForDay = (state, day) => {
  const result = [];
  const filteredInterviewers = state.days.filter(stateDay => stateDay.name === day);
  if (filteredInterviewers.length > 0) {
    for (let interviewer of filteredInterviewers[0].interviewers) {
      for (let key in state.interviewers) {
        if (interviewer == key) {
          result.push(state.interviewers[key]);
        }
      }
    }
  }
  return result;
};

const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }
  const interviwerList = { ...interview };
  Object.keys(state.interviewers).forEach(key => {
    if (key == interview.interviewer) {
      interviwerList.interviewer = state.interviewers[key];
    }
  });
  return (interviwerList);
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
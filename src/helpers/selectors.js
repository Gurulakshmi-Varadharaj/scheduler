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

const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }
  const interviwerList = { ...interview };
  Object.keys(state.interviewers).map(key => {
    if (key == interview.interviewer) {
      interviwerList.interviewer = state.interviewers[key];
    }
  });
  return (interviwerList);
};

export { getAppointmentsForDay, getInterview };
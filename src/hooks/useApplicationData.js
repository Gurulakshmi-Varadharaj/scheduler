import { useState, useEffect } from "react";

import axios from "axios";

const useApplicationData = function () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  /***Called when we book an Inteview from Appointment/index.js**/
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    /***To store the appointment data in API*/
    return (axios.put(`/api/appointments/${id}`, appointment)
      .then(res => {
        setState({ ...state, appointments });
      }));
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: interview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    /***To store the appointment data in API*/
    return (axios.delete(`/api/appointments/${id}`, appointment)
      .then(res => {
        setState({ ...state, appointments });
      }));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

export { useApplicationData };
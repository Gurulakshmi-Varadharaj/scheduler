import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors"

/***Sample Data ***/
/****const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Gurulakshmi",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Lakshanya",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  },
  {
    id: 5,
    time: "4pm"
  }
];****/

function Application(props) {
  //const [day, setDay] = useState("Monday");
  //const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  //const dailyAppointments = [];

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
    ]).then((all) => {
      //console.log(all[0].data);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
    })
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  /****Iterating over Appointments */
  const appointmentList = dailyAppointments.map(appointment =>
    <Appointment key={appointment.id} {...appointment} />
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          <li>
            {appointmentList}
          </li>
          <li>
            <Appointment key="last" time="5pm" />
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Application;
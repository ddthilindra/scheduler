// import React, {useState} from 'react'
// import ReactDOM from 'react-dom'
// import Scheduler from "react-mui-scheduler"

// function App() {
//   const [state] = useState({
//     options: {
//       transitionMode: "zoom", // or fade
//       startWeekOn: "mon",     // or sun
//       defaultMode: "month",    // or week | day | timeline
//       minWidth: 540,
//       maxWidth: 540,
//       minHeight: 540,
//       maxHeight: 540
//     },
//     alertProps: {
//       open: true,
//       color: "info",          // info | success | warning | error
//       severity: "info",       // info | success | warning | error
//       message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥" ,
//       showActionButton: true,
//       showNotification: true,
//       delay: 1500
//     },
//     toolbarProps: {
//       showSearchBar: true,
//       showSwitchModeButtons: true,
//       showDatePicker: true
//     }
//   })

//   const events = [
//     {
//       id: "event-1",
//       label: "Medical consultation",
//       groupLabel: "Dr Shaun Murphy",
//       user: "Dr Shaun Murphy",
//       color: "#f28f6a",
//       startHour: "04:00 AM",
//       endHour: "05:00 AM",
//       date: "2022-05-05",
//       createdAt: new Date(),
//       createdBy: "Kristina Mayer"
//     },
//     {
//       id: "event-2",
//       label: "Medical consultation",
//       groupLabel: "Dr Claire Brown",
//       user: "Dr Claire Brown",
//       color: "#099ce5",
//       startHour: "09:00 AM",
//       endHour: "10:00 AM",
//       date: "2022-05-09",
//       createdAt: new Date(),
//       createdBy: "Kristina Mayer"
//     },
//     {
//       id: "event-3",
//       label: "Medical consultation",
//       groupLabel: "Dr Menlendez Hary",
//       user: "Dr Menlendez Hary",
//       color: "#263686",
//       startHour: "13 PM",
//       endHour: "14 PM",
//       date: "2022-05-10",
//       createdAt: new Date(),
//       createdBy: "Kristina Mayer"
//     },
//     {
//       id: "event-4",
//       label: "Consultation prénatale",
//       groupLabel: "Dr Shaun Murphy",
//       user: "Dr Shaun Murphy",
//       color: "#f28f6a",
//       startHour: "08:00 AM",
//       endHour: "09:00 AM",
//       date: "2022-05-11",
//       createdAt: new Date(),
//       createdBy: "Kristina Mayer"
//     }
//   ]

//   const handleCellClick = (event, row, day) => {
//     window.alert("handleCellClick")
//   }

//   const handleEventClick = (event, item) => {
//     window.alert("handleEventClick")
//   }

//   const handleEventsChange = (item) => {
//     window.alert("handleEventsChange")
//   }

//   const handleAlertCloseButtonClicked = (item) => {
//     window.alert("handleAlertCloseButtonClicked")
//   }

//   return (
//     <Scheduler
//       locale="en"
//       events={events}
//       legacyStyle={false}
//       options={state?.options}
//       alertProps={state?.alertProps}
//       toolbarProps={state?.toolbarProps}
//       onEventsChange={handleEventsChange}
//       onCellClick={handleCellClick}
//       onTaskClick={handleEventClick}
//       onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
//     />
//   )
// }

// export default App;

//KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK

// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import {
//   ViewState,
//   EditingState,
//   IntegratedEditing,
// } from "@devexpress/dx-react-scheduler";
// import {
//   Scheduler,
//   DayView,
//   ViewSwitcher,
//   Toolbar,
//   WeekView,
//   AppointmentForm,
//   Appointments,
//   AllDayPanel,MonthView,DateNavigator,TodayButton
// } from "@devexpress/dx-react-scheduler-material-ui";

// const currentDate = "2022-08-16";
// const schedulerData = [
//   {
//     startDate: "2022-08-16T09:45",
//     endDate: "2022-08-16T11:00",
//     title: "Meeting",
//   },
//   {
//     startDate: "2022-08-16T12:00",
//     endDate: "2022-08-16T13:30",
//     title: "Go to a gym",
//   },
// ];

//KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK

// function App() {
//   return (
//     <Paper>
//       <Scheduler data={schedulerData}>
//         <ViewState currentDate={currentDate} />
//         <EditingState />

//         {/* <DayView
//         startDayHour={9}
//         endDayHour={14}
//       /> */}
//         <IntegratedEditing />
//         <WeekView startDayHour={10} endDayHour={19} />
//         <MonthView />
//           <Toolbar />
//           <DateNavigator />
//           <TodayButton />
//         <ViewSwitcher />
//         <Appointments />
//         <AppointmentForm />
//       </Scheduler>
//     </Paper>
//   );
// }
// export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
//}

//export default App;


/** @format */

import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Schedule";

export default function App() {
  return (
    <>
        <Router>
          <Switch>
            <Route path="/Dashboard" exact component={Dashboard} />
            <Route path="/" exact component={Dashboard} />            
            <Route path="/home" exact component={Dashboard} />
          </Switch>
        </Router>
    </>
  );
}



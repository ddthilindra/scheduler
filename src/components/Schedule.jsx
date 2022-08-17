import React, { Component, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher,
  MonthView,
  DayView,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "./appointments";
const initialState = {
  
};
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    const now = new Date();
    this.state = {
      appointments: [],
      data: appointments,
      currentDate: "2018-06-27",
    };


    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.commitChanges = this.commitChanges.bind(this);
  }

  async componentDidMount() {

    await axios
      .get("http://localhost:8000/leave/getAllLeaves/1")
      .then((res) => {
        // console.log("Getting from:", res.data.data);
        if (
          res.data.code === 200 &&
          res.data.success === true &&
          res.data.data.length > 0
        ) {
          //window.alert(`${res.data.message}`);
          console.log(">>>>>>>>>>" + res.data.data);
          this.setState({appointments:res.data.data})
          //console.log("first"+this.state.appointments)
          //setRows(JSON.parse(JSON.stringify(res.data.data)));
        } else {
          console.log("bad request...");
        }
        // setRows(res.data.data);
      })
      .catch((err) => console.log(err));


    // await axios.get(`${APIURL}/EMPTopList/getAllTopList`).then((response) => {
    //   this.setState({ TopList: response.data.data });
    //   console.log("TopList =>", this.state.TopList);
    // });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      const date = require("date-and-time");
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        //window.alert("added");
        // console.log(">>>>>> " + added.title);
        // console.log(">>>>>> " + added.startDate);
        // console.log(">>>>>> " + added.endDate);

        const strTime = date.format(added.startDate, "YYYY-MM-DD hh-mm-ss");
        const endTime = date.format(added.endDate, "YYYY-MM-DD hh-mm-ss");
        //  console.log(strTime)
        //  console.log(endTime)

        if (added.title && added.startDate && added.endDate) {
          // const config = {
          //   headers: { Authorization: Admintoken },
          // };
          const data = {
            userId: "1",
            title: added.title,
            startTime: strTime,
            endTime: endTime,
          };
          axios
            .post(`http://localhost:8000/leave/addLeave`, data)
            .then((response) => {
              console.log(response.data);

              if (response.status == 200) {
                window.alert(`${response.data.message}`);
                //window.location.reload(false);
                console.log(`${response.status}`);
                console.log(response.data.message);
              } else {
                window.alert("Somthing went wrong");
                console.log(`${response.status}`);
                console.log(response.data.message);
              }
            })
            .catch((err) => {
              console.log("Sever error");
              if (
                err.response &&
                err.response.status >= 400 &&
                err.response.status <= 500
              ) {
                window.alert("Sever error");
                console.log(err);
              }
            });
        } else {
        }
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
        //window.alert("changed");
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
        //window.alert("deleted");
      }
      return { data };
    });
  }

  render() {
    const { data, currentDate } = this.state;
    const saveAppoinment = () => {
      window.alert("handleCellClick");
    };

    const onAppointmentAdding = (e) => {
      // Handler of the "appointmentAdding" event
      console.log("first ", e.traget.value);
    };
    const onAppointmentAdded = (e) => {
      // Handler of the "appointmentAdded" event
    };
    return (
      <Paper>
        <Scheduler data={data} height={930}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <EditingState onCommitChanges={this.commitChanges} />
          <IntegratedEditing />

          <WeekView startDayHour={10} endDayHour={19} />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <DayView startDayHour={9} endDayHour={19} />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <TodayButton />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm onValueChange={saveAppoinment} />
        </Scheduler>
      </Paper>

      // <Paper>
      //   <Scheduler data={data} height={660}>
      //     <ViewState
      //       currentDate={currentDate}
      //       // onCurrentDateChange={this.currentDateChange}
      //     />
      //     <WeekView startDayHour={10} endDayHour={19} />
      //     <WeekView
      //       name="work-week"
      //       displayName="Work Week"
      //       excludedDays={[0, 6]}
      //       startDayHour={9}
      //       endDayHour={19}
      //     />
      //     <MonthView />

      //     {/* <IntegratedEditing /> */}
      //     <DayView startDayHour={9} endDayHour={19} />
      //     <Toolbar />
      //     <DateNavigator />
      //     <ViewSwitcher />
      //     <TodayButton />
      //     {/* <ConfirmationDialog /> */}
      //     <Appointments />
      //     <EditingState onCommitChanges={this.commitChanges} />
      //     <AppointmentTooltip showCloseButton showOpenButton />
      //     <AppointmentForm />
      //   </Scheduler>
      // </Paper>
    );
  }
}

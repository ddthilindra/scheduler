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
//import { appointments } from "./appointments";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      //data:appointments,
      currentDate: new Date(),
      //"2018-06-27"
      isSuccess: true,
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
        if (
          res.data.code === 200 &&
          res.data.success === true &&
          res.data.data.length > 0
        ) {
          //console.log(res.data)
          this.setState({ data: res.data.data });
        } else {
          console.log("bad request...");
        }
      })
      .catch((err) => console.log(err));
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      const date = require("date-and-time");
      let { data } = state;
      this.setState((prevState) => ({
        isSuccess: !prevState.isSuccess,
      }));

      if (added) {
        console.log("first " + this.state.isSuccess);
        if (this.state.isSuccess == true) {
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" + this.state.isSuccess);

          const startingAddedId =
            data.length > 0 ? data[data.length - 1].id + 1 : 0;
          data = [...data, { id: startingAddedId, ...added }];

          const strTime = date.format(added.startDate, "YYYY-MM-DD hh-mm-ss");
          const endTime = date.format(added.endDate, "YYYY-MM-DD hh-mm-ss");

          if (added.title && added.startDate && added.endDate) {
  
            const data = {
              userId: "1",
              title: added.title,
              startTime: strTime,
              endTime: endTime,
            };
            axios
              .post(`http://localhost:8000/leave/addLeave`, data)
              .then((response) => {
                if (response.status == 200) {
                  console.log(`${response.status}`);
                  console.log(response.data.message);

                  // this.setState({ isSuccess: false });

                  // this.setState((prevState) => ({
                  //   isSuccess: !prevState.isSuccess,
                  // }));

                  // this.setState(({ isSuccess }) => ({ isSuccess: !isSuccess }));

                  // this.setState({
                  //   isSuccess: (this.isSuccess = !this.isSuccess),
                  // });

                  console.log("2 " + this.state.isSuccess);
                } else {
                  window.alert("Somthing went wrong");
                  console.log(`${response.status}`);
                  console.log(response.data.message);
                }
              })
              .catch((err) => {
                console.log("Sever error");
                console.log(err);
              });
          } else {
          }
        }
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
        console.log(changed);
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
        //console.log(deleted);

        axios
          .delete(`http://localhost:8000/leave/deleteLeave/${deleted}`)
          .then((response) => {
            if (response.status == 200) {
              console.log(response.data.message);
            } else {
              window.alert("Somthing went wrong");
              console.log(response.data.message);
            }
          })
          .catch((err) => console.log(err));
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

import React, { Component } from "react";
import Paper from "@mui/material/Paper";
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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: "2018-06-27",
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };
    this.commitChanges = this.commitChanges.bind(this);
  }
 

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        window.alert("added");
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
        window.alert("changed");
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
        window.alert("deleted");
      }
      return { data };
    });
  }

  render() {
    const { data, currentDate } = this.state;
    const saveAppoinment = () => {
      window.alert("handleCellClick");
    };

    return (
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

      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange}/>
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
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}


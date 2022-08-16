import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,ViewSwitcher,MonthView,DayView,AppointmentForm,AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from './appointments';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: '2018-06-27',
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <WeekView
            startDayHour={10}
            endDayHour={19}
          />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <DayView />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
          />
          <AppointmentForm
            readOnly
          />
        </Scheduler>
      </Paper>
    );
  }
}

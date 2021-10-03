import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  DateNavigator,
  Toolbar,
  ViewSwitcher, 
  AppointmentForm,
  AppointmentTooltip,
  EditRecurrenceMenu
} from '@devexpress/dx-react-scheduler-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import appointments from '../demo-data/today-appointments';

const useStyles = makeStyles(theme => ({
  todayCell: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.14),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
    '&:focus': {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: alpha(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
  },
}));

const TimeTableCell = (props) => {
  const classes = useStyles();
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...props} className={classes.todayCell} />;
  } if (date.getDay() === 0 || date.getDay() === 6) {
    return <WeekView.TimeTableCell {...props} className={classes.weekendCell} />;
  } return <WeekView.TimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  const classes = useStyles();
  const { startDate, today } = props;

  if (today) {
    return <WeekView.DayScaleCell {...props} className={classes.today} />;
  } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
  } return <WeekView.DayScaleCell {...props} />;
};

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  // #FOLD_BLOCK
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    return (
    <Paper>
      <Scheduler
      data={appointments}
      height={850}
      >
      <Toolbar />
      <ViewState />
      <EditingState 
        onCommitChanges={this.commitChanges} />
      <DateNavigator />
      <ViewSwitcher />
      <WeekView
        startDayHour={9}
        endDayHour={17}
        timeTableCellComponent={TimeTableCell}
        dayScaleCellComponent={DayScaleCell}
      />
      <DayView
        startDayHour={9}
        endDayHour={17}
      />
      <Appointments />
      <EditRecurrenceMenu />
      <AppointmentTooltip 
      showCloseButton
      showDeleteButton
      showOpenButton/>
      <AppointmentForm />
    </Scheduler>
  </Paper>
  );
    }
  }
export default Schedule;
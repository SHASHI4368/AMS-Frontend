import React from 'react'
import { CalendarContainer } from '../../styles/calendar'
import StudentCalendarComponent from './studentCalendarComponent'

const StudentCalendar = () => {
  return (
    <CalendarContainer>
      <StudentCalendarComponent/>
    </CalendarContainer>
  )
}

export default StudentCalendar
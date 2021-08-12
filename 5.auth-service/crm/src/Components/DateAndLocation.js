import React from 'react'
import CustomMonthlyCalendar from './MonthlyCalender/CustomMonthlyCalendar'

const DateAndLocation = () => {

    return (
        <div className="flex-col full-height">
            <h1>Date And Location</h1>
            <CustomMonthlyCalendar />
        </div>
    )
}

export default DateAndLocation
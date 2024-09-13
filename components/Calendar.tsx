'use client'

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import {gradients, baseRating} from '../utils/index'
import {fugaz} from '../utils/fonts'

type Months = {
    [key: string]: string;
}

type DayList = string[];

type CalendarProps = {
    completeData: Record<string, any>;
    handleSetMood?: (mood: string, day: Date, month: Months, year: Date) => void;
    demo?: boolean
}

const months: Months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList: DayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const Calendar = (props: CalendarProps) => {

    const {completeData} = props

    const demo = false

    const now = new Date()

    const currentMonth = now.getMonth()
    const [selectedMonth, setSelectedMonth] = useState(Object.keys(months)[currentMonth])

    const [selectedYear, setSelectedYear] = useState(now.getFullYear())

    const numericMonth = Object.keys(months).indexOf(selectedMonth)
    const data = completeData?.[selectedYear]?.[numericMonth] || {}
    console.log('This months data: ',data)

    const decrementMonth = () => {
       if (numericMonth - 1 <= 0) {
        setSelectedYear(prev => prev - 1)
        setSelectedMonth(monthsArr[monthsArr.length - 1])
       } else {
            setSelectedMonth(prev => monthsArr[numericMonth - 1])
       }
    }

    const incrementMont = () => {
        if (numericMonth + 1 > 11) {
            setSelectedYear(prev => prev + 1)  
            setSelectedMonth(monthsArr[0])
       } else {
        setSelectedMonth(prev => monthsArr[numericMonth + 1])
       }
    }
    
    // const handleIncrementMonth = (val) => {
    //     if (numericMonth + val < 0) {
    //         setSelectedYear(prev => prev - 1)
    //         setSelectedMonth(monthsArr[monthsArr.length - 1])
    //     } else if (numericMonth + val > 11) {
    //         setSelectedYear(prev => prev + 1)
    //         setSelectedMonth(monthsArr[0])

    //     } else {
    //         setSelectedMonth(monthsArr[numericMonth + val])
    //     }
    // }

    // const year = 2024
    // const month = 'September'
    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
    const firstDayOfMonth = monthNow.getDay()
    const daysInMonth = new Date(selectedYear, monthsArr.indexOf(selectedMonth) + 1, 0).getDate()
    const daysToDisplay = firstDayOfMonth + daysInMonth;
    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7? 1 : 0)

    return (
        <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-3 gap-4'>
                <button className="mr-auto bg-indigo-400 p-1 rounded-3xl text-white text-lg sm:text-xl duration-200 hover:opacity-60"
                    onClick={decrementMonth}    
                >
                    <IoIosArrowBack/>
                </button>
                <p className={"text-center capitalize textGradient " + fugaz.className}>
                    {monthsArr[numericMonth]}, {selectedYear}
                </p>
                <button className="ml-auto bg-indigo-400 p-1 rounded-3xl text-white text-lg sm:text-xl duration-200 hover:opacity-60"
                    onClick={incrementMont}    
                >
                    <IoIosArrowForward />
                </button>
            </div>
            <div className="py-4 sm:py-6 md:py-10 flex flex-col overflow-hidden gap-1">
                {Array.from(Array(numRows).keys()).map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="grid grid-cols-7 gap-1">
                            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)

                                let daysDisplay = dayIndex > daysInMonth?
                                false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ?
                                false : true
                                

                                let isToday = dayIndex === now.getDate()
                                if (!daysDisplay) {
                                    return (
                                        <div key={dayOfWeekIndex} className="bg-white">
                                            {/* {dayOfWeekIndex} */}
                                        </div>
                                    )
                                }

                                let color = demo ? gradients.indigo[(baseRating as any)[dayIndex]] 
                                            : dayIndex in data? gradients.indigo[(data as any)[dayIndex]] 
                                            : 'white'

                                return (
                                    <div 
                                        key={dayOfWeekIndex}
                                        style={{background: color}}
                                        className=
                                                    {`text-xs sm:text-sm md:text-base border border-solid p-2
                                                        items-center flex gap-2 justify-between rounded-lg
                                                        ${isToday ? 'border-indigo-400':'border-indigo-100'}
                                                        ${color === 'white'? 'text-indigo-400':'text-blue-400'}
                                                        `
                                                    }           
                                    >
                                        <p>{dayIndex}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                
            </div>
        </div> 
     );
}
 
export default Calendar;
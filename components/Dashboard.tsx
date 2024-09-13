'use client'

import { useAuth } from '@/context/AuthContext';
import {fugaz} from '../app/layout'
import Calendar from './Calendar';
import React, { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import type { MoodData } from '@/context/AuthContext';

type Statuses = {
    num_days: number;
    time_remaining: string;
    average_Mood: number
}

type Moods = {
    '&*@#$': string;
    'Sad': string;
    'Existing': string;
    'Good': string;
    'Elated': string;
}

type Months = {
    [key: string]: string;
}

// const handleSetMood = async () => {
//     // Parse the number value of the mood, you may need to adjust this depending on your mood data
//     const moodValue = parseInt(mood); // Assuming the mood can be parsed as a number, adjust as needed
//     if (isNaN(moodValue)) {
//         console.error("Invalid mood value");
//         return;
//     }
// }

const Dashboard = () => {

    const now = new Date()
    const context = useAuth();
    const userDataObj = context?.userDataObj 
    const currentUser = context?.currentUser
    const setUserDataObj = context?.setUserDataObj
    
    const [data, setData] = useState<MoodData>({})
    
    const countValues = () => {
        let totalDaysNumber = 0
        let sumOfMood = 0
        for (let year in data) {
            for (let month in data?.[year]) {
                for (let day in data?.[year]?.[month]) {
                    let daysMood = data[year][month][day]
                    totalDaysNumber += 1;
                    sumOfMood += daysMood
                }
            }
        }
        return {
            num_days: Number(totalDaysNumber), average_Mood: sumOfMood / totalDaysNumber
        }
    }
    
    const statuses: Statuses = {
        ...countValues(),
        time_remaining: `${23 - now.getHours()}H ${59 - now.getMinutes()}M`,
        // date: (new Date()).toDateString()
    }
    
    const moods = {
        '&*@#$': '😭',
        'Sad': '😥',
        'Existing': '😶',
        'Good': '😊',
        'Elated': '😍',
    }
    
    const handleSetMood = async (mood: string) => {

        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()

        try {
            if (!currentUser?.uid) {
                throw new Error('User is not authenticated')
            }
            
            const newData = {...userDataObj}
            if (!newData?.[year]) {
                newData[year] = {}
            }
            if (!newData?.[year]?.[month]) {
                newData[year][month] = {}
            }
            
            newData[year][month][day] = mood
            setData(newData)

            if (!setUserDataObj) {
                return
            }

            setUserDataObj(newData)

            const docRef = doc(db, 'users', currentUser?.uid)
            const res = await setDoc(docRef, {
                [year]: {
                    [month]: {
                        [day]: mood
                    }
                }
            }, { merge: true})
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!currentUser || !userDataObj) {
            return
        }
        setData(userDataObj)
    }, [currentUser, userDataObj])

    return ( 
        <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
            <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 gap-4">
                {(Object.keys(statuses) as (keyof Statuses)[]).map((status, statusIndex) => {
                    const value: string | number = statuses[status]
                    return (
                        <div key={statusIndex} className='p-4'>
                            <p className="font-medium uppercase text-xs sm:text-sm truncate">{status.replaceAll('_', ' ')}</p>
                            <p className={'text-base sm:text-lg truncate ' + fugaz.className}>{value} {status == 'num_days'? '🔥':''}</p>
                        </div>
                    )
                })}
            </div>

            <h4 className={'text-4xl sm:text-5xl md:text-6xl text-center ' + fugaz.className}>
                How do you <span className='textGradient'>feel</span> today
            </h4>

            <div className='grid grid-cols-2 sm:grid-cols-5 gap-4 justify-center'>
                {(Object.keys(moods) as (keyof Moods)[]).map((mood, moodIndex) => {
                    const value: string = moods[mood]
                    return (
                        <button key={moodIndex}
                        onClick={() => {
                            const currentMoodValue = moodIndex + 1
                            handleSetMood((currentMoodValue).toString())
                        }} 
                        className={`p-4 px-5 flex flex-col gap-3 rounded-2xl text-center purpleShadow duration-200 hover:bg-indigo-100 bg-[lavender] flex-1 items-center`}>
                            <p className="font-medium uppercase text-5xl sm:text-6xl md:text-7xl">{value}</p>
                            <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + fugaz.className}>{mood.toString()}</p>
                        </button>
                    )
                })}
            </div>

            <div>
                <Calendar completeData={data} demo={false} handleSetMood={handleSetMood}/>
            </div>
        </div>
     );
}
 
export default Dashboard;
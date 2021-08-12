import React from 'react'
import './MessageContainer.scss'

const MessageContainer = ({ txt, clas, date, isNewDate }) => {
    const today = new Date()
    let isToday = false
    const dateParams = date.split(' ')

    const dateSplited = dateParams[0].split('/')
    if (today.getFullYear() == dateSplited[2]) {
        console.log(1)
        if ((today.getMonth() + 1) == dateSplited[1]) {
            console.log(2)
            if (today.getDate() == dateSplited[0]) {
                isToday = true
            }
        }
    }
    console.log(dateParams)
    console.log('isNewDate', isNewDate)
    return (
        <div className="flex-col">
            {isNewDate &&

                <span className="new-date">
                    {isToday ? "Today" : dateParams[0]}
                </span>
            }
            <view className={`flex-col ${clas}-msg-container`}>
                <span className={`${clas}-msg flex-end`}>
                    {txt}
                </span>
                <span className={`${clas}-date flex-start`}>
                    {dateParams[1]}
                </span>
            </view>

        </div>
    )

}

export default MessageContainer
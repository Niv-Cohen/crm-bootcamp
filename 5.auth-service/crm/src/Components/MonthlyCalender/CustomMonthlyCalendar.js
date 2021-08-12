import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import CustomModal from '../Containers/CustomModal/CustomModals';
import AuthForm from '../Auth/AuthForm';
import moment from 'moment'
import CustomRadioButton from '../CustomComponents/CustomRadioButton';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-bnb-gallery/dist/style.css'
import ReactBnbGallery from 'react-bnb-gallery';
import { chooseHallAndDate } from '../../actions/events'
import { getHallsInformation } from '../../actions/buisness'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useDispatch, useSelector } from 'react-redux';
import CustomCard from '../CustomComponents/CustomCard/CustomCard';
import './CustomMonthlyCalendar.scss'

const localizer = momentLocalizer(moment)

const calendarStyle = () => {
    return {
        style: {
            backgroundColor: '#d4c8e0', //this work
        }
    }
}


const gallery = [[
    {
        photo: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg",
        caption: "",
        thumbnail: "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg"
    },
    {
        photo: "https://static.wixstatic.com/media/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg/v1/fill/w_1000,h_699,al_c,q_90,usm_0.66_1.00_0.01/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg",
        caption: "",
        thumbnail: "https://static.wixstatic.com/media/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg/v1/fill/w_1000,h_699,al_c,q_90,usm_0.66_1.00_0.01/b87525_187d5c86c7cb43bfbc8a9c9a500a9223~mv2_d_5207_3639_s_4_2.jpg"
    },
    {
        photo: "https://1hq6f244nzqssy4d8fp6y7re-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/one-king-west-2-810x540.jpg",
        caption: "",
        thumbnail: "https://1hq6f244nzqssy4d8fp6y7re-wpengine.netdna-ssl.com/wp-content/uploads/2016/02/one-king-west-2-810x540.jpg"
    }
]];

const ceremonyTime = [{ start: '10:00', end: '15:00', title: 'Morning Ceremony' },
{ start: '18:00', end: '01:00', title: 'Nightly Ceremony' }]

const CustomMonthlyCalendar = () => {
    const { buisnessID, halls } = useSelector(state => state.buisness)
    const { isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHallsInformation(buisnessID))
    }, [])

    const registeredEvents = [
        {
            id: 0,
            title: 'All Day Event very long title',
            allDay: true,
            start: new Date(2021, 6, 26, 18, 30),
            end: new Date(2021, 6, 26, 1),
            color: 'red'
        },
        {
            id: 1,
            title: 'Long Event',
            start: new Date(2015, 3, 7),
            end: new Date(2015, 3, 10),
        },

        {
            id: 2,
            title: 'DTS STARTS',
            start: new Date(2016, 2, 13, 0, 0, 0),
            end: new Date(2016, 2, 20, 0, 0, 0),
        }
    ]



    const [events, setEvents] = useState(registeredEvents)

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isGalaryVisible, setIsGalaryVisible] = useState(false)
    const [selectedHall, setSelectedHall] = useState(0)
    const [selectedTime, setSelectedTime] = useState(0)
    const [selectedDate, setSelectedDate] = useState(null)

    const pickHallModal = () => {
        return (
            <div className="flex-col full-height full-width">
                <h2 className="centered">Choose An Hall For The Wedding</h2>
                <div className="flex-row spaced-between full-width">
                    {ceremonyTime.map((time, index) =>
                        <CustomRadioButton
                            selected={selectedTime}
                            setRadio={setSelectedTime}
                            name={time.title}
                            index={index}
                            key={index}
                            subTxt={{ start: time.start, end: time.end }} />)}
                </div>
                <div className="flex-row spaced-between full-width">
                    {halls && halls.map((hall, index) => {
                        const mainImg = hall.urls.filter((img) => img.isMain === "1")
                        return (
                            <CustomRadioButton
                                selected={selectedHall}
                                mode="Hall"
                                index={index}
                                setIsGalaryVisible={setIsGalaryVisible}
                                setRadio={setSelectedHall}
                                key={index}
                                name={hall.name}
                                uri={mainImg && mainImg.length === 1 ? `http://localhost:991/imgs/${mainImg[0].url}`
                                    : "https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2018/11/Terra-Caesarea.jpg"} />)
                    })}
                </div>
                <button className="save-pick" onClick={() => {
                    console.log(selectedDate)
                    const date = new Date(selectedDate)
                    const startDate = new Date(date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        ceremonyTime[selectedTime].start.substr(0, 2),
                        ceremonyTime[selectedTime].start.substr(3, 2))
                    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                        ceremonyTime[selectedTime].end.substr(0, 2),
                        ceremonyTime[selectedTime].end.substr(3, 2))
                    const newEvent = {
                        title: `${halls[selectedHall].name} ${startDate.toTimeString().substr(0, 5)} - ${endDate.toTimeString().substr(0, 5)}`,
                        start: startDate,
                        end: endDate
                    }
                    console.log(newEvent)
                    setEvents(registeredEvents.concat(newEvent))
                    setIsModalVisible(false)
                }}>
                    Save Pick
                </button>
            </div >
        )
    }

    const onSelectSlot = (data) => {
        const eventDate = new Date(data)
        console.log(eventDate)
        setSelectedDate(eventDate)
        setIsModalVisible(true)
    }

    const DnDCalendar = withDragAndDrop(Calendar);
    return (
        <div >
            <ReactBnbGallery
                show={isGalaryVisible}
                photos={gallery[0]}
                onClose={() => setIsGalaryVisible(false)} />
            <div className="flex-col centered full-width">
                <h1 style={{ fontSize: 80 }}>Pick A Date</h1>
                <DnDCalendar
                    popup={true}
                    views={['month']}
                    localizer={localizer}
                    events={events}
                    // onEventDrop={(data) => onEventResize(data)}
                    selectable={true}
                    onSelectSlot={({ slots }) => onSelectSlot(slots[0])}
                    onKeyPressEvent={(data) => console.log(data)}
                    dayPropGetter={calendarStyle}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 480, width: 1000, marginRight: 100, zIndex: 0 }} />
            </div>
            <CustomModal
                isVisible={isModalVisible}
                setIsVisible={setIsModalVisible}
                body={pickHallModal()} />
        </div>
    );
};
export default CustomMonthlyCalendar
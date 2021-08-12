import React from 'react'
import { AiOutlineAppstore, AiOutlineBell, AiOutlinePlusSquare, AiOutlineWechat } from "react-icons/ai";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { GiBigDiamondRing } from 'react-icons/gi'
import { RiUserAddLine } from "react-icons/ri";
import Button from '@material-ui/core/Button';
import { IoStatsChartOutline } from "react-icons/io5";
import { BiCalendarEvent, BiCalendar } from "react-icons/bi";
import CustomTooltip from './CustomTooltip';
import { useHistory } from 'react-router';

const SideNavBar = ({ selected, setSelected }) => {
    const history = useHistory()
    const upperButtons = [{
        logo: AiOutlineAppstore, onHoverTxt: "My WorkSpace",
        func: () => history.push('/workSpace')
    },
    {
        logo: AiOutlinePlusSquare,
        onHoverTxt: "Create Event",
        func: () => history.push('/createEvent')
    },
    { logo: AiOutlineBell, onHoverTxt: "Broadcast", func: () => history.push('/broadcast') }]

    const lowerButtons = [{ logo: AiOutlineWechat, onHoverTxt: "Chat", func: () => history.push('/chat') },
    { logo: BiCalendar, onHoverTxt: "Calender" },
    { logo: RiUserAddLine, onHoverTxt: "Add Employee" },
    { logo: IoStatsChartOutline, onHoverTxt: "Stats" }
    ]

    return (
        <nav>


            <div className="upper-sidebar">
                {/* <img style={{ width: 100, height: 100 }} src={require('../assets/logo_transparent.png')} /> */}
                <GiBigDiamondRing id="mg-btm" size={80} color={"white"} />
                {upperButtons.map(button =>
                    <CustomTooltip key={button.onHoverTxt} title={button.onHoverTxt} func={button.func}>
                        <div className="left-navbar-logo"><button.logo id="mg-btm" size={40} color={"white"} /></div>
                        <div className={selected !== button.onHoverTxt ? "view-tooltip" :
                            "view-tooltip selected-view-indicator"}></div>
                    </CustomTooltip>)}

            </div>

            <div className="lower-sidebar">
                {lowerButtons.map(button =>
                    <CustomTooltip key={button.onHoverTxt} func={button.func} title={button.onHoverTxt}>
                        <button.logo id="mg-btm" size={40} color={"white"} />
                    </CustomTooltip>)}

                <FaRegUserCircle id="mg-btm" size={60} color={"white"} />
            </div>
        </nav>

    )



}

export default SideNavBar
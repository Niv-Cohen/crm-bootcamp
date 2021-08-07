import React from 'react'
import CustomModal from '../Containers/CustomModal/CustomModals'
import Radio from '@material-ui/core/Radio';
import Avatar from '@material-ui/core/Avatar';


const CustomRadioButton = ({ uri, name, setRadio, selected, setIsGalaryVisible, index, mode, subTxt }) => {
    return (
        <div className="flex-col">
            {mode === 'Hall' && <Avatar onClick={() => setIsGalaryVisible(true)}
                style={{ width: "150px", height: "150px", marginTop: "10px" }} src={uri} />}
            <div className="centered flex-col">
                <h3 >{name}</h3>
                <h4>{subTxt && subTxt.start + "-" + subTxt.end}</h4>
            </div>
            <Radio checked={selected === index} onClick={() => {
                console.log("clicked")
                setRadio(index)
            }} name={name} value={index} />
        </div>
    )

}
export default CustomRadioButton
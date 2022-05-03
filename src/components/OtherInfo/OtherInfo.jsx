import './OtherInfo.css';
import { useState } from 'react';  
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

const OtherInfo = (props) => {
    const [description, setDescription] = useState("");
    const [checkDescription, setCheckDescription] = useState(false);

    const handleDescription = (e) => {
        props.getOtherInfo(e.target.value);
        if(!e.target.value) {
            setCheckDescription(true);
        }
        else {
            setCheckDescription(false);
            setDescription(e.target.value);
        }
    }

    return(
        <div className='content'>
            <p className='contentTitle'>Other Info</p>
            <Divider className='divider' />
            <div className='subContentOtherInfo'>
                <p className='subContentTitle'>Product Description</p>
                <div className='inputAndError'>
                    <TextField label='Description' multiline minRows={6} className='subContentInput' onChange={handleDescription}/>
                    {checkDescription?<span style={{color: 'red'}}>Field can't be empty</span>:<></>}
                </div>
            </div>
        </div>
    );
}

export default OtherInfo;
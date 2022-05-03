import './OfferInfo.css';
import { useState } from 'react';  
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import OtherInfo from '../OtherInfo/OtherInfo.jsx';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const OfferInfo = (props) => {
    const [price, setPrice] = useState(0);
    const [checkPrice, setCheckPrice] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);
    const [discount, setDiscount] = useState(0);

    const toToggleOffer = (e) => {
        setShowDiscount(e.target.value == 'yes'? true: false);
    }

    const handlePrice = (e) => {
        props.getOfferInfo({
            productPrice: e.target.value,
            productDiscount: discount
        });
        setPrice(e.target.value);
        if(!e.target.value) {
            setCheckPrice(true);
        }
        else {
            setCheckPrice(false);
        }
    }

    const handleDiscount = (e) => {
        props.getOfferInfo({
            productPrice: price,
            productDiscount: e.target.value
        });
        setDiscount(e.target.value);
    }

    return(
        <div className='content'>
            <p className='contentTitle'>Offer Info</p>
            <Divider className='divider' />
            <div className='subContent'>
                <p className='subContentTitle'>Price of product</p>
                <div className='inputAndError'>
                    <TextField label='Price' className='subContentInput' type='number' onChange={handlePrice}/>
                    {checkPrice?<span style={{color: 'red'}}>Field can't be empty.</span>:<></>}
                </div>
            </div>
            <div className='productsInfo'>
                <div className='productToggler'>
                    <p className='productTitle'>Do you want to add discount?</p>
                    <RadioGroup className='productRadioBtns' defaultValue='no' onChange={toToggleOffer}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </div>
                {
                    showDiscount && 
                    <div className='subContent'>
                        <p className='subContentTitle'>Discount</p>
                        <TextField label='Discount' className='subContentInput' type='number' onChange={handleDiscount}/>
                    </div>
                }
            </div>
        </div>
    );
}

export default OfferInfo;
import './VitalInfo.css';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const VitalInfo = (props) => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [brandName, setBrandName] = useState('');
    const [totalStocks, setTotalStocks] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [error, setError] = useState([]);

    const vitalInfoData = [
        {
            title: 'Product Id',
            value: 'productId',
            type: 'text',
        },
        {
            title: 'Product Name',
            value: 'productName',
            type: 'text',
        },
        {
            title: 'Brand Name',
            value: 'brandName',
            type: 'text',
        },
        {
            title: 'Total Stocks',
            value: 'totalStocks',
            type: 'number'
        }
    ]

    const handleVitalInfo = (e, value) => {
        setCurrentValue(value);
        if(!e.target.value) {
            const er = error;
            er.push(value)
            setError(er);
        }
        else {
            let er = error;
            er = er.filter(item => item != value)
            setError(er);
        }
        if(value == 'productId') {
            setProductId(e.target.value);
            props.getVitalData({
                productId: e.target.value,
                productName: productName,
                brandName: brandName,
                totalStocks: totalStocks
            })
        }
        else if(value == 'productName') {
            setProductName(e.target.value);
            props.getVitalData({
                productId: productId,
                productName: e.target.value,
                brandName: brandName,
                totalStocks: totalStocks
            })
        }
        else if(value == 'brandName') {
            setBrandName(e.target.value);
            props.getVitalData({
                productId: productId,
                productName: productName,
                brandName: e.target.value,
                totalStocks: totalStocks
            })
        }
        else if(value == 'totalStocks') {
            setTotalStocks(e.target.value);
            props.getVitalData({
                productId: productId,
                productName: productName,
                brandName: brandName,
                totalStocks: e.target.value
            })
        }
    }
    
    return(
        <div className='content'> 
            <p className='contentTitle'>Vital Info</p>
            <Divider className='divider' />
            {
                vitalInfoData.map((item, index) => (
                    <div className='subContent'  key={index}>
                        <p className='subContentTitle'>{item.title}:</p>
                        <div className='inputAndError'>
                            <TextField label={item.title} type={item.type} className='subContentInput' onChange={(e) => {handleVitalInfo(e, item.value)}}/>
                            {error.includes(item.value) && <span style={{color: 'red'}}>Field can't be empty.</span>}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default VitalInfo;
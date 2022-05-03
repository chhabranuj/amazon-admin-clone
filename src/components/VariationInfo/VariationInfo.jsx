import './VariationInfo.css';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

const VariationInfo = (props) => {
    const [showVariations, setShowVariations] = useState(false);
    const [variationType, setVariationType] = useState("Size");
    const [showVariationTypeError, setShowVariationTypeError] = useState(false);
    const [typeOneDetail, setTypeOneDetail] = useState("");
    const [showTypeOneDetailError, setShowTypeOneDetailError] = useState(false);
    const [variationTypeTwo, setVariationTypeTwo] = useState("Color");
    const [typeTwoDetail, setTypeTwoDetail] = useState("");
    const [addVariations, setAddVariations] = useState(false);
    const [addRemoveBtn, setAddRemoveBtn] = useState("+Add More")

    const toToggleVariations = (e) => {
        setShowVariations(e.target.value == 'yes'? true: false);
    }

    const toToggleVariationType = (e) => {
        props.getVariationInfo({
            variationTypeOne: e.target.value == 'size'? 'Size': 'Color',
            typeOneDetail: typeOneDetail.split(','),
            variationTypeTwo: e.target.value == 'size'? 'Color': 'Size',
            typeTwoDetail: typeTwoDetail.split(',')
        })
        if(!e.target.value) {
            setShowVariationTypeError(true)
        }
        else {
            setShowTypeOneDetailError(false);
            setVariationType(e.target.value == 'size'? 'Size': 'Color');
            setVariationTypeTwo(e.target.value == 'size'? 'Color': 'Size');
        }
    }

    const handleDetailTypeOne = (e) => {
        props.getVariationInfo({
            variationTypeOne: variationType,
            typeOneDetail: e.target.value.split(','),
            variationTypeTwo: variationTypeTwo,
            typeTwoDetail: typeTwoDetail.split(',')
        })
        setTypeOneDetail(e.target.value);
        if(!e.target.value) {
            setShowTypeOneDetailError(true);
        }
        else {
            setShowTypeOneDetailError(false);
        }
    }

    const handleDetailTypeTwo = (e) => {
        props.getVariationInfo({
            variationTypeOne: variationType,
            typeOneDetail: typeOneDetail.split(','),
            variationTypeTwo: variationTypeTwo,
            typeTwoDetail: e.target.value.split(',')
        })
        setTypeTwoDetail(e.target.value)
    }

    const toAddVariations = () => {
        setAddVariations(addVariations? false: true);
        setAddRemoveBtn(addVariations? '+Add More':'-Remove');
    }

    return (
        <div className='content'>
            <p className='contentTitle'>Variation Info</p>
            <Divider className='divider' />
            <div className='productsInfo'>
                <div className='productToggler'>
                    <p className='productTitle'>Does this product have variations?</p>
                    <RadioGroup className='productRadioBtns' defaultValue='no' onChange={toToggleVariations}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </div>
                {
                    showVariations &&
                    <div>
                        <div className='subContent'>
                            <p className='subContentTitle'>Variation Type</p>
                            <div className='inputAndError'>
                                <FormControl className='subContentInput'>
                                    <InputLabel>Select</InputLabel>
                                    <Select label='select' defaultValue='select' onChange={toToggleVariationType}>
                                        <MenuItem value='select'>Select</MenuItem>
                                        <MenuItem value='size'>Size</MenuItem>
                                        <MenuItem value='color'>Color</MenuItem>
                                    </Select>
                                </FormControl>
                                {showVariationTypeError && <span style={{color: 'red'}}>Field can't be empty.</span>}
                            </div>
                        </div>
                        <div className='subContent'>
                            <p className='subContentTitle'>{variationType} Details</p>
                            <div className='inputAndError'>
                                <TextField label='Enter data and seperate them with comma ","' className='subContentInput' onChange={handleDetailTypeOne}/>
                                {showTypeOneDetailError && <span style={{color: 'red'}}>Field can't be empty.</span>}
                            </div>
                        </div>
                        {
                            addVariations &&
                                <div>
                                    <Divider className='contentDivider' />
                                    <div className='subContent'>
                                        <p className='subContentTitle'>Variation Type 2</p>
                                        <TextField value={variationTypeTwo} className='subContentInput' disabled/>
                                    </div>
                                    <div className='subContent'>
                                        <p className='subContentTitle'>{variationTypeTwo} Details</p>
                                        <TextField label='Enter data and seperate them with comma ","' className='subContentInput' onChange={handleDetailTypeTwo}/>
                                    </div>
                                </div>
                        }
                        <div className='moreVariationParent' onClick={toAddVariations}>
                            <p className='moreVariations'>{addRemoveBtn} Variations</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default VariationInfo;
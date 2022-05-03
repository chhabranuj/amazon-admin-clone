import './App.css';
import axios from 'axios';
import { forwardRef, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Footer from './components/Footer/Footer';
import TitleBar from './components/TitleBar/TitleBar.jsx';
import OfferInfo from './components/OfferInfo/OfferInfo.jsx';
import OtherInfo from './components/OtherInfo/OtherInfo.jsx';
import VitalInfo from './components/VitalInfo/VitalInfo.jsx';
import ImageUploader from './components/ImageUploader/ImageUploader';
import VariationInfo from './components/VariationInfo/VariationInfo.jsx';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Please enter the details properly!');

  let data =  useRef({
    productId: '',
    productName: '',
    brandName: '',
    totalStocks: '',
    variationTypeOne: '',
    typeOneDetail: '',
    variationTypeTwo: '',
    typeTwoDetail: '',
    productPrice: '',
    productDiscount: '',
    productDescription: '',
    image: ''
  })

  const handleGetOfferInfo = (offerObject) => {
    data.current.productPrice = offerObject.productPrice;
    data.current.productDiscount = offerObject.productDiscount;
  }

  const handleGetOtherInfo = (description) => {
    data.current.productDescription = description; 
  }

  const handleVariationInfo = (variationObject) => {
    data.current.variationTypeOne = variationObject.variationTypeOne;
    data.current.typeOneDetail = variationObject.typeOneDetail;
    data.current.variationTypeTwo = variationObject.variationTypeTwo;
    data.current.typeTwoDetail = variationObject.typeTwoDetail;
  }

  const handleGetImage = (image) => {
    data.current.image = image;    
  }

  const handleVitalData = (vitalObject) => {
    data.current.productId = vitalObject.productId;
    data.current.productName = vitalObject.productName;
    data.current.brandName = vitalObject.brandName;
    data.current.totalStocks = vitalObject.totalStocks;
  }

  const uploadProduct = () => {
    let count = 0;
    for (let item of Object.keys(data.current)) {
      if(item != 'productDiscount') {
        if(!data.current[item]) {
          setError(true)
          count = 1;
          setErrorMessage('Please enter the details properly!');
          break;
        }
      }
    }
    if(!count) {
      const body = data.current;
      axios.post('https://project-amazon.herokuapp.com/uploadData', body)
        .then(response => {
        console.log(response);
      }).catch(error => {
        setError(true);
        setErrorMessage('Something went wrong. Try again!');
      })
    }
  }

  const handleClose = () => {
    setError(false);
  };

  return (
    <div className="App">
      <TitleBar />
      <ImageUploader getImage={handleGetImage}/>
      <VitalInfo getVitalData={handleVitalData} />
      <Divider />
      <VariationInfo getVariationInfo={handleVariationInfo}/>
      <Divider />
      <OfferInfo getOfferInfo={handleGetOfferInfo} />
      <Divider />
      <OtherInfo getOtherInfo={handleGetOtherInfo}/>
      <Button variant="contained" className='uploadBtn' onClick={uploadProduct}>Upload Product</Button>
      <Snackbar open={error} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </div>
  );
}

export default App;

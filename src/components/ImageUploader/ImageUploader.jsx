import './ImageUploader.css'
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import { useState } from 'react';

const ImageUploader = (props) => {
    const [preview, setPreview] = useState("");

    const getImage = (e) => {
        setPreview(window.URL.createObjectURL(e.target.files[0]));
        props.getImage(window.URL.createObjectURL(e.target.files[0]))
    }
    
    return(
        <div className='imageUploader'>
            <p className='title'>Add New Product</p> 
            <div className='previewAndUpload'>
                {preview && <img className='preview' src={preview}/>}
                <label htmlFor="fileUpload" className='imageUploaderContent' type='file'>
                    <InsertPhotoRoundedIcon className='imageIcon' />
                    <p className='imageText'>+Add product images or drop images here</p>
                </label>
                <input className='imageInput' id="fileUpload" type="file" accept="image/*" onChange={getImage} />
            </div>
        </div>
    );
}

export default ImageUploader;
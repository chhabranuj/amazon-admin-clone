import './Footer.css';
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';

const Footer = () => {
    return (
        <div className='footer'>
            <CopyrightRoundedIcon className='footerIcon' />
            <p className='footerData'>&nbsp;2022 - Anuj Chhabra</p>
        </div>
    )
}

export default Footer;
import './TitleBar.css';
import { useState } from 'react';
import logo from '../../assets/images/logo.png';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const TitleBar = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const toToggleMenu = () => {
        if(menuIsOpen) {
            setMenuIsOpen(false);
        }
        else {
            setMenuIsOpen(true);
        }
    }

    return (
        <div className='titleBar'>
            <div className='logoAndMenuIcon'>
                <img src={logo}></img>
                <MenuRoundedIcon className='menuIcon' onClick={toToggleMenu} />
            </div>
            <div className='titleContents'>
                <p className='titleContent home'>Home</p>
                <p className='titleContent featured'>Featured</p>
                <p className='titleContent'>Products</p>
            </div>
            {
                menuIsOpen  &&
                    <div className='mobileTitleContents'>
                        <p className='titleContent home'>Home</p>
                        <p className='titleContent featured'>Featured</p>
                        <p className='titleContent'>Products</p>
                    </div>
            }
        </div>
    );
}

export default TitleBar; 
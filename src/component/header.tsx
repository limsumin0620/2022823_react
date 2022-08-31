import * as React from 'react';
import { Link } from 'react-router-dom';
interface HeaderPops {
    headerName : string,
    isHome : boolean
}

const Header = ({headerName, isHome}:HeaderPops) => {
    return (
        <>
        <div className='header'>
            {isHome === false ? <Link to={`/`} className='btn1' style={{margin:'10px'}}>홈으로</Link> : ''
            }
            <h2 style={{margin : '40px', float : 'left', color : '#404040'}}>
                {headerName}
            </h2>
        </div>
        </>
    );
};

export default Header;
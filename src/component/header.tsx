import * as React from 'react';
interface HeaderPops {
    headerName : string
}

const Header = ({headerName}:HeaderPops) => {
    return (
        <div className='header'>
            <h2 style={{padding : '40px', color : '#404040'}}>
                {headerName}
            </h2>
        </div>
    );
};

export default Header;
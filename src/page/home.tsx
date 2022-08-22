import * as React from 'react';
import Header from 'component/header';
import { Link } from 'react-router-dom';

const Home = () => {
    // const [pagination , setPagination] = React.useState<Array<PagenationInterface>>([]);

    return (
        <>
        <Header headerName="Home"/>
        <div className='content'>
            <Link to={'/currentPage='}>민원 게시판</Link>
        </div>
        </>
    )
}

export default Home;
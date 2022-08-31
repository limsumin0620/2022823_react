import * as React from 'react';
import Header from 'component/Header';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
        <Header headerName="Home" isHome={true} />
        <div className='content'>
            <ul style={{lineHeight: '2em'}}>
                <li><Link to={`/answerBoard`}>민원 게시판</Link></li>
                <li><Link to={`/testBoard`}>테스트 게시판</Link></li>
            </ul>
        </div>
        </>
    )
}

export default Home;
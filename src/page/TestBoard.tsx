import axios from 'axios';
import Header from 'component/Header';
import Pagination from 'component/Pagination';
import SelectPage from 'component/SelectPage';
import { TestBoardInterface } from 'interface/TestBoardInterface';
import * as React from 'react';
import { Link } from 'react-router-dom';

const TestBoard = () => {

    const [loading, setLoading] = React.useState(true);

    const [boardList , setBoardList] = React.useState<Array<TestBoardInterface>>([]);

    const [page , setPage] = React.useState(1);
	const [pageNum , setPageNum] = React.useState(0);
	const [listNum , setListNum] = React.useState(15);
	const offset = (page - 1) * listNum;

    const fetchBoardList = async () => {
		try {
			const response = await axios.get(`http://192.168.10.70:8080/socsoft/testBoard/selctTestBoardList.do?`);
			if(response.status === 200 && response.data.data){
				setLoading(false);
				setBoardList(response.data.data);
			} 
		} catch (error) {
			console.log(error);
		}
	}

    React.useEffect(() => {
		fetchBoardList();
	}, []);


    // 게시물 출력 개수 선택할 때
	const setSelctOption = (listNum : number) => {
		setListNum(listNum);
		setPage(1);
		setPageNum(0);
	}

    if (loading === true) return <img style={{"position": "absolute", "top": "45%", "left" : "46%"}} src={require('../image/logo_loading.gif')}/>
	return (
        <>
        <Header headerName="테스트 게시판" isHome={false}/>
		<div className='content'>
            <div className='search'>
			    <SelectPage setSelctOption={setSelctOption} listNum={listNum}/>
                <Link to={'/testBoardRegist'} className='btn1'>등록하기</Link>
            </div>
            <div className='tableWrap'>
            <table className='BasicTbl1'>
                <thead>
                    <tr>
                        <th style={{width:'10%'}}>번호</th>
                        <th style={{width:'20%'}}>제목</th>
                        <th style={{width :'40%'}}>내용</th>
                        <th style={{width:'30%'}}>날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        boardList.length ?
                        boardList.slice(offset, offset + listNum).map((item, index) => (
                            <tr key={item.seq}>
                                <td>{boardList.length - index - (page-1)*listNum}</td>
                                <td>{item.title}</td>
                                <td><Link to={`/testBoardDetail/seq=${item.seq}`}>{item.contents}</Link></td>
                                <td>{item.createDt}</td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={4}>게시물이 없습니다.</td>
                        </tr>
                    }
                </tbody>
            </table>
			</div>

            <Pagination
				total={boardList.length}
				listNum={listNum}
				page={page}
				pageNum={pageNum}
				setPage={setPage}
				setPageNum={setPageNum}
			/>
        </div>
        </>
    );
}

export default TestBoard;
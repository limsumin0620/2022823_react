import * as React from 'react';
import axios from 'axios';
import Header from 'component/Header';
import { useParams, Link } from "react-router-dom";
import { TestBoardInterface } from 'interface/TestBoardInterface';

const TestBoardDetail = () => {
    const [testBoardDetail , setTestBoardDetail] = React.useState<TestBoardInterface>();
    const [title , setTitle] = React.useState('');
    const [contents , setContents] = React.useState('');
    const {seq} = useParams();
    
    const fetchTestBoardDetail = async () => {
        try {
            const response = await axios.get(`http://192.168.10.70:8080/socsoft/testBoard/selctTestBoardDatail.do?seq=${seq}`);
			if(response.status === 200 && response.data.data){
                setTestBoardDetail(response.data.data);
                setTitle(response.data.data.title);
                setContents(response.data.data.contents);
			}
		} catch (error) {
            console.log(error);
		}
	}

    const titleRef : any = React.useRef();
    const contentsRef : any = React.useRef();

    // 수정내용 저장
    const saveUpdate = async () => {
        if(window.confirm("수정된 내용을 저장하시겠습니까?") && validateInput()){
            try {
                const response = await axios.post(`http://192.168.10.70:8080/socsoft/testBoard/updateTestBoard.do?seq=${seq}&title=${title}&contents=${contents}`);
                if(response.status === 200 && response.data.data){
                    setTestBoardDetail(response.data.data);
                }
                alert("저장되었습니다."); // ?
            } catch (error) {
                console.log(error);
            }
        }else{
            return false;
        }
    }
    
    const changeTitle = (e: any) => {
        setTitle(e.target.value);
    }
    const changeContents = (e: any) => {
        setContents(e.target.value);
    }

    // 유효성 검사
    const validateInput = () => {
        if(title.trim() == "" || title.trim() == null){
            alert("제목을 입력해주세요.");
            titleRef.current.focus();
            return false;
        }
        if(contents.trim() == "" || contents.trim() == null){
            alert("내용을 입력해주세요.");
            contentsRef.current.focus();
            return false;
        }
        return true;
    }

    // 삭제
    const deleteBoard = async () => {
        if(window.confirm("삭제하시겠습니까?")){
            try {
                const response = await axios.post(`http://192.168.10.70:8080/socsoft/testBoard/deleteTestBoard.do?seq=${seq}`);
                if(response.status === 200 && response.data.data){}
                alert("삭제되었습니다.");
                window.location.href='/testBoard';
            } catch (error) {
                console.log(error);
            }
        }else{
            return false;
        }
    }

    React.useEffect(() => {
        fetchTestBoardDetail();
	}, [])

    return (
        <>
        <Header headerName='상세 게시판' isHome={false}/>
        <div className='content'>
        {
        testBoardDetail ? (
        <>
        <div className='tableWrap'>
            <table className='BasicTbl2'>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input type='text' ref={titleRef} className="input1" value={title} onChange={changeTitle}/>
                        </td>
                        <th>날짜</th>
                        <td>{ testBoardDetail.createDt }</td>
                    </tr>
                    <tr >
                        <th>내용</th>
                        <td colSpan={3}>
                        <textarea ref={contentsRef} className="input1" value={contents} onChange={changeContents}
                        style={{height:'300px', width:'-webkit-fill-available', resize: 'none'}} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link className='btn1' to={`/testBoard`}>목록으로 돌아가기</Link>
            <button className='btn1' onClick={deleteBoard} style={{backgroundColor: '#b0c7d3', border: '#b0c7d3 1px solid'}}>삭제하기</button>
            <button className='btn1' onClick={saveUpdate}>저장하기</button>
        </div>
        </>
        ) : '해당 게시글을 찾을 수 없습니다.'
        }
        </div>
        </>
    );
};

export default TestBoardDetail;
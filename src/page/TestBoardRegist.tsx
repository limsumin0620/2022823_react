import axios from 'axios';
import Header from 'component/Header';
import React from 'react';
import { Link } from 'react-router-dom';

const TestBoardRegist = () => {

    const [inputProps , setInputProps] = React.useState({
        title : '',
        contents : ''
    })
    
    const changeHanlder = (e:any) => {
        setInputProps({
            ...inputProps,
            [e.target.name] : e.target.value
        })
    }

    const titleRef : any = React.useRef();
    const contentsRef : any = React.useRef();

    // 유효성 검사
    const validateInput = () => {
        if(inputProps.title.trim() == "" || inputProps.title.trim() == null){
            alert("제목을 입력해주세요.");
            titleRef.current.focus();
            return false;
        }
        if(inputProps.contents.trim() == "" || inputProps.contents.trim() == null){
            alert("내용을 입력해주세요.");
            contentsRef.current.focus();
            return false;
        }
        return true;
    }

    // 저장하기
    const saveBoard = async () => {
        validateInput()
        try {
            const response = await axios.post(`http://192.168.10.70:8080/socsoft/testBoard/insertTestBoard.do?title=${inputProps.title}&contents=${inputProps.contents}`);
			if(response.status === 200 && response.data.data){}
            alert('등록되었습니다.');
            window.location.href='/testBoard';
		} catch (error) {
            console.log(error);
		}
	}

    return (
        <>
        <Header headerName='' isHome={false}/>
        <div className='content'>
        <div className='tableWrap'>
            <table className='BasicTbl2'>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input type='text' ref={titleRef} name='title' className="input1" value={inputProps.title} onChange={changeHanlder}
                            style={{width:'-webkit-fill-available'}}/>
                        </td>
                    </tr>
                    <tr >
                        <th>내용</th>
                        <td>
                        <textarea ref={contentsRef} name='contents' className="input1" value={inputProps.contents} onChange={changeHanlder}
                         style={{height:'300px', width:'-webkit-fill-available', resize: 'none'}} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link className='btn1' to={`/testBoard`}>목록으로 돌아가기</Link>
            <button className='btn1' onClick={saveBoard}>저장하기</button>
        </div>
        </div>
        </>
    );
};

export default TestBoardRegist;
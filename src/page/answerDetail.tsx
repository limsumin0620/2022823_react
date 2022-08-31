import * as React from 'react';
import axios from 'axios';
import { useParams, Link, useSearchParams } from "react-router-dom";
import 'css/common.css';
import Header from 'component/Header';
import { CivilAnswerItem } from 'interface/CivilAnswerInterface';

const AnswerDetail = () => {
  // useSearchParams 쿼리스트링 값을 알 수 있음
  // const [searchParams] = useSearchParams();
  // const gchMinwonCl = searchParams.get('gch_minwon_cl');
  // const gchProcessDept = searchParams.get('gch_process_dept');
  // const searchKeyword = searchParams.get('searchKeyword');
  
  // useParams 를 이용하면 url 의 파라미터 값을 알 수 있음
  const {gchRceptNo} = useParams();
  const [answerDetail , setAnswerDetail] = React.useState<CivilAnswerItem>();
	const fetchAnswerDetail = async () => {
		try {
			const response = await axios.get(`http://192.168.10.70:8080/socsoft/civil/civilAnswerDetail.do?gchRceptNo=${gchRceptNo}`);
			if(response.status === 200 && response.data.data){
				setAnswerDetail(response.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	}

  React.useEffect(() => {
		fetchAnswerDetail();
	}, [])

  return (
    <>
		<Header headerName='' isHome={false}/>
    <div className='content'>
    {
    answerDetail ? (
      <>
      <div className='tableWrap'>
        <table className='BasicTbl2'>
            <tbody>
                <tr>
                    <th>민원제목</th>
                    <td>{ answerDetail.gchTitle }</td>
                </tr>
                <tr >
                    <th>민원 등록일자</th>
                    <td>{ answerDetail.gchCreatDt }</td>
                </tr>
                <tr >
                    <td colSpan={2}>
                        {
                        answerDetail.gchCn
                        }
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

      <div className='tableWrap' style={{float: 'left'}}>
      <h4><img src={require('../image/icon_reply.png')}/>관리자 답변</h4>
        <table className='BasicTbl2'>
            <tbody>
                <tr >
                    <th>처리부서</th>
                    <td>{ answerDetail.gchProcessDept }</td>
                </tr>
                <tr >
                    <th>민원 답변일자</th>
                    <td>{ answerDetail.gchReplyDt }</td>
                </tr>
                <tr >
                    <td colSpan={2}>
                        {
                        answerDetail.gchReplyCn
                        }
                    </td>
                </tr>
            </tbody>
        </table>
        <Link className='btn1' to={`/answerBoard`}>목록으로 돌아가기</Link>
        {/* <button className='btn1' onClick={()=>{
          navigate('/', {state: {gchMinwonCl: gchMinwonCl,
            gchProcessDept: gchProcessDept,
            searchKeyword: searchKeyword          
          } }) }}>목록으로 돌아가기</button> */}
      </div>
      </>
    ) : '해당 게시글을 찾을 수 없습니다.'
    }
    </div>
    </>
  )
}
  
export default AnswerDetail;
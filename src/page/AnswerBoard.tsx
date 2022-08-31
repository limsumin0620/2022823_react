import axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';
import 'css/common.css';
import Header from 'component/Header';
import SelectPage from 'component/SelectPage';
import Pagination from 'component/Pagination';
import { CivilAnswerItem } from 'interface/CivilAnswerInterface';

const CivilAnswer = () => {
	const [loading, setLoading] = React.useState(true); 

	const [answerList , setAnswerList] = React.useState<Array<CivilAnswerItem>>([]);
	const [minwonClList , setMinwonClList] = React.useState<any[]>([]);
	const [processdeptList , setProcessdeptList] = React.useState<any[]>([]);

	const [gchMinwonCl , setGchMinwonCl] = React.useState("");
	const [gchProcessDept , setGchProcessDept] = React.useState("");
	const [searchKeyword , setSearchKeyword] = React.useState("");

	const [page , setPage] = React.useState(1);
	const [pageNum , setPageNum] = React.useState(0);
	const [listNum , setListNum] = React.useState(15);
	const offset = (page - 1) * listNum;

	/* 동시성/병렬성, 싱글스레드/멀티스레드 async await */
	const fetchAnswerList = async () => {
		try {
			const response = await axios.get(`http://192.168.10.70:8080/socsoft/civil/civilAnswerView.do?gchMinwonCl=${gchMinwonCl}&gchProcessDept=${gchProcessDept}&searchKeyword=${searchKeyword}`);
			if(response.status === 200 && response.data.data){
				setLoading(false);
				setAnswerList(response.data.data);
			} 
		} catch (error) {
			console.log(error);
		}
	}
	
	// 민원분류 리스트
	const getGchClList = async () => {
		try {
			const response = await axios.get(`http://192.168.10.70:8080/socsoft/civil/selectGchClList.do?`);
			if(response.status === 200 && response.data.data){
				setMinwonClList(response.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	}
	
	// 처리부서 리스트
	const getProcessDept = async () => {
		try {
			const response = await axios.get(`http://192.168.10.70:8080/socsoft/civil/civilGchDept.do?gchMinwonCl=${gchMinwonCl}`);
			if(response.status === 200 && response.data.data){
				setProcessdeptList(response.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	}

	React.useEffect(() => {
		fetchAnswerList();
		getGchClList();
		// getProcessDept(); // useEffect는 처음에 전부 실행되므로 중복제거
	}, []);

	// 민원분류 select 값 바뀔 때
	React.useEffect(() => {
		setGchProcessDept("");
		getProcessDept()
	},[gchMinwonCl])

	// 게시물 출력 개수 선택할 때
	const setSelctOption = (listNum : number) => {
		setListNum(listNum);
		setPage(1);
		setPageNum(0);
	}

	if (loading === true) return <img style={{"position": "absolute", "top": "45%", "left" : "46%"}} src={require('../image/logo_loading.gif')}/>
	return (
		<>
		<Header headerName="민원 게시판" isHome={false}/>
		<div className='content'>
			<div className='search'>
			<SelectPage setSelctOption={setSelctOption} listNum={listNum}/>
			<label>
				<span><img src={require('../image/btn_b_next.png')}/>민원분류: </span>
				<select name='gchMinwonCl' className="selectPage" value={gchMinwonCl}
					onChange={({ target: { value } }) => {
						setGchMinwonCl(value);
					}}
					>
					<option value={""}>전체</option>
					{
						minwonClList.map(item => (
							<option key={item.gchMinwonCl} value={item.gchMinwonCl}>{item.gchMinwonCl}</option>
						))
					}
				</select>
			</label>

			<label>
				<span><img src={require('../image/btn_b_next.png')}/>처리부서: </span>
				<select name='gchProcessDept' className="selectPage" value={gchProcessDept}
					onChange={({ target: { value } }) => {
						setGchProcessDept(value);
					}}
					style={{width : '160px'}}>
					<option value={""}>전체</option>
					{
						processdeptList.map(item => (
							<option key={item.gchProcessDept} value={item.gchProcessDept}>{item.gchProcessDept}</option>
						))
					}
				</select>
			</label>

			<label>
				<span><img src={require('../image/btn_b_next.png')}/>검색어: </span>
				<input name='searchKeyword' type="text" className="input1" value={searchKeyword}
					onChange={({ target: { value } }) => {
						setSearchKeyword(value);
					}}
					onKeyPress={(e)=>{
						if (e.key === "Enter") {
							fetchAnswerList();
						}
					}}
					placeholder="제목 또는 내용 입력"/>
			</label>
			<button className='btn1' style={{float: 'inherit'}} onClick={() => {fetchAnswerList();}}>검색</button>
			
			<img src={require('../image/icon_tool5.png')} style={{cursor: 'pointer', top: '9px', position: 'relative'}}
				title='검색 조건 초기화'
				onClick={()=>{
					setGchMinwonCl("");
					setGchProcessDept("");
					setSearchKeyword("");
				}}
				/>
			</div>

			<div className='tableWrap'>
				<table className='BasicTbl1'>
					<thead>
						<tr>
							<th style={{width:'10%'}}>민원분류</th>
							<th style={{width:'15%'}}>날짜</th>
							<th style={{width :'60%'}}>민원제목</th>
							<th style={{width:'15%'}}>처리부서</th>
						</tr>
					</thead>
					<tbody>
						{
							answerList.length ?
							answerList.slice(offset, offset + listNum).map(item => (
								<tr key={item.gchRceptNo}>
									<td>{item.gchMinwonCl}</td>
									<td>{item.gchCreatDt}</td>
									<td><Link to={`/answerDetail/gchRceptNo=${item.gchRceptNo}&gchMinwonCl=${gchMinwonCl}&gchProcessDept=${gchProcessDept}&searchKeyword=${searchKeyword}`}>{item.gchTitle}</Link></td>
									<td>{item.gchProcessDept}</td>
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
				total={answerList.length}
				listNum={listNum}
				page={page}
				pageNum={pageNum}
				setPage={setPage}
				setPageNum={setPageNum}
			/>
		</div>
		</>
	)
}
export default CivilAnswer
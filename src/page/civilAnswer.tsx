import axios from 'axios';
import * as React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import 'css/common.css';
import Header from 'component/header';
import SelectPage from 'component/selectPage';
import Pagination from 'component/pagination';
import { CivilAnswerItem } from 'interface/CivilAnswerInterface';
import { PagenationInterface } from 'interface/PagenationInterface';

const CivilAnswer = () => {
	const pageNum = useParams();
	console.log("pagenul : ",pageNum.pageNum);
    const [answerList , setAnswerList] = React.useState<Array<CivilAnswerItem>>([]);

    const [minwonClList , setMinwonClList] = React.useState<any[]>([]);
    const [processdeptList , setProcessdeptList] = React.useState<any[]>([]);

    const [gchMinwonCl , setGchMinwonCl] = React.useState("");
    const [gchProcessDept , setGchProcessDept] = React.useState("");
    const [searchKeyword , setSearchKeyword] = React.useState("");
	
	const [pagination , setPagination] = React.useState<Array<PagenationInterface>>([]);

	const [limit, setLimit] = React.useState(15);
	const [page, setPage] = React.useState(1);
	const [blockNum , setBlockNum] = React.useState(0);
	const offset = (page - 1) * limit;
	
	// React.useEffect(() => {
	// 	setPage(Number(pagenum));
	// },[pagenum])

	/* 동시성/병렬성, 싱글스레드/멀티스레드 async await */
	const fetchAnswerList = async () => {
		try {
			const response = await axios.get(`http://192.168.10.70:8080/socsoft/civil/civilAnswerView.do?gch_minwon_cl=${gchMinwonCl}&gch_process_dept=${gchProcessDept}&searchKeyword=${searchKeyword}`);
			if(response.status === 200 && response.data.data){
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
			const response = await axios.get(`http://192.168.10.70:8080/socsoft/civil/civilGchDept.do?gch_minwon_cl=${gchMinwonCl}`);
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
		getProcessDept();
	}, []);

	// 민원분류 select 값 바뀔 때
	React.useMemo(() => {
		setGchProcessDept("");
		getProcessDept()
	},[gchMinwonCl])

	return (
		<>
		<Header headerName="민원 게시판"/>
		<div className='content'>
			<div className='search'>
			<SelectPage
				limit={limit}
				setLimit ={setLimit}
				setPage={setPage}
				setBlockNum={setBlockNum}
			/>
			
			<label>
				<span><img src={require('../image/btn_b_next.png')}/>민원분류: </span>
				<select name='gchMinwonCl' className="selectPage" value={gchMinwonCl}
					onChange={({ target: { value } }) => {
						setGchMinwonCl(value);
						getProcessDept();
					}}
					>
					<option value={""}>전체</option>
					{
					minwonClList.map(item => (
						<option key={item.gch_minwon_cl} value={item.gch_minwon_cl}>{item.gch_minwon_cl}</option>
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
						<option key={item.dept} value={item.dept}>{item.dept}</option>
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
							answerList.slice(offset, offset + limit).map(item => (
								<tr key={item.gch_rcept_no}>
									<td>{item.gch_minwon_cl}</td>
									<td>{item.gch_creat_dt}</td>
									<td><Link to={`/answerDetail/${item.gch_rcept_no}?gch_minwon_cl=${gchMinwonCl}&gch_process_dept=${gchProcessDept}&searchKeyword=${searchKeyword}`}>{item.gch_title}</Link></td>
									<td>{item.gch_process_dept}</td>
								</tr>
							))
							:
							null
						}
					</tbody>
				</table>
			</div>

			<Pagination
				total ={answerList.length}
				limit={limit}
				pageLimit ='10'
				page={page}
				setPage={setPage}
				blockNum={blockNum}
				setBlockNum={setBlockNum}
			/>
		</div>
		</>
	)
}
export default CivilAnswer
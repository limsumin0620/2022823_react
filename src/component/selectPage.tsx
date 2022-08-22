import * as React from 'react';
/* interface SelectPageProps {
    limit : number,
	setLimit :  number,
	setPage : 
	setBlockNum : 
} */

const SelectPage = ({limit, setLimit, setPage, setBlockNum}:any) => {
// const SelectPage = ({limit, setLimit, setPage, setBlockNum}) => { // setPage 값, 결과가 바뀔 때? set 직접 넘기지않고(hook set을 그대로 넣지않고) 함수를 넘겨주면 됨 callback
    return (
        <label>
			<select value={limit} onChange={({ target: { value } }) => {
				setLimit(Number(value));
				setPage(1);
				setBlockNum(0);
				}} className='selectPage'>
				<option value="15">15개 출력</option>
				<option value="20">20개 출력</option>
				<option value="50">50개 출력</option>
				<option value="100">100개 출력</option>
			</select>
      	</label>
    );
};

export default SelectPage;
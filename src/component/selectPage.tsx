import * as React from 'react';

interface SelectPageProps {
    listNum : number,
	setSelctOption : (listNum : number) => void
}

const SelectPage = ({setSelctOption, listNum}:SelectPageProps) => {
// const SelectPage = ({listNum, setListNum, setPage, setBlockNum}) => { // setPage 값, 결과가 바뀔 때? set 직접 넘기지않고(hook set을 그대로 넣지않고) 함수를 넘겨주면 됨 callback
    return (
        <label>
			<select value={listNum}
				onChange={({ target: { value } }) => {
					setSelctOption(Number(value));
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
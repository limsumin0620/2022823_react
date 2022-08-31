import * as React from 'react';
import {PagenationInterface} from 'interface/PagenationInterface';

interface PagenationProps extends PagenationInterface {
    setPage: (n: number) => void,
    setPageNum : (e:any) => void
}

const createArr = (n:number) => {
    const iArr = new Array(n);
    for(var i =0; i < n; i++) iArr[i] = i+1;
    return iArr;
}

const Pagination = ({ total, listNum, page, pageNum, setPage, setPageNum }: PagenationProps) => {
    const pageList = 10; // 페이지 버튼 출력 개수
    const numPages = Math.ceil(total / listNum);
    const v = Number (pageNum * pageList)
    const iArr = createArr(Number(numPages));
    let pArr = iArr.slice(v, Number(pageList)+ v);

    return (
        <div className='paging'>
            <button onClick={() => {setPage(1); setPageNum(0);}} disabled={page === 1}>&lt;&lt;</button>
            <button onClick={() => {
                setPage(page - 1);
                if((page - 1) <= pageList * pageNum){
                    setPageNum((n: number)=>n-1);
                }}} disabled={page === 1}>&lt;</button>
            {pArr.map(n =>(
                <button
                    key={n}
                    onClick={() => {
                        setPage(n)
                    }}
                    aria-current={page === n ? "page" : undefined}
                >{n}
                </button>
            ))} 
            <button onClick={() => {
                setPage(page + 1);
                if(pageList * Number(pageNum + 1) < Number(page + 1)){
                    setPageNum((n: number) => n + 1);
                }}} disabled={page === numPages}>&gt;</button>  
            <button onClick={() => {
                setPage(numPages);
                setPageNum( Math.ceil(numPages/pageList) - 1)
                }} disabled={page === numPages}>&gt;&gt;</button>  
        </div>
    );
}

export default Pagination;
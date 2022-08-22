import * as React from 'react';

const createArr = (n:any)=>{
    const iArr = new Array(n);
    for(var i =0; i < n; i++)  iArr[i] = i+1;
    return iArr;
}

function Pagination({ total, limit, pageLimit, page, setPage, blockNum, setBlockNum }: any){
    const numPages = Math.ceil(total / limit);
    const v = Number (blockNum * pageLimit)
    const iArr = createArr(Number(numPages));
    let pArr = iArr.slice(v, Number(pageLimit)+ v);
    return (
        <div className='paging'>
        <button onClick={() => {setPage(1); setBlockNum(0);}} disabled={page === 1}>&lt;&lt;</button>
        <button onClick={() => {setPage(page - 1);
        if((page - 1) <= pageLimit * blockNum){
            setBlockNum((n: number)=>n-1);
        }}} disabled={page === 1}>&lt;</button>
        {/* {pArr.map(n =>(
            <button
            key={n}
            onClick={() => {setPage(n)}}
            aria-current={page === n ? "page" : null}
            >{n}
            </button> 
        ))}  */}
        <button onClick={() => {setPage(page + 1);
        if(pageLimit * Number(blockNum + 1) < Number(page + 1)){
            setBlockNum((n: number) => n + 1);
        }}} disabled={page === numPages}>&gt;</button>  
        <button onClick={() => {setPage(numPages);
        setBlockNum( Math.ceil(numPages/pageLimit) - 1)
        }} disabled={page === numPages}>&gt;&gt;</button>  
        </div>
    );
}

export default Pagination;
import * as React from 'react';

export interface PagenationInterface {
    // currentPageNo : number;
	// pageSize : number;
	// totalRecordCount : number;
	// recordCountPerPage : number;
	limit : number,
	page : number,
	blockNum : number,
	total : number,
	pageLimit : number
}
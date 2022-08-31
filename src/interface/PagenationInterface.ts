import * as React from 'react';

export interface PagenationInterface {
	page : number,	 	//출력한 페이지의 번호
	pageNum : number,	// 출력할 페이지 시작번호
	listNum : number,	// 출력할 리스트의 개수
	total : number,		// 리스트의 총 개수
}
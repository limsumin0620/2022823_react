import * as React from 'react';

export interface CivilAnswerItem {
    gchRceptNo : number,            	// 접수번호
	gchRceptField : string,           // 접수분야
	gchMinwonCl : string,             // 민원분류
	gchTitle : string,                 // 제목
	gchCn : string,                    // 내용
	gchProcessDept : string,          // 처리부서
	gchCreatDt : number,              // 접수일자
	gchReplyDt : number,              // 답변일자
	gchReplyCn : string,              // 답변내용
	gchReplyChannel : string,         // 답변채널
	fileSn : string   			        // 파일일련번호
}
import * as React from 'react';

export interface CivilAnswerItem {
    gch_rcept_no : number,            	// 접수번호
	gch_rcept_field : string,           // 접수분야
	gch_minwon_cl : string,             // 민원분류
	gch_title : string,                 // 제목
	gch_cn : string,                    // 내용
	gch_process_dept : string,          // 처리부서
	gch_creat_dt : number,              // 접수일자
	gch_reply_dt : number,              // 답변일자
	gch_reply_cn : string,              // 답변내용
	gch_reply_channel : string,         // 답변채널
	file_sn : string   			        // 파일일련번호
}
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CivilAnswer from './page/AnswerBoard';
import AnswerDetail from './page/AnswerDetail';
import Home from 'page/Home';
import TestBoard from 'page/TestBoard';
import TestBoardDetail from 'page/TestBoardDetail';
import TestBoardRegist from 'page/TestBoardRegist';

function App() {
  return (
    <div>
    <Router>
      <Routes>
          <Route path='/testBoardRegist' element={<TestBoardRegist/>} />
          <Route path='/testBoardDetail/seq=:seq' element={<TestBoardDetail/>} />
          <Route path='/testBoard' element={<TestBoard/>} />
          <Route path='/answerDetail/gchRceptNo=:gchRceptNo' element={<AnswerDetail/>} />
          <Route path='/answerBoard' element ={<CivilAnswer/>}/>
          <Route path='/' element ={<Home/>}/>
          {/* <Route path='/answerDetail/:gch_rcept_no' element={<AnswerDetail/>} /> /answerDetail/ 뒤에가 바뀔 경우? */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;

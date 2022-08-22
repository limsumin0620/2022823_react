import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CivilAnswer from './page/civilAnswer';
import AnswerDetail from './page/answerDetail';
import Home from 'page/home';

function App() {
  return (
    <div>
    <Router>
      <Routes>
          <Route path='/answerDetail/:gch_rcept_no' element={<AnswerDetail/>} />
          {/* <Route path='/currentPage=' element ={<CivilAnswer/>}/> */}
          <Route path='/currentPage=' element ={<CivilAnswer/>}/>
          <Route path='/currentPage=:pageNum' element ={<CivilAnswer/>}/>
          <Route path='/' element ={<Home/>}/>
          {/* <Route path='/answerDetail/:gch_rcept_no' element={<AnswerDetail/>} /> /answerDetail/ 뒤에가 바뀔 경우? */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;

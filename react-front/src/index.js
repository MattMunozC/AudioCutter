import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import {FileUpload,Modal,Timeline,Logo,CutList} from './App'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Logo/>
    <Modal/>
    <CutList/>
    <FileUpload/>
    <Timeline/>
  </React.StrictMode>
);

window.addEventListener("drop",function(e){
  e.preventDefault();
},false);
window.addEventListener("dragover",function(e){
  e.preventDefault();
},false);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

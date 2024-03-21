
import './css/modal.css';
import './css/timeline.css';
import './css/logo.css'
import './css/DragDrop.css'
import './css/CutList.css'
import $ from 'jquery'
import React, { useState, useRef, useEffect} from 'react'
import {Visualize} from "./Audio.js"

export function Logo(){
  return (<div className='logo'>
    <img className='min-logo'src='static/svg/Disque_Vinyl.svg' alt="logo"></img>
    <div>AudioCutter</div>
  </div>)
}
function sendFile(file){
  var data = new FormData();
        data.append("file", file)
        data.append('csrfmiddlewaretoken',"{{csrf_token}}")
        $("#modal").show()
        $.ajax({
          processData: false,
          contentType: false,
          mimeType: "multipart/form-data",
          url: "http://127.0.0.1:8000/upload_audio",
          method:"POST",
          data:data,
          success:function(response){
            $("#modal").hide()
            response=JSON.parse(response)
            Visualize(response.data,"canvas",5)
            $('#cutter').show()
          },
          fail:function(jqXHR, textStatus, errorThrown ){
            console.log(textStatus)
          }
      })
}

export function FileUpload(){
  const [files, setFiles] = useState([])

  const handleDrop = (event) => {
      event.preventDefault();
      const data= event.dataTransfer;
      for(var file of data.files){
        if(file.type==="audio/mpeg"){
          setFiles([file]);
        }
      }
    };

  const handleDragOver = (event) => {
    event.preventDefault()

  }

  const handleDragStart = (event) => {
      event.preventDefault()
  }
  const ButtonClicked = (event) => {
    
      for(var file of files){
        sendFile(file)
      }
  }

  const ButtonHover = (event) =>{
    $("#upload").append(`<img src="static/svg/upload_icon.svg" alt="upload" class="filter-white"></img>`)
  }

  const ButtonOut = (event) =>{
    $("#upload").text("upload")
  }
  return (
      <div className='DragDrop'>
          <div className="showBorders" onDragOver={handleDragOver} onDrop={handleDrop} >
              <div className="upload-area" draggable = "true" onDragStart={handleDragStart}>
                <div >
                    {files.map((file, index) => (<div>                         
                    <img src='static/svg/mp3.svg' alt={file.name} className='uploaded-file'></img>
                    <div className='song-name'>{file.name}</div></div>))
                  }
                </div>
            </div>
          </div>
          <button id='upload' onClick={ButtonClicked} className='upload-Button' onMouseOver={ButtonHover} onMouseOut={ButtonOut}>Upload</button>
        </div>
  )
}

export function Timeline(){
  return(<div className='timeline-component'>
  <div className='timestamp' id='timestamp'>
  </div>
  <TimePoints></TimePoints>
  <div id='timeline' className='timeline-wrapper'>
    <canvas className='timeline' id="canvas" width={1000} height={1000}></canvas>
    <Cutter></Cutter>
  </div>
  </div>)
}
function Cutter(){
  const refBox =useRef(null);
  const refLeft =useRef(null);
  const refRigth =useRef(null);

  useEffect(()=>{
    const resizeableElement=refBox.current;
    const styles=window.getComputedStyle(resizeableElement);
    let width=parseInt(styles.width,10);
    let xCord = 0;

    //Right

    const onMouseMoveRightResize= (event) => {
      const dx = event.clientX - xCord;
      xCord = event.clientX

      width = width + dx

      resizeableElement.style.width = `${width}px`
    };

    const onMouseUpRightResize= (event) => {
      document.removeEventListener("mousemove",onMouseMoveRightResize);
    }

    const onMouseDownRightResize=(event) => {
      xCord = event.clientX;
      resizeableElement.style.left = styles.left;
      resizeableElement.style.right= null;
      document.addEventListener("mousemove",onMouseMoveRightResize);
      document.addEventListener("mouseup",onMouseUpRightResize);
    };


    //Left

    const onMouseMoveLeftResize = (event) => {
      const dx = event.clientX - xCord;
      xCord = event.clientX
      
      width = width - dx
      console.log(width)
      
      resizeableElement.style.width = `${width}px`
    };
    
    const onMouseUpLeftResize= (event) => {
      document.removeEventListener("mousemove",onMouseMoveLeftResize);
    }
    
    const onMouseDownLeftResize=(event) => {
      xCord = event.clientX;
      resizeableElement.style.right = styles.right;
      resizeableElement.style.left= null;
      document.addEventListener("mousemove",onMouseMoveLeftResize);
      document.addEventListener("mouseup",onMouseUpLeftResize);
    };

    //mouse down event listener
    const resizerRight =refRigth.current
    resizerRight.addEventListener("mousedown",onMouseDownRightResize);
    
    const resizerLeft =refLeft.current
    resizerLeft.addEventListener("mousedown",onMouseDownLeftResize);

    return () => {
      resizerRight.removeEventListener("mousedown",onMouseDownRightResize);
      resizerLeft.removeEventListener("mousedown",onMouseDownLeftResize);
    }
  },[]);
  return (<div id='cutter' ref={refBox} className='cut' style={{left:'50%',display:'none'}}>
    <div ref={refRigth} className='resizer rr'></div>
    <div ref={refLeft} className='resizer rl'></div>
  </div>)
}
function TimePoints(){
  return (<div className='timestamp-function'>
    <label style={{color:'white'}}>From</label>
    <input className='timepoint' ></input>
    <label style={{color:'white'}}>To</label>
    <input className='timepoint'></input>
    <button className='cut-Button' >Cut<img src='static/svg/scissors.svg' alt='cut' className='scissor'></img></button>
  </div>)
}

export function Modal(){
  return(<div id="modal" className='modal'> 

  <div className='modal-content'>
    <img className='App-logo' src='./static/svg/Disque_Vinyl.svg' alt='logo'></img>
  </div>
  </div>)
}

export function CutList(){
  
  const playButton = (event) =>{
    const video = document.querySelector(".video");
    video.play()
  }
  const pauseButton = (event) => {
    const video = document.querySelector(".video");
    video.pause()
  }
  return(<div className='cutlist'>
    <video id="Audio-player" className="video" src="http://127.0.0.1:8000/testing">
      Your browser does not support the <code>audio</code> element.
    </video>
    <button onClick={playButton}>Click Me</button>
    <button onClick={pauseButton}>no! Click Me</button>

  </div>)
}

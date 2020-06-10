import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//useFullscreen
//전체화면을 만들어 주는 함수.
//너무 전체화면이라 얼마나 사용할 지는 모르겠지만..

const useFullscreen = callback => {
  const element = useRef();

  const runCb = isFull => {
    if (callback && typeof callback === "function") {
      callback(isFull);
    }
  };

  const triggerFull = () => {
    if (element.current) {
      if (element.current.requestFullScreen) {
        element.current.requestFullScreen();
      } else if (element.current.webkitRequestFullScreen) {
        element.current.webkitRequestFullScreen();
      } else if (element.current.mozRequestFullScreen) {
        element.current.mozRequestFullScreen();
      } else if (element.current.msRequestFullScreen) {
        element.current.msRequestFullScreen();
      }
    }
    runCb(true);
  };

  const exitFull = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mosExitFullscreen) {
      document.mosExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    runCb(false);
  };

  //requestFullScreen, exitFullscreen 명령어는 브라우저들마다 명령어가 달라서
  //앞에 각자 사용되는 명령어들을 if문을 통해서 분류해야한다.
  //이 메소드들 말고도 다른 것들 중에도 구분되서 사용되고 있으니 알아보고 사용할 것.

  return { element, triggerFull, exitFull };
  //사용된 이름들은 리턴으로 꼭 돌려주어야 한다.
};

const App = () => {
  const onFullS = isFull => {
    console.log(isFull ? "We are full" : "We are small");
  };

  const { element, triggerFull, exitFull } = useFullscreen(onFullS);
  //사용 되어야 할 부분을 useFullscreen에 넘겨주고 다시 받아와서 사용 되어야 할 부분에
  //데이터를 전달한다.
  //여기서 전체화면이 되는 부분은 img가 아닌 그 위 부모태그인 div 태그다.
  //img 태그에 넣었다면 이미지를 과하게 늘려버림.
  //img에 width height 를 각각 100% 로 넣어주면 커진 div 만큼 이미지가 채워지기에
  //굳이 img에 넣을 필요는 없다.

  return (
    <div className="App" style={{ height: "1000vh" }}>
      <div ref={element}>
        <img src="https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E" />
        <button onClick={exitFull}>Exit Fullscreen</button>
      </div>
      <button onClick={triggerFull}>Make Fullscreen</button>
    </div>
  );
};

export default App;

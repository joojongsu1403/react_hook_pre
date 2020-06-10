import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//useNotification
//컴퓨터 자체 알람을 연결해줌. 그냥 알림기능 ㅇㅇ
//window로 치면 화면 우측에 떳다 안떳다 하는 그거 ㅇㅇ.
//Notification은 리액트가 아닌 자바스크립트가 가지는 내장함수.
//mdn에서 Notification 으로 검색하면 사용할 수 있는 메소드들 설명되어 있음.
//

const useNotification = (title, options) => {
  if (!("Notification" in window)) {
    return;
    //window 안에 이 명령어가 없다면 그냥 리턴
    //그룹을 안지어도 작동은 되는것 같지만 정확한 명령이 아니기에 그룹을 지어 놓는게 맞는듯.
  }
  const fireNotif = () => {
    if (Notification.permission !== "granted") {
        //Notification.permission 알림표시의 현재 권한을 나타냄.
        //granted는 사용자가 알림표시를 수락할 때 표시됨.
        //사용자가 알림표시를 수락했는지 아닌지를 구별하기 위함.
      Notification.requestPermission().then(permission => {
          //Notification.requestPermission() 사용자에게 알림을 표시할 권한을 요청함.
          //요청된 권한 여부를 then을 통해 조건문을 실행
        if (permission === "granted") {
          new Notification(title, options);
          console.log("thanks");
        } else {
            console.log("no thanks");
          return;
        }
      });
    } else {
      new Notification(title, options);
      //알림표시를 기존에 수락하고 있다면 그냥 바로 실행.
    }
  };
  return fireNotif;
};

    //위에서 사용된 .then(); = 순차적 실행이라는 이미지를 가지면 이해하기 좋음.
    //보통 api 사용시 쓰이는 걸로 알고 있음.
    //mdn의 예시에 있는 내용을 그대로 가져옴.
      //Notification.requestPermission() = 사용자에게 알림을 표시 할 권한을 요청한다.
      //.then() = promise의 패턴. 내장함수로 사용시 new Promise로 사용.
      //new로 새로 꺼내지 않아도 then은 사용가능.
      //promise는 작업 완료시 뜨는 resolve값과 작업 중 실패하는 reject 값을 가짐.
      //여기서 then은 작업이 완료된 뒤 하나씩 순차적으로 실행시키는 역할을 해줌.
      //작업 후 return으로 다음 then을 이으면 앞에 작업이 완료된 이후 다음 then을 실행
      //그리고 다음이 있으면 그 뒤로 꼬리물기 하듯이 이어짐.


const App = () => {
  const tirggerNoitf = useNotification("Can I ...", { body: "I Love..." });
  //useNotification은 알람의 타이틀로 들어가는 첫번째 인자와 그 안에 내용을 적어주는
  //두번째 인자를 사용한다. 두번째는 내용을 적는거라 없으면 비어있는 채로 출력한다.
  return (
    <div className="App">
      <button onClick={tirggerNoitf}>Hello</button>
    </div>
  );
};

export default App;

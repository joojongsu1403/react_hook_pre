import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//useConfirm

//useConfirm은 사용자가 무언가를 하기전에 확인하는 작업
//예를 들어 사용자가 버튼을 클릭하는 작업을 하면 (이벤트를 실행하기 전에) 메세지를 보여주는 것
//"정말 그렇게 하고 싶니?" 와 같은 메세지

const useConfirm = (message = "", onConfirm, onCancel) => {
  if (!onConfirm || typeof onConfirm !== "function") {
    return;
  }
  if (onCancel && typeof onCancel !== "function") {
    return;
  }
  //해당 조건을 충족시키지 못하면 빈 return을 보냄. 즉, 아무것도 일어나지 않음.
  const confirmAction = () => {
    if (confirm(message)) {
      onConfirm();
      //if문에 confirm 함수에 message를 가지고 있다면 onConfirm함수를 실행.
      //confirm은 확인 창을 brower에 띄우는 명령어로 이 함수에 massage가 들어왔을 때
      //실행 시키는 듯 싶다.
      //그리고 이 값을 true로 지정할 시 onConfirm을
    } else {
      onCancel();
      //false로 지정할 시 onCancel 함수를 실행하는 듯 하다.
    }
  };
  return confirmAction;
};

const App = () => {
  const deleteWorld = () => console.log("deleting the world...");
  const abort = () => console.log("Aborted");
  const confirmDelete = useConfirm("Are you sure", deleteWorld, abort);
  //기본적인 사용법은 같음.
  //인자를 세개를 보냈고 위에도 인자를 세개를 받음.
  return (
    <div className="App">
      <button onClick={confirmDelete}>Delete the world</button>
    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//usePreventLeave
//현재 창에서 떠나는 것을 방지할 때 사용하는 방법.
//Prevent 방지, 막다 / Leave 떠나다. / Default 기본값.
//명령어에 보통 사용목적이 다 있다.

//저장이 되지 않았을 때 경고창을 띄운다.

const usePreventLeave = () => {
  const listener = event => {
    event.preventDefault();
    event.returnValue = "";
    //여기서 사용된 returnValue는 크롬 어딘가에 저장이 될것이라 함
    //beforeunload를 통해 listener이 실행이 되고 여기에 들어있는 event는
    //preventDefault()로 막은뒤 event.returnValue로 값을 넣었다.
    // event.returnValue 예시 일 뿐 중요한건 아니며 이 자리에 다른 명령으로 필요한
    //것을 대체 할 수 있다.
    //여기서 event.returnValue를 통해 데이터가 변경되었음으로 window에선 데이터가
    //변경되었음을 알리고 그래도 종료를 하겠냐고 되물을 것이다.
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () =>
    window.removeEventListener("beforeunload", listener);
  //이벤트 실행 명령 중 beforeunload는 window가 닫히기 전에 function이 실행되는걸 허락함
  return { enablePrevent, disablePrevent };
};

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();
  return (
    <div className="App">
      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>unProtect</button>
    </div>
  );
};

export default App;

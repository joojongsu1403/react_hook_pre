import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
//useTitle

const useTitle = initialTitle => {
  const [title, setTitle] = useState(initialTitle);
  //밑에서 받아온 인자를 initialTitle로 전달받은 다음 useState로 저장함.
  const updaterTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerText = title;
    //html에 title태그를 선택하고 선택된 곳에 useState로 저장한 title로 저장한다.
  };
  useEffect(updaterTitle, [title]);
  //밑의 컴포넌트를 불러온 즉시 실행되는 함수의 훅 버전
  //현재 저장된 데이터들을 가져오며 이후 명령을 통해 변경된 데이터를 가지고 새로 렌더링이
  //되면 그 데이터를 호출한다.
  return setTitle;
};

const App = () => {
  const titleUpdater = useTitle("loading...");
  //이 변수는 명령을 넣을때 사용됨.
  //명령이 들어가 있지 않아도 해당 코드를 통해 useTitle에 "loading..." 문자가 넘어가있음.
  //setTimeout(()=> titleUpdater("Home"), 5000); 
  //예시는 5초뒤에 Home으로 업데이트 한다. 이런 식으로 원하는 방법으로 사용한다.
  return (
    <div className="App">
      <div>Hi</div>
    </div>
  );
};

export default App;


import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//uesClick
//이벤트만 달리해서 hover 이벤트등 도 사용가능
const useClick = onClick => {
  if (typeof onClick !== "function") {
    return;
  }
  //onClick으로 넘어온 데이터가 함수가 아닐 경우 빈 return을 보낸다.
  const element = useRef();
  //레퍼런스는 특정 엘리멘트를 선택할때 사용한다.
   //리액트에서 getElementById를 사용하는 전제조건
   //밑의 컴포넌트에서 h1태그 안에 ref를 선언했고 useClick을 호출했기에 연결됨.
   //즉, 여기서는 element 변수는 h1태그와 연결됨.
  useEffect(() => {
      //앞에서 설명했다 싶이 useEffect는 componentDidMount와 같은 기능.
      //컴포넌트의 불러오기가 마친 시점에서 바로 이를 실행시킨다.
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    //첫번째 if, 또는 별다른 조건이 걸리지 않으면 componentDidMount, componentDidUpdate
    //기능을 수행한다.
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
    //단, 리턴에 함수를 설정하게 되면 그 함수는componentWillUpdate(현재는 componentWillUnmount)
    //기능을 수행한다.

    //여기서는 현재 선택된 엘리먼트에 클릭이벤트가 설정되고 실행이 되면 이를 없애버린다.
    //그러나 다시 호출이 되면 이벤트는 다시 호출된다.
    //호출되고 사용시 지워짐을 반복한다.
  }, []);
  //useEffect 마지막에 들어가는 []는 componentDidMount를 한번만 실행시키는 의미를 가진다.
  //만약 저 부분을 [] 없이 완전히 비워놓게 된다면 매번 update를 시킬 때 마다 작동될 것이다.
  //useEffect 마지막에 들어가는 []는 dependeny는 componentDidUpdate 사용 유무를 따질 수 있다.
  //만약 저기에 값이 지정되면 컴포넌트가 마운트 될 시 componentDidMount만 호출 될 것이다.
  return element;
};

const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
  //이 부분은 앞에서 정리한대로 사용함.
  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

export default App;

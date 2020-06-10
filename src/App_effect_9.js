import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// import "./styles.css";
// import { element } from "prop-types"; 오류때문에 자동으로 생겼지만 안씀.
//작업은 codesandbox에서 함. 거긴 알아서 달아줌. 웹사이트에서 움직이는 편집기임.

//useScroll
//두가지 버전이 있는데 1번은 노마드가 가르쳐준 스타일.
//2번은 거기에 html태그를 깔끔하게 해보기 위해 다른 함수로 추가한 개인 작업.

//1. 노마드 버전
const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0
  });
  //useState에서 저장되는 초기값은 그냥 저대로이며 숫자로 입력하기 위함인가 싶음.
  const onScroll = () => {
    setState({ y: window.scrollY, x: window.scrollX });
    //state의 각자의 값은 setState의 현재 위치를 따로 입력을 시킴으로써 데이터를 가짐.
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  //useEffect 끝에 []는 componentDidMount를 한번만 실행하기 위해 걸어두는 조건.
  return state;
};

//2. 개인적인 추가부분.
// 이 부분은 개인적으로 해본 부분.
// useFadeIn(App_effect_7) 부분을 가져다 참고해서 씀.
const useStyle = () => {
  const element = useRef();
  //레퍼런스를 사용할 경우 useEffect가 반듯이 있어야 함.
  //useEffect 안에서는 레퍼런스를 만들 수 없음.
  const { y } = useScroll();
  //외부에서 다른 함수를 가져다 쓰지만 useEffect 안에선 인식 안됨.
  //안에 안쪽은 인식이 안되었던건지 찾아봐야 할듯.
  useEffect(() => {
      //레퍼런스를 useEffect 밖에서 선언하고 안에서 사용해야함. 에러 터짐.
    if (element.current) {
      const { current } = element;
      current.style.position = "fixed";
      current.style.top = `50px`;
      current.style.color = y > 100 ? "red" : "blue";
    } // 조건문이 없어도 작동은 함. 그래도 안전하게 조건문 거는것도..?
  });
  return { ref: element };
  // 다른 곳에 저장된 state도 변수 선언 및 호출을 통해 가져다 쓸 수 있다는 것.
  //기억해두자.
  // 덧붙여 오류 터지면 겁내지 말고 파파고(번역기) 돌리자.
  //useEffect 조심해서 쓰라고 튜토리얼에 나와 있던데.. 언제 어떻게 쓰는지도 알아둬야 할듯.
};

const App = () => {
  const { y } = useScroll(); // 노마드가 가르쳐준 방법.
  const sty = useStyle(); // 한번 더 함수에 넣어 사용해봄.
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
        Hello
      </h1>
      <h1 {...sty}>style</h1> 
      {/* 함축표현? 으로 하여 최대한 깔끔하게 해보고 싶어서 해봄 */}
    </div>
  );
};

export default App;


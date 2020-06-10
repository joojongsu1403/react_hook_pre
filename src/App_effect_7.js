import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//useFadeIn
//여기서 중요한건 특정 타겟을 대상으로 style을 적용시킬 수 있다는 것.
//내가 즐겨하던 style 수치변경을 할 수 있는 방법인가?
//useEffect로 마운트 된 후 style을 조정하게 된다면 로딩 후 움직임을 줄 수 있을지..?

const useFadeIn = (duration = 1, delay = 0) => {
    //첫번째 인자는 기본적으로 duration 시간을 1초로 잡음, 근데 인자만 넣어도 될듯 ㅇㅇ.
    //두번째 인자는 delay를 받음.
  if (typeof duration !== "number" || typeof delay !== "number") {
    return;
  }
  //typeof 로 해당 사항 없으면 함수를 죽임?? 하여튼 작동 안하게 함.
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
      current.style.opacity = 1;
      //태그에 들어 있는 함수에서 호출하면서 현재 선택된 element의 정보도 포함이 됨
      //그 포함된 정보를 current로 받아서 style을 직접 지정함.
      //위에서 변수는 이해할때 element에 포함된 current로 보면 됨. 그저 이름이 아님.
    }
  }, []);
  return { ref: element, style: { opacity: 0 } };
  //세팅된 값을 리턴함.
  //리턴 시켜야될 값만 표현만 잘 하면 될듯.
  //앞에서 리턴이 필요없는 Leave 함수나, 함수가 따로 지정될 경우 {a,b}로 표현을 할 경우도
  //있듯이 위처럼 리턴시켜야 할 내용을 표기하는 것도 가능한듯.
  //내가 리턴으로 뭘 돌려주고 싶은지를 정하는게 중요할 듯.
};

const App = () => {
  const fadeInH1 = useFadeIn(1, 2);
  const fadeInP = useFadeIn(5, 10);
  //useFadeIn을 따로 불러냄. duration 과 delay를 따로 적용하기 위함.
  //이걸로 볼 수 있는건 수치만 조작할 수 있게 하여 같은 함수를 계속 반복해서 사용 가능함.
  //함수형이 좋긴 좋음 ㅇㅇ.
  return (
    <div className="App">
      <h1 {...fadeInH1}>Hello</h1>
      <p {...fadeInP}>lorem ipsum lalalala</p>
    </div>
  );
  //여기서 {...}으로 받는 데이터들은 전부 받아야 될 함수내에서 리턴되는 내용들을
  //함축시킨 표현이라고 생각함. 정확하겐 모르겠음.
};

export default App;

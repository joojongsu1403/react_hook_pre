import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//useEffect

const App = () => {
  const sayHello = () => console.log("hello");

  const [number, setNumber] = useState(0);
  const [aNumber, setAnumber] = useState(0);

  useEffect(sayHello, [number]);
  //useEffect는 componentDidMount와 componentWillUpdate, componentDidUpdate의 기능을 가진다.
  //useEffect는 2개의 인자를 받는데 첫번째는 function으로써의 effect
  //deps가 있다면 effect는 리스트(deps)에 있는 값일 때만 값이 변하도록 설정됨.
  //첫번째 인자 자리는 실행문이 들어간다.
  //두번째 인자 자리에 조건을 받으며 작동을 원하지 않을시 빈배열로 놔두면 된다.
  //dependency는 매우매우 중요

  return (
    <div className="App">
      <div>Hi</div>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setAnumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
};

export default App;

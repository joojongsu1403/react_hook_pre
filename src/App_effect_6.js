import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//useBeforeLeave 
//before 전에 / Leave 떠나다
//떠나기 전에 사용할 수 있는 것.

const useBeforeLeave = onBefore => {
  if (typeof onBefore !== "function") {
    return;
  }
  const handle = event => {
    const { clientY } = event;
    if (clientY <= 0) {
      onBefore();
    }
  };
  //해당 event를 console.log로 확인해보면 마우스가 어디 지점에서 Leave 했는지 알 수 있다.
  //그걸 이용해서 특정 지점을 빠져나갔을 때 호출이 되도록 설정한 것.
  //여기서는 조건에 브라우저 화면에서 상단으로 빠져나갔을 시 호출되도록 하였다.
  useEffect(() => {
    document.addEventListener("mouseleave", handle);
    return () => document.removeEventListener("mouseleave", handle);
  }, []);
  //앞에서도 얘기했지만 componentDidMount 기능을 마운트 후에 한번만 사용하고 싶을 시
  //[] 꼭 넣을 것.
  //useEffect에서 바로 입력되는 것은 componentDidMount, componentDidUpdate로 사용되며
  //return 이후에 오는 것은 componentWillUnmount로 사용된다.

  //docment를 지칭하는 이벤트기에 레퍼런스 (ref) 를 사용하지 않아도 되는 듯 싶다.
};

const App = () => {
  const begForLife = () => console.log("pls dont leave");
  useBeforeLeave(begForLife);
  //따로 어딘가에 지정해서 쓰는 것이 아니면 즉시 호출해서 사용해도 된다.
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//useNetwork
//여기서는 online offline 구별만 하게 해놨는데 어떻게 사용해야 할지는...

//useState 와 useEffect를 같이 씀.

const useNetwork = onChange => {
  const [status, setStatus] = useState(navigator.onLine);
  //앞에서는 항상 인자를 받아서 state로 저장했지만 여기서는 내장된 객체들에서
  //데이터를 가져옴. navigator.onLine은 현재 인터넷 연결 여부를 따짐.
  //navigator.onLine은 불리언 값을 반환한다.
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(navigator.onLine);
      //밑에서 보낸 인자가 함수일 경우, navigator에 저장된 온,오프 여부를 부여한다.
    }
    setStatus(navigator.onLine);
    //이벤트리스너에서 online든 offline이든 실행하게 되어 있기 때문에 온,오프로 이벤트가
    //발생하면 그에 맞게 status에 저장하고 새로 렌더링 한다.
  };
  useEffect(() => {
    window.addEventListener("online", handleChange);
    window.addEventListener("offline", handleChange);
    () => {
      window.removeEventListener("online", handleChange);
      window.removeEventListener("offline", handleChange);
    };
  }, []);
  return status;
  //여기서 내가 결과를 내보내고 싶은 데이터는 state에 저장된 값.
  //그래서 useState로 저장한 status를 리턴시킴.
};

const App = () => {
  const handleNetworkChange = online => {
    console.log(online ? "We just went online" : "We are offline");
  };
  const onLine = useNetwork(handleNetworkChange);
  //뭔지 알지?
  return (
    <div className="App">
      <h1>{onLine ? "Online" : "Offline"}</h1>
    </div>
  );
  // useNetwork에서 받아온 데이터를 토대로 true면 online을 false면 offline을 출력함.
};

export default App;

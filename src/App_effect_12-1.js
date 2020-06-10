import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import useAxios from "./App_effect_12-2";

import "./styles.css";

//useAxios 렌더링 될 컴포넌트.


const App = () => {
  const { loading, data, error, refetch } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json"
  });
  // 이부분은 알테니 설명을 간략히 해서
  //useAxios에 url 데이터를 넘긴 다음 거기서 처리된 데이터를 해당 변수 이름들에 받아서
  //아래 처럼 필요한 곳에 데이터를 보냄.
  console.log(
    `loading:${loading}\nError:${error}\nData:${JSON.stringify(data)}`
  );
  return (
    <div className="App" style={{ height: "1000vh" }}>
      <h1>{data && data.status}</h1>
      <h2>{loading && "Loading"}</h2>
      <button onClick={refetch}>refetch</button>
    </div>
  );
};
//html부분에서 h1, h2 내용에 { a && b }가 되어 있는 이 방법은 '조건부 렌더링'이라 한다.
//불리언 여부로 동작하며 기존에 먼저 불리언 값을 state에 저장해 두거나
//조건을 걸어서 여부를 판별하게 한다.
//위의 예시대로 a가 true일 경우 b를 반환하고 a가 false일 경우 b는 무시된다.

//즉, 여기선 첫 시작부분에서 data는 받아오는 중이기에 null 상태이므로 무시가 되고
//loading은 state에 true로 저장이 되었기 때문에 반환된다.

//어떻게 데이터가 넘어와서 반환되는지는 12-2를 참고.
export default App;

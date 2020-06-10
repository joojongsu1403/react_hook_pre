import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";


//useTabs 사용
const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  }
];
//사용할 데이터들.
//배열로 하여 배열 하나 하나에 데이터를 입력. 

const useTabs = (initialTab, allTabs) => {
    //initialTab은 초기값으로 사용할 0을 받아들이고
    //allTabs는 상단의 content를 받아들인다.
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  //allTabs에서 받아들인 content가 아니거나 또는 배열이 아닐때 에러가 아닌 빈값을 리턴시킨다.
  //에러가 생겨도 조용히 넘어가는 방법이라 생각하면 됨
  //반대로 둘중에 하나라도 !표가 없다면 되려 데이터가 맞는데도 undefind를 리턴시키니 조심할 것.

  const [currentIndex, setCurrentIndex] = useState(initialTab);
  //useState에 초기값인 0을 받아들인다.
  //첫번째는 초기값을 가지고 두번째는 새 state를 받을 때 useState에 업데이트 및 리렌더링 한다.
  return {
    currentItem: allTabs[currentIndex],
    //allTabs에 들어있는 content에서 useState가 받은 초기값을 기준으로 받는다.
    //allTabs[currentIndex] = content[0] 과 같다.
    changeItem: setCurrentIndex
    //밑에 button의 onClick을 통해 클릭된 button의 index 값을 전달받아 
    //setCurrentIndex 를 통해 useState에 업데이트 및 리렌더링 시킨다.
  };
};

const App = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  //구조 분해 할당을 통해 밑에 리턴에서 선언한 부분의 이름을 통해 먼저 비어 있는 변수
  //이름으로 하여 useTabs 함수를 선언하여 연결.
  //여기서 useTabs로 보내는 것은 배열의 순서로 사용할 숫자 0, 
  //그리고 상단의 content 변수로 저장된 배열이다.
  return (
    <div className="App">
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};
//content.map에서 map은 배열 순환이고 (for문과 비슷하지만 따로 코드를 추가할 필요 없이 사용가능)
//배열의 마지막까지 순환 시켜 반환한다.
//App함수 안에서 상단 변수를 통해 리턴 받은 내용을 토대로 빌드한다.
export default App;

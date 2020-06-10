import React, { useState } from "react";
import "./styles.css";


//useInput 사용
const useInput = (initialValue, validator) => {
    //initialValue인자는 name에 들어있는 value와 onChange 데이터를 가지고 온다.
    //validator인자는 밑에 있는 maxLen 함수를 가지고 온다. 
    //validator은 여기까지는 아직 함수(계산식)만 있고 내용은 없다.
  
  const [value, setValue] = useState(initialValue);
  //initialValue에서 가지고온 name의 데이터를 useState를 사용해 state에 입력되고
  //이 값은 useInput로 지칭하고 있는 value에 저장된다.

  const onChange = event => {
      //onChange는 밑의 App함수에서 input에 주어졌던 onChange 메소드의 데이터이며
      //name에서 initialValue를 통해 value, onChange 데이터를 전달 받는다.
      //onChange는 지정된 메소드 이름으로 임의로 변경할 경우 에러를 일으킨다.
      //event는 onChange에서 받은 name의 내용을 event를 인자로 하여 받는 값이다.

    const {
      target: { value }
    } = event;
    //여기서 value는 위에서 선언된 useState로 입력된 value의 값이 아닌
    //밑의 input에서 name을 통해 onChange 함수로 넘어온 데이터이다. 
    //event는 onChange에서 받은 name의 내용을 event를 인자로 하여 받는 값이다.
    //value값은 target으로 지정해야한다. target지정하지 않으면 onChange 함수로 
    //넘어온 데이터를 저장할 곳을 인식하지 못하는 듯 하다.
    //input에서 입력된 값은 onChange를 통하여 해당 event를 통해 데이터를 전달 받으며
    //여기서 value로 선언 함으로써 이 값을 사용할 수 있게 된다.
    //target:{value}는 event이고 event는 target:{value}라고 생각하면 된다.
    //이 선언이 없다면 밑에서 이뤄지는 내용은 업데이트를 할 수가 없으며 따로 추가적인
    //선언들이 필요할 것이다.

    let willUpdate = true;
    //App 함수에서 올라온 maxLen함수를 사용하여 구분하기 위한 기본 값이다.
    //maxLen에서 다른 검증 함수를 가지고 오면 기준을 다르게 적용하면 된다.

    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    //validator로 들어온 내용이 함수인지 구분한 뒤  willUpdate에 validator(value)값을
    //입력한다. 여기서 들어온 validator(value)는 maxLen에서 들어온 불리언 값을 사용한다.
    //validator()은 밑에서 받아온 maxLen의 함수이며 인자로 들어가는 것은 value의 값이다.
    //validator(value)가 true를 가지고 있다면 let으로 선언된 변수는 그대로 true를,
    //false를 가지고 있다면 let으로 선언된 변수는 false로 저장될 것이다.

    if (willUpdate) {
      setValue(value);
    }
    //위의 if문에서 willUpdate가 true 값을 받으면 setValue를 통해 
    //value의 값이 useState로 저장된다.
    //willUpdate값이 false로 받을시 setValue(value)은 실행되지 않는다.
    //if문은 기본적으로 true를 반환한다. if(willUdate === true) 와 같다.

  };
  return { value, onChange };
  //실행되고 저장된 value, 와 onChange값을 리턴시켜 처리된 값을 반환한다.
  //이 값은 다시 불러온 함수를 통해 그 값을 필요로 한 곳으로 들어간다.
  //리턴 되지 않으면 이 값은 계산만 된채 사용하지 못 한다.

};

const App = () => {
  const maxLen = value => value.length <= 10;
  //텍스트 수를 제한을 두는 함수.
  //value 인자로 들어오는 입력값이 10이거나 그 미만일 경우 true, 넘으면 false를
  //내보내는 함수로 이 자체로는 값은 없지만 밑에 useInput에 인자로 넣어 보냄으로써
  //name의 value를 받는다.
  //개인적으론 위의 useInput함수에 포함시켜도 되지 않을까란 의문이 든다.

  // const maxLen = value => !value.includes("@");
  //글자 수 제한이 아닌 @ 를 입력시 전달 및 데이터 저장을 시키지 않게 하는 함수.
  //여기서도 불리언으로 실행이 됨.
  //앞에 느낌표가 있으므로 @입력이 없어야 true

  const name = useInput("Mr.", maxLen);
  //밑에 input에서 입력된 내용을 name으로 저장하고 이를 useInput 함수로 보냄.
  //첫번째 인자는 value에서 오는 input의 입력값. 여기선 Mr.을 기본으로 입력되게 함.
  //두번째 인자는 value에서 받은 글자를 쓸 수 있는 최대갯수 값. 위의 함수를 넘김.

  return (
    <div className="App">
      <h1>Hello</h1>
      <input placeholder="Name" {...name} />
      {/* 인풋에서 입력된 데이터를 받음으로 value에 저장, 저장은 value와 onChange로
      value에선 입력되는 값, onChange는 입력되면 바로 값을 실시간 업데이트 시킴. \
      {...name}에 저장된 내용은 value={name.value} onChange={name.onChange},
      두가지 state는 전부 name에 저장됨.*/}
    </div>
  );
};

//텍스트를 input에 입력을 하면 실시간으로 입력된 값을 리턴하기 때문에 10번째 이상부터는
//입력이 되지 않는다.
//일반적인 input은 입력이 된 후 submit을 통해 데이터가 전달이 된 후에 판단을 하지만
//리액트에선 한글자씩 전달이 되고 입력이 된 값을 리턴 시킨다.
//버블링 캡쳐링을 기본으로 무조건 데이터를 넘기고 받아서 출력함.


export default App;

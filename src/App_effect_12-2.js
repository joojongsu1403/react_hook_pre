import defaultAxios from "axios";
import { useState, useEffect } from "react";

//useAxios 데이터 처리 컴포넌트.

const useAxios = (opts, axiosInstance = defaultAxios) => {
    //렌더링 컴포넌트에서 데이터가 넘어올 경우 첫번째 인자인 opts로,
    //데이터가 없을 경우 두번째 인자가 실행.
    //import로 가져온 axios 이름이 defaultAxios. 즉, 기본값임.
    //데이터가 없으면 나중에 사용할 axiosInstance는 axios의 기본값을 설정하는 문구.
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });
  //데이터를 받아들이기 위한 기본적인 세팅.
  //넘겨받을 state 값이 있을 경우 아래에서 인자를 통해 전달 받을 수 있지만
  //쓰이는 방법에 따라 위 처럼 사용할 수 있다.
  //이거 구분을 잘 해야 할듯.
  const [trigger, setTrigger] = useState(0);
  //trigger는 단순하게 숫자만 넘겨받는 간단한 state를 사용하려고 만듬. 인자에 0이 들어가는 것도 같은 이유.
  //이게 dependency를 작동하게 해줄 키가 되는 역할임.
  if (!opts.url) {
    return; // 뭔지 알죠? url이 없이면 명령을 무시함.
  }

  const refetch = () => {
    setState({
      ...state,
      loading: true
    });
    setTrigger(Date.now());
  };

  //refetch는 렌더링 컴포넌트에서 버튼으로 작동하게 해둔 함수. 새로고침.
  //버튼을 눌리게 되면 setState를 통해 기존에 입력값을 유지한채 loading을 true로 바꾸어
  //렌더링 컴포넌트에서 조건부 렌더링으로 걸린부분을 실행하게 한다. 
  //(false여야 조건부 렌더링이 무시됨)
  //그리고 setTrigger를 통해 trigger의 state를 업데이트 시키며 
  //useEffect의 dependency가 trigger의 변화를 감지하여 useEffect를 다시 렌더링 시킨다.

  useEffect(() => {
    axiosInstance(opts)
    //초기값으로 설정된 axiosInstance에 opts로 넘어온 데이터 값을 넣는다.
      .then(data => { //then을 통해 data로 받은 함수인자는 url로 넘어온 api의 전체 데이터다.
        setState({
          ...state, //기존에 있었던 state의 데이터들. 기존 state들의 상속이라 생각하는중.
          loading: false, //기존 state에서 변경되는 부분들. 
          data //기존 state에서 변경되는 부분. 또는 추가되는 부분. 
          //여기 setState에서 표기된 data는 then의 함수인자인 data와 같다.
        });
      })
      .catch(error => {
        setState({ ...state, loading: false, error });
      });
      //error가 발생했을 시 catch의 내용으로 setState 시킨다.
      //위에선 마지막에 data를 반환시켰다면 여기선 error가 넘어왔기에 error를 반환시킨다.
  }, [trigger]);
  //refetch를 통해 trigger에 변화가 생길 경우 useEffect를 새로 렌더링 한다.
  //간단하게 해당 변수에 변화를 감지하면 새로 렌더링 한다고 보면 된다.
  return { ...state, refetch };
};

export default useAxios;

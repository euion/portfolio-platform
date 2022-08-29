export function loginReducer(userState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("%c로그인!", "color: #d93d1a;");
      return {
        ...userState,
        user: action.payload,
      };
    case "LOGOUT":
      console.log("%c로그아웃!", "color: #d93d1a;");
      return {
        ...userState,
        user: null,
      };
    default:
      return userState;
  }
}

export function modeReducer(modeState, action) {
  switch (action.type) {
    case "DARK_MODE":
      console.log("다크 모드");
      return {
        ...modeState,
        user: "dark",
      };
    case "LIGHT_MODE":
      console.log("일반 모드");
      return {
        ...modeState,
        user: "light",
      };
    default:
      return modeState;
  }
}

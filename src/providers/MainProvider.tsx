import { createContext, Dispatch, FC, useReducer } from "react";
import { USER_ACTION } from "../utils/constants";

interface Context {
  state: State;
  dispatch: Dispatch<User_Action>;
}

interface State {
  user: { token: string | null };
}

interface User_Action {
  type: USER_ACTION.LOG_IN | USER_ACTION.LOG_OUT;
  payload: string | null;
}

export const MainContext = createContext<Context>({
  state: {
    user: { token: "" },
  },
  dispatch: () => {},
});

const Provider: FC = ({ children }) => {
  const initialState: State = {
    user: {
      token:
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user") || "{}").token,
      // ? JSON.parse(localStorage.getItem("user")).token
      // : "",
    },
  };

  const reducer = (state: State, action: User_Action) => {
    switch (action.type) {
      case USER_ACTION.LOG_IN:
        return {
          ...state,
          user: { token: action.payload },
        };

      case USER_ACTION.LOG_OUT:
        return {
          ...state,
          user: { token: action.payload },
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
};

export default Provider;

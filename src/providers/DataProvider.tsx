import { createContext, Dispatch, FC, useReducer } from "react";
import { DATA_FETCH } from "../utils/constants";

interface Context {
  dataState: State;
  dataDispatch: Dispatch<User_Action>;
}

interface State {
  loading: boolean;
  data: [{ id: number; title: string; body: string }] | [];
  error: boolean;
}

interface User_Action {
  type:
    | DATA_FETCH.DATA_LOADING
    | DATA_FETCH.DATA_SUCCESS
    | DATA_FETCH.DATA_ERROR;

  payload: [{ id: number; title: string; body: string }] | [];
}

export const DataContext = createContext<Context>({
  dataState: { loading: true, data: [], error: false },
  dataDispatch: () => {},
});

const DataProvider: FC = ({ children }) => {
  const initialState: State = {
    loading: true,
    data: [],
    error: false,
  };

  const reducer = (state: State, action: User_Action) => {
    switch (action.type) {
      case DATA_FETCH.DATA_LOADING:
        return {
          ...state,
          loading: true,
        };

      case DATA_FETCH.DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };

      case DATA_FETCH.DATA_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
        };

      default:
        return state;
    }
  };
  const [dataState, dataDispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

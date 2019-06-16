export type Reducers = {
  [key: string]: Function;
};

export type State = {
  [key: string]: any;
};

export type Action = {
  type: string;
  payload?: any;
};

export type Epics = Function[];

export type Store = {
  reducers: Reducers;
  initialState: State;
  epics?: Epics;
};

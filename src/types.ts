export type Reducers = {
  [key: string]: Function;
};

export type State = {
  [key: string]: any;
};

export type Epics = Function[];

export type Store = {
  reducers: Reducers;
  initialState: State;
  middleware?: Epics;
};

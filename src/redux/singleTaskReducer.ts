interface InitialState {
  id: string;
  text: string;
  tags: string[];
}

interface Action {
  type: string;
  payload?: string | {};
}

const initialState: InitialState = {
  id: "",
  text: "",
  tags: [],
};

export function singleTaskReducer(action: Action, state = initialState) {
  switch (action) {
    default:
      return state;
  }
}

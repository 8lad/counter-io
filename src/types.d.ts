export interface SingleTask {
  id: string;
  text: string;
  tags: string;
  isPinned: boolean;
}

export interface Action<A, T> {
  option: A;
  payload?: T;
}

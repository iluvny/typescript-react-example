import { List, Record } from 'immutable';
import { Action, createAction, handleActions } from 'redux-actions';

const CREATE = 'todos/CREATE';
const REMOVE = 'todos/REMOVE';
const TOGGLE = 'todos/TOGGLE';
const CHANGE_INPUT = 'todos/CHANGE_INPUT';

type CreatePayload = string;
type RemovePayload = number;
type TogglePayload = number;
type ChangeInputPayload = string;

// export actionCreators
export const actionCreators = {
  changeInput: createAction<ChangeInputPayload>(CHANGE_INPUT),
  create: createAction<CreatePayload>(CREATE),
  remove: createAction<RemovePayload>(REMOVE),
  toggle: createAction<TogglePayload>(TOGGLE)
};

const TodoItemRecord = Record({
  done: false,
  id: 0,
  text: ''
});

interface TodoItemDataParams {
  done?: boolean;
  id?: number;
  text?: string;
}

// export TodoItemData
export class TodoItemData extends TodoItemRecord {
  static autoId = 0;
  id: number;
  text: string;
  done: boolean;

  constructor(params?: TodoItemDataParams) {
    const id = TodoItemData.autoId;
    if (params) {
      super({
        ...params,
        id
      });
    } else {
      super({ id });
    }
    TodoItemData.autoId = id + 1;
  }
}

const TodosStateRecord = Record({
  input: '',
  todoItems: List()
});

// export TodosState
export class TodosState extends TodosStateRecord {
  todoItems: List<TodoItemData>;
  input: string;
}

const initialState = new TodosState();

// export reducer
export default handleActions<TodosState, any>(
  {
    [CREATE]: (state, action: Action<CreatePayload>): TodosState => {
      return state.withMutations(s => {
        s.set('input', '').update(
          'todoItems',
          (todoItems: List<TodoItemData>) =>
            todoItems.push(
              new TodoItemData({
                text: action.payload
              })
            )
        );
      }) as TodosState;
    },
    [REMOVE]: (state, action: Action<RemovePayload>): TodosState => {
      return state.update('todoItems', (todoItems: List<TodoItemData>) =>
        todoItems.filter(t => (t ? t.id !== action.payload : false))
      ) as TodosState;
    },
    [TOGGLE]: (state, action: Action<TogglePayload>): TodosState => {
      const index = state.todoItems.findIndex(t =>
        t ? t.id === action.payload : false
      );

      return state.updateIn(
        ['todoItems', index, 'done'],
        done => !done
      ) as TodosState;
    },
    [CHANGE_INPUT]: (state, action: Action<ChangeInputPayload>): TodosState => {
      return state.set('input', action.payload || '') as TodosState;
    }
  },
  initialState
);

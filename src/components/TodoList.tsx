import { List } from 'immutable';
import * as React from 'react';
import { TodoItemData } from '../store/modules/todos';
import TodoItem from './TodoItem';

interface Props {
  input: string;
  todoItems: List<TodoItemData>;
  onCreate(): void;
  onRemove(id: number): void;
  onToggle(id: number): void;
  onChange(e: any): void;
}

const TodoList: React.SFC<Props> = ({
  input,
  todoItems,
  onCreate,
  onRemove,
  onToggle,
  onChange
}) => {
  const todoItemList = todoItems.map(todo => {
    const handleToggle = () => onToggle(todo.id);
    const handleRemove = () => onRemove(todo.id);

    return todo ? (
      <TodoItem
        key={todo.id}
        done={todo.done}
        onToggle={handleToggle}
        onRemove={handleRemove}
        text={todo.text}
      />
    ) : null;
  });

  const onChangeInput = (e: any) => {
    const { value } = e.currentTarget;
    onChange(value);
  };

  return (
    <div>
      <h1>Nak Todo List</h1>
      <input onChange={onChangeInput} value={input} />
      <button type='button' onClick={onCreate}>
        추가
      </button>
      <ul>{todoItemList}</ul>
    </div>
  );
};

export default TodoList;

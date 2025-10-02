import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todos';
import { User } from '../../types/user';

type Props = {
  users: User[];
  todos: Todo[];
};
export const TodoList = ({ users, todos }: Props) => {
  // const addPost = (newTodo: Todo) => {
  //     setTodosList(current => [...current, newTodo])
  // }

  return (
    <>
      <TodoInfo user={users} todo={todos} />
    </>
  );
};

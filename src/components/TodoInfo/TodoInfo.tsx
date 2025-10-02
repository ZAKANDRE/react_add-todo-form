import { Todo } from '../../types/todos';
import { User } from '../../types/user';
import { getUserById } from '../../services/users';
import { useState } from 'react';

type Props = {
  user: User[];
  todo: Todo[];
};

export const TodoInfo = ({ user, todo }: Props) => {
  // export const TodoInfo = ({user, todo, onSubmit}: Props ) => {
  const [title, seTitle] = useState<string>('');
  const [hasErrorTitle, setHasErrorTitle] = useState<string>('');
  const [hasSelectUser, setHasSelectUser] = useState<string>('');
  const [hasIdUser, setHasIdUser] = useState<number>(0);
  const [todosList, setTodosList] = useState<Todo[]>([...todo]);

  const maxNum = (list: Todo[]) => {
    const newId = Math.max(...list.map(todoList => +todoList.id));

    return newId + 1;
  };

  const reset = () => {
    seTitle('');
    setHasSelectUser('');
    setHasIdUser(0);
  };

  const addTodo = (newTitle: string, userId: number) => {
    const newTodo = {
      id: maxNum(todosList),
      title: newTitle,
      completed: false,
      userId,
    };

    setTodosList(current => [...current, newTodo]);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim().length < 1) {
      setHasErrorTitle('Please enter a title');
    } else {
      setHasErrorTitle('');
    }

    if (hasIdUser < 1) {
      setHasSelectUser('Please choose a user');
    } else {
      setHasSelectUser('');
    }

    addTodo(title, Number(hasIdUser));
    reset();
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    seTitle(value);

    if (title.trim().length > 0) {
      setHasErrorTitle('');
    }
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;

    setHasIdUser(value);

    if (value > 0) {
      setHasSelectUser('');
    }
  };

  return (
    <div>
      <form action="/api/todos" method="POST" onSubmit={handleSubmitForm}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={inputChange}
          />
          <span className="error">{hasErrorTitle}</span>
        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>

          <select
            data-cy="userSelect"
            id="selectUser"
            value={hasIdUser}
            onChange={selectChange}
          >
            <option value="0">Choose a user</option>

            {user.map(userData => {
              const userInfo = getUserById(userData.id);

              if (!userInfo) {
                return null;
              }

              return (
                <option key={userInfo.id} value={userInfo.id}>
                  {userInfo.name}
                </option>
              );
            })}
          </select>
          <span className="error">{hasSelectUser}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todosList.map(post => {
          const nameUser = getUserById(post.userId);

          return (
            <article
              key={post.id}
              data-id={post.id}
              className="TodoInfo TodoInfo--completed"
            >
              <h2 className="TodoInfo__title">{post.title}</h2>
              {nameUser && (
                <a className="UserInfo" href="mailto:Sincere@april.biz">
                  {nameUser?.name}
                </a>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
};

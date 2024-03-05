import { useReducer, useState } from "react";
import TodoItem from "./TodoItem";
import TodoItemFormReducer from "./TodoItemFormReducer";

const ListOfTodos = ({ todos }) => {
	const [todoItems, setTodoItems] = useState(todos);

	const deleteTodo = (id) => {
		setTodoItems([...todoItems.filter((todo) => todo.id !== id)]);
	};

	return (
		<section className="list-of-todos">
			{todoItems.map((todoItem) => (
				<TodoItem {...todoItem} key={todoItem.id} deleteTodo={deleteTodo} />
			))}
			<hr />
			<TodoItemFormReducer />
		</section>
	);
};
export default ListOfTodos;

import { useReducer, useState } from "react";
import TodoItem from "./TodoItem";
import TodoItemFormReducer from "./TodoItemFormReducer";

const ListOfTodos = ({ todos }) => {
	const [todoItems, setTodoItems] = useState(todos);

	const initialState = {
		id: crypto.randomUUID(),
		title: "",
		description: "",
		assignee: "",
		status: "To Do",
		priority: "Low",
		dueDate: "",
		createdDate: "",
	};

	const addNewTodo = (state, action) => {
		let newTodo;
		switch (action.type) {
			case "form-submit": {
				const newTodoModal = document.getElementById("new-todo-dialog");
				const newTodoForm = document.getElementById("new-todo-form");
				//action.payload.preventDefault();
				console.log("got a form submit", action.payload);
				console.log(
					"parent",
					//action.payload.target.parentElement.parentElement.parentElement.close(),
				);
				const formData = new FormData(action.payload.target.form);

				const vals = {};
				for (const key of formData.keys()) {
					vals[key] = formData.get(key);
				}
				const formatDate = () => {
					const dateNow = new Date();
					return `${dateNow.getFullYear()}-${(dateNow.getMonth() + 1)
						.toString()
						.padStart(2, "0")}-${dateNow
						.getDate()
						.toString()
						.padStart(2, "0")}`;
				};
				console.log(vals);
				//setTodoItems([...todoItems, { ...state, ...vals }]);
				const newTodoItem = {
					...state,
					timestamp: new Date(),
					createdDate: formatDate(),
					...vals,
				};

				//setTodoItems([...todoItems, newTodoItem]);
				console.log(newTodoItem);
				newTodo = newTodoItem;
				//return newTodoItem;
				//newTodoModal.close();
				//newTodoForm.reset();
				break;
			}
			default: {
				console.log("state", state);
				console.log("action", action);
			}
		}
		setTodoItems([...todoItems, newTodo]);
		return initialState;
	};

	const [state, dispatch] = useReducer(addNewTodo, initialState);

	const deleteTodo = (id) => {
		setTodoItems([...todoItems.filter((todo) => todo.id !== id)]);
	};

	return (
		<>
			<section className="list-of-todos grid">
				<section className="kanban-track" id="todos-todo">
					<p>to d</p>
					{todoItems.map((todoItem) => (
						<TodoItem {...todoItem} key={todoItem.id} deleteTodo={deleteTodo} />
					))}
				</section>
				<section className="kanban-track" id="todos-in-progress">
					<p>in p</p>
				</section>
				<section className="kanban-track" id="todos-done">
					<p>d</p>
				</section>
			</section>
			<hr />
			<TodoItemFormReducer dispatch={dispatch} state={state} />
		</>
	);
};

export default ListOfTodos;

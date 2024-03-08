import { useEffect, useReducer, useState } from "react";
import TodoItem from "./TodoItem";
import TodoItemFormReducer from "./TodoItemFormReducer";
import NewTodoItemForm from "./NewTodoItemForm";
import EditTodoItemForm from "./EditTodoItemForm";

const ListOfTodos = ({ todos, updateExternalTodosFunc }) => {
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
		const newTodoModal = document.getElementById("new-todo-dialog");
		const newTodoForm = document.getElementById("new-todo-form");
		let newTodo;
		switch (action.type) {
			case "change-title": {
				state.title = action.payload.target.value;
				break;
			}
			case "form-submit": {
				//action.payload.preventDefault();
				console.log("got a form submit", action.payload);
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

				console.log(newTodoItem);
				newTodo = newTodoItem;
				setTodoItems([...todoItems, newTodo]);
				break;
			}
			default: {
				console.log("state", state);
				console.log("action", action);
			}
		}

		return state;
	};

	const [state, dispatch] = useReducer(addNewTodo, initialState);

	const handleAddNewTodo = ({ event, newTodo }) => {
		console.log("event from handlesubmit", event);
		const updatedTodos = [...todoItems, newTodo];
		setTodoItems(updatedTodos);
		updateExternalTodosFunc(updatedTodos);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todoItems.filter((todo) => todo.id !== id);
		setTodoItems(updatedTodos);
		updateExternalTodosFunc(updatedTodos);
	};

	const [todoToEdit, setTodoToEdit] = useState("2");

	const handleEditExistingTodo = (id) => {
		console.log("got an edit request", id);
		setTodoToEdit(id);
		document.getElementById("edit-todo-dialog").show();
	};

	const handleSubmitEdit = ({ event, todoToEdit }) => {
		console.log("event", event);
		console.log("todo", todoToEdit);
		const updatedTodos = todoItems.map((todo) =>
			todo.id !== todoToEdit.id ? todo : todoToEdit,
		);
		setTodoItems(updatedTodos);
		updateExternalTodosFunc(updatedTodos);
	};

	return (
		<>
			<section className="list-of-todos grid">
				<section className="kanban-track" id="todos-todo">
					<p>To Do</p>
					{todoItems
						.filter((todoItem) => todoItem.status === "To Do")
						.map((todoItem) => (
							<TodoItem
								{...todoItem}
								key={todoItem.id}
								deleteTodo={deleteTodo}
								editTodo={handleEditExistingTodo}
								setTodoToEdit={setTodoToEdit}
							/>
						))}
				</section>
				<section className="kanban-track" id="todos-in-progress">
					<p>In Progress</p>
					{todoItems
						.filter((todoItem) => todoItem.status === "In Progress")
						.map((todoItem) => (
							<TodoItem
								{...todoItem}
								key={todoItem.id}
								deleteTodo={deleteTodo}
								editTodo={handleEditExistingTodo}
								setTodoToEdit={setTodoToEdit}
							/>
						))}
				</section>
				<section className="kanban-track" id="todos-done">
					<p>Done</p>
					{todoItems
						.filter((todoItem) => todoItem.status === "Done")
						.map((todoItem) => (
							<TodoItem
								{...todoItem}
								key={todoItem.id}
								deleteTodo={deleteTodo}
								editTodo={handleEditExistingTodo}
								setTodoToEdit={setTodoToEdit}
							/>
						))}
				</section>
			</section>
			<hr />
			{/* <TodoItemFormReducer dispatch={dispatch} state={state} /> */}
			<NewTodoItemForm
				handleSubmit={handleAddNewTodo}
				initialState={initialState}
			/>
			<EditTodoItemForm
				handleSubmit={handleSubmitEdit}
				setTodoToEdit={setTodoToEdit}
				todoId={todoToEdit}
				todos={todoItems}
			/>
		</>
	);
};

export default ListOfTodos;

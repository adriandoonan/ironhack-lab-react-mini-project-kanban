import { useParams } from "react-router";
import EditTodoItemForm from "../Components/EditTodoItemForm";
import { useEffect, useState } from "react";

const Todo = ({
	todoItems,
	updateExternalTodosFunc,
	handleEditExistingTodo,
	handleSubmitEdit,
	setTodoItems,
	deleteTodo,
	setTodoToEdit,
	todoToEdit,
}) => {
	const { todoId } = useParams();
	console.log("the id param", todoId);

	// const [theTodo, setTheTodo] = useState({});

	useEffect(() => {
		const foundTodo = todoItems.find((oneTodo) => {
			if (oneTodo.id == todoId) {
				return true;
			}
		});
		console.log("here is the found todo", foundTodo);
		setTodoToEdit(foundTodo);
	}, []);

	console.log("the todos", todoItems);
	return (
		<div>
			<h1>{todoToEdit.title}</h1>
			<button
				type="button"
				onClick={() => document.getElementById("edit-todo-dialog").show()}
			>
				Edit
			</button>

			<EditTodoItemForm
				handleSubmit={handleSubmitEdit}
				setTodoToEdit={setTodoToEdit}
				todoToEdit={todoToEdit}
				todoId={todoToEdit}
				todos={todoItems}
			/>
		</div>
	);
};
export default Todo;

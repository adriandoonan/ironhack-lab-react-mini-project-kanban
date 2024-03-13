import { useNavigate, useParams } from "react-router";
import EditTodoItemForm from "../Components/forms/EditTodoItemForm";
import { useEffect, useState } from "react";
import TodoItemDetailView from "../Components/todos/TodoItemDetailView";

const Todo = ({
	todoItems, //={externalTodos}
	handleSubmitEdit, //={handleSubmitEdit}
	deleteTodo, //={deleteTodo}
	setTodoToEdit, //={setTodoToEdit}
	todoToEdit, //={todoToEdit}
	showEditForm,
}) => {
	const { todoId } = useParams();
	console.log("the id param todo page", todoId);
	const navigate = useNavigate();

	// const [theTodo, setTheTodo] = useState({});
	const [searching, setSearching] = useState(true);

	useEffect(() => {
		if (!todoItems.length) {
			navigate("/todo-not-found");
			return;
		}
		const foundTodo = todoItems.find((oneTodo) => {
			if (oneTodo.id == todoId) {
				return true;
			}
		});
		console.log("here is the found todo", foundTodo);
		setTodoToEdit(foundTodo);
		setSearching(false);
	}, []);

	if (searching) {
		return <h1 aria-busy="true">Getting task...</h1>;
	}
	return (
		<div className="todo-item-detail-view">
			<TodoItemDetailView
				todoItem={todoItems.find((todo) => todo.id === todoId)}
				setTodoToEdit={setTodoToEdit}
				showEditForm={showEditForm}
				deleteTodo={deleteTodo}
			/>

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

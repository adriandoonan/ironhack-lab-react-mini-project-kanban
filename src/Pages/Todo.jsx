import { useParams } from "react-router";
import EditTodoItemForm from "../Components/forms/EditTodoItemForm";
import { useEffect, useState } from "react";
import TodoItemDetailView from "../Components/todos/TodoItemDetailView";

const Todo = ({
	todoItems, //={externalTodos}
	updateExternalTodosFunc, //={updateExternalTodos}
	handleEditExistingTodo, //={handleEditExistingTodo}
	handleSubmitEdit, //={handleSubmitEdit}
	setTodoItems, //={setExternalTodos}
	deleteTodo, //={deleteTodo}
	setTodoToEdit, //={setTodoToEdit}
	todoToEdit, //={todoToEdit}
	showEditForm,
}) => {
	const { todoId } = useParams();
	console.log("the id param todo page", todoId);

	// const [theTodo, setTheTodo] = useState({});

	useEffect(() => {
		const foundTodo = todoItems.find((oneTodo) => {
			if (oneTodo.id == todoId) {
				return true;
			}
		});
		console.log("here is the found todo", foundTodo);
		setTodoToEdit(foundTodo);
	}, [todoId]);

	console.log("the todos", todoItems);
	return (
		<div>
			<TodoItemDetailView
				todoItem={todoItems.find((todo) => todo.id === todoId)}
				setTodoToEdit={setTodoToEdit}
				showEditForm={showEditForm}
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

import { useParams } from "react-router";
import EditTodoItemForm from "../Components/EditTodoItemForm";

const Todo = ({ todos, handleEdit }) => {
	const { todoId } = useParams();
	console.log("the id param", todoId);

	const theTodo = todos.find(
		(todo) => todo.id.toString() === todoId.toString(),
	);
	console.log("the todo", theTodo);
	return (
		<div>
			<h1>{theTodo.title}</h1>
			<button
				type="button"
				onClick={() => document.getElementById("edit-todo-dialog").show()}
			>
				Edit
			</button>

			<EditTodoItemForm handleSubmit={handleEdit} todoToEdit={theTodo} />
		</div>
	);
};
export default Todo;

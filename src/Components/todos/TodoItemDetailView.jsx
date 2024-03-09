const TodoItemDetailView = ({ todoItem, showEditForm }) => {
	// useEffect(() => {
	// 	const foundTodo = todoItems.find((oneTodo) => {
	// 		if (oneTodo.id == todoId) {
	// 			return true;
	// 		}
	// 	});
	// 	console.log("here is the found todo", foundTodo);
	// 	setTodoToEdit(foundTodo);
	// }, []);
	return (
		<div>
			<my-element name="jiijman"></my-element>
			<h2>this is the TodoItemDetailView</h2>
			<button type="button" onClick={showEditForm}>
				Edit
			</button>
			<h3>the todo is {todoItem.title}</h3>
			{/* <p className="todo-item-description">{todoItem.description}</p> */}
			{todoItem?.description.split("\n").map((para, index) => (
				<p key={index}>{para}</p>
			))}
		</div>
	);
};
export default TodoItemDetailView;

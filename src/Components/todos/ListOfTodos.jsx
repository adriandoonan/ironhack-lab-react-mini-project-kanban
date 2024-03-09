import NewTodoItemForm from "../forms/NewTodoItemForm";
import EditTodoItemForm from "../forms/EditTodoItemForm";
import TodoItemCard from "./TodoItemCard";

const ListOfTodos = ({
	todoItems,
	updateExternalTodosFunc,
	handleEditExistingTodo,
	handleSubmitEdit,
	setTodoItems,
	deleteTodo,
	setTodoToEdit,
	todoToEdit,
	showEditForm,
}) => {
	const initialState = {
		title: "",
		description: "",
		assignee: "",
		status: "To Do",
		priority: "Low",
		dueDate: "",
		createdDate: "",
	};

	const handleAddNewTodo = ({ event, newTodo }) => {
		console.log("event from handlesubmit", event);
		newTodo.id = crypto.randomUUID();
		const updatedTodos = [...todoItems, newTodo];
		setTodoItems(updatedTodos);
		updateExternalTodosFunc(updatedTodos);
	};

	return (
		<>
			<section className="list-of-todos grid">
				<section className="kanban-track" id="todos-todo">
					<span className="kanban-track-title">
						<p>To Do</p>
					</span>
					{todoItems
						.filter((todoItem) => todoItem.status === "To Do")
						.map((todoItem) => (
							<TodoItemCard
								{...todoItem}
								key={todoItem.id}
								deleteTodo={deleteTodo}
								editTodo={handleEditExistingTodo}
								setTodoToEdit={setTodoToEdit}
								showEditForm={showEditForm}
							/>
						))}
				</section>
				<section className="kanban-track" id="todos-in-progress">
					<span className="kanban-track-title">
						<p>In Progress</p>
					</span>
					{todoItems
						.filter((todoItem) => todoItem.status === "In Progress")
						.map((todoItem) => (
							<TodoItemCard
								{...todoItem}
								key={todoItem.id}
								deleteTodo={deleteTodo}
								editTodo={handleEditExistingTodo}
								setTodoToEdit={setTodoToEdit}
								showEditForm={showEditForm}
							/>
						))}
				</section>
				<section className="kanban-track" id="todos-done">
					<span className="kanban-track-title">
						<p>Done</p>
					</span>
					{todoItems
						.filter((todoItem) => todoItem.status === "Done")
						.map((todoItem) => (
							<TodoItemCard
								{...todoItem}
								key={todoItem.id}
								deleteTodo={deleteTodo}
								editTodo={handleEditExistingTodo}
								setTodoToEdit={setTodoToEdit}
								showEditForm={showEditForm}
							/>
						))}
				</section>
			</section>

			{/* <TodoItemFormReducer dispatch={dispatch} state={state} /> */}
			<NewTodoItemForm
				handleSubmit={handleAddNewTodo}
				initialState={initialState}
			/>
			<EditTodoItemForm
				handleSubmit={handleSubmitEdit}
				setTodoToEdit={setTodoToEdit}
				todoToEdit={todoToEdit}
				todoId={todoToEdit}
				todos={todoItems}
				setTodoItems={setTodoItems}
			/>
		</>
	);
};

export default ListOfTodos;

import NewTodoItemForm from "../Components/forms/NewTodoItemForm";
import EditTodoItemForm from "../Components/forms/EditTodoItemForm";
import TodoItemCard from "../Components/todos/TodoItemCard";
import { notify } from "../App";
import { Droppable, DragDropContext } from "@hello-pangea/dnd";

const grid = 8;

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? "lightblue" : "var(--kanban-track-bg-color)",
	padding: grid,
});

const ListOfTodos = ({
	todoItems,
	updateExternalTodos,
	handleEditExistingTodo,
	handleSubmitEdit,
	setTodoItems,
	deleteTodo,
	setTodoToEdit,
	todoToEdit,
	showEditForm,
	offlineMode,
	up,
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

	const handleDragStart = (event) => {
		//console.log("drag start", event);
	};

	const handleDragEnd = (event) => {
		//console.log("drag ended", event);

		const {
			draggableId: todoItemToMove,
			destination: { droppableId: targetTodoStatus, index: targetTodoIndex },
		} = event;

		const dropTarget =
			todoItems.filter((task) => task.status === targetTodoStatus)[
				targetTodoIndex
			] || -1;

		const targetTaskIndex = todoItems.findIndex(
			(task) => task.id === dropTarget.id,
		);
		const draggedTaskIndex = todoItems.findIndex(
			(task) => task.id === todoItemToMove,
		);

		if (draggedTaskIndex === targetTaskIndex) {
			console.log("dropped back in same place");
			return;
		}
		const tasksClone = [...todoItems];
		const tempItemToSplice = { ...tasksClone.splice(draggedTaskIndex, 1)[0] };
		tempItemToSplice.status = targetTodoStatus;
		const newSwapIndex = tasksClone.findIndex(
			(task) => task.id === dropTarget.id,
		);
		tasksClone.splice(newSwapIndex, 0, tempItemToSplice);

		setTodoItems(tasksClone);
		notify(`task moved to ${targetTodoStatus}`, "🤓");
		if (!offlineMode) {
			updateExternalTodos(tasksClone);
		}
	};

	const handleAddNewTodo = ({ event, newTodo }) => {
		console.log("event from handlesubmit", event);
		newTodo.id = crypto.randomUUID();
		const updatedTodos = [...todoItems, newTodo];
		setTodoItems(updatedTodos);
		!offlineMode && updateExternalTodosFunc(updatedTodos);
		notify("new todo created", "✅");
	};

	if (!todoItems.length) {
		return <h2 aria-busy="true">Loading</h2>;
	}

	return (
		<>
			<section className="list-of-todos grid">
				<DragDropContext
					onDragEnd={handleDragEnd}
					onDragStart={handleDragStart}
				>
					<Droppable key="To Do" droppableId="To Do">
						{(provided, snapshot) => (
							<section
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
								{...provided.droppableProps}
								className="kanban-track"
								id="todos-todo"
								data-todo-status="To Do"
							>
								<span className="kanban-track-title">
									<p>To Do</p>
								</span>
								{todoItems
									.filter((todo) => todo.status === "To Do")
									.map((todoItem, index) => (
										<TodoItemCard
											{...todoItem}
											key={todoItem.id}
											deleteTodo={deleteTodo}
											editTodo={handleEditExistingTodo}
											setTodoToEdit={setTodoToEdit}
											showEditForm={showEditForm}
											index={index}
										/>
									))}
								{provided.placeholder}
							</section>
						)}
					</Droppable>
					<Droppable key="In Progress" droppableId="In Progress">
						{(provided, snapshot) => (
							<section
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
								{...provided.droppableProps}
								className="kanban-track"
								id="todos-in-progress"
								data-todo-status="In Progress"
							>
								<span className="kanban-track-title">
									<p>In Progress</p>
								</span>
								{todoItems
									.filter((todo) => todo.status === "In Progress")
									.map((todoItem, index) => (
										<TodoItemCard
											{...todoItem}
											key={todoItem.id}
											deleteTodo={deleteTodo}
											editTodo={handleEditExistingTodo}
											setTodoToEdit={setTodoToEdit}
											showEditForm={showEditForm}
											index={index}
										/>
									))}
								{provided.placeholder}
							</section>
						)}
					</Droppable>
					<Droppable key="Done" droppableId="Done">
						{(provided, snapshot) => (
							<section
								ref={provided.innerRef}
								style={getListStyle(snapshot.isDraggingOver)}
								{...provided.droppableProps}
								className="kanban-track"
								id="todos-done"
								data-todo-status="Done"
							>
								<span className="kanban-track-title">
									<p>Done</p>
								</span>
								{todoItems
									.filter((todo) => todo.status === "Done")
									.map((todoItem, index) => (
										<TodoItemCard
											{...todoItem}
											key={todoItem.id}
											deleteTodo={deleteTodo}
											editTodo={handleEditExistingTodo}
											setTodoToEdit={setTodoToEdit}
											showEditForm={showEditForm}
											index={index}
										/>
									))}
								{provided.placeholder}
							</section>
						)}
					</Droppable>
				</DragDropContext>
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

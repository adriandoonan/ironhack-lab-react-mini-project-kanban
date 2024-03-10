import NewTodoItemForm from "../forms/NewTodoItemForm";
import EditTodoItemForm from "../forms/EditTodoItemForm";
import TodoItemCard from "./TodoItemCard";
import { useRef } from "react";

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

	const dragItem = useRef();
	const dragOverItem = useRef();
	const dragStart = (event) => {
		dragItem.current = event.target.id;
		console.log("dragItem", dragItem.current);
	};
	const dragEnter = (event) => {
		// console.log(event);
		// console.log("card", event.target.closest(".todo-item-card")?.id);
		// console.log(
		// 	"track",
		// 	event.target.closest(".kanban-track").getAttribute("data-todo-status"),
		// );
		dragOverItem.current = event.target.closest(".todo-item-card")
			? event.target.closest(".todo-item-card").id
			: null;
		dragOverItem.status = event.target
			.closest(".kanban-track")
			.getAttribute("data-todo-status");
	};
	const drop = () => {
		console.log(
			"i would be dropping",
			dragItem.current,
			"into",
			dragOverItem.status,
			"and placing it after",
			dragOverItem.current,
			"or at the end if undefined",
		);
		const allTodos = todoItems;
		const itemToEditIndex = allTodos.findIndex(
			(todo) => todo.id === dragItem.current,
		);
		const itemToDropAfterIndex = allTodos.findIndex(
			(todo) => todo.id === dragOverItem.current,
		);
		console.log("index", itemToEditIndex);
		allTodos[itemToEditIndex].status = dragOverItem.status;
		console.log("with new status", allTodos[itemToEditIndex]);
		console.log(
			"dropping after",
			itemToDropAfterIndex,
			allTodos[itemToDropAfterIndex],
		);
		const itemToMove = allTodos.splice(itemToEditIndex, 1);
		allTodos.splice(itemToDropAfterIndex, 0, itemToMove[0]);
		console.log(allTodos);
		setTodoItems([...allTodos]);
	};

	return (
		<>
			<section className="list-of-todos grid">
				<section
					className="kanban-track"
					id="todos-todo"
					data-todo-status="To Do"
					onDragEnter={(event) => dragEnter(event)}
					onDragEnd={drop}
				>
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
								onDragStart={dragStart}
							/>
						))}
				</section>
				<section
					className="kanban-track"
					id="todos-in-progress"
					data-todo-status="In Progress"
					onDragEnter={(event) => dragEnter(event)}
					onDragEnd={drop}
				>
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
								onDragStart={dragStart}
							/>
						))}
				</section>
				<section
					className="kanban-track"
					id="todos-done"
					data-todo-status="Done"
					onDragEnter={(event) => dragEnter(event)}
					onDragEnd={drop}
				>
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
								onDragStart={dragStart}
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
import NewTodoItemForm from "../Components/forms/NewTodoItemForm";
import EditTodoItemForm from "../Components/forms/EditTodoItemForm";
import TodoItemCard from "../Components/todos/TodoItemCard";
import { useState } from "react";

import toast from "react-hot-toast";

const notify = (message = "Here is your toast.", icon = "👏") => {
	console.log("someone asked for a message", message);
	toast(message, {
		duration: 4000,
		position: "top-center",

		// Styling
		style: {},
		className: "",

		// Custom Icon
		icon: icon,

		// Change colors of success/error/loading icon
		iconTheme: {
			primary: "#000",
			secondary: "#fff",
		},

		// Aria
		ariaProps: {
			role: "status",
			"aria-live": "polite",
		},
	});
};

const defaultAnnouncements = {
	onDragStart(id) {
		console.log(`Picked up draggable item ${id}.`);
	},
	onDragOver(id, overId) {
		if (overId) {
			console.log(
				`Draggable item ${id} was moved over droppable area ${overId}.`,
			);
			return;
		}

		console.log(`Draggable item ${id} is no longer over a droppable area.`);
	},
	onDragEnd(id, overId) {
		if (overId) {
			console.log(
				`Draggable item ${id} was dropped over droppable area ${overId}`,
			);
			return;
		}

		console.log(`Draggable item ${id} was dropped.`);
	},
	onDragCancel(id) {
		console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
	},
};

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
	offlineMode,
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

	// const handleDragStart = (event) => {
	// 	const { active } = event;
	// 	const { id } = active;
	// 	console.log("drag start on", id, event);

	// 	setActiveId(id);
	// };

	// const handleDragOver = (event) => {
	// 	console.log("drag over event", event);
	// };

	// const handleDragEnd = (event) => {
	// 	console.log("drag ended event", event);
	// 	const { active, over } = event;
	// 	if (active.id === over.id) {
	// 		return;
	// 	}
	// 	const tasksClone = [...todoItems];
	// 	const oldIndex = tasksClone.findIndex((task) => task.id === active.id);
	// 	const newIndex = tasksClone.findIndex((task) => task.id === over.id);

	// 	tasksClone[oldIndex].status = tasksClone[newIndex].status;

	// 	const swappedTasksClone = arrayMove(tasksClone, oldIndex, newIndex);

	// 	setTodoItems([...swappedTasksClone]);
	// 	console.log(swappedTasksClone);
	// };

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

	const groupedTodos =
		todoItems.length &&
		Map.groupBy(todoItems, (todoItem) => todoItem.status || "no status!");

	return (
		<>
			<section className="list-of-todos ">
				<section
					className="kanban-track"
					id="todos-todo"
					data-todo-status="To Do"
				>
					<span className="kanban-track-title">
						<p>To Do</p>
					</span>
					{groupedTodos.get("To Do").map((todoItem) => (
						<TodoItemCard
							{...todoItem}
							key={todoItem.id}
							deleteTodo={deleteTodo}
							editTodo={handleEditExistingTodo}
							setTodoToEdit={setTodoToEdit}
							showEditForm={showEditForm}
							parent="To Do"
						/>
					))}
				</section>
				<section
					className="kanban-track"
					id="todos-in-progress"
					data-todo-status="In Progress"
				>
					<span className="kanban-track-title">
						<p>In Progress</p>
					</span>
					{groupedTodos.get("In Progress").map((todoItem) => (
						<TodoItemCard
							{...todoItem}
							key={todoItem.id}
							deleteTodo={deleteTodo}
							editTodo={handleEditExistingTodo}
							setTodoToEdit={setTodoToEdit}
							showEditForm={showEditForm}
							parent="In Progress"
						/>
					))}
				</section>
				<section
					className="kanban-track"
					id="todos-done"
					data-todo-status="Done"
				>
					<span className="kanban-track-title">
						<p>Done</p>
					</span>
					{groupedTodos.get("Done").map((todoItem) => (
						<TodoItemCard
							{...todoItem}
							key={todoItem.id}
							deleteTodo={deleteTodo}
							editTodo={handleEditExistingTodo}
							setTodoToEdit={setTodoToEdit}
							showEditForm={showEditForm}
							parent="Done"
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

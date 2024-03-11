import NewTodoItemForm from "../Components/forms/NewTodoItemForm";
import EditTodoItemForm from "../Components/forms/EditTodoItemForm";
import TodoItemCard from "../Components/todos/TodoItemCard";
import { useRef, useState } from "react";

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
		dragOverItem.lastElement = event.target.closest(".todo-item-card");
		dragOverItem.status = event.target
			.closest(".kanban-track")
			.getAttribute("data-todo-status");
	};

	const drop = () => {
		if (dragItem.current === dragOverItem.current) {
			return;
		}
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
		updateExternalTodosFunc(todoItems);
	};

	const [{ dx, dy }, setOffset] = useState({
		dx: 0,
		dy: 0,
	});

	const [startPos, setStartPos] = useState({
		x: 0,
		y: 0,
	});
	const [isBeingTouched, setIsBeingTouched] = useState(false);

	const handleTouchStart = (event) => {
		const touch = event.touches[0];
		const touchedItemId = event.target.closest(".todo-item-card").id;
		console.log("touched", touchedItemId);
		console.log(event);
		dragItem.current = touchedItemId;
		setIsBeingTouched(true);

		setStartPos({
			x: touch.clientX - dx,
			y: touch.clientY - dy,
		});

		const handleTouchMove = (event) => {
			const ele = event.target.closest("todo-item-card");
			if (!ele || !isBeingTouched) {
				return;
			}
			console.log(ele);
			ele.style.position = absolute;
			// How far the mouse has been moved
			const dx = event.clientX - startPos.x;
			const dy = event.clientY - startPos.y;

			// Set the position of element
			ele.style.transform = `translate(${dx}px, ${dy}px)`;

			// Reassign the position of mouse
			setOffset({ dx, dy });
		};

		const handleTouchEnd = () => {
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("touchend", handleTouchEnd);
			setIsBeingTouched(false);
		};

		document.addEventListener("touchmove", handleTouchMove);
		document.addEventListener("touchend", handleTouchEnd);
	};

	if (!todoItems.length) {
		return <h2 aria-busy="true">Loading</h2>;
	}

	const groupedTodos =
		todoItems.length &&
		Map.groupBy(todoItems, (todoItem) => todoItem.status || "no status!");

	return (
		<>
			<section className="list-of-todos grid">
				<section
					className="kanban-track"
					id="todos-todo"
					data-todo-status="To Do"
					onDragEnter={(event) => dragEnter(event)}
					onDragExit={(event) => dragExit(event)}
					onDragEnd={drop}
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
							onDragStart={dragStart}
							// onTouchStart={handleTouchStart}
						/>
					))}
				</section>
				<section
					className="kanban-track"
					id="todos-in-progress"
					data-todo-status="In Progress"
					onDragEnter={(event) => dragEnter(event)}
					onDragExit={(event) => dragExit(event)}
					onDragEnd={drop}
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
							onDragStart={dragStart}
						/>
					))}
				</section>
				<section
					className="kanban-track"
					id="todos-done"
					data-todo-status="Done"
					onDragEnter={(event) => dragEnter(event)}
					onDragExit={(event) => dragExit(event)}
					onDragEnd={drop}
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

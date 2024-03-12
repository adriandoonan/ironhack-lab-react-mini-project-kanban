import { CaretDownSVG, CaretLeftSVG, CaretUpSVG } from "../Icons/Icons";
import { Link } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";

const truncateTodoDescription = (string) => {
	let myString = string;
	if (/\n/.test(myString)) {
		myString = `${myString.split("\n")[0]} ...`;
	}
	if (myString.length > 200) {
		return `${myString.substring(0, 200)} ...`;
	}
	return myString;
};

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	// padding: grid * 2,
	// margin: `0 0 ${grid}px 0`,

	// change background colour if dragging
	background: isDragging
		? "var(--kanban-todo-item-dragging-bg-color)"
		: "var(--pico-background-color)",

	// styles we need to apply on draggables
	...draggableStyle,
});

const TodoItemCard = ({
	id,
	title,
	description,
	assignee,
	priority,
	createdDate,
	dueDate,
	deleteTodo,
	editTodo,
	parent,
	index,
}) => {
	const prioritySVGs = {
		High: <CaretUpSVG />,
		Medium: <CaretLeftSVG />,
		Low: <CaretDownSVG />,
	};

	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided, snapshot) => (
				<article
					key={id}
					id={id}
					className="todo-item-card"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={getItemStyle(
						snapshot.isDragging,
						provided.draggableProps.style,
					)}
					role="article"
				>
					<header>
						<Link to={`/todos/${id}`}>
							<strong>{title || "This is an item"}</strong>
						</Link>
						{prioritySVGs[priority]}
					</header>
					<p>
						{truncateTodoDescription(description) ||
							"some default description, blah, blah yadda, yadda, yadda"}
					</p>
					{assignee && (
						<p className="todo-item-card-details">
							<span role="img" aria-label="assignee" data-tooltip="Assigned to">
								👤
							</span>{" "}
							<span>{assignee}</span>
						</p>
					)}
					<p className="todo-item-card-details">
						<span
							role="img"
							aria-label="created date"
							data-tooltip="Created on"
						>
							✏
						</span>{" "}
						<span>{createdDate}</span>
					</p>
					{dueDate && (
						<p className="todo-item-card-details">
							<span role="img" aria-label="due date" data-tooltip="Due by">
								📆
							</span>{" "}
							<span>{dueDate}</span>
						</p>
					)}

					<footer className="todo-item-card-button-group">
						<button
							type="button"
							className="button-small"
							onClick={() => editTodo(id)}
						>
							Edit
						</button>
						<button
							type="button"
							className="button-small button-danger"
							onClick={() => deleteTodo(id)}
						>
							Delete
						</button>
					</footer>
				</article>
			)}
		</Draggable>
	);
};
export default TodoItemCard;

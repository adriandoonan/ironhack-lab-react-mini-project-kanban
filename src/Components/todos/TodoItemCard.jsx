import { CaretDownSVG, CaretLeftSVG, CaretUpSVG } from "../Icons/Icons";
import { Link } from "react-router-dom";

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

const TodoItemCard = ({
	id,
	title,
	description,
	assignee,
	status,
	priority,
	createdDate,
	dueDate,
	deleteTodo,
	editTodo,
	onDragStart,
	onTouchStart,
}) => {
	const prioritySVGs = {
		High: <CaretUpSVG />,
		Medium: <CaretLeftSVG />,
		Low: <CaretDownSVG />,
	};

	return (
		<article
			key={id}
			id={id}
			className="todo-item-card"
			draggable="true"
			onDragStart={(event) => onDragStart(event)}
			onTouchStart={(event) => onTouchStart(event)}
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
				<span role="img" aria-label="created date" data-tooltip="Created on">
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
	);
};
export default TodoItemCard;

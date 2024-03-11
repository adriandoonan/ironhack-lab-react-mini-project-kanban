import { CaretDownSVG, CaretLeftSVG, CaretUpSVG } from "../Icons/Icons";
import { Link } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
	priority,
	createdDate,
	dueDate,
	deleteTodo,
	editTodo,
	parent,
}) => {
	const prioritySVGs = {
		High: <CaretUpSVG />,
		Medium: <CaretLeftSVG />,
		Low: <CaretDownSVG />,
	};

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: id,
			data: {
				title,
				parent,
			},
		});

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<article
			key={id}
			id={id}
			className="todo-item-card"
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
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

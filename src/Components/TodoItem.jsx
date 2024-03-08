import caretUp from "../assets/caret-up.svg";
import caretDown from "../assets/caret-down.svg";
import caretLeft from "../assets/caret-left.svg";
import { CaretDownSVG, CaretLeftSVG, CaretUpSVG } from "./Icons/Icons";
import { Link } from "react-router-dom";

const columnStyle = {
	display: "flex",
	flexDirection: "column",
};

const titleStyle = {
	display: "flex",
	justifyContent: "space-between",
};

const TodoItem = ({
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
}) => {
	const priorityIcons = {
		High: { icon: caretUp, color: "red" },
		Medium: { icon: caretLeft, color: "orange" },
		Low: { icon: caretDown, color: "green" },
	};
	const prioritySVGs = {
		High: <CaretUpSVG />,
		Medium: <CaretLeftSVG />,
		Low: <CaretDownSVG />,
	};

	return (
		<article key={id} className="todo-item" draggable="true">
			<header style={columnStyle}>
				{/* <span>Status: {status}</span> */}
				<div style={titleStyle}>
					<Link to={`/todos/${id}`}>
						<strong>{title || "This is an item"}</strong>
					</Link>
					{/* <img
						className={`svg-icon ${priorityIcons[priority]?.color}`}
						src={priorityIcons[priority].icon}
						alt={`${priority} task`}
					/> */}
					{prioritySVGs[priority]}
				</div>
			</header>
			<p>
				{description ||
					"some default description, blah, blah yadda, yadda, yadda"}
			</p>
			<footer style={{ textAlign: "left" }}>
				<span style={{ display: "block" }}>Created: {createdDate}</span>
				<span style={{ display: "block" }}>Assigned to: {assignee}</span>
				<span className="todo-item-button-group">
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
				</span>
			</footer>
		</article>
	);
};
export default TodoItem;

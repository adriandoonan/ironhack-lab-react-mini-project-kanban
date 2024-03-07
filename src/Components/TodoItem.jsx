import caretUp from "../assets/caret-up.svg";
import caretDown from "../assets/caret-down.svg";
import caretLeft from "../assets/caret-left.svg";

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
}) => {
	const priorityIcons = {
		High: { icon: caretUp, color: "red" },
		Medium: { icon: caretLeft, color: "orange" },
		Low: { icon: caretDown, color: "green" },
	};

	return (
		<article key={id} className="todo-item">
			<header style={columnStyle}>
				<span>Status: {status}</span>
				<div style={titleStyle}>
					<strong>{title || "This is an item"}</strong>
					<img
						className={`svg-icon ${priorityIcons[priority].color}`}
						src={priorityIcons[priority].icon}
						alt={`${priority} task`}
					/>
				</div>
			</header>
			<p>
				{description ||
					"some default description, blah, blah yadda, yadda, yadda"}
			</p>
			<footer style={{ textAlign: "left" }}>
				<span style={{ display: "block" }}>Created: {createdDate}</span>
				<span style={{ display: "block" }}>Assigned to: {assignee}</span>
				<button onClick={() => deleteTodo(id)}>Delete</button>
			</footer>
		</article>
	);
};
export default TodoItem;

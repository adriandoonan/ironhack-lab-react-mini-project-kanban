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
}) => {
	// const {

	// } = details;

	return (
		<article key={id} className="todo-item">
			<header style={columnStyle}>
				<span>Status: {status}</span>
				<div style={titleStyle}>
					<strong>{title || "This is an item"}</strong>
					<span style={{ marginLeft: "auto" }}>{priority}</span>
				</div>
			</header>
			<p>
				{description ||
					"some default description, blah, blah yadda, yadda, yadda"}
			</p>
			<footer style={{ textAlign: "left" }}>
				<span style={{ display: "block" }}>Created: {createdDate}</span>
				<span style={{ display: "block" }}>Assigned to: {assignee}</span>
			</footer>
		</article>
	);
};
export default TodoItem;

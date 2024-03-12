import { useNavigate } from "react-router";

const TodoItemDetailView = ({ todoItem, showEditForm, deleteTodo }) => {
	const navigate = useNavigate();

	const {
		id,
		assignee,
		createdDate,
		description,
		dueDate,
		priority,
		status,
		title,
	} = todoItem;

	const handleDelete = (id) => {
		console.log("requested to delete todo with id", id);
		navigate(-1);
	};

	const statusMap = {
		Done: "✅",
		"In Progress": "🛠️",
		"To Do": "📝",
	};

	return (
		<>
			<div className="todo-item-button-group">
				<button
					type="button"
					onClick={showEditForm}
					className="outline button-small"
				>
					Edit
				</button>
				<button
					type="button"
					className="button-danger button-small"
					onClick={() => handleDelete(id)}
				>
					Delete
				</button>
			</div>
			<h2>
				{priority === "High" && "❗"} {title} {priority === "High" && "❗"}
			</h2>
			<p>
				{status} {statusMap[status]}
			</p>
			<hr />
			{/* <p className="todo-item-description">{todoItem.description}</p> */}
			{description.split("\n").map((para, index) => (
				<p key={index}>{para}</p>
			))}
			<span className="todo-item-detail-view-info">
				<hr />
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
				<hr />
			</span>
		</>
	);
};
export default TodoItemDetailView;

import { useState, useEffect } from "react";

const formStyle = {
	padding: "1rem 2rem",
};

const teamMembers = [
	"David Wilson",
	"Mark Johnson",
	"Mary Davis",
	"Jane Smith",
	"Sarah Brown",
];

const progressStates = ["To Do", "In Progress", "Done"];

const priorities = ["Low", "Medium", "High"];

const getFormattedDate = () => {
	const dateNow = new Date();
	return `${dateNow.getFullYear()}-${(dateNow.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${dateNow.getDate().toString().padStart(2, "0")}`;
};

// example item
// {
// 	"id": "1",
// 	"title": "Design Landing Page",
// 	"description": "Create a visually appealing landing page for the website.",
// 	"assignee": "Mary Davis",
// 	"status": "To Do",
// 	"priority": "High",
// 	"createdDate": "2023-09-15",
// 	"dueDate": "2023-09-30"
// }
const initialTodoState = {
	id: crypto.randomUUID(),
	title: "",
	description: "",
	assignee: "",
	status: "To Do",
	priority: "",
	createdDate: getFormattedDate(),
	createdTimestamp: new Date(),
	dueDate: getFormattedDate(),
};

function EditTodoItemForm({
	handleSubmit,

	todoId,
	todos,
}) {
	//console.log(dispatch);

	const [todoToEdit, setTodoToEdit] = useState(initialTodoState);

	useEffect(() => {
		console.log("todo", todoId);
		console.log(todos);
		const foundTodo = todos.find((todo) => {
			console.log("in a find", todo, todoId, todo.id == todoId);
			return todo.id.toString() === todoId.toString();
		});
		// const foundTodo = todos.filter((todo) => {
		// 	console.log("in the filter", todo.id == todoId);
		// 	todo.id == todoId;
		// });
		console.log("filtered", foundTodo);
		setTodoToEdit(foundTodo || initialTodoState);
		console.log("here is the found todo", todoToEdit);
	}, [todoId]);

	return (
		<dialog id="edit-todo-dialog">
			<form
				id="edit-todo-form"
				method="dialog"
				style={formStyle}
				onSubmit={(event) => {
					handleSubmit({ event, todoToEdit });
				}}
			>
				<label htmlFor="todo-item-title">Title</label>
				<input
					id="todo-item-title"
					name="title"
					type="text"
					placeholder="Task title..."
					required
					value={todoToEdit.title}
					onChange={(e) =>
						setTodoToEdit({ ...todoToEdit, title: e.target.value })
					}
				/>

				<label htmlFor="todo-item-description">Description</label>
				<input
					id="todo-item-description"
					name="description"
					type="textarea"
					placeholder="Task description..."
					value={todoToEdit.description}
					onChange={(e) =>
						setTodoToEdit({ ...todoToEdit, description: e.target.value })
					}
				/>

				<label htmlFor="todo-item-due-date">Due date</label>
				<span id="date-format">(DD-MM-YYYY):</span>
				<input
					id="todo-item-due-date"
					name="dueDate"
					type="date"
					value={todoToEdit.dueDate}
					onChange={(e) =>
						setTodoToEdit({ ...todoToEdit, dueDate: e.target.value })
					}
				/>

				<label htmlFor="todo-item-priority">Priority</label>
				<select
					id="todo-item-priority"
					name="priority"
					type="select"
					required
					value={todoToEdit.priority}
					onChange={(e) =>
						setTodoToEdit({ ...todoToEdit, priority: e.target.value })
					}
				>
					<option disabled value="">
						Select priority
					</option>
					{priorities.map((element) => {
						const nameToValue = element.toLowerCase().replaceAll(" ", "-");
						return (
							<option key={nameToValue} value={element}>
								{element}
							</option>
						);
					})}
				</select>

				<label htmlFor="todo-item-assignee">Assignee</label>
				<select
					id="todo-item-assignee"
					name="assignee"
					type="text"
					value={todoToEdit.assignee}
					onChange={(e) =>
						setTodoToEdit({ ...todoToEdit, assignee: e.target.value })
					}
				>
					<option value="" disabled>
						Assign task
					</option>
					{teamMembers.map((element) => {
						const nameToValue = element.toLowerCase().replaceAll(" ", "-");
						return (
							<option key={nameToValue} value={element}>
								{element}
							</option>
						);
					})}
				</select>
				<div className="todo-item-form-button-container">
					<button type="submit" form="edit-todo-form">
						Save
					</button>
					<button
						type="reset"
						//style={{ backgroundColor: "red", borderColor: "red" }}
						onClick={() => {
							document.getElementById("edit-todo-dialog").close();
						}}
					>
						Cancel
					</button>
				</div>
			</form>
		</dialog>
	);
}

export default EditTodoItemForm;
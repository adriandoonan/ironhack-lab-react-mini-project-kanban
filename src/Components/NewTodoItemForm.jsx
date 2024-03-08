import { useState } from "react";

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

const NewTodoItemForm = ({ handleSubmit }) => {
	const [newTodo, setNewTodo] = useState(initialTodoState);
	//console.log(dispatch);

	return (
		<dialog id="new-todo-dialog">
			<form
				id="new-todo-form"
				method="dialog"
				style={formStyle}
				onSubmit={(event) => {
					handleSubmit({ event, newTodo });
					setNewTodo(initialTodoState);
				}}
			>
				<label htmlFor="todo-item-title">Title</label>
				<input
					id="todo-item-title"
					name="title"
					type="text"
					placeholder="Task title..."
					required
					value={newTodo.title}
					onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
				/>

				<label htmlFor="todo-item-description">Description</label>
				<textarea
					id="todo-item-description"
					name="description"
					placeholder="Task description..."
					value={newTodo.description}
					onChange={(e) =>
						setNewTodo({ ...newTodo, description: e.target.value })
					}
				/>

				<label htmlFor="todo-item-due-date">Due date</label>
				<span id="date-format">(DD-MM-YYYY):</span>
				<input
					id="todo-item-due-date"
					name="dueDate"
					type="date"
					value={newTodo.dueDate}
					onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
				/>

				<label htmlFor="todo-item-priority">Priority</label>
				<select
					id="todo-item-priority"
					name="priority"
					type="select"
					required
					defaultValue={newTodo.priority}
					onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
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
					value={newTodo.assignee}
					onChange={(e) => setNewTodo({ ...newTodo, assignee: e.target.value })}
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
					<button type="submit" form="new-todo-form">
						Save
					</button>
					<button
						type="reset"
						//style={{ backgroundColor: "red", borderColor: "red" }}
						onClick={() => {
							setNewTodo(initialTodoState);
							document.getElementById("new-todo-dialog").close();
						}}
					>
						Cancel
					</button>
				</div>
			</form>
		</dialog>
	);
};
export default NewTodoItemForm;

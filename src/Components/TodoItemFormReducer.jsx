import { useReducer, useState } from "react";

function reducer(state, action) {
	switch (action.type) {
		case "form-submit": {
			action.payload.preventDefault();
			console.log("got a form submit", action.payload);
			const formData = new FormData(action.payload.target.form);
			const formula = formData.get("title");

			console.log(formula);

			return { ...state, title: formData.get("title") };
		}
		default: {
			console.log("state", state);
			console.log("action", action);
		}
	}
}
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

const TodoItemFormReducer = () => {
	const [title, setTitle] = useState("");
	const [state, dispatch] = useReducer(reducer, {
		id: crypto.randomUUID(),
		title: "",
		description: "",
		assignee: "",
		status: "To Do",
		priority: "Low",
		createdDate: "",
		dueDate: "",
	});
	return (
		<form style={formStyle}>
			<label htmlFor="todo-item-title">Title</label>
			<input
				id="todo-item-title"
				name="title"
				type="text"
				placeholder="Task title..."
				// value={state.title}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<label htmlFor="todo-item-description">Description</label>
			<input
				id="todo-item-description"
				name="description"
				type="textarea"
				placeholder="Task description..."
			/>

			<label htmlFor="todo-item-due-date">Due date</label>
			<span id="date-format">(DD-MM-YYYY):</span>
			<input id="todo-item-due-date" name="date" type="date" />

			<label htmlFor="todo-item-priority">Priority</label>
			<select
				id="todo-item-priority"
				name="priority"
				type="select"
				defaultValue={{ value: "", label: "example" }}
			>
				<option selected disabled value={""}>
					Select priority
				</option>
				{priorities.map((element) => {
					const nameToValue = element.toLowerCase().replaceAll(" ", "-");
					return (
						<option key={nameToValue} value={nameToValue}>
							{element}
						</option>
					);
				})}
			</select>

			<label htmlFor="todo-item-assignee">Assignee</label>
			<select id="todo-item-assignee" name="assignee" type="text">
				<option value="" selected disabled>
					Assign task
				</option>
				{teamMembers.map((element) => {
					const nameToValue = element.toLowerCase().replaceAll(" ", "-");
					return (
						<option key={nameToValue} value={nameToValue}>
							{element}
						</option>
					);
				})}
			</select>
			<div className="todo-item-form-button-container">
				<button
					type="submit"
					method="post"
					onClick={(e) => {
						dispatch({ type: "form-submit", payload: e });
					}}
				>
					Save
				</button>
				<button
					type="reset"
					style={{ backgroundColor: "red", borderColor: "red" }}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};
export default TodoItemFormReducer;

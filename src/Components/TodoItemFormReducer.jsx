import { useReducer, useState } from "react";

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

const TodoItemFormReducer = ({ dispatch, state }) => {
	//console.log(dispatch);

	return (
		<dialog id="new-todo-dialog">
			<form id="new-todo-form" method="dialog" style={formStyle}>
				<label htmlFor="todo-item-title">Title</label>
				<input
					id="todo-item-title"
					name="title"
					type="text"
					placeholder="Task title..."
					required
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
				<input id="todo-item-due-date" name="dueDate" type="date" />

				<label htmlFor="todo-item-priority">Priority</label>
				<select
					id="todo-item-priority"
					name="priority"
					type="select"
					defaultValue={""}
					required
				>
					<option disabled value={""}>
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
					defaultValue={"placeholder"}
				>
					<option value={"placeholder"} disabled>
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
					<button
						type="submit"
						onClick={(e) => {
							dispatch({ type: "form-submit", payload: e });
						}}
					>
						Save
					</button>
					<button
						type="reset"
						style={{ backgroundColor: "red", borderColor: "red" }}
						onClick={() => document.getElementById("new-todo-dialog").close()}
					>
						Cancel
					</button>
				</div>
			</form>
		</dialog>
	);
};
export default TodoItemFormReducer;

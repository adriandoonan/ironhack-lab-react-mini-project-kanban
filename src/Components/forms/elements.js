export const formStyle = {
	padding: "1rem 2rem",
};

export const teamMembers = [
	"adrian",
	"amjad",
	"David Wilson",
	"Mark Johnson",
	"Mary Davis",
	"Jane Smith",
	"Sarah Brown",
];

export const progressStates = ["To Do", "In Progress", "Done"];

export const priorities = ["Low", "Medium", "High"];

export const getFormattedDate = () => {
	const dateNow = new Date();
	return `${dateNow.getFullYear()}-${(dateNow.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${dateNow.getDate().toString().padStart(2, "0")}`;
};

export const initialTodoState = {
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

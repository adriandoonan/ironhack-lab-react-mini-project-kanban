const calculateStatusBreakdown = (todos) => {
	const statusBreakdown = todos
		.map((todo) => todo.status)
		.reduce((acc, status) => {
			// console.log("status", status);
			// console.log(acc);
			acc[status] ? (acc[status] += 1) : (acc[status] = 1);
			return acc;
		}, {});

	return statusBreakdown;
};

const calculateRecentTasks = (todos) => {
	const dateNow = new Date();
	const aWeekAgo = new Date();
	aWeekAgo.setDate(dateNow.getDate() - 7);

	const tasksByDate = todos
		.map((todo) => new Date(todo.createdDate))
		.filter((date) => date > aWeekAgo);

	// console.log(dateNow);
	// console.log(aWeekAgo);
	// console.log(tasksByDate);

	return tasksByDate.length;
};

const calculateAssigneeBreakdown = (todos) => {
	const assigneeBreakdown = todos
		.map((todo) => todo.assignee)
		.reduce((acc, assignee) => {
			// console.log("status", assignee);
			// console.log(acc);
			const theAssignee = assignee || "unassigned";
			acc[theAssignee] ? (acc[theAssignee] += 1) : (acc[theAssignee] = 1);
			return acc;
		}, {});

	return assigneeBreakdown;
};

const Dashboard = ({ todos, isLoading }) => {
	const statusBreakdown = calculateStatusBreakdown(todos);
	const assigneeBreakdown = calculateAssigneeBreakdown(todos);
	const createdInLastWeek = calculateRecentTasks(todos);
	console.log("loading in dash", isLoading, Date.now());
	const constantLoading = true;
	return (
		<article
			style={{
				position: "relative",
				padding: "2rem",
				maxWidth: "600px",
				margin: "2rem",
			}}
		>
			<h2 aria-busy={isLoading ? "true" : "false"}>Dashboard</h2>
			<p> {todos.length} total tasks</p>
			<p>{createdInLastWeek} tasks created in last 7 days</p>
			<hr />
			<h3 aria-busy={isLoading ? "true" : "false"}>Tasks by status</h3>
			{isLoading && "<p>extra foo</p>"}
			<p>To Do {statusBreakdown["To Do"]}</p>
			<p>In Progress {statusBreakdown["In Progress"]}</p>
			<p>Done {statusBreakdown.Done}</p>
			<hr />
			<h3 aria-busy={isLoading ? "true" : "false"}>Tasks by assignee</h3>
			{Object.keys(assigneeBreakdown).map((person) => {
				return (
					<p key={person}>
						{person}: {assigneeBreakdown[person]}
					</p>
				);
			})}
		</article>
	);
};
export default Dashboard;

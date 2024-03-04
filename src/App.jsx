import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import ListOfTodos from "./Components/ListOfTodos";
import Navbar from "./Components/Navbar";
import coolLogo from "./assets/cool-logo.png";
import TodoItem from "./Components/TodoItem";

const testTodos = [
	{
		id: "1",
		title: "Design Landing Page",
		description: "Create a visually appealing landing page for the website.",
		assignee: "Mary Davis",
		status: "To Do",
		priority: "High",
		createdDate: "2023-09-15",
		dueDate: "2023-09-30",
	},
	{
		id: "2",
		title: "Develop User Registration",
		description:
			"Implement user registration functionality with email verification.",
		assignee: "Jane Smith",
		status: "In Progress",
		priority: "Medium",
		createdDate: "2023-09-16",
		dueDate: "2023-10-10",
	},
	{
		id: "3",
		title: "Bug Fix: Login Issue",
		description: "Investigate and fix the login problem reported by users.",
		assignee: "Mark Johnson",
		status: "In Progress",
		priority: "High",
		createdDate: "2023-09-17",
		dueDate: "2023-09-25",
	},
	{
		id: "4",
		title: "Release Version 1.0",
		description:
			"Prepare for the release of the first version of the application.",
		assignee: "Sarah Brown",
		status: "To Do",
		priority: "High",
		createdDate: "2023-09-18",
		dueDate: "2023-10-05",
	},
	{
		id: "5",
		title: "Update Documentation",
		description:
			"Update user documentation with the latest features and changes.",
		assignee: "David Wilson",
		status: "Done",
		priority: "Low",
		createdDate: "2023-09-19",
		dueDate: "2023-09-30",
	},
];

function App() {
	return (
		<>
			<Navbar
				logoImage={coolLogo}
				menuItems={[
					{ name: "one", link: "#" },
					{ name: "two", link: "#" },
					{ name: "three", link: "#" },
				]}
			/>

			<main>
				<Sidebar />
				<ListOfTodos todos={testTodos} />
			</main>
			<Footer
				githubLink="https://github.com/adriandoonan/ironhack-lab-react-mini-project-kanban"
				githubRepoName="React Mini Project"
			/>
		</>
	);
}

export default App;

import Footer from "./Components/navigation/Footer";
import Sidebar from "./Components/navigation/Sidebar";

import Navbar from "./Components/navigation/Navbar";
import coolLogo from "./assets/cool-logo.png";

import todos from "./todos-11-mar.json";

import { Route, Routes } from "react-router-dom";
import ListOfTodos from "./Pages/ListOfTodos";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import Todo from "./Pages/Todo";
import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import Presentation from "./Pages/Presentation";

export const notify = (message = "Here is your toast.", icon = "👏") => {
	toast(message, {
		duration: 4000,
		position: "top-center",

		// Styling
		style: {},
		className: "",

		// Custom Icon
		icon: icon,

		// Change colors of success/error/loading icon
		iconTheme: {
			primary: "#000",
			secondary: "#fff",
		},

		// Aria
		ariaProps: {
			role: "status",
			"aria-live": "polite",
		},
	});
};

const pantryId = "03a06e51-b6b3-4f49-a584-22efe3180d55";

function App() {
	const [externalTodos, setExternalTodos] = useState([]);
	const [tasks, setTasks] = useState({});

	const [isLoading, setIsLoading] = useState(true);
	const [offlineMode, setOfflineMode] = useState(true);

	const getExternalTodos = async () => {
		try {
			const response = await fetch(
				`https://getpantry.cloud/apiv1/pantry/${pantryId}/basket/kanban-todos`,
			);
			const fetchedTodos = await response.json();

			console.log("here is the parsed data", fetchedTodos.todos);
			setExternalTodos([...fetchedTodos.todos]);
			//console.log("ext todo", externalTodos);

			return fetchedTodos;
		} catch (error) {
			console.log("error getting external todos", error);
			setOfflineMode(true);
		}
	};

	const updateExternalTodos = async (todos) => {
		try {
			console.log("about to send", { todos });
			const postRequest = await fetch(
				`https://getpantry.cloud/apiv1/pantry/${pantryId}/basket/kanban-todos`,
				{
					method: "POST", // or 'PUT'

					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ todos }),
				},
			);

			const responseTExt = await postRequest.text();

			console.log("did a post, got this\n", responseTExt);

			//console.log("ext todo", externalTodos);
			return responseTExt;
		} catch (err) {
			console.log("error posting external todos", err);
			setOfflineMode(true);
		}
	};

	useEffect(() => {
		if (offlineMode) {
			setExternalTodos(todos.todos);
			setIsLoading(false);
			notify("using local todos", "✅");
			return;
		}
		const externalTodos = getExternalTodos();

		notify("got todos from server", "✅");
		setTimeout(setIsLoading(false), 2000);
	}, [offlineMode]);

	const deleteTodo = (id) => {
		const updatedTodos = externalTodos.filter((todo) => todo.id !== id);
		setExternalTodos(updatedTodos);
		!offlineMode && updateExternalTodos(updatedTodos);
		notify("todo deleted", "😵");
	};

	const [todoToEdit, setTodoToEdit] = useState("2");

	const handleEditExistingTodo = (id) => {
		console.log("got an edit request", id);
		setTodoToEdit(externalTodos.find((todo) => todo.id === id));
		const editForm = document.getElementById("edit-todo-dialog");
		const textarea = editForm.querySelector("textarea");

		editForm.show();
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	const handleSubmitEdit = ({ event, todoToEdit }) => {
		console.log("event", event);
		console.log("todo", todoToEdit);
		const updatedTodos = externalTodos.map((todo) =>
			todo.id !== todoToEdit.id ? todo : todoToEdit,
		);
		setExternalTodos(updatedTodos);
		!offlineMode && updateExternalTodos(updatedTodos);
		notify("todo edited", "✔️");
	};

	const showEditForm = () => {
		const editForm = document.getElementById("edit-todo-dialog");
		const textarea = editForm.querySelector("textarea");

		editForm.show();
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	return (
		<>
			{offlineMode && (
				<div
					style={{
						position: "fixed",
						top: 0,
						zIndex: 42069,
						backgroundColor: "red",
						color: "white",
					}}
				>
					offline mode!
				</div>
			)}
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

				<section id="main-content">
					<Routes>
						<Route
							path="/"
							element={<HomePage todos={externalTodos} isLoading={isLoading} />}
						/>

						<Route
							path="/todos"
							element={
								<ListOfTodos
									todoItems={externalTodos}
									updateExternalTodos={updateExternalTodos}
									handleEditExistingTodo={handleEditExistingTodo}
									handleSubmitEdit={handleSubmitEdit}
									setTodoItems={setExternalTodos}
									deleteTodo={deleteTodo}
									setTodoToEdit={setTodoToEdit}
									todoToEdit={todoToEdit}
									showEditForm={showEditForm}
									offlineMode={offlineMode}
								/>
							}
						/>

						<Route
							path="/todos/:todoId"
							element={
								<Todo
									todoItems={externalTodos}
									updateExternalTodosFunc={updateExternalTodos}
									handleEditExistingTodo={handleEditExistingTodo}
									handleSubmitEdit={handleSubmitEdit}
									setTodoItems={setExternalTodos}
									deleteTodo={deleteTodo}
									setTodoToEdit={setTodoToEdit}
									todoToEdit={todoToEdit}
									showEditForm={showEditForm}
									offlineMode={offlineMode}
								/>
							}
						/>

						<Route path="/about" element={<About />} />

						<Route path="/pres" element={<Presentation />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</section>
			</main>
			<Toaster />
			<Footer
				githubLink="https://github.com/adriandoonan/ironhack-lab-react-mini-project-kanban"
				githubRepoName="React Mini Project"
			/>
		</>
	);
}

export default App;

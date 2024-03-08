import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";

import Navbar from "./Components/Navbar";
import coolLogo from "./assets/cool-logo.png";

import testTodos from "./data.json";
import { Route, Routes } from "react-router-dom";
import ListOfTodos from "./Components/ListOfTodos";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import Todo from "./Pages/Todo";
import { useEffect, useState } from "react";

const pantryId = "03a06e51-b6b3-4f49-a584-22efe3180d55";

function App() {
	const [externalTodos, setExternalTodos] = useState([]);
	let offlineMode = false;

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
		} catch {
			console.log("error getting external todos");
			offlineMode = true;
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
			offlineMode = true;
		}
	};

	useEffect(() => {
		getExternalTodos();
	}, []);

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

				<section id="main-content">
					<Routes>
						<Route path="/" element={<HomePage />} />

						<Route
							path="/todos"
							element={
								<ListOfTodos
									todos={externalTodos}
									updateExternalTodosFunc={updateExternalTodos}
								/>
							}
						/>

						<Route
							path="/todos/:todoId"
							element={
								<Todo
									todos={externalTodos}
									updateExternalTodosFunc={updateExternalTodos}
								/>
							}
						/>

						<Route path="/about" element={<About />} />

						<Route path="*" element={<NotFound />} />
						{/* <TodoItemForm /> */}
					</Routes>
				</section>
			</main>

			<Footer
				githubLink="https://github.com/adriandoonan/ironhack-lab-react-mini-project-kanban"
				githubRepoName="React Mini Project"
			/>
		</>
	);
}

export default App;

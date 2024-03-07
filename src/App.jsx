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

const baseUrl = "/ironhack-lab-react-mini-project-kanban/";

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

				<section>
					<Routes>
						<Route path={`${baseUrl}*`} element={<HomePage />} />

						<Route
							path={`${baseUrl}todos`}
							element={<ListOfTodos todos={testTodos} />}
						/>

						<Route path={`${baseUrl}about`} element={<About />} />

						<Route path={`${baseUrl}*`} element={<NotFound />} />
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

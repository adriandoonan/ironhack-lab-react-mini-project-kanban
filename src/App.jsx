import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import ListOfTodos from "./Components/ListOfTodos";
import Navbar from "./Components/Navbar";
import coolLogo from "./assets/cool-logo.png";

import TodoItemForm from "./Components/TodoItemForm";
import TodoItemFormReducer from "./Components/TodoItemFormReducer";
import testTodos from "./data.json";

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
					<ListOfTodos todos={testTodos} />
					{/* <TodoItemForm /> */}
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

import Footer from "./Components/Footer";

function App() {
	return (
		<>
			<nav>
				<ul>
					<li>item</li>
				</ul>
				<ul>
					<li>menu 1</li>
					<li>menu 2</li>
				</ul>
			</nav>
			<main>main thing</main>
			<Footer
				githubLink="https://github.com/adriandoonan/ironhack-lab-react-mini-project-kanban"
				githubRepoName="React Mini Project"
			/>
		</>
	);
}

export default App;

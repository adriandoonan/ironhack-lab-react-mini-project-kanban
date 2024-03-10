import Dashboard from "../Components/Dashboard";

const HomePage = ({ todos }) => {
	return (
		<>
			<h1>Home Page</h1>
			<Dashboard todos={todos} />
		</>
	);
};
export default HomePage;

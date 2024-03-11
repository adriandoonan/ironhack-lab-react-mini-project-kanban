import Dashboard from "../Components/Dashboard";

const HomePage = ({ todos, isLoading }) => {
	console.log("load", isLoading);
	return (
		<>
			<h1>Home Page</h1>

			<Dashboard todos={todos} isLoading={isLoading} />
		</>
	);
};
export default HomePage;

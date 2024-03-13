import Dashboard from "../Components/Dashboard";

const HomePage = ({ todos, isLoading }) => {
	return <Dashboard todos={todos} isLoading={isLoading} />;
};
export default HomePage;

import { NavLink } from "react-router-dom";
const baseUrl = "/ironhack-lab-react-mini-project-kanban/";

const Sidebar = () => {
	return (
		<aside data-theme="dark">
			<nav>
				<ul>
					<NavLink to={`${baseUrl}`}>
						<li>Home </li>
					</NavLink>
					<NavLink to={`${baseUrl}about`}>
						<li>About</li>
					</NavLink>
					<NavLink to={`${baseUrl}todos`}>
						<li>Todos</li>
					</NavLink>
					<button
						type="button"
						onClick={() => {
							document.getElementById("new-todo-dialog").show();
						}}
					>
						New Todo
					</button>
				</ul>
			</nav>
		</aside>
	);
};
export default Sidebar;

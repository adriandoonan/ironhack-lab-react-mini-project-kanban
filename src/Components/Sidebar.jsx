import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<aside data-theme="dark">
			<nav>
				<ul>
					<NavLink to="/">
						<li>Home </li>
					</NavLink>
					<NavLink to="/about">
						<li>About</li>
					</NavLink>
					<NavLink to="/todos">
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

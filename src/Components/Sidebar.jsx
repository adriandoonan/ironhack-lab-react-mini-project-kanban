import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
	const currentPage = useLocation();
	//console.log(currentPage.pathname);
	return (
		<aside data-theme="dark">
			<nav id="sidebar-nav">
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
					{currentPage.pathname === "/todos" && (
						<button
							type="button"
							onClick={() => {
								document.getElementById("new-todo-dialog").show();
							}}
						>
							New Todo
						</button>
					)}
				</ul>
			</nav>
		</aside>
	);
};
export default Sidebar;

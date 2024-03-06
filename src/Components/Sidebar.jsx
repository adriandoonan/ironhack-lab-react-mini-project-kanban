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
				</ul>
			</nav>
		</aside>
	);
};
export default Sidebar;

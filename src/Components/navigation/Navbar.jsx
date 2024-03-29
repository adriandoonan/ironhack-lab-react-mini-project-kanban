import { Link, NavLink } from "react-router-dom";

const Navbar = ({ logoImage, menuItems }) => {
	return (
		<header id="main-header">
			<nav>
				<ul>
					<Link to="/">
						<li>
							<img
								className="logo-image"
								src={logoImage}
								alt="what a cool company"
							/>
							<span id="company-name">cool jerks</span>
						</li>
					</Link>
				</ul>
				<ul>
					{/* {menuItems.map((item) => (
						<NavLink key={item.name.replaceAll(" ", "-")} to={item.link}>
							<li>{item.name}</li>
						</NavLink>
					))} */}
				</ul>
			</nav>
		</header>
	);
};
export default Navbar;

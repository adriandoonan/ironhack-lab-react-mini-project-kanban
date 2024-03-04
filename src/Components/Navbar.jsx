const Navbar = ({ logoImage, menuItems }) => {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<a href="#">
							<img
								className="logo-image"
								src={logoImage}
								alt="what a cool company"
							/>
							Cool jerks
						</a>
					</li>
				</ul>
				<ul>
					{menuItems.map((item) => (
						<li key={item.name.replaceAll(" ", "-")}>
							<a href={item.link}>{item.name}</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};
export default Navbar;

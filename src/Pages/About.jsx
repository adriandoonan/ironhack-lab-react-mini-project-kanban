import { Link } from "react-router-dom";

const About = () => {
	return (
		<article
			style={{
				position: "relative",
				top: "25%",
				maxWidth: "500px",
				margin: "2rem",
			}}
		>
			<h1>This is our about page</h1>
			<p>Here is some information about us:</p>

			<p>We Are Students At IronHack And Doing a Web Development Course 🤓</p>
			<p>
				If you think you want to learn how to hack something like this together,
				why not visit the{" "}
				<a
					href="https://www.ironhack.com/de-en"
					rel="noreferrer"
					target="_blank"
				>
					IronHack Website
				</a>{" "}
				and find out more about the next classes!
			</p>
			<Link
				to="/pres"
				style={{
					color: "var(--pico-background-color)",
					textDecoration: "none",
				}}
			>
				see the pres
			</Link>
		</article>
	);
};

export default About;

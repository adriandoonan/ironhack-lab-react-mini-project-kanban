import { useNavigate } from "react-router";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<article
			style={{
				position: "relative",
				top: "20%",
				maxWidth: "500px",
				margin: "2rem",
				padding: "1rem",
			}}
		>
			<h1>You what? never heard of it</h1>
			<button type="button" onClick={navigate("/")}>
				Back
			</button>
		</article>
	);
};

export default NotFound;

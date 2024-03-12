// App.tsx
import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";
import RevealHighlight from "reveal.js/plugin/highlight/highlight";

const Presentation = () => {
	const deckDivRef = useRef(null); // reference to deck container div
	const deckRef = useRef(null); // reference to deck reveal instance

	useEffect(() => {
		// Prevents double initialization in strict mode
		if (deckRef.current) return;

		deckRef.current = new Reveal(deckDivRef.current, {
			transition: "slide",
			// other config options
		});
		console.log("ref", deckRef.current);

		deckRef.current.initialize({ plugins: [RevealHighlight] }).then(() => {
			// good place for event handlers and plugin setups
			console.log("reveal js initialising");
		});

		return () => {
			try {
				if (deckRef.current) {
					deckRef.current.destroy();
					deckRef.current = null;
				}
			} catch (e) {
				console.warn("Reveal.js destroy call failed.");
			}
		};
	}, []);

	return (
		// Your presentation is sized based on the width and height of
		// our parent element. Make sure the parent is not 0-height.
		<div style={{ height: "80vh", width: "80vw" }}>
			<div className="reveal" ref={deckDivRef}>
				<div className="slides">
					<section>
						<h1 className="r-fit-text">React Mini Project</h1>
						<h4 style={{ textTransform: "lowercase" }}>adrian & amjad</h4>
					</section>
					<section>
						<h2>Kanban Board</h2>
						<h4 className="fragment">Why the kanban board?</h4>
						<span className="fragment">
							<img
								className=""
								src="https://c.tenor.com/tdOpw7weUBIAAAAd/tenor.gif"
								alt="john f kennedy"
							/>
						</span>
					</section>
					<section data-auto-animate>
						<h1 className="r-fit-text">Easy</h1>
					</section>
					<section data-auto-animate>
						<h1 className="r-fit-text">Parts</h1>
					</section>
					<section>
						<pre>
							<code data-trim data-noescape>
								npm create vite@latest -- --template react
							</code>
						</pre>
					</section>
					<section data-auto-animate>
						<h1 className="r-fit-text">Hard</h1>
					</section>
					<section data-auto-animate>
						<h1 className="r-fit-text">Parts</h1>
					</section>
					<section>
						<ul style={{ color: "white" }}>
							<li className="fragment">Styling</li>
							<li className="fragment">Drag and Drop</li>
							<li className="fragment">State management</li>
							<li className="fragment">Not doing things too early</li>
							<li className="fragment">Dealing with too many tasks</li>
						</ul>
					</section>
					<section>
						<h2>Biggest takeaway</h2>
						<blockquote
							style={{ color: "black", backgroundColor: "whitesmoke" }}
						>
							Concentrate on doing the things we are learning in class well,
							instead of rushing forwards
						</blockquote>
					</section>
					<section>
						<div className="r-stack">
							<h4 className="fragment">thanks</h4>

							<img
								src="https://c.tenor.com/-is6u2LpO4QAAAAC/tenor.gif"
								alt="springer final thoughts"
								className="fragment r-stretch"
							/>
						</div>
					</section>
					<section>
						<h1 className="r-fit-text">Demo Time</h1>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Presentation;

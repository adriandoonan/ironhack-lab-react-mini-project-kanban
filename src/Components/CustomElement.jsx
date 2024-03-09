import ReactDOM from "react-dom/client";

class MyReactComponent extends React.Component {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}

class MyElement extends HTMLElement {
	connectedCallback() {
		const name = this.getAttribute("name");
		ReactDOM.render(<MyReactComponent name={name} />, this);
	}
}

customElements.define("my-element", MyElement);

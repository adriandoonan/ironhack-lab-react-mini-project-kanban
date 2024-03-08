const Toast = ({ message, type, onClose }) => {
	return (
		<div className="toast" role="alert">
			<div className="toast-message">
				<div className="icon icon--lg icon--thumb"> ... </div>
				<p> ... </p>
			</div>
			<button type="button" className="toast-close-button" onClick={onClose}>
				<span className="icon">...</span>
			</button>
		</div>
	);
};
export default Toast;

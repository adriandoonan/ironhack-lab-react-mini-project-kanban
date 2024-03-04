import TodoItem from "./TodoItem";

const ListOfTodos = ({ todos }) => {
	return (
		<section>
			{todos.map((todoItem) => (
				<TodoItem details={todoItem} key={todoItem.id} />
			))}
		</section>
	);
};
export default ListOfTodos;

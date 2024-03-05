import TodoItem from "./TodoItem";

const ListOfTodos = ({ todos }) => {
	return (
		<section className="list-of-todos">
			{todos.map((todoItem) => (
				<TodoItem {...todoItem} key={todoItem.id} />
			))}
		</section>
	);
};
export default ListOfTodos;

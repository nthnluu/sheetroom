const QuizDispatch = React.createContext(null);

function QuizApp() {
    // Note: `dispatch` won't change between re-renders
    const [todos, dispatch] = useReducer(todosReducer);

    return (
        <TodosDispatch.Provider value={dispatch}>
            <DeepTree todos={todos} />
        </TodosDispatch.Provider>
    );
}

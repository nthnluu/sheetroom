import AdminPageLayout from "../../../Components/AdminPageLayout";
import {useRouter} from 'next/router'
import {QUIZ} from "../../../gql/quizzes";
import {useQuery} from "@apollo/react-hooks";
import {getSession} from "next-auth/client";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Component} from "react";

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

class Sample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems(10)
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable  >
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.state.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

const QuizEditor = ({user}) => {
    const router = useRouter();
    const {qid} = router.query;

    const {loading, error, data} = useQuery(QUIZ, {
        variables: {id: qid},
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (<AdminPageLayout user={user}>
        <div className="py-12">
            <header>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-gray-900">
                        {data.quiz_by_pk.title}
                    </h1>
                    <h2 className="text-gray-500 mt-1">{data.quiz_by_pk.description}</h2>
                </div>
            </header>
            <main className="mt-6">
                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Sample/>
                </section>
            </main>
        </div>
    </AdminPageLayout>)
};

QuizEditor.getInitialProps = async ({res, ...context}) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/auth/signin'
            });
            res.end();
        } else {
            return {session: session, user: session.user}
        }
    }


};

export default QuizEditor

import {useMutation} from "@apollo/react-hooks";
import {getSession} from "next-auth/client";
import React, {useState} from "react";
import AppLayout from "../../Components/AppLayout";
import gql from "graphql-tag";
import Head from "next/head";

export const CREATE_ASSIGNMENT = gql`
  mutation InsertAssignment($title: String!, $desc: String, $userId: Int!) {
      insert_assignments_assignment(objects: {title: $title, description: $desc, created_by: $userId}) {
    returning {
      id
    }
  }
  }
`;

function QuizFormSet({session}) {
    const [addAssignment, {data}] = useMutation(CREATE_ASSIGNMENT);
    const [isLoading, toggleLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        toggleLoading(true);
        addAssignment({
            variables: {
                title: e.target.title.value,
                desc: e.target.description.value,
                userId: session.userId
            }
        })
            .then((result) => window.location.href = '/edit/assignment/' + result.data.insert_assignments_assignment.returning[0].id)
            .catch((error) => alert(error));
    }

    return (<form onSubmit={event => handleSubmit(event)}>
        <div className="pt-6 mt-12 border-t">
            <div>
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        New Quiz
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>
                <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">
                            Title
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <input id="title" type="text" required
                                   className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium leading-5 text-gray-700">
                            Description (optional)
                        </label>
                        <div className="mt-1 rounded-md shadow-sm">
                            <textarea id="description" rows="3"
                                      className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-5">
            <div className="flex justify-end">
      <span className="inline-flex rounded-md shadow-sm">
        <button onClick={() => window.history.back()}
                className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out">
          Cancel
        </button>
      </span>
                <span className="ml-3 inline-flex rounded-md shadow-sm">
        <button type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
            <span className="w-9">{!isLoading ? 'Save' : <i className="fas fa-circle-notch fa-spin w-full"/>}</span>
            </button>
      </span>
            </div>
        </div>
    </form>)

}

const PageContent = ({session}) => {
    return (<div>
        <header>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-gray-900">
                    Create a new assignment
                </h1>
                <h2 className="text-gray-500">An assignment is a reuseable set of questions you can assign to
                    anyone with a link.</h2>
            </div>
        </header>
        <main className="mt-6">
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <QuizFormSet session={session}/>
            </section>
        </main>
    </div>)
}

const NewQuiz = ({user, session}) => {
    return (
        <AppLayout content={<PageContent session={session}/>} windowTitle="New Assignment"/>)
};

NewQuiz.getInitialProps = async ({res, ...context}) => {
    if (typeof window === 'undefined') {
        const session = await getSession(context);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/auth/signin'
            });
            res.end();
            return {};
        } else {
            return {session: session, user: session.user}
        }
    }
};

export default NewQuiz

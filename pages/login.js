import {useState} from "react";
import {useMutation} from '@apollo/react-hooks';
import Cookies from 'js-cookie';
import gql from 'graphql-tag';


export default function () {

    const TOKEN_AUTH = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
    token
    refreshToken
  }
  }
`;

    const [validationErrors, setValidationError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tokenAuth, {data}] = useMutation(TOKEN_AUTH);


    function setAuthToken({newToken, newRefreshToken}) {
        Cookies.set('homework.AuthToken', newToken);
        Cookies.set('homework.RefreshToken', newRefreshToken);
        Cookies.set('homework.AuthTokenCreated', Date.now());
        window.location.href = '/';
    }

    function handleError() {
        setValidationError(true);
        setLoading(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        tokenAuth({variables: {email: event.target.email.value, password: event.target.password.value}})
            .then(result => setAuthToken({
                newToken: result.data.tokenAuth.token,
                newRefreshToken: result.data.tokenAuth.refreshToken
            }))
            .catch(() => handleError());
    }


    function checkValid() {
        if (validationErrors) {
            return 'border-red-400 bg-red-50 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red'
        } else {
            return 'border-gray-300 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
        }

    }

    return (<div className="min-h-screen bg-white flex">
        <div
            className="flex-1 flex flex-col justify-center py-12 -mt-24 md:mt-0 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm">
                <div>
                    <img className="h-12 w-auto" src="/hw_symbol.svg" alt="Workflow"/>
                    <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                    <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
                        Need an account?
                        <a href="#"
                           className="font-medium text-blue-600 ml-1  hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                            Create one now.
                        </a>
                    </p>
                </div>

                <div className="mt-8">
                    <div>
                        <div>
                            <p className="text-sm leading-5 font-medium text-gray-700">
                                Log in with
                            </p>

                            <div className="mt-1 grid grid-cols-3 gap-3">
                                <div>
                <span className="w-full inline-flex rounded-md shadow-sm">
                  <button type="button"
                          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                          aria-label="Sign in with Facebook">
                    <svg className="h-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clipRule="evenodd"/>
                    </svg>
                  </button>
                </span>
                                </div>

                                <div>
                <span className="w-full inline-flex rounded-md shadow-sm">
                  <button type="button"
                          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                          aria-label="Sign in with Twitter">
                    <svg className="h-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                          d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </button>
                </span>
                                </div>

                                <div>
                <span className="w-full inline-flex rounded-md shadow-sm">
                  <button type="button"
                          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
                          aria-label="Sign in with GitHub">
                    <svg className="h-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                            clipRule="evenodd"/>
                    </svg>
                  </button>
                </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm leading-5">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <form onSubmit={(event => handleSubmit(event))}>
                            <div>
                                <label htmlFor="email"
                                       className={validationErrors ? "block text-sm font-medium leading-5 text-red-700" : "block text-sm font-medium leading-5 text-gray-700"}>
                                    Email address
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input id="email" type="email" required name="email" autoComplete="email"
                                           className={"appearance-none block w-full px-3 py-2 border rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 " + checkValid()}/>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password"
                                       className={validationErrors ? "block text-sm font-medium leading-5 text-red-700" : "block text-sm font-medium leading-5 text-gray-700"}>
                                    Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input id="password" type="password" required name="password"
                                           autoComplete="password"
                                           className={"appearance-none block w-full px-3 py-2 border rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 " + checkValid()}/>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" type="checkbox"
                                           className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"/>
                                    <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-5">
                                    <a href="#"
                                       className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button type="submit"
                        className="w-full flex justify-center py-2 px-4 mb-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                  <span>
                      {loading ? <i className="fas fa-circle-notch fa-spin"/> : "Log in"}
                  </span>

                </button>
              </span>
                                {validationErrors ? <span className="text-red-600 font-semibold text-sm mt-4"><i
                                    className="fas fa-exclamation-circle mr-2"/>Invalid email or password.</span> : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
            <img className="absolute inset-0 h-full w-full object-cover"
                 src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                 alt=""/>
        </div>
    </div>)
}

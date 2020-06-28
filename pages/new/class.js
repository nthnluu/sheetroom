import AdminPageLayout from "../../Components/AdminPageLayout";
import auth0 from "../../utils/auth0";

const Class = ({user}) => {
    return (<AdminPageLayout user={user}>
        <div className="py-12">
            <header>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-gray-900">
                        Create a new class
                    </h1>
                    <h2>A class contains all of your students and corresponding score reports.</h2>
                </div>
            </header>
            <main className="mt-6">
                <section className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/*// <!-- Replace with your content -->*/}
                    <div className="px-4 py-8 sm:px-0">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">Import Existing Roster</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="border border-gray-100 shadow-lg rounded-lg rounded-lg">
                               <img className="w-full" src="https://www.powerschool.com/wp-content/uploads/2018/10/default-og-image.png"/>
                            </div>

                        </div>
                    </div>
                    {/*// <!-- /End replace -->*/}
                </section>
            </main>
        </div>
    </AdminPageLayout>)
};

Class.getInitialProps = async ({req, res}) => {
    if (typeof window === 'undefined') {
        const session = await auth0.getSession(req);
        if (!session || !session.user) {
            res.writeHead(302, {
                Location: '/api/login'
            });
            res.end();
            return;
        }
        return {user: session.user};
    }
};

export default Class

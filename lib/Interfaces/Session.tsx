interface User {
    name: string;
    email: string;
    image: string;
}

interface Session {
    user: User;
    expires: string;
    id: number;
}


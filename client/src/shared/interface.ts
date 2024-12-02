export interface Blog {
    id: string;
    title: string;
    content: string;
    media: string;
    userId: string;
    author: {
        name: string;
        email: string;
    };
    createdAt: string;
}

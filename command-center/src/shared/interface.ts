export interface Article {
    userId: string;
    published: boolean;
    title: string;
    media?: string | any;
    content: Array<{
        id: string,
        type: string,
        data: any
    }>
}

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

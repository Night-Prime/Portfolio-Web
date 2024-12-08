export interface Article {
    userId: string;
    published: boolean;
    title: string;
    content: Array<{
        id: string,
        type: string,
        data: any
    }>
}
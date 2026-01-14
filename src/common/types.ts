export type MyStat = {
    books: {
        total: number;
        own: number;
    };
    drafts: number;
    authors: {
        total: number;
        own: number;
    };
    messages: {
        total: number;
        new: number;
    };
    complete: number;
}

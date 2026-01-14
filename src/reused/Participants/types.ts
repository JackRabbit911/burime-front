export type Member = {
    id: number;
    role: number;
    status: number;
    alias: string;
}

export type AuthorsPayload = {
    page: number;
    limit: number;
    filter: string | null;
    search: string | null;
}

export type OwnAuthor = {
    id: number | undefined;
    alias: string;
}

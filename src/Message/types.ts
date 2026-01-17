export type Inbox = {
    id: number;
    author_id: number;
    from: number;
    status: number;
    alias: string;
    to_alias: string;
    subject: string;
    created: string;
}

export type Outbox = {
    id: number;
    status: number;
    from: string;
    to: string;
    subject: string;
    created: string;
}

export type MessageList = {
    inbox: Inbox[];
    outbox: Outbox[];
}

type MsgData = {
    [key: string]: string;
}

export type Message = {
    id: number;
    from: number;
    status: number;
    alias: string;
    subject: string;
    data: MsgData | string;
}

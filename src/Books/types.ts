export type CoverType = {
    bg_img: string | null;
    cover: string | null;
    bg_color: string;
    text_color: string;
    text_size: number;
}

export type MyBook = {
    id: number;
    title: string;
    cover: CoverType | string;
    alias: string;
    genreStr: string;
    myRole: number;
}

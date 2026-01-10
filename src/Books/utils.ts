import type { MyStat } from "../common/types";

export const isOwnAuthors = (stat: MyStat | null) => {
    if (!stat) {
        return false
    }

    if (stat.authors.own === 0) {
        return false
    }

    return true;
}

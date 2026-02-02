import type { Statuses } from "Branch/schema/input"

export const getStatusString = (statusObj: Statuses, status: number) => (
    Object.entries(statusObj).reduce((acc, [key, value]) => {
        if (value === status) {
            acc = key
        }

        return acc
    }, 'unkown')
)

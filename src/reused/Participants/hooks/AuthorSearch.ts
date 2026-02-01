import { useRef, useState } from "react";
import { authorsFilterSearch } from "../schema";
import { authorsPayloadReset, filterSet, searchSet } from "../store/athorsPayload";

export const useAuthorSearch = () => {
    const [error, setError] = useState<string | null>()
    const searchRef = useRef<HTMLInputElement>(null)
    const filterRef = useRef<HTMLSelectElement>(null)

    const onSelect = () => {
        filterSet(filterRef.current?.value ?? null)
    }

    const onSearch = () => {
        const valid = authorsFilterSearch.safeParse(searchRef.current?.value)
        if (valid.success && valid.data) {
            setError(null)
            searchSet(valid.data)
        } else if (valid.error) {
            setError(valid.error.issues[0].message)
        }
    }

    const onReset = () => {
        if (searchRef.current) {
            searchRef.current.value = ''
        }

        if (filterRef.current) {
            filterRef.current.value = ''
        }

        authorsPayloadReset()
    }

    const inputClassName =
        !error ?
            "input join-item w-full" :
            "input join-item input-error"

    return {
        error,
        onSelect,
        onSearch,
        onReset,
        filterRef,
        searchRef,
        inputClassName
    }
}

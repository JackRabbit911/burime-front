import { useEffect } from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

import { serverErrorRecieved } from "./store";

export const useServerErrors = <T extends FieldValues>(
    setError: UseFormSetError<T>,
) => {
    useEffect(() => {
        const unwatch = serverErrorRecieved.watch((errors) => {
            errors?.forEach(({ key, msg }) => {
                // Используем as Path<T>, чтобы TS разрешил динамический ключ
                setError(key as Path<T>, {
                    type: 'server',
                    message: msg,
                });
            });
        });

        return () => unwatch();
    }, [setError, serverErrorRecieved])
}

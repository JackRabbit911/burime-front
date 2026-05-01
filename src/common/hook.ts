import { useEffect } from "react";
import type { EventCallable } from "effector";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

import type { ValidationError } from "./ajax/types";

export const useServerErrors = <T extends FieldValues>(
    setError: UseFormSetError<T>,
    errorEvent: EventCallable<ValidationError[] |undefined>
) => {
    useEffect(() => {
        const unwatch = errorEvent.watch((errors) => {
            errors?.forEach(({ key, msg }) => {
                // Используем as Path<T>, чтобы TS разрешил динамический ключ
                setError(key as Path<T>, {
                    type: 'server',
                    message: msg,
                });
            });
        });

        return () => unwatch();
    }, [setError, errorEvent])
}

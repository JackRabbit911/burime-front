import { createEffect } from "effector";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiResponse } from "../../../common/ajax/types";
import type { Author } from "../schema";
import ajax from "../../../common/ajax";
import { getGroupMembersUri } from "../../../common/constants";

export const getGroupMembersFx = createEffect<number, AxiosResponse<ApiResponse<Author[]>>, AxiosError>(
    (groupId: number) => ajax.get([getGroupMembersUri, groupId].join('/'))
)

import { host } from "./ajax"

export const perPages = [25, 50, 100]

export const getMyStatUri = '/my/stat'
export const getMyBooksUri = '/my/books'

export const getGroupMembersUri = '/my/common/authors/group'
export const getOwnAuthorsUri = 'my/common/authors/ownauthors'
export const getAuthorsUri = '/my/common/authors/authors'

export const getBootsrapUri = '/my/branch/bootstrap'
export const saveBranchUri = '/my/branch/action/savebranch'
export const saveDraftUri = '/my/branch/action/savedraft'
export const deleteDraftUri = '/my/branch/action/rmdraft'
// export const getBranchReferenceUri = '/my/reference/branch'
export const getBranchAuthorStatusUri = 'my/branch/status/get'
export const setBranchAuthorStatusUri = 'my/branch/status/set'

export const getTranslateUri = '/gettranslate'

export const saveAuthorUri = '/my/author/save'
export const deleteAuthorUri = '/my/author/delete'
export const getMyAuthorsUri = '/my/authors'
export const getMyGroupMembersUri = '/my/group/members'
export const getGroupReferenceUri = '/my/reference/group'
export const setGroupStatusUri = 'my/group/setstatus'
export const getGroupStatusUri = 'my/group/getstatus'

export const getMessageListUri = 'my/message/list'
export const getMessageUri = 'my/message/show'
export const getMessageBlank = 'my/message/blank'
export const removeMessageUri = 'my/message/remove'
export const deleteMessageUri = 'my/message/delete'
export const saveMessageUri = 'my/message/save'
export const getMsgReferenceUri = '/my/reference/message'

export const getUserDataUri = 'my/profile'
export const saveUserDataUri = 'my/profile/save'
export const savePasswordUri = 'my/profile/savepswd'
export const getCsrfPswdUri = 'my/profile/csrf'

export const getCoverUri = 'my/additional/branch'
export const srcAvatar = 'ava/user/'

export const logoutUri = 'auth/logout'
export const quitUri = '/auth/quit'

export const getCsrfUri = 'my/reference/csrf'

export const adminHref = `${host}/abrakadabra`

export const classMap: { [key: string]: { [key: string]: string } } = {
  figure: {
    primary: "stat-figure text-primary",
    secondary: "stat-figure text-secondary",
    info: "stat-figure text-info",
    accent: "stat-figure text-accent",
    success: "stat-figure text-success",
    warning: "stat-figure text-warning",
    error: "stat-figure text-error",
    default: "stat-figure",
  },
  value: {
    primary: "text-start stat-value text-primary",
    secondary: "text-start stat-value text-secondary",
    info: "text-start stat-value text-info",
    accent: "text-start stat-value text-accent",
    success: "text-start stat-value text-success",
    warning: "text-start stat-value text-warning",
    error: "text-start stat-value text-error",
    default: "text-start stat-value",
  },
}

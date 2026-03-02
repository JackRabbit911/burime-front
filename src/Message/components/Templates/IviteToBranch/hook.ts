import ajax from "common/ajax"
import { getBranchAuthorStatusUri, setBranchAuthorStatusUri } from "common/constants"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export const useInviteStatus = (branch: string | number, author?: number) => {
    const [status, setStatus] = useState(110)
    const { box } = useParams()
    const disabledBoth = box === 'in' ? false : true

    const disabledRefuse = disabledBoth || status === 80
    const disabledAccept = disabledBoth || status === 200

    const setPostStatus = (status: number) => {
        ajax.postForm(setBranchAuthorStatusUri, {
            branch_id: branch,
            author_id: author,
            status: status,
        })

        setStatus(status)
    }

    const onClick = (status: number) => () => {
        setPostStatus(status)
    }

    const setFetchStatus = async () => {
        const uri = [getBranchAuthorStatusUri, branch].join('/')
        const params = { author: author }
        const response = await ajax.get(uri, { params: params })
        let status = response?.data?.result?.status
        setStatus(status)

        if (status === 110) {
            setPostStatus(120)
        }

    }

    if (author) {
        useEffect(() => {
            setFetchStatus()
        }, [])
    }

    return { onClick, disabledAccept, disabledRefuse }
}

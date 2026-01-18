import { defaultMsg } from "./components/Templates/DefaultMsg"
import type { Message } from "./types"

export const getComponent = (message: Message) => {
    const key = message.data?.tpl ?? ''
    message.data.body = message.data.body.replace('{AUTHOR}', message.to_alias)
    
    switch (key) {
        default:
            return defaultMsg({ data: message.data })
    }
}

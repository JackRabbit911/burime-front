import { $bootstrap } from "Branch/store/bootstrap";
import { $step } from "Branch/store/step";
import { useUnit } from "effector-react";
import { $viewMsgForm } from "Message/store";
import { useLocation } from "react-router";
import { $modalComponent } from "reused/Modal/store";
import { $memberId } from "reused/Participants/store/authors";

export const useDeps = () => {
    const { pathname } = useLocation()
    const step = useUnit($step)
    const component = useUnit($modalComponent)
    const isOpen = Boolean(component);
    const bootstrap = useUnit($bootstrap)
    const memberId = useUnit($memberId)
    const msgView = useUnit($viewMsgForm)

    return [pathname, step, isOpen, bootstrap, memberId, msgView]
}

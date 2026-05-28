import { isPermission } from "reused/Participants/utils";
import type { Member } from "reused/Participants/types";
import type { Permissions, Statuses } from "Branch/schema/input";

export class buttonEnabled {
    readonly permissions: Permissions;
    readonly statuses: Statuses;
    status: number;
    role: number;
    isMember: boolean;

    constructor (permissions: Permissions, statuses: Statuses, member: Member | null) {
        this.permissions = permissions
        this.statuses = statuses
        this.role = member?.role || 0
        this.status = member?.status || 0
        this.isMember = member ? true : false
    }

    moderator (): boolean {
        return !(
            isPermission(this.role, this.permissions.MODERATE) &&
            isPermission(this.role, this.permissions.MANAGE)
        ) && this.isMember
    }

    accept (): boolean {
        return (
            this.isMember &&
            this.status === this.statuses.candidate ||
            this.status === this.statuses.denied
        )
    }

    deny (): boolean {
        return (
            this.isMember &&
            this.status === this.statuses.candidate
        )
    }

    ban (): boolean {
        return (
            this.isMember &&
            this.status === this.statuses.member &&
            !isPermission(this.role, this.permissions.MANAGE) &&
            !isPermission(this.role, this.permissions.EDIT_STATUS)
        )
    }

    delete (): boolean {
        return (
            this.isMember &&
            this.status < this.statuses.member
        )
    }
}

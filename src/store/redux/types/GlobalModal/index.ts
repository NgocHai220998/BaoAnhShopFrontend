enum GlobalModalType {
    IS_OPEN = "@@GlobalModal/IS_OPEN",
    IS_CLOSE = "@@GlobalModal/IS_CLOSE",
}
export interface IGlobalModalState {
    readonly isOpen: boolean;
    readonly isClose: boolean;
    readonly children: HTMLElement | any;
}

export default GlobalModalType;

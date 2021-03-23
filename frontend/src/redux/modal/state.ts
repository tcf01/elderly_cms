export interface IModalProps {
    toNextPage: (path: string) => void,
    procedure: number,
    isOpen: boolean,
    className: string
    // buttonLabel: string
    // booleanean to control the state of the popover
    // autoFocus: boolean,
    // // if modal should be centered vertically in viewport
    // centered: boolean,
    // // corresponds to bootstrap's modal sizes, ie 'lg' or 'sm'
    // size: string,
    // // callback for toggling isOpen in the controlling component
    // toggle: () => void,
    // role: string, // defaults to "dialog"
    // // used to reference the ID of the title element in the modal
    // labelledBy: string,
    // keyboard: boolean,
    // // control backdrop, see http://v4-alphagetbootstrapcom/components/modal/#options

    // // if body of modal should be scrollable when content is long
    // scrollable: boolean,
    // // allows for a node/component to exist next to the modal (outside of it) Useful for external close buttons
    // // external: node,
    // // called on componentDidMount
    // onEnter: () => void,
    // // called on componentWillUnmount
    // onExit: () => void,
    // // called when done transitioning in
    // onOpened: () => void,
    // // called when done transitioning out
    // onClosed: () => void,
    // className: string,
    // wrapClassName: string,
    // modalClassName: string,
    // backdropClassName: string,
    // contentClassName: string,
    // // boolean to control whether the fade transition occurs (default: true)
    // fade: boolean,
    // cssModule: object,

    // innerRef: object,
    // // if modal should be destructed/removed from DOM after closing
    // unmountOnClose: boolean // defaults to true
}
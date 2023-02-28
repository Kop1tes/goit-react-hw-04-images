import css from "./Modal.module.css";
import { createPortal } from 'react-dom';
import { useEffect, createRef } from 'react';

const modalRoot = document.querySelector("#modal-root");

export default function Modal({onClose, children}) {
    const backdropRef = createRef();

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    const handleKeyDown = e => {
        if (e.code === "Escape") {
            onClose();
        }
    };

    const handleBackdropClick = e => {
        if (e.target !== e.currentTarget) {
            return;
        }
        onClose();
    };

    return createPortal(
        <div
            className={css.Overlay}
            ref={backdropRef}
            onClick={handleBackdropClick}
            role="presentation"
        >
            <div className={css.Modal}>{children}</div>
        </div>,
        modalRoot
    );
};

// export default class Modal extends Component {
//     static propTypes = {
//         onClose: PropTypes.func.isRequired,
//         children: PropTypes.node.isRequired,
//     };

//     backdropRef = createRef();

//     componentDidMount() {
//         window.addEventListener("keydown", this.handleKeyDown);
//     };

//     componentWillUnmount() {
//         window.removeEventListener("keydown", this.handleKeyDown);
//     };

//     handleKeyDown = e => {
//         if (e.code === "Escape") {
//             this.props.onClose();
//         }
//     };

//     handleBackdropClick = e => {
//         if (e.target !== e.currentTarget) {
//             return;
//         }
//         this.props.onClose();
//     };

//     render() {
//         const { children } = this.props; 

//         return createPortal(
//             <div
//                 className={css.Overlay}
//                 ref={this.backdropRef}
//                 onClick={this.handleBackdropClick}
//                 role="presentation"
//             >
//                 <div className={css.Modal}>{children}</div>
//             </div>,
//             modalRoot
//         );
//     };
// }
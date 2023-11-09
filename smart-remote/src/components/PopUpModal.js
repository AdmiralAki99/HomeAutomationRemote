// import React, { Children, useEffect, useRef } from "react"

// const PopupModal = ({isOpen,onClose,children}) => {
//     const ref = useRef<HTMLDialogElement | null>(null);
//     const [modalOpen, setModalOpen] = useState(isOpen);

//     useEffect(() => {
//         setModalOpen(isOpen);
//     },[isOpen]);

//     useEffect(()=>{
//         const modalElement = ref.current;
//         if(modalElement){
//             if(modalOpen){
//                 modalElement.showModal();
//             }else{
//                 modalElement.close();
//             }
//         }
//     })

//     const handleCloseModal = () => {
//         if(onClose){
//             onClose();
//         }
//         setModalOpen(false);
//     }

//     return(
//         <dialog ref={ref} className="ModalPopup">
//             {children}
//         </dialog>
//     )

// }

// export default PopupModal;
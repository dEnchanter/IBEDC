import Modal from 'react-modal';
import { CrossIcon } from './icons';

export function RightModal({ children, isOpen, handleClose }) {
  Modal.setAppElement('#modal-root');

  function handleClick(e) {
    e.preventDefault();
    handleClose();
  }

  return (
    <Modal
      onRequestClose={handleClose}
      className="fixed right-0 inset-y-0 w-full sm:w-96 shadow border-none focus-visible:outline-none bg-white z-50"
      overlayClassName="fixed inset-0 bg-opacity-40 bg-gray-700 z-50"
      isOpen={isOpen}
    >
      <div className="absolute left-0 top-0 text-gray-600">
        <a href="#" onClick={handleClick}>
          <CrossIcon h="w-8" />
        </a>
      </div>
      <div className="px-5 py-10">{children}</div>
    </Modal>
  );
}


// export function Modal({ children, isOpen, handleClose }) {
//   Modal.setAppElement('#modal-root');

//   function handleClick(e) {
//     e.preventDefault();
//     handleClose();
//   }

//   return (
//     <Modal
//       onRequestClose={handleClose}
//       className="fixed right-0 inset-y-0 w-full sm:w-96 shadow border-none focus-visible:outline-none bg-white z-50"
//       overlayClassName="fixed inset-0 bg-opacity-40 bg-gray-700 z-50"
//       isOpen={isOpen}
//     >
//       <div className="absolute left-0 top-0 text-gray-600">
//         <a href="#" onClick={handleClick}>
//           <CrossIcon h="w-8" />
//         </a>
//       </div>
//       <div className="px-5 py-10">{children}</div>
//     </Modal>
//   );
// }

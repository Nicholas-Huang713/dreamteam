import './Modal.module.scss';

export default function Example({ isOpen, setIsOpen, children }) {

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'
        }`}
    >
      <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75" onClick={setIsOpen}></div>

      <div className="modal-container bg-white w-full max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          {children}
        </div>
      </div>
    </div>
  )
}

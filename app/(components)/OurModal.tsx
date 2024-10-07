
"use client";
function OurModal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: any;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <dialog
        open
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto z-50"
      >
        {children}
      </dialog>
    </>
  );
}

export default OurModal;

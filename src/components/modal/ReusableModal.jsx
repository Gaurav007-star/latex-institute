import { useEffect } from "react";

export function ReusableModal({ open, onClose, trigger, children }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return <>{trigger}</>;

  return (
    <>
      {trigger}

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Light backdrop */}
        <div className="absolute inset-0 bg-black/10 " onClick={onClose} />

        {/* Modal box */}
        <div className="relative z-10 bg-white rounded-2xl p-6 min-w-[400px] h-max">
          {children}
        </div>
      </div>
    </>
  );
}

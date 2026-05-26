import { toast } from 'react-hot-toast';

export const confirmWithToast = ({
  title = 'Confirmar acción',
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) =>
  new Promise((resolve) => {
    toast.custom(
      (t) => (
        <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-xl border border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{message}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              className="rounded-md bg-[#c7d52b] px-3 py-2 text-sm font-medium text-white hover:bg-[#a9b22a]"
            >
              {confirmText}
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: 'top-center',
      }
    );
  });

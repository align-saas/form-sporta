export default function Button({ onClick, children, disabled, variant = 'primary' }) {
  const base = 'px-4 py-2 font-medium rounded-xl shadow';
  const styles = {
    primary: 'bg-[#c7d52b] text-white hover:bg-[#a9b22a] disabled:opacity-50',
    success: 'bg-[#c7d52b] text-white hover:bg-[#a9b22b]'
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}
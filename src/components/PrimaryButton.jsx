const PrimaryButton = ({ children, onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full py-3 rounded-2xl bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 font-semibold shadow-2xl"
  >
    {loading ? "Please wait..." : children}
  </button>
);

export default PrimaryButton;
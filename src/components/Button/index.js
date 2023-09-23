export const Button = (props) => {
  const { label, onClick, disabled, className } = props;
  return (
    <button
      className={
        disabled ? "disabled" : className ? className : "custom-button"
      }
      {...props}
      disabled={disabled}
      onClick={onClick}
    >
      <div>{label}</div>
    </button>
  );
};

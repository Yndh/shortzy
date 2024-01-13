interface InputInterface {
  name: string;
  value: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
  name,
  value,
  disabled = false,
  onChange,
}: InputInterface) {
  return (
    <div className="inputContainer">
      <label htmlFor={name.replace(/\s/g, "")}>{name}</label>
      <input
        type="text"
        id={name.replace(/\s/g, "")}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

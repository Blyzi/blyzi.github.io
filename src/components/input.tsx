import clsx from "clsx";

type BaseInputProps = {
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
};

type SimpleInputProps = BaseInputProps & {
  type?: "text" | "date" | "color" | "email" | "url";
  value: string;
  onChange: (value: string) => void;
  mode?: never;
};

type TextareaInputProps = BaseInputProps & {
  mode: "textarea";
  value: string;
  onChange: (value: string) => void;
};

type ColorInputProps = BaseInputProps & {
  mode: "color";
  value: string;
  onChange: (value: string) => void;
};

type SelectOption = { label: string; value: string };

type SelectInputProps = BaseInputProps & {
  mode: "select";
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
};

type InputProps =
  | SimpleInputProps
  | TextareaInputProps
  | ColorInputProps
  | SelectInputProps;

export default function Input(props: InputProps) {
  // Select mode
  if (props.mode === "select") {
    return (
      <div className={clsx("flex items-center gap-2", props.className)}>
        {props.icon && <div className="shrink-0">{props.icon}</div>}
        <select
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          className="grow bg-white border border-gray-300 rounded px-2 py-1"
        >
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Color mode
  if (props.mode === "color") {
    return (
      <div className={clsx("flex items-center gap-2", props.className)}>
        {props.icon && <div className="shrink-0">{props.icon}</div>}
        <input
          type="color"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          className="h-10 w-20 cursor-pointer"
        />
        <input
          type="text"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder || "#000000"}
          className="grow bg-white border border-gray-300 rounded px-2 py-1"
        />
      </div>
    );
  }

  // Textarea mode
  if (props.mode === "textarea") {
    return (
      <div className={clsx("flex gap-2", props.className)}>
        {props.icon}
        <textarea
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder || "Write markdown..."}
          className="w-full min-h-30 p-3 border border-gray-300  rounded-lg bg-white  focus:outline-none focus:ring-2 focus:ring-(--primary) resize-y"
        />
      </div>
    );
  }

  // Simple input mode (default)
  return (
    <div className={clsx("flex items-center gap-2", props.className)}>
      {props.icon && <div className="shrink-0">{props.icon}</div>}
      <input
        className="border bg-white border-gray-300 rounded px-2 py-1 grow"
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
      />
    </div>
  );
}

import { useField } from "formik";

function CustomSelect({ label, options, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="input_div">
      <label>{label}</label>
      <div className="grid w-1/2" style={{ gridTemplateRows: "1fr 0" }}>
        <select
          {...field}
          {...props}
          className={meta.touched && meta.error ? "input-error" : ""}
        />

        {meta.touched && meta.error && (
          <span className="error capitalize"> {meta.error} </span>
        )}
      </div>
    </div>
  );
}

export default CustomSelect;

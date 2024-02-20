import { useField } from "formik";

function CustomTextArea({ label, type, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div
      className={
        type === "file"
          ? "col-span-2 justify-left pl-7 flex items-center"
          : "input_div"
      }
    >
      <label>{label}</label>
      <div
        className="grid w-1/2 login_div"
        style={{ gridTemplateRows: "1fr 0" }}
      >
        <textarea
          type={type}
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

export default CustomTextArea;

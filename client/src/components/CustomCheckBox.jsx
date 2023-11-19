import { useField } from "formik";

function CustomCheckBox({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="input_div">
      <label>{label}</label>
      <div className="flex w-1/2">
        <input {...field} {...props} />
      </div>
    </div>
  );
}

export default CustomCheckBox;

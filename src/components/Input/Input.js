import React from "react";
import css from "./Input.module.css";

export const Input = React.forwardRef(({ onChange, value }, ref) => {
  const handleChange = evt => onChange(evt.target.value);

  return (
    <div className={css.input}>
      <input ref={ref} type="text" onChange={handleChange} value={value} />
      <label>New task</label>
    </div>
  );
});

import React from "react";
import css from "./Input.module.css";

export const Input = React.forwardRef(({ onChange, value }, ref) => (
  <div className={css.input}>
    <input ref={ref} type="text" onChange={onChange} value={value} />
    <label>New task</label>
  </div>
));

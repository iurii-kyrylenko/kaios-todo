import React from "react";
import css from "./Softkey.module.css";

export const Softkey = ({ left, center, right }) => {
  return (
    <div className={css.softkey}>
      <label className={css.left}>{left}</label>
      <label className={css.center}>{center}</label>
      <label className={css.right}>{right}</label>
    </div>
  );
};

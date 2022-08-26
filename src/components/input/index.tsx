import React, { ChangeEvent } from "react";
import styles from "./Input.module.scss";

interface Props {
   label: string;
   type: string;
   inputName: string;
   value: string;
   placeholder: string;
   handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
   minLength?: number;
   required?: boolean;
}

function Input({
   label,
   type,
   inputName,
   value,
   placeholder,
   minLength,
   required,
   handleChange,
}: Props) {
   return (
      <>
         <label htmlFor={inputName} className={styles.label}>
            {label}
         </label>
         <input
            className={styles.inputField}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            minLength={minLength}
            required={required}
         ></input>
      </>
   );
}

export default Input;

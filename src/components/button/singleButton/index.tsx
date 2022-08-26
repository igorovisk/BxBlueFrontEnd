import React from "react";
import styles from "./Button.module.scss";

interface Props {
   handleClick?: () => void;
   type: string;
   children: string;
}
function Button({ children, handleClick }: Props) {
   return (
      <button onClick={handleClick} className={styles.button}>
         {children}
      </button>
   );
}

export default Button;

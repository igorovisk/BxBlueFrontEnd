import React from "react";
import styles from "./TextSection.module.scss";

interface Props {
   title?: string;
   upperText?: string;
   text?: string;
   blueText?: boolean;
   customMargin?: string;
}

function TextSection({
   title,
   text,
   upperText,
   blueText,
   customMargin,
}: Props) {
   return (
      <div
         style={{ margin: customMargin }}
         className={`${styles.textSection} ${blueText ? styles.blueText : ""}`}
      >
         {title && <h2>{title}</h2>}
         {upperText && <p>{upperText}</p>}
         {text && <p>{text}</p>}
      </div>
   );
}

export default TextSection;

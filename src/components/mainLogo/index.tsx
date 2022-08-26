import React from "react";

import styles from "./MainLogo.module.scss";

interface Props {
   src?: string;
}

function MainLogo({ src }: Props) {
   const logo = src;

   const logoSize = src ? "186px" : "142px";
   return (
      <div className={styles.mainLogo}>
         <img src={logo} width={logoSize} alt="logo" />
      </div>
   );
}

export default MainLogo;

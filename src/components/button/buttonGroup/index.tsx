import React, { ReactNode } from "react";
import { JsxElement } from "typescript";
import styles from "./ButtonGroup.module.scss";

interface Props {
   children: ReactNode;
}

function ButtonGroup({ children }: Props) {
   return <div className={styles.buttonGroup}>{children}</div>;
}

export default ButtonGroup;

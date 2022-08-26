import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { storageToken } from "src/contexts/authContext";
import styles from "./Summary.module.scss";

interface CardProps {
   pokemonId?: number;
   pokemonName?: string;
   pokemonImage?: string;
   baseExperience?: number;
   btcCurrencyAtAcquisition?: number;
   tradeValueAtOperationDate?: number;
   transactionId?: string;
   acquisitionUSDValue?: number;
   acquisitionDate?: Date;

   sellDate?: Date;
   sellUSDValue?: number;
}

function SummaryItem({
   pokemonId,
   pokemonName,
   tradeValueAtOperationDate,
   transactionId,
   acquisitionUSDValue,
   acquisitionDate,
   baseExperience,
   btcCurrencyAtAcquisition,
   sellUSDValue,
   sellDate,
}: CardProps) {
   function formatDate(date: any) {
      const newDate = new Date(date);
      const formattedDate = newDate && newDate?.toLocaleDateString();
      return formattedDate;
   }

   return (
      <div className={styles.summaryContainer}>
         <span className={styles.list}>
            <ul>
               <li>
                  <span>
                     <>
                        <p>Pokemon: </p>
                        {pokemonName?.toUpperCase()}
                     </>
                  </span>
               </li>
               <li>
                  <span>
                     <>
                        <p>Valor da compra em dólares: : </p>
                        {acquisitionUSDValue}
                     </>
                  </span>
               </li>
               <li>
                  <span>
                     <>
                        <p>Data da aquisição: </p>
                        {acquisitionDate}
                     </>
                  </span>
               </li>
               <li>
                  <span>
                     <>
                        <p>Tipo da transação:</p>
                        {sellDate ? "Venda" : "Compra"}
                     </>
                  </span>
               </li>
               {sellDate && (
                  <li>
                     <span>
                        <>
                           <p>Data da venda:</p>
                           {sellDate && formatDate(sellDate)}
                        </>
                     </span>
                  </li>
               )}
            </ul>
         </span>
      </div>
   );
}

export default SummaryItem;

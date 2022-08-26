import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "../button/singleButton";
import styles from "./Summary.module.scss";
import { storageToken } from "../../contexts/authContext";

import SummaryItem from "./SummaryItem";

function Summary() {
   const [filter, setFilter] = useState<string>("all");
   const [transactions, setTransactions] = useState<
      [
         {
            baseExperience?: number;
            acquisitionUSDValue?: number;
            btcCurrencyAtAcquisition?: number;
            pokemonId?: number;
            pokemonName?: string;
            sellDate?: Date;
            acquisitionDate?: Date;
            sellUSDValue: number;
         }
      ]
   >();

   const token = storageToken();

   useEffect(() => {
      (async function () {
         await axios
            .get("http://localhost:3000/transactions", {
               headers: {
                  ["x-access-token"]: token,
               },
            })
            .then((res) => {
               setTransactions(res.data);
            });
      })();
   }, []);

   const buyTransactions = transactions?.filter((transaction) => {
      return !transaction.sellDate;
   });

   const sellTransactions = transactions?.filter((transaction) => {
      return transaction.sellDate;
   });

   return (
      <div className={styles.container}>
         <span className={styles.buttonGroup}>
            <button
               className={styles.filterButton}
               onClick={() => setFilter("buy")}
            >
               Ver compras
            </button>
            <button
               className={styles.filterButton}
               onClick={() => setFilter("sell")}
            >
               Ver vendas
            </button>
            <button
               className={styles.filterButton}
               onClick={() => setFilter("all")}
            >
               Todas operações
            </button>
         </span>

         <ul className={styles.cardList}>
            {filter === "buy" &&
               buyTransactions?.map((transaction) => {
                  return (
                     <SummaryItem
                        pokemonId={transaction?.pokemonId}
                        pokemonName={transaction?.pokemonName}
                        baseExperience={transaction?.baseExperience}
                        acquisitionUSDValue={transaction?.acquisitionUSDValue}
                        acquisitionDate={transaction?.acquisitionDate}
                        btcCurrencyAtAcquisition={
                           transaction?.btcCurrencyAtAcquisition
                        }
                        sellUSDValue={transaction?.sellUSDValue}
                        sellDate={transaction?.sellDate}
                     />
                  );
               })}
            {filter === "sell" &&
               sellTransactions?.map((transaction) => {
                  return (
                     <SummaryItem
                        pokemonId={transaction?.pokemonId}
                        pokemonName={transaction?.pokemonName}
                        baseExperience={transaction?.baseExperience}
                        acquisitionUSDValue={transaction?.acquisitionUSDValue}
                        acquisitionDate={transaction?.acquisitionDate}
                        btcCurrencyAtAcquisition={
                           transaction?.btcCurrencyAtAcquisition
                        }
                        sellUSDValue={transaction?.sellUSDValue}
                        sellDate={transaction?.sellDate}
                     />
                  );
               })}
            {filter === "all" &&
               transactions?.map((transaction) => {
                  return (
                     <SummaryItem
                        pokemonId={transaction?.pokemonId}
                        pokemonName={transaction?.pokemonName}
                        baseExperience={transaction?.baseExperience}
                        acquisitionUSDValue={transaction?.acquisitionUSDValue}
                        acquisitionDate={transaction?.acquisitionDate}
                        btcCurrencyAtAcquisition={
                           transaction?.btcCurrencyAtAcquisition
                        }
                        sellUSDValue={transaction?.sellUSDValue}
                        sellDate={transaction?.sellDate}
                     />
                  );
               })}
         </ul>
      </div>
   );
}

export default Summary;

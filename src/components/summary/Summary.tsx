import { useState } from "react";
import axios from "axios";

import styles from "./Summary.module.scss";
import { storageToken } from "../../contexts/authContext";

import SummaryItem from "./SummaryItem";
import { useEffectOnce } from "usehooks-ts";

function Summary() {
   const [filter, setFilter] = useState<string>("all");
   const [isLoading, setIsLoading] = useState<boolean>(true);
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

   async function getTransactions() {
      const res = await axios.get(
         "https://bxmonbackend.herokuapp.com/transactions",
         {
            headers: {
               ["x-access-token"]: token,
            },
         }
      );
      setIsLoading(false);
      setTransactions(res.data);
   }

   useEffectOnce(() => {
      getTransactions();
   });

   const buyTransactions = transactions?.filter((transaction) => {
      return !transaction.sellDate;
   });

   const sellTransactions = transactions?.filter((transaction) => {
      return transaction.sellDate;
   });

   return !isLoading ? (
      <div className={styles.container}>
         <span className={styles.buttonGroup}>
            <button
               className={styles.filterButton}
               onClick={() => setFilter("buy")}
            >
               Meus pokémons
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
               Meus pokemons
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
   ) : (
      <span className={styles.loading}>
         {" "}
         <p>"Carregando negociações..."</p>{" "}
      </span>
   );
}

export default Summary;

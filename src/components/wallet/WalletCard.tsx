import axios from "axios";

import { useEffect, useState } from "react";
import { useEffectOnce } from "usehooks-ts";

import styles from "../card/Card.module.scss";

interface CardProps {
   pokemonId?: number;
   pokemonName?: string;
   pokemonImage?: string;
   baseExperience?: number;
   btcCurrencyAtAcquisition?: number;
   tradeValueAtOperationDate?: number;
   transactionId: string;
   acquisitionUSDValue?: number;
   acquisitionDate?: Date;
   handleSellSubmit: (payload: string) => void;
}

function WalletCard({
   pokemonId,
   pokemonName,
   transactionId,
   acquisitionUSDValue,
   acquisitionDate,
   baseExperience,
   handleSellSubmit,
}: CardProps) {
   const [isSold, setIsSold] = useState<boolean>(false);

   const [pokemonInfo, setPokemonInfo] = useState<{
      pokemonImage: string;
      pokemonCurrentValue: number;
   }>();

   async function handleSellTransaction() {
      handleSellSubmit(transactionId);
      setIsSold(true);
   }

   async function getPokemonInfo() {
      try {
         if (baseExperience !== undefined) {
            const res = await axios.post(
               `https://bxmonbackend.herokuapp.com/pokemons/`,
               {
                  id: pokemonId,
                  baseExperience: baseExperience,
               }
            );

            setPokemonInfo(res?.data);
         }
      } catch (err) {
         console.log(err, "ERR");
      }
   }

   const acquisitionDateString = new Date(
      acquisitionDate || ""
   ).toLocaleDateString();

   useEffect(() => {
      getPokemonInfo();
   }, [pokemonId]);

   return !isSold ? (
      <div className={styles.card}>
         <span className={styles.imageContainer}>
            <img src={pokemonInfo?.pokemonImage} alt="pokemon"></img>
         </span>
         <span className={styles.infoContainer}>
            <span className={styles.pokemonInformation}>
               <h3>{pokemonName?.toUpperCase()}</h3>
            </span>
            <span className={styles.moreInfo}>
               <span>
                  <h2>Adquirido em: </h2>
                  <p>{acquisitionDateString}</p>
               </span>
               <span>
                  <h2>Adquirido por (USD): </h2>
                  <p>{acquisitionUSDValue?.toFixed(7)} </p>
               </span>
            </span>
            <span className={styles.currentValue}>
               <p>Valor atual: {pokemonInfo?.pokemonCurrentValue.toFixed(7)}</p>
            </span>

            <span className={styles.actionButtonsContainer}>
               <button
                  onClick={handleSellTransaction}
                  className={`${styles.actionButton} ${styles.sell}`}
               >
                  $ Vender Pokemon
               </button>
            </span>
         </span>
      </div>
   ) : null;
}

export default WalletCard;

import axios from "axios";
import { sensitiveHeaders } from "http2";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { storageToken } from "src/contexts/authContext";
import styles from "../card/Card.module.scss";

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

   const [transactionIdState, setTransactionIdState] =
      useState<any>(transactionId);

   async function handleSellTransaction() {
      handleSellSubmit(transactionIdState);
      setIsSold(true);
   }

   useEffect(() => {
      (async function getPokemonInfo() {
         try {
            if (baseExperience !== undefined) {
               await axios
                  .post(`https://bxmonbackend.herokuapp.com/pokemons/`, {
                     id: pokemonId,
                     baseExperience: baseExperience,
                  })
                  .then((res) => {
                     setPokemonInfo(res?.data);
                  });
            }
         } catch (err) {
            console.log(err, "ERR");
         }
      })();
   }, []);

   const acquisitionDateString = new Date(
      acquisitionDate || ""
   ).toLocaleDateString();

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
               <p>Adquirido em: {acquisitionDateString}</p>
               <p>Adquirido por: {acquisitionUSDValue?.toFixed(4)} dólares</p>
            </span>
            <span className={styles.currentValue}>
               <p>Valor atual: {pokemonInfo?.pokemonCurrentValue.toFixed(4)}</p>
            </span>

            <span className={styles.actionButtonsContainer}>
               <button
                  onClick={handleSellTransaction}
                  className={`${styles.actionButton} ${styles.buy}`}
               >
                  $ Vender
               </button>
            </span>
         </span>
      </div>
   ) : null;
}

export default WalletCard;

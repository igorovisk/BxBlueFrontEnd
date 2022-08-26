import styles from "./Card.module.scss";

interface CardProps {
   handleBuySubmit: (payload: any) => void;
   pokemonId?: number;
   pokemonName?: string;
   pokemonImage?: string;
   pokemonValue?: string;
   pokemonCurrentValue?: number;
   types: string[];
}

function Card({
   pokemonId,
   pokemonName,
   pokemonImage,
   pokemonValue,
   pokemonCurrentValue,
   types,
   handleBuySubmit,
}: CardProps) {
   function handleBuyTransaction() {
      const payload = {
         baseExperience: pokemonValue,
         pokemonId,
         pokemonName: pokemonName,
      };
      handleBuySubmit(payload);
   }

   return (
      <div className={styles.card}>
         <span className={styles.imageContainer}>
            <img src={pokemonImage} alt="pokemon"></img>
         </span>
         <span className={styles.infoContainer}>
            <span className={styles.pokemonInformation}>
               <h3>{pokemonName?.toUpperCase()}</h3>
               <span className={styles.pokemonTypes}>
                  {types.map((type) => {
                     return <span>| {type} |</span>;
                  })}
               </span>
               <p>Valor do pokemon: U$ {pokemonCurrentValue?.toFixed(2)}</p>
            </span>

            <span className={styles.actionButtonsContainer}>
               <button
                  onClick={handleBuyTransaction}
                  className={`${styles.actionButton} ${styles.buy}`}
               >
                  $ Comprar
               </button>
            </span>
         </span>
      </div>
   );
}

export default Card;

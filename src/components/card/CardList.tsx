import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

import Button from "../button/singleButton";
import Card from "./Card";
import { storageToken } from "../../contexts/authContext";
import styles from "./CardList.module.scss";

interface Props {
   money: number;
   setMoney: Dispatch<SetStateAction<number>>;
}
function CardList({ money, setMoney }: Props) {
   const [pokemons, setPokemons] = useState<[]>();
   const [isLoading, setIsLoading] = useState<boolean>(true);

   async function getPokemons() {
      const res = await axios.get(
         "https://bxmonbackend.herokuapp.com/pokemons"
      );
      setPokemons(res.data.pokemonList);
      setIsLoading(false);
   }
   getPokemons();

   async function handleBuySubmit(payload: any) {
      const token = storageToken();

      const transactionResponse = await axios.post(
         "https://bxmonbackend.herokuapp.com/transactions/pokemon/buy",
         payload,
         {
            headers: {
               ["x-access-token"]: token,
            },
         }
      );

      const diff = money - transactionResponse.data.acquisitionUSDValue;
      const updatedMoney = money - diff;
      setMoney(() => updatedMoney);
   }

   return (
      <div className={styles.container}>
         {!isLoading ? (
            <ul className={styles.cardList}>
               {pokemons?.map(
                  (pokemon: {
                     id: number;
                     name: string;
                     image: string;
                     baseExperience: string;
                     pokemonValueInUSD: number;
                     types: string[];
                  }) => {
                     return (
                        <Card
                           key={pokemon.id}
                           handleBuySubmit={handleBuySubmit}
                           pokemonId={pokemon?.id}
                           types={pokemon?.types}
                           pokemonName={pokemon?.name}
                           pokemonImage={pokemon?.image}
                           pokemonValue={pokemon?.baseExperience}
                           pokemonCurrentValue={Number(
                              pokemon.pokemonValueInUSD
                           )}
                        />
                     );
                  }
               )}
            </ul>
         ) : (
            <span className={styles.loading}>Carregando...</span>
         )}
         <div className={styles.navigationPagesContainer}>
            <Button type="button">Página Anterior</Button>
            <Button type="button">Próxima Página</Button>
         </div>
      </div>
   );
}

export default CardList;

import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import Button from "../button/singleButton";
import styles from "../card/CardList.module.scss";
import { storageToken } from "../../contexts/authContext";
import WalletCard from "./WalletCard";
import { useEffectOnce } from "usehooks-ts";
import { toast, ToastContainer } from "react-toastify";

interface Props {
   money?: number;
   setMoney: Dispatch<SetStateAction<number>>;
}

function WalletCardList({ money, setMoney }: Props) {
   const token = storageToken();
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
            _id: string;
         }
      ]
   >();

   async function getTransactions() {
      const res = await axios.get(
         "https://bxmon-backend.onrender.com/transactions",
         {
            headers: {
               ["x-access-token"]: token,
            },
         }
      );

      setTransactions(res.data);
   }
   useEffectOnce(() => {
      getTransactions();
   });

   async function handleSellSubmit(transactionId: string) {
      const transactionResponse = await axios.post(
         "https://bxmon-backend.onrender.com/transactions/pokemon/sell",
         { transactionId },
         {
            headers: {
               ["x-access-token"]: token,
            },
         }
      );
      if (money) {
         const diff = money + transactionResponse.data.acquisitionUSDValue;
         setMoney(Number(diff));
      }
      toast.success("Pokémon vendido");
   }
   let filteredTransactions;
   if (transactions) {
      filteredTransactions = transactions?.filter(
         (transaction) => !transaction?.sellDate
      );
   }

   return (
      <div className={styles.container}>
         <ToastContainer></ToastContainer>
         <ul className={styles.cardList}>
            {filteredTransactions?.map((buyTransaction) => {
               return (
                  <WalletCard
                     handleSellSubmit={handleSellSubmit}
                     pokemonId={buyTransaction?.pokemonId}
                     pokemonName={buyTransaction?.pokemonName}
                     baseExperience={buyTransaction?.baseExperience}
                     acquisitionUSDValue={buyTransaction?.acquisitionUSDValue}
                     transactionId={buyTransaction._id}
                     acquisitionDate={buyTransaction?.acquisitionDate}
                     btcCurrencyAtAcquisition={
                        buyTransaction?.btcCurrencyAtAcquisition
                     }
                  />
               );
            })}
         </ul>
         <div className={styles.navigationPagesContainer}>
            <Button type="button">Página Anterior</Button>
            <Button type="button">Próxima Página</Button>
         </div>
      </div>
   );
}

export default WalletCardList;

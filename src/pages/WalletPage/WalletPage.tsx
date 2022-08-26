import Header from "../../components/header";
import Footer from "../../components/footer";
import TextSection from "../../components/textSection";
import MainLogo from "../../components/mainLogo";
import styles from "./WalletPage.module.scss";
import WalletCardList from "src/components/wallet/WalletCardList";
import { useEffect, useState } from "react";
import axios from "axios";
import { storageToken } from "src/contexts/authContext";

function WalletPage() {
   const token = storageToken();
   const [money, setMoney] = useState<number>(0);

   async function getMoney() {
      const res = await axios.get(
         "https://bxmonbackend.herokuapp.com/users/wallet",
         {
            headers: {
               ["x-access-token"]: token,
            },
         }
      );
      const money = res.data.money;
      setMoney(money);
   }
   getMoney();

   return (
      <div className={styles.WalletPageIndex}>
         <Header />

         <TextSection
            blueText={true}
            text="Esta é a sua Carteira de Investimentos"
         />
         <div className={styles.userInfo}>
            <h1>Você tem U$ {money.toFixed(2)}</h1>
         </div>
         <TextSection text="Seus pokemons adquiridos:" />

         <WalletCardList money={money} setMoney={setMoney} />

         <Footer />
      </div>
   );
}

export default WalletPage;

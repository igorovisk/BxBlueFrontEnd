import Header from "../../components/header";
import Footer from "../../components/footer";
import TextSection from "../../components/textSection";

import styles from "./WalletPage.module.scss";
import WalletCardList from "src/components/wallet/WalletCardList";
import { useEffect, useState } from "react";
import getUserMoneyFromDb from "src/utils/getMoney";

function WalletPage() {
   const [money, setMoney] = useState<number>(0);

   useEffect(() => {
      getUserMoneyFromDb().then((res) => {
         setMoney(res);
      });
   }, [money]);

   return (
      <div className={styles.WalletPageIndex}>
         <Header />

         <TextSection
            blueText={true}
            text="Esta é a sua Carteira de Investimentos"
         />
         <div className={styles.userInfo}>
            <h1>
               {isNaN(money)
                  ? "Calculando..."
                  : `Você tem U$ ${money.toFixed(2)}`}
            </h1>
         </div>
         <TextSection text="Seus pokemons adquiridos:" />

         <WalletCardList money={money} setMoney={setMoney} />

         <Footer />
      </div>
   );
}

export default WalletPage;

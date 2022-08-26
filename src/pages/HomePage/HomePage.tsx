import Header from "../../components/header";
import Footer from "../../components/footer";
import TextSection from "../../components/textSection";
import MainLogo from "../../components/mainLogo";
import styles from "./HomePage.module.scss";
import CardList from "../../components/card/CardList";
import { useState } from "react";

import MainLogoImage from "../../assets/images/BxMon.png";
import getUserMoneyFromDb from "src/utils/getMoney";
import { useEffectOnce } from "usehooks-ts";
function HomePage() {
   const [money, setMoney] = useState<number>(0);

   useEffectOnce(() => {
      getUserMoneyFromDb().then((res) => {
         setMoney(res);
      });
   });

   function getName() {
      try {
         const storageToken = localStorage?.getItem("tokenObj") || "";
         const userName = JSON.parse(storageToken)?.name || "";
         return userName;
      } catch (err) {
         console.log(err);
      }
   }
   const userName = getName();
   return (
      <div className={styles.HomePageIndex}>
         <Header />
         <p> ASDJASUIDHAUS</p>
         <div className={`${styles.userName} `}></div>
         <MainLogo src={MainLogoImage} />

         <TextSection
            blueText={true}
            text={`Bem vindo ao BxCoin - PokeCarteira, ${userName.toUpperCase()}! Veja aqui os pokemons disponíveis para compra!`}
         />
         <div className={styles.userInfo}>
            <h1>Você tem U$ {money?.toFixed(2)}</h1>
            <span></span>
         </div>
         <CardList money={money} setMoney={setMoney} />

         <Footer />
      </div>
   );
}

export default HomePage;

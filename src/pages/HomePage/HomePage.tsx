import Header from "../../components/header";
import Footer from "../../components/footer";
import TextSection from "../../components/textSection";
import MainLogo from "../../components/mainLogo";
import styles from "./HomePage.module.scss";
import CardList from "../../components/card/CardList";
import { useState } from "react";
import axios from "axios";
import { storageToken } from "../../contexts/authContext";
import MainLogoImage from "../../assets/images/BxMon.png";
function HomePage() {
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
      <div className={styles.HomePageIndex}>
         <Header />
         <MainLogo src={MainLogoImage} />

         <TextSection
            blueText={true}
            text="Bem vindo ao BxCoin - PokeCarteira! Veja aqui os pokemons disponíveis para compra!"
         />
         <div className={styles.userInfo}>
            <h1>Você tem U$ {money.toFixed(2)}</h1>
            <span></span>
         </div>
         <CardList money={money} setMoney={setMoney} />

         <Footer />
      </div>
   );
}

export default HomePage;

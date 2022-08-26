import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Button from "../../components/button/singleButton";
import TextSection from "../../components/textSection";
import MainLogoImage from "../../assets/images/BxMon.png";

import ButtonGroup from "../../components/button/buttonGroup";

import MainLogo from "../../components/mainLogo";
import styles from "./IndexPage.module.scss";
import pokemonImage from "../../assets/images/pokemonImage.png";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

function IndexPage() {
   const { isLogged } = useAuth();
   if (isLogged) window.location.href = "/home";
   return (
      <div className={styles.IndexPage}>
         <Header />
         <MainLogo src={MainLogoImage} />
         <TextSection
            title="Boas-vindas ao BxCoin,"
            text="A melhor plataforma de PokeInvestimentos!"
         />
         <ButtonGroup>
            <NavLink to={"/login"}>
               <Button type="button">Já tenho conta</Button>
            </NavLink>
            <NavLink to="/register">
               <Button type="button">Quero me cadastrar</Button>
            </NavLink>
         </ButtonGroup>

         <span className={styles.BottomImage}>
            <img src={pokemonImage} alt="pokemon " />
         </span>
         <Footer />
      </div>
   );
}

export default IndexPage;

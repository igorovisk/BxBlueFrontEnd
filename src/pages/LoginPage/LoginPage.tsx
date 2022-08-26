import Header from "../../components/header";
import Footer from "../../components/footer";
import TextSection from "../../components/textSection";
import MainLogoImage from "../../assets/images/BxMon.png";
import MainLogo from "../../components/mainLogo";
import styles from "./LoginPage.module.scss";
import LoginForm from "../../components/form/LoginForm";
import { useAuth } from "../../contexts/authContext";

function LoginPage() {
   const { isLogged } = useAuth();
   if (isLogged) window.location.href = "/home";
   return (
      <div className={styles.LoginPageIndex}>
         <Header />
         <MainLogo src={MainLogoImage} />
         <TextSection
            blueText={true}
            upperText="Já tem conta? Faça seu login"
         />
         <LoginForm />

         <Footer />
      </div>
   );
}

export default LoginPage;

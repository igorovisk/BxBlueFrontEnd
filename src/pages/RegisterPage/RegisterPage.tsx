import Header from "../../components/header";
import Footer from "../../components/footer";
import TextSection from "../../components/textSection";
import RegisterForm from "../../components/form/RegisterForm";
import MainLogo from "../../components/mainLogo";
import MainLogoImage from "../../assets/images/BxMon.png";
import { useAuth } from "../../contexts/authContext";
import styles from "./RegisterPage.module.scss";

function Register() {
   const { isLogged } = useAuth();
   if (isLogged) window.location.href = "/profile";

   return (
      <div className={styles.RegisterPageIndex}>
         <Header />
         <MainLogo src={MainLogoImage} />
         <TextSection
            blueText={true}
            upperText="Ainda não tem cadastro?"
            text="Então, antes de criar sua carteira, precisamos de alguns dados"
         />
         <RegisterForm></RegisterForm>

         <Footer />
      </div>
   );
}

export default Register;

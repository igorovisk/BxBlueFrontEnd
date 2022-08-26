import Header from "../../components/header";
import Footer from "../../components/footer";
import TextSection from "../../components/textSection";

import styles from "./ProfilePage.module.scss";
import ProfileForm from "../../components/form/profile/ProfileForm";
import Button from "../../components/button/singleButton";
import { useAuth } from "../../contexts/authContext";
import { useState } from "react";

function ProfilePage() {
   const auth = useAuth();
   const [loggedOut, setIsLoggedOut] = useState<boolean>();

   function handleLogout() {
      auth.handleLogout();
      setIsLoggedOut(true);
      window.location.href = "/";
   }

   return (
      <div className={styles.ProfilePageIndex}>
         <Header />

         <TextSection
            customMargin="120px auto 24px auto"
            blueText={true}
            text="Esse é o perfil dono de sua carteira digital BxMon."
         />
         <ProfileForm />
         <div className={styles.logoutButton}>
            <Button type="submit" handleClick={handleLogout}>
               Logout
            </Button>
         </div>

         <Footer />
      </div>
   );
}

export default ProfilePage;

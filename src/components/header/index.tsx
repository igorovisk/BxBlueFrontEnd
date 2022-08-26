import styles from "./Header.module.scss";
import HomeIcon from "../../assets/images/Casa.svg";

import UserAvatarIcon from "../../assets/images/UserAvatarIcon.svg";
import Wallet from "../../assets/images/Wallet.png";
import summaryIcon from "../../assets/images/report.png";
import { useAuth } from "../../contexts/authContext";
import { Link } from "react-router-dom";

function Header() {
   const authContext = useAuth();
   const { isLogged } = authContext;

   return (
      <header className={`${styles.header} `}>
         <nav>
            <ul>
               <li>
                  <a href="/" className={styles.homeIcon}>
                     <img src={HomeIcon} alt="Home Icon"></img>
                  </a>
               </li>
            </ul>

            <span>
               {isLogged && (
                  <Link to="/profile" className={styles.userAvatarIcon}>
                     <img
                        src={UserAvatarIcon}
                        alt="Profile Icon"
                        width={36}
                     ></img>
                  </Link>
               )}

               {isLogged && (
                  <Link to="/wallet" className={styles.userWalletIcon}>
                     <img src={Wallet} alt="Wallet Icon" width={36}></img>
                  </Link>
               )}
               {isLogged && (
                  <Link to="/summary" className={styles.userAvatarIcon}>
                     <img src={summaryIcon} alt="Profile Icon" width={36}></img>
                  </Link>
               )}
            </span>
         </nav>
      </header>
   );
}

export default Header;

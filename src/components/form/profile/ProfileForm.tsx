import { Link } from "react-router-dom";

import Button from "../../button/singleButton";

import styles from "./ProfileForm.module.scss";
import defaultAvatar from "../../../assets/images/UserAvatarIcon.svg";
import { ChangeEvent, useState } from "react";

function ProfilePage() {
   const [email, setEmail] = useState<string>();

   return (
      <form onSubmit={() => {}} className={styles.form}>
         <h4> Perfil</h4>
         <label htmlFor="profilePicture">Foto</label>
         <img src={defaultAvatar} onClick={() => {}} alt="profile" />
         <input
            className={styles.profileInput}
            id="profilePicture"
            name="profilePicture"
            type="image"
            alt="image"
         ></input>
         <p>Clique na foto para editar</p>
         <label htmlFor="name">Nome</label>
         <input
            id="name"
            name="name"
            type="email"
            value={email}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
               setEmail(ev.target.value)
            }
            placeholder="Insira seu nome completo"
         ></input>

         <Link to="/home">
            {/* REMOVER LINK APOS IMPLEMENTACAO DA FUNCAO */}
            <Button type="submit">Salvar</Button>
         </Link>
      </form>
   );
}

export default ProfilePage;

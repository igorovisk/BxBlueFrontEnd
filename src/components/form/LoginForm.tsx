import { ChangeEvent, FormEvent, useState } from "react";

import { useAuth } from "../../contexts/authContext";

import Button from "../button/singleButton";
import Input from "../input/index";
import styles from "./Form.module.scss";

function LoginForm() {
   const context = useAuth();

   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");

   function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
      setEmail(event.target.value);
   }

   function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
      setPassword(event.target.value);
   }

   function handleLogin(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      context.handleLogin(email, password);
   }

   return (
      <form onSubmit={(event) => handleLogin(event)} className={styles.form}>
         <Input
            inputName="email"
            type="email"
            label="Email"
            value={email}
            placeholder="Email"
            handleChange={handleEmailChange}
         />

         <Input
            inputName="password"
            type="password"
            label="Senha"
            value={password}
            placeholder="Senha"
            handleChange={handlePasswordChange}
         />

         <Button type="submit">Confirmar</Button>
      </form>
   );
}

export default LoginForm;

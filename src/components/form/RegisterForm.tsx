import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../button/singleButton";
import Input from "../input/index";
import styles from "./Form.module.scss";
import Modal from "react-modal";
import axios, { AxiosResponse } from "axios";

function RegisterForm() {
   const [email, setEmail] = useState<string>("");
   const [name, setName] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
   const [renderPasswordWarning, setRenderPasswordWarning] =
      useState<boolean>(false);
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [alreadyRegisteredEmail, setAlreadyRegisteredEmail] =
      useState<boolean>(false);
   const [modalText, setModalText] = useState<string>("");
   function closeModalAndClearInputFields() {
      setEmail("");
      setName("");
      setPassword("");
      setPasswordConfirmation("deposit");
   }

   function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
      setAlreadyRegisteredEmail(false);
      setEmail(event.target.value);
   }

   const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (password !== passwordConfirmation) {
         setRenderPasswordWarning(true);
         return;
      }

      const newUser = {
         email: email,
         name: name,
         password: password,
      };
      try {
         const addUserToDatabase = await axios
            .post("https://bxmonbackend.herokuapp.com/users/", newUser)
            .then((res) => {
               setModalText("Usuário registrado com sucesso :D");
               setIsOpen(true);
               closeModalAndClearInputFields();
            });
      } catch (err: any) {
         if (err.response.data.error.includes("email")) {
            setModalText("Email inválido.");
            setIsOpen(true);
            return;
         }
         setModalText("Usuário já registrado :(");
         setIsOpen(true);
      }

      closeModalAndClearInputFields();
   };

   return (
      <>
         <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            overlayClassName="react-modal-overlay"
            className="react-modal-content react-modal-content-animation "
         >
            {modalText}
         </Modal>
         <form onSubmit={handleFormSubmit} className={styles.form}>
            <Input
               inputName="email"
               type="email"
               label="Email"
               value={email}
               placeholder="Escolha o seu melhor email"
               handleChange={handleEmailChange}
               required={true}
            ></Input>
            {alreadyRegisteredEmail && <p>Email já cadastrado</p>}
            <Input
               inputName="username"
               type="text"
               label="Nome"
               value={name}
               placeholder="Digite seu nome completo"
               handleChange={(ev: ChangeEvent<HTMLInputElement>) =>
                  setName(ev.target.value)
               }
               required={true}
            ></Input>
            <Input
               inputName="password"
               type="password"
               label="Senha"
               value={password}
               placeholder="Crie uma senha"
               handleChange={(ev: ChangeEvent<HTMLInputElement>) =>
                  setPassword(ev.target.value)
               }
               minLength={6}
               required={true}
            ></Input>
            {renderPasswordWarning && <p>Senhas não conferem.</p>}
            <Input
               inputName="passwordConfirmation"
               type="password"
               label="Confirme sua senha"
               value={passwordConfirmation}
               placeholder="Repita a sua senha criada acima"
               handleChange={(ev: ChangeEvent<HTMLInputElement>) =>
                  setPasswordConfirmation(ev.target.value)
               }
               required={true}
               minLength={6}
            ></Input>
            <Button type="submit">Confirmar</Button>
         </form>
      </>
   );
}

export default RegisterForm;

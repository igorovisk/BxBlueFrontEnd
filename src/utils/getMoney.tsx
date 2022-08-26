import axios from "axios";

import { storageToken } from "src/contexts/authContext";

const token = storageToken();

async function getUserMoneyFromDb() {
   const res = await axios.get(
      "https://bxmonbackend.herokuapp.com/users/wallet",
      {
         headers: {
            ["x-access-token"]: token,
         },
      }
   );
   const money = res.data.money;
   return money;
}

export default getUserMoneyFromDb;

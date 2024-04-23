const { v4: uuidv4 } = require("uuid");

class UserDTO {
    constructor({ user_id, user_email, user_password, user_tipo}, criar=false ) {
      this.setEmail(user_email);
      if(criar){
        this.setPassword(user_password);
      } else {
        this.user_password = user_password;
      }
    }
     
   

    setEmail(user_email) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(user_email)) throw new Error("Invalid email format");
        this.user_email = user_email;
    }

    setPassword(password) {
        const conterCarEsp = /[!@#$%^&*]/;
        if (password.length < 8)
            throw new Error("A senha deve ter ao menos 8 caracteres");
            if (!/[A-Z]/.test(password)){
            throw new Error ("A Senha deve conter uma letra maiúscula"); 
            }
            if (!/\d/.test(password))
            throw new Error("A senha deve ter ao menos um número");

    }
}
module.exports = UserDTO;

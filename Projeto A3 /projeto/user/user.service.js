const { v4: uuidv4 } = require("uuid");
const User = require("./user.entity.js");
const UserDTO = require("./user.dto.js");
const { GenericException } = require("../generic-exception.js");

const users = [
  {
    user_id: uuidv4(),
    user_email: "teste@teste.com",
    user_password: "123456",
    user_tipo: "admin"
  },
  {
    user_id: uuidv4(),
    user_email: "teste2@teste.com",
    user_password: "123456",
    user_tipo: "cliente"
  },
];

class UserService {

  // recuperarSenha(user_email){
  //  não sei =\
  //  envia código por email
  //}
  login(user_email, user_password) {
    const usuario = users.find((user) => user.user_email === user_email);
    if (usuario <= -1) return false;
    if(usuario.user_password === user_password && user_tipo==="cliente"){
      //redireciona para tela padrão
      return true;
    } else if (usuario.user_password === user_password && user_tipo==="admin"){
      //redireciona para tela de administrador do app
      return true;
    } else{
      return false;
    }
  } 
  findOne(id) {
    return users.find((user) => user.id === id);
  }

  findAll() { 
    return users.map((user) => new UserDTO(user));
  }

  create(UserDTO) {
    users.push(UserDTO);
    return newUser;
  }

  update(UserDTO) {
    const userIndex = users.findIndex((user) => user.id === UserDTO.id);
    if (userIndex === -1) return null;
    users[userIndex] = UserDTO;
    return UserDTO;
  }

  remove(id) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }
}


module.exports = UserService;

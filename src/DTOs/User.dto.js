class UserDTO {
    constructor(user) {
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email = user.email;
      this.phone = user.phone;
      this.age = user.age;
      this.rol = user.rol
      this.cart = user.cart
    }
  }
  
  export default UserDTO;
  
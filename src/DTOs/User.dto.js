class UserDTO {
    constructor(user) {
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email = user.email;
      this.phone = user.phone ? user.phone.replace(/[-\s]/g, "") : "";
      this.age = user.age;
      this.rol = user.rol

    }
  }
  
  export default UserDTO;
  
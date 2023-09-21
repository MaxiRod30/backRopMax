const authorization = (roles) => {
  
    return async (req, res, next) => {

      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const { user } = req.user;

      if (!roles.includes(user.rol)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    };
  };
  
  export default authorization;
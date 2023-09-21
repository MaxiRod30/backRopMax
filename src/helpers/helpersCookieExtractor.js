export const cookieExtractor = (req) => {
    let token = null;

    if (req && req.cookies) {
      token = req.cookies["authToken"];
    }
    return token;
  };
  
  export const cookieExtractorRestore = (req) => {
    let token = null;

    if (req && req.cookies) {
      token = req.cookies["restore"];
    }
    return token;
  };

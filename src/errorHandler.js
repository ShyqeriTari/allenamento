export const notFound = (err, req, res, next) => {
    if (err && err.status === 400) {
      res
        .status(400)
        .send({ message: err.message || "Not found!", errors: err.errors || [] });
    }
    next();
  };
  

  export const forbidden = (err, req, res, next) => {
    if (err && err.status === 403) {
      res.status(403).send({ message: err.message || "Forbidden!" });
    }
    next();
  };

export const errorHandler = (err, req, res, next) => {
    if(err) {
if(!req.headerSent){
        res.status(err.status || 500).send( {message: err.message || "something went wrong!"})
}
    }
    next()
}
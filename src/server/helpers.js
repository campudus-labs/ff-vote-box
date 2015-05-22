function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.writeHead(401, {'content-type' : 'text/plain'});
    res.end('Login required');
  }
};

export default {
  loggedIn: loggedIn
};
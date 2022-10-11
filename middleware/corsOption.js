module.exports = {
  origin: (origin, callback) => {
    const whitelist = ['http://localhost:3000'];
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

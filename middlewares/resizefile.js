const Jimp = require("jimp");

const resizefile = async (req, res, next) => {
  const { path: uploudDir } = req.file;
  await Jimp.read(uploudDir)
    .then((avatar) => {
      return avatar.resize(250, 250).write(uploudDir);
    })
    .catch((err) => {
      console.error(err);
    });
  next();
};

module.exports = resizefile;

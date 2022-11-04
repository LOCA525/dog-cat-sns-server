const models = require("../../models");

exports.upload_image = async (req, res) => {
  try {
    const uArr = (await req.file) ? req.file.path.split("/") : [""];
    const filter = req.body.filter ? req.body.filter : "normal";

    const response = await models.Photo.create({
      url: uArr[uArr.length - 1],
      filter,
    });

    res.json(response);
  } catch (e) {
    res.send(e);
  }
};

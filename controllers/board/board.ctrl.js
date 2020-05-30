const models = require('../../models')

exports.get_board = async (req, res) => {
  const Board = await models.Board.findAll({})
  res.send(Board);

}


exports.post_board = (req, res) => {

  if (req.body.title === '' || req.body.description === '') {
    res.send(404, '내용을 입력해주세요')
    return
  }

  models.Board.create({
    ...req.body,
  }).then(data => {
    res.send(200, data)
  })
}

exports.get_edit = (req, res) => {
  models.Board.findOne(
    {
      where: { id: req.params.id }
    }
  ).then((Board) => {
    res.send(Board);
    console.log(Board);

  });

}

exports.post_edit = (req, res) => {
  models.Board.update(
    {
      title: req.body.title,
      description: req.body.description
    },
    {
      where: { id: req.params.id }
    }
  ).then(() => {
    res.send(200)
  });

}


exports.get_delete = (req, res) => {
  models.Board.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send(200)
  });

}
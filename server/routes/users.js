var express = require("express");
var router = express.Router();
var models = require("../models");
var path = require("path");
const { log } = require("console");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const users = await models.User.findAll();
    res.json(users);
  } catch (e) {
    res.json({ e });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const user = await models.User.create({
      name: req.body.name,
      phone: req.body.phone,
    });
    res.json(user);
  } catch (e) {
    res.json({ e });
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const user = await models.User.update(
      {
        name: req.body.name,
        phone: req.body.phone,
      },
      {
        where: {
          id,
        },
        returning: true,
        plain: true,
      }
    );
    res.json(user[1]);
  } catch (e) {
    res.json({ e });
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const user = await models.User.destroy({
      where: {
        id,
      },
    });
    res.json(user);
  } catch (e) {
    res.json({ e });
  }
});

router.put("/:id/avatar", async function (req, res, next) {
  try {
    const id = req.params.id;
    const picture = req.files && req.files.avatar;

    if (!picture) {
      return res.status(400).json({ error: "No avatar file provided." });
    }

    const pictureName = `${Date.now()}-${picture.name}`;
    const uploadPath = path.join(
      __dirname,
      "..",
      "..",
      "front-end",
      "public",
      "images",
      pictureName
    );

    picture.mv(uploadPath, async function (err) {
      if (err) return res.status(500).send(err);
      // Save the file path or identifier in the database (assuming 'picturePath' is the field name)
      const user = await models.User.update(
        {
          picturePath: uploadPath,
          avatar: pictureName,
          // If using an identifier instead of file path, use something like:
          // pictureIdentifier: pictureName,
        },
        {
          where: {
            id,
          },
          returning: true,
          plain: true,
        }
      );
      // Send the picture path or identifier in the response
      res.json(user[1]); // Or 'user[1].pictureIdentifier' if using an identifier
    });
  } catch (e) {
    console.log(e);
    // console.log("req.avatar", picture);
    res.json({ e });
  }
});

module.exports = router;

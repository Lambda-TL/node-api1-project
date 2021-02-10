const router = require("express").Router();
const Users = require("./model");

//returns an array of users
router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

//creates a user using the information sent inside the request body
router.post("/", (req, res) => {
  let new_user = req.body;

  if (new_user.name && new_user.bio) {
    Users.insert(new_user)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  }
});

//returns the user object with the specified id
router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

//removes the user with the specified id and returns the deleted user
router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: " The user with the specified ID does not exist" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

//updates the user with the specified id using data from the request body. Returns the modified user
router.put("/:id", (req, res) => {
  let edits = req.body;

  if (edits.bio && edits.name) {
    Users.update(req.params.id, edits)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" });
        }
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "The user information could not be modified" });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  }
});

module.exports = router;

const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers); //Used when we need to chain requests
//protect is visited first before going on to find all Users in the above line of code
router.post("/login", authUser);

module.exports = router;

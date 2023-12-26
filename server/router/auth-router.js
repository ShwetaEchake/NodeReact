const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const {signupSchema,loginSchema} = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');
const authMiddleware = require('../middlewares/auth-middleware')
const contactForm = require("../controllers/contact-controller");


router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(validate(loginSchema),authcontrollers.login);
router.route("/contact").post(contactForm);

router.route("/user").get(authMiddleware,authcontrollers.user);




module.exports = router;
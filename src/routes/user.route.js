const express = require("express");
const validate = require("../middlewares/validate");

const {
            signinValidation,
            loginValidation,
        } = require("../validators/user.validator");

        const {
    createUser, 
    loginUser
} = require("../controllers/user.controller");

const router = express.Router();

// PUBLIC ROUTES
router.post("/signin", validate(signinValidation),createUser );

router.post("/login", validate(loginValidation), loginUser);

// export router
module.exports = router;

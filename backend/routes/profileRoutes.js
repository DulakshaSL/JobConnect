const express = require("express");
const router = express.Router();
const multer = require("multer");
const profileController = require("../controllers/profileController");

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Route to get profile details
router.get("/profile", profileController.getProfile);

// Route to update profile picture
router.post("/profile/upload", upload.single("profilePicture"), profileController.updateProfilePicture);

module.exports = router;

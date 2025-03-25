const Profile = require("../models/Profile");

// Get profile by ID
async function getProfile(req, res) {
    try {
        const jobSeekerId = req.session.jobSeekerId;

        if (!jobSeekerId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Fetch profile and job roles (experience data)
        const profile = await Profile.getProfileById(jobSeekerId);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Return the profile data including job roles
        res.status(200).json(profile);
    } catch (error) {
        console.error("Error getting profile:", error);
        res.status(500).json({ message: "Server error" });
    }
}

// Update profile picture
async function updateProfilePicture(req, res) {
    try {
        const jobSeekerId = req.session.jobSeekerId;

        if (!jobSeekerId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = req.file.filename;

        await Profile.updateProfilePicture(jobSeekerId, filePath);

        res.status(200).json({ message: "Profile picture updated successfully" });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getProfile,
    updateProfilePicture,
};

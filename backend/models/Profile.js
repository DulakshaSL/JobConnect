const pool = require("../config/db");

async function getProfileById(jobSeekerId) {
    // Fetch the basic profile information
    const [profileRows] = await pool.query(
        "SELECT * FROM jobseekers WHERE id = ?",
        [jobSeekerId]
    );

    if (!profileRows[0]) {
        return null; // Return null if no profile is found
    }

    const profile = profileRows[0];

    // If profile picture exists, convert the path to an accessible URL
    if (profile.profile_picture) {
        profile.profile_picture = `http://localhost:5000/uploads/${profile.profile_picture}`;
    }

    // Fetch job roles and experience data for the job seeker
    const [jobRolesRows] = await pool.query(
        "SELECT role_name, years_of_experience FROM job_roles WHERE job_seeker_id = ?",
        [jobSeekerId]
    );

    // Map the job roles data
    profile.job_roles = jobRolesRows.map(role => ({
        role_name: role.role_name,
        years_of_experience: role.years_of_experience,
    }));

    return profile;
}

// Add this new optimized method specifically for ratings
async function getProfilesForRatings(jobSeekerIds) {
    try {
        if (!jobSeekerIds.length) return {};
        
        const [profiles] = await pool.query(
            "SELECT id, first_name, sur_name, profile_picture FROM jobseekers WHERE id IN (?)",
            [jobSeekerIds]
        );

        return profiles.reduce((acc, profile) => {
            acc[profile.id] = {
                first_name: profile.first_name,
                sur_name: profile.sur_name,
                profile_picture: profile.profile_picture 
                    ? `http://localhost:5000/uploads/${profile.profile_picture}`
                    : null
            };
            return acc;
        }, {});
    } catch (error) {
        console.error("Error fetching profiles for ratings:", error);
        throw error;
    }
}

async function updateProfilePicture(jobSeekerId, filePath) {
    await pool.query(
        "UPDATE jobseekers SET profile_picture = ? WHERE id = ?",
        [filePath, jobSeekerId]
    );
}

module.exports = {
    getProfileById,
    updateProfilePicture,
    getProfilesForRatings,
};

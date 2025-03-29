import { Company } from "../models/company.model.js";
import { User } from "../models/user.model.js";

export const searchEntities = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({
                message: "Search query is required.",
                success: false
            });
        }

        // Perform a case-insensitive search in both Companies and Users
        const companies = await Company.find({ name: { $regex: query, $options: "i" } });
        const users = await User.find({ fullname: { $regex: query, $options: "i" } });

        const results = [...companies, ...users];

        if (results.length === 0) {
            return res.status(404).json({
                message: "No matching records found.",
                success: false
            });
        }

        return res.status(200).json({
            results,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

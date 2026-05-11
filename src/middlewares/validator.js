import { ZodError } from 'zod';

const validate = (schema) => (req, res, next) => {
    try {
        // req.body lai parse garne
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            // ZodError lai readable format ma lina .format() use garnus
            const formattedError = error.format();
            
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: formattedError
            });
        }
        
        // Yadi aru kunai error aayo bhane (Unexpected)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default validate;
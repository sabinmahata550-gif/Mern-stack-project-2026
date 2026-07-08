import { ZodError } from 'zod';

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const formattedError = error.format();

            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: formattedError
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export default validate;
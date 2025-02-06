export const errorHandler = (error, res, status = 500, message = 'Server error') => {
    console.error(error);
    return res.status(status).json({ error: message });
};

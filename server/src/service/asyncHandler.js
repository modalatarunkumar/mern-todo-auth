

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
        
    } catch (error) {
        res.status(error.message || 500).json({
            success: false,
            message: error.message || "error"
        })
    }
}

export default asyncHandler;
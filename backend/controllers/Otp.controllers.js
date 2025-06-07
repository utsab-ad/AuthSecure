
export const LoginAdminOtp = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal Server Error". error.message]
        })
    }
}

export const LoginClientOtp = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal Server Error". error.message]
        })
    }
}
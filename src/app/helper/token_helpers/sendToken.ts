export const sendToken = (user: any, expiryTime?: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            const generateJWTToken = user.generateAuthToken(expiryTime);
            const generateRefreshToken = user.generateRefreshToken();

            let response = {
                phone: user.phone,
                accessToken: generateJWTToken,
                refreshToken: generateRefreshToken,
                user
            };
            console.log(response,'response');    
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    sendToken
};

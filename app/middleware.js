const auth = require('./services/auth.service');

module.exports = {
    authMiddleware: {
        isValidToken: (request, response, next) => {
            const token = auth.isValidToken(request.headers.authorization);
            if (token){
                next();
            }
            else{
                response.send({
                    success: false,
                    errorMessage: 'Unauthorized'
                });
            }
        }
    }
}
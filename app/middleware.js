const auth = require('./services/auth.service');

module.exports = {
    authMiddleware: {
        isValidToken: (request, response, next) => {
            const token = auth.isValidToken("token");
            if (token){
                next();
            }
            else{
                response.send('Unauthorized');
            }
        }
    }
}
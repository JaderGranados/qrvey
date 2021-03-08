module.exports = {
    isLogin: userId => {
        // Check if the user is login
        return true;
    },
    isValidToken: token => {
        // Check if token is valid
        if (!token){
            return false;
        }
        const localToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4ODczMTY2NjcsImlzcyI6ImxldmVsdXBzb2Z0LmNvbSIsImF1ZCI6ImxldmVsdXBzb2Z0LmNvbSJ9.7EDT9dnLAgcFXRsKmgcPw8BVieDUJFJuGvJ9t4JfwAI";

        return token == localToken;
    }
}
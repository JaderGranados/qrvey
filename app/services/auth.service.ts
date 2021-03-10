export module Auth {
    export class Services{
        public static isLogin = (userId: string): boolean => {
            // Check if the user is login
            return true;
        }
        public static isValidToken = (token?: string):boolean => {
            // Check if token is valid
            if (!token){
                return false;
            }
            const localToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4ODczMTY2NjcsImlzcyI6ImxldmVsdXBzb2Z0LmNvbSIsImF1ZCI6ImxldmVsdXBzb2Z0LmNvbSJ9.7EDT9dnLAgcFXRsKmgcPw8BVieDUJFJuGvJ9t4JfwAI";
    
            return token == localToken;
        }
    }
}
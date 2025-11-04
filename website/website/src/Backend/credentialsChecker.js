import sourceJson from "../../credentials.json";

export const credentialsChecker =  (username, password) => {
    console.log(username, password);
    try {
        const credentials = sourceJson;

        for (const user in credentials) {
            if ((username === credentials[user].username) && (password === credentials[user].password)) {
                return true;
            }
        }
        return false;
    } catch (e) {
        console.error(`Erreur pendant la récupération des credentials : ${e.message}`);
    }
}
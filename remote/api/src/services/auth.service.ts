import axios from "axios";
import { stringify } from "querystring";
const USE_MOCK = true;
export async function guacLogin(username: string, password: string) {

    if (USE_MOCK) {
        return {
            "authToken": "147713F85F23EF22309613F0B4658A2EEC1AD5605CAA609B2C5384924209768E",
            "username": "guacadmin",
            "dataSource": "mysql",
            "availableDataSources": [
                "mysql",
                "mysql-shared"
            ]
        };
    }

    const response = await axios.post(
        "http://ohmtest.kube.baac.or.th:8080/guacamole/api/tokens",
        new URLSearchParams({
            username,
            password,
            client: "c",
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
}

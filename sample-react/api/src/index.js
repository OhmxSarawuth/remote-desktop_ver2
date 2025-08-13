// server/index.ts
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/tokens', async (req, res) => {
    try {
        const response = await fetch('http://ohmtest.kube.baac.or.th:8080/guacamole/api/tokens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(req.body),
        });
        const data = await response.json();
        console.log(data)
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from Guacamole API' });
    }
});
app.get("/api/hosts", async (req, res) => {
    const authToken = req.headers["authorization"]?.split(" ")[1];
    const dataSource = req.headers["x-datasource"];

    if (!authToken || !dataSource) {
        return res.status(400).json({ error: "Missing authToken or dataSource" });
    }
    console.log("authToken" + authToken)
    try {

        const connectionsResponse = await fetch(
            `http://ohmtest.kube.baac.or.th:8080/guacamole/api/session/data/mysql/connections?token=${authToken}`
        );




        const connectionsData = await connectionsResponse.json();

        const hosts = Object.entries(connectionsData).map(
            ([connectionId, info], index) => ({
                id: index + 1,
                name: info.name,
                connectionId,
            })
        );

        res.json(hosts);
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ error: "Failed to fetch hosts from Guacamole API" });
    }
});


app.listen(3001, () => console.log('Backend running on http://localhost:3001'));

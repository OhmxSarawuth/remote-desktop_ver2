import React, { useEffect, useState } from "react";
import { getHosts ,openGuacamoleSession } from "./api";


function HostListPage({ token, username }) {
    const [hosts, setHosts] = useState([]);
    const [selectedHost, setSelectedHost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const dataSource = "mysql";

        async function fetchHosts() {
            try {
                const data = await getHosts(token, dataSource);
                setHosts(data);
            } catch (err) {
                setError(err.message);
            }
        }

        if (token) {
            fetchHosts();
        }
    }, [token]);

    return (
        <div style={{ padding: 20 }}>
            <h2>Welcome, {username}</h2>
            <h3>Select a Host:</h3>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {!hosts.length && !error && <p>Loading hosts...</p>}

            <ul>
                {hosts.map((host) => (
                    <li key={host.id}>
                        <button onClick={() => setSelectedHost(host)}>{host.name}</button>

                        <button onClick={() => openGuacamoleSession(host.connectionId, token)}>
                            Connect to {host.name}
                        </button>

                    </li>
                ))}
            </ul>

            {selectedHost && (

                <div style={{ marginTop: 20 }}>
                    <h4>Connected to: {selectedHost.name}</h4>
                    <iframe
                        title="GuacamoleSession"
                        width="100%"
                        height="600"
                        src={`http://ohmtest.kube.baac.or.th:8080/guacamole/#/client/${selectedHost.connectionId}?token=${token}`}
                    />
                </div>
            )}
        </div>
    );
}

export default HostListPage;

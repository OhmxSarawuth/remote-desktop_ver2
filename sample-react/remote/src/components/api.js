export async function loginToGuacamole(username, password) {
  const response = await fetch("http://localhost:3001/api/tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username, password }),
  });

  if (!response.ok) throw new Error("Login failed");

  const data = await response.json(); // ต้องเรียกใช้ .json()
  console.log(data);
  return data; // return authToken
}


export async function getHosts(authToken, dataSource) {
  const response = await fetch("http://localhost:3001/api/hosts", {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "X-DataSource": dataSource,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hosts");
  }

  return await response.json();
}


export const openGuacamoleSession = (connectionId, token) => {
  const guacamoleUrl = `http://ohmtest.kube.baac.or.th:8080/guacamole/#/client/${connectionId}?token=${token}`;
  window.open(guacamoleUrl, '_blank');
};


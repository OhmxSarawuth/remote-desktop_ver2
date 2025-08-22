import express from 'express';
import axios from 'axios';
import { stringify } from 'querystring';

const gucadRouter = express.Router();

const GUAC_URL = 'http://ohmtest.kube.baac.or.th:8080/guacamole';
const DATA_SOURCE = 'mysql';

gucadRouter.post('/getAuthToken', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing user or password in request body.' });
  }

  console.log(`username : ${username} , password : ${password}`);

  try {
    // สร้าง form body
    const form = new URLSearchParams();
    form.append('username', username);
    form.append('password', password);

    const response = await axios.post(`${GUAC_URL}/api/tokens`, form.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        dataSource: DATA_SOURCE
      }
    });
    console.log("success"+JSON.stringify(response.data));
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Error getting authToken:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to get authToken',
      details: error.response?.data || error.message
    });
  }
});

export default gucadRouter;

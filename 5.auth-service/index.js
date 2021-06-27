const express = require('express');
const jwt = require('jsonwebtoken')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const requireAuth = require('./Middleware/requireAuth');
const db = require('./db')
require('dotenv').config();

const app = express();


app.use(cors({ credentials: true, origin: 'http://localhost:3000', exposedHeaders: ["set-cookie"] }));

app.options('*', cors());
app.use(express.json());
app.use(cookieParser())
app.use('/auth', authRoutes)
app.use(requireAuth)

app.get('/me', (req, res) => {
  const { id } = req.user
  console.log(token)
  console.log(id)
  try {
    let sql = `SELECT * FROM Users WHERE id='${id}'`;
    db.query(sql, (err, result) => {
      console.log(result)
      if (err)
        return res.sendStatus(500)
      console.log(result)
      const userInfo = result[0]
      return res.status(200).send({ token, userInfo })
    })
  } catch {
    return res.sendStatus(403);
  }
})

app.get('/', (req, res) => {
  res.send('hello there');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT ?? 8000}/`);
});
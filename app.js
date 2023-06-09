const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const dbPath = './users.json';

// Створення файлу users.json, якщо він не існує
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

// GET /users
app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json(users);
});

// POST /users
app.post('/users', (req, res) => {
    const {name, age, gender} = req.body;

    // Валідація
    if (name.length < 3 || age < 0) {
        return res.status(400).json({error: 'Invalid user data'});
    }

    const users = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const newUser = {id: users.length + 1, name, age, gender};

    users.push(newUser);
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

    res.json(newUser);
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const userIndex = users.findIndex(user => user.id === Number(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({error: 'User not found'});
    }

    users.splice(userIndex, 1);
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

    res.json({message: 'User deleted'});
});

app.listen(3000, () => console.log('Server is running on port 3000'));

import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>CSE 340 Final Project</h1><p>Jonathan Binene: coming soon.</p>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
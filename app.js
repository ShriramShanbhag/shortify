import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener Service!');
});

export default app;
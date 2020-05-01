import app from './app';

const PORT = process.env.PORT || 3333;
const URL = process.env.APP_URL || 'http://localhost';
const ENDPOINT = `${URL}:${PORT}`;

app.listen(PORT, () => console.log(`🚀 Server started on ${ENDPOINT}`));

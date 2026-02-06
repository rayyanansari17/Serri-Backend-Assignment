import express from 'express';
import dotenv from 'dotenv';
import './utils/dbConnect.js';
import startfetcingVideos from './services/videoFetch.js';
import videoRoutes from './controllers/videoapi.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());


startfetcingVideos(1800000);  // Fetch videos every 30 minutes

app.use('/api', videoRoutes);

const buildPath = path.join(__dirname, 'dist');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
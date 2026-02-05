import express from 'express';
import dotenv from 'dotenv';
import './utils/dbConnect.js';
import startfetcingVideos from './services/videoFetch.js';
import videoRoutes from './controllers/videoapi.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.get('/', (req, res) => {
    try {
        res.status(200).send('API is running...');
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

startfetcingVideos(10000);  // Fetch videos every 10 seconds

app.use('/api', videoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
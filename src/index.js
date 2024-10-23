import express from 'express'
import showRequests from './utils/showRequests.js';
import crimeDataController from './controllers/crimeDataController.js';


const port = process.env.PORT || 3000
const app = express()

app.use(showRequests)

app.use(express.json())


app.use('/api/getCrimeData/', crimeDataController)

app.listen(port, () => {
    console.log('Server listening on port ' + port)
})
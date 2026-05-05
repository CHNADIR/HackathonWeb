import cors from 'cors'
import express from 'express'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

const places = [
  {
    id: 'm13',
    name: 'Entrée M13 Saint-Denis Université',
    category: 'Transport',
    accessibility: 'excellent',
    equipment: ['Rampe', 'Cheminement large', 'Signalétique visible'],
    status: 'fonctionnel',
    floor: 0,
  },
  {
    id: 'bat-a',
    name: 'Bâtiment A',
    category: 'Cours',
    accessibility: 'good',
    equipment: ['Ascenseur', 'Portes automatiques', 'Accueil proche'],
    status: 'fonctionnel',
    floor: 0,
  },
  {
    id: 'bu',
    name: 'Bibliothèque universitaire',
    category: 'Service',
    accessibility: 'excellent',
    equipment: ['Ascenseur', 'Places PMR', 'Espaces calmes'],
    status: 'fonctionnel',
    floor: 0,
  },
  {
    id: 'mde',
    name: 'Maison de l’étudiant',
    category: 'Service',
    accessibility: 'good',
    equipment: ['Rampe', 'Accueil handicap', 'Guichet accessible'],
    status: 'fonctionnel',
    floor: 0,
  },
]

const obstacles = [
  {
    id: 'obs-1',
    type: 'Ascenseur en panne',
    place: 'Bâtiment B1',
    severity: 'high',
    status: 'signalé',
  },
]

app.get('/api/places', (request, response) => {
  response.json(places)
})

app.get('/api/obstacles', (request, response) => {
  response.json(obstacles)
})

app.post('/api/obstacles', (request, response) => {
  const obstacle = {
    id: `obs-${Date.now()}`,
    status: 'signalé',
    ...request.body,
  }
  obstacles.push(obstacle)
  response.status(201).json(obstacle)
})

app.listen(port, () => {
  console.log(`BlueAcces API ready on http://localhost:${port}`)
})

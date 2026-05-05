import { useMemo, useState } from 'react'
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './App.css'

const profiles = [
  {
    id: 'motor',
    label: 'Mobilite reduite / fauteuil',
    shortLabel: 'Moteur',
    description: 'Trajet sans escaliers, avec rampes, ascenseurs et passages larges.',
    guidance: 'Evite les escaliers et privilegie les ascenseurs fonctionnels.',
    icon: 'M',
  },
  {
    id: 'visual',
    label: 'Aveugle / malvoyant',
    shortLabel: 'Visuel',
    description: 'Guidage vocal, reperes simples et annonces etape par etape.',
    guidance: 'Active les instructions vocales et simplifie les changements de direction.',
    icon: 'V',
  },
  {
    id: 'auditory',
    label: 'Sourd / malentendant',
    shortLabel: 'Auditif',
    description: 'Instructions visuelles claires, alertes ecrites et pictogrammes.',
    guidance: 'Remplace les alertes sonores par des messages visuels lisibles.',
    icon: 'A',
  },
  {
    id: 'cognitive',
    label: 'Handicap cognitif',
    shortLabel: 'Cognitif',
    description: 'Interface simplifiee, gros boutons et consignes courtes.',
    guidance: 'Limite le nombre d etapes et utilise un vocabulaire simple.',
    icon: 'C',
  },
]

const permissionRequests = [
  {
    id: 'geolocation',
    title: 'Geolocalisation',
    description: 'Trouver votre position de depart sur le campus.',
  },
  {
    id: 'bluetooth',
    title: 'Bluetooth / balises indoor',
    description: 'Preparer le guidage interieur avec balises ou capteurs.',
  },
  {
    id: 'position',
    title: 'Position campus',
    description: 'Utiliser votre position pour calculer un itineraire adapte.',
  },
]

const navigationItems = [
  ['home', 'Accueil'],
  ['map', 'Carte interactive'],
  ['route', 'Itineraire'],
  ['report', 'Signalement'],
  ['profile', 'Profil'],
]

const places = [
  {
    id: 'm13',
    name: 'Entree Metro M13',
    type: 'Transport',
    position: [48.94533, 2.36335],
    accessibility: 'excellent',
    equipment: ['Acces public', 'Chemin large', 'Signaletique'],
    status: 'fonctionnel',
    description: 'Point d arrivee principal depuis Saint-Denis Universite.',
  },
  {
    id: 'g',
    name: 'Batiment G - Accueil',
    type: 'Service',
    position: [48.94592, 2.36391],
    accessibility: 'bon',
    equipment: ['Accueil', 'Scolarite', 'Portes automatiques'],
    status: 'fonctionnel',
    description: 'Accueil, scolarite et services administratifs.',
  },
  {
    id: 'a',
    name: 'Batiment A',
    type: 'Cours',
    position: [48.94614, 2.36466],
    accessibility: 'bon',
    equipment: ['Rampes', 'Amphis', 'Ascenseur'],
    status: 'fonctionnel',
    description: 'Grand batiment pedagogique avec amphitheatres et salles de cours.',
  },
  {
    id: 'bu',
    name: 'Bibliotheque universitaire',
    type: 'Service',
    position: [48.9467, 2.36396],
    accessibility: 'excellent',
    equipment: ['Ascenseur', 'Espaces de travail', 'Accueil PMR'],
    status: 'fonctionnel',
    description: 'Bibliotheque universitaire accessible avec espaces de travail.',
  },
  {
    id: 'mde',
    name: 'Maison de l etudiant',
    type: 'Vie etudiante',
    position: [48.94648, 2.36536],
    accessibility: 'bon',
    equipment: ['Vie etudiante', 'Aides sociales', 'Accompagnement'],
    status: 'fonctionnel',
    description: 'Maison de l etudiant, vie associative et accompagnement.',
  },
  {
    id: 'b1',
    name: 'Batiment B1',
    type: 'Cours',
    position: [48.94691, 2.36472],
    accessibility: 'moyen',
    equipment: ['Salles de cours', 'Ascenseur'],
    status: 'fonctionnel',
    description: 'Salles de cours et acces aux etages du secteur B.',
  },
  {
    id: 'b2',
    name: 'Batiment B2',
    type: 'Cours',
    position: [48.94706, 2.36534],
    accessibility: 'moyen',
    equipment: ['Salles de cours', 'Escaliers', 'Ascenseur'],
    status: 'fonctionnel',
    description: 'Batiment pedagogique du secteur B2.',
  },
  {
    id: 'crous',
    name: 'CROUS',
    type: 'Restauration',
    position: [48.94679, 2.36605],
    accessibility: 'bon',
    equipment: ['Restauration', 'Rampe', 'Comptoir adapte'],
    status: 'fonctionnel',
    description: 'Service de restauration universitaire.',
  },
  {
    id: 'd',
    name: 'Batiment D',
    type: 'Cours',
    position: [48.94745, 2.36422],
    accessibility: 'bon',
    equipment: ['Salles de cours', 'Ascenseur'],
    status: 'fonctionnel',
    description: 'Batiment de salles de cours et services pedagogiques.',
  },
  {
    id: 'handicap',
    name: 'Service accueil handicap',
    type: 'Accessibilite',
    position: [48.94604, 2.36358],
    accessibility: 'excellent',
    equipment: ['Conseil', 'Accompagnement', 'Point d aide'],
    status: 'fonctionnel',
    description: 'Service de reference pour les besoins d accessibilite.',
  },
]

const edges = [
  { from: 'm13', to: 'g', distance: 95, features: ['flat', 'automatic-door'] },
  { from: 'g', to: 'handicap', distance: 70, features: ['flat', 'ramp'] },
  { from: 'g', to: 'a', distance: 120, features: ['flat', 'ramp'] },
  { from: 'a', to: 'bu', distance: 130, features: ['flat', 'elevator'] },
  { from: 'a', to: 'mde', distance: 100, features: ['flat', 'ramp'] },
  { from: 'mde', to: 'crous', distance: 110, features: ['flat', 'ramp'] },
  { from: 'bu', to: 'd', distance: 125, features: ['flat', 'automatic-door'] },
  { from: 'bu', to: 'b1', distance: 105, features: ['stairs', 'elevator'] },
  { from: 'b1', to: 'b2', distance: 80, features: ['stairs'] },
  { from: 'b2', to: 'crous', distance: 95, features: ['flat'] },
  { from: 'd', to: 'b1', distance: 115, features: ['flat', 'elevator'] },
]

const defaultReports = [
  {
    id: 1,
    place: 'b1',
    label: 'Ascenseur B1 signale lent',
    severity: 'information',
    active: true,
  },
]

function getPlace(id) {
  return places.find((place) => place.id === id)
}

function getRoute(start, end, profile, reports) {
  if (start === end) return { path: [start], distance: 0, instructions: ['Vous etes deja arrive.'] }

  const activeBlockedPlaces = new Set(
    reports.filter((report) => report.active && report.severity === 'bloquant').map((report) => report.place),
  )
  const graph = new Map(places.map((place) => [place.id, []]))

  edges.forEach((edge) => {
    if (activeBlockedPlaces.has(edge.from) || activeBlockedPlaces.has(edge.to)) return
    const penalty = getPenalty(edge.features, profile)
    graph.get(edge.from).push({ to: edge.to, cost: edge.distance + penalty, edge })
    graph.get(edge.to).push({ to: edge.from, cost: edge.distance + penalty, edge })
  })

  const distances = new Map(places.map((place) => [place.id, Infinity]))
  const previous = new Map()
  const queue = new Set(places.map((place) => place.id))
  distances.set(start, 0)

  while (queue.size) {
    const current = [...queue].sort((a, b) => distances.get(a) - distances.get(b))[0]
    queue.delete(current)
    if (current === end) break
    graph.get(current).forEach((neighbor) => {
      if (!queue.has(neighbor.to)) return
      const score = distances.get(current) + neighbor.cost
      if (score < distances.get(neighbor.to)) {
        distances.set(neighbor.to, score)
        previous.set(neighbor.to, { from: current, edge: neighbor.edge })
      }
    })
  }

  if (!previous.has(end)) return { path: [], distance: 0, instructions: ['Aucun itineraire accessible disponible.'] }

  const path = [end]
  let cursor = end
  while (previous.has(cursor)) {
    cursor = previous.get(cursor).from
    path.unshift(cursor)
  }

  return {
    path,
    distance: Math.round(distances.get(end)),
    instructions: buildInstructions(path, profile),
  }
}

function getPenalty(features, profile) {
  if (profile === 'motor' && features.includes('stairs') && !features.includes('elevator')) return 10000
  if (profile === 'motor' && features.includes('ramp')) return -20
  if (profile === 'visual' && features.includes('automatic-door')) return -10
  if (profile === 'cognitive' && features.includes('stairs')) return 120
  return 0
}

function buildInstructions(path, profile) {
  const names = path.map((id) => getPlace(id).name)
  const base = names.slice(1).map((name, index) => `Etape ${index + 1} : allez vers ${name}.`)

  if (profile === 'visual') return ['Guidage vocal active : suivez les reperes annonces.', ...base]
  if (profile === 'auditory') return ['Alertes visuelles activees : chaque changement est affiche clairement.', ...base]
  if (profile === 'cognitive') return ['Mode simplifie : suivez les grands boutons et les etapes courtes.', ...base]
  return ['Itineraire sans escalier prioritaire lorsque possible.', ...base]
}

function App() {
  const [activePage, setActivePage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState('motor')
  const [start, setStart] = useState('m13')
  const [end, setEnd] = useState('bu')
  const [reports, setReports] = useState(defaultReports)
  const [eventEnabled, setEventEnabled] = useState(true)
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [permissions, setPermissions] = useState({
    geolocation: 'a-activer',
    bluetooth: 'a-activer',
    position: 'a-activer',
  })

  const route = useMemo(() => getRoute(start, end, profile, reports), [start, end, profile, reports])
  const selectedProfile = profiles.find((item) => item.id === profile)

  const addReport = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setReports((current) => [
      {
        id: Date.now(),
        place: data.get('place'),
        label: data.get('label'),
        severity: data.get('severity'),
        active: true,
      },
      ...current,
    ])
    event.currentTarget.reset()
  }

  const saveFavorite = () => {
    const label = `${getPlace(start).name} -> ${getPlace(end).name}`
    setFavorites((current) => (current.includes(label) ? current : [label, ...current]))
  }

  const openPage = (page) => {
    setActivePage(page)
    setMenuOpen(false)
  }

  const requestPermission = (permissionId) => {
    if (permissionId === 'geolocation' && navigator.geolocation) {
      setPermissions((current) => ({ ...current, geolocation: 'demande-en-cours' }))
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissions((current) => ({ ...current, geolocation: 'activee', position: 'activee' }))
          setStart('m13')
        },
        () => {
          setPermissions((current) => ({ ...current, geolocation: 'simulation', position: 'simulation' }))
        },
      )
      return
    }

    setPermissions((current) => ({ ...current, [permissionId]: 'simulation' }))
  }

  return (
    <main className={`${highContrast ? 'contrast' : ''} ${largeText ? 'large-text' : ''}`}>
      <header className="sticky top-0 z-[1000] border-b border-emerald-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4" aria-label="Navigation principale">
          <button className="text-left text-2xl font-black text-[#2E7D32]" onClick={() => openPage('home')}>
            BlueAcces
            <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">GPS inclusif campus</span>
          </button>
          <NavigationMenu activePage={activePage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} openPage={openPage} />
        </nav>
      </header>

      {activePage === 'home' && (
        <Hero
          permissions={permissions}
          requestPermission={requestPermission}
          profiles={profiles}
          selectedProfile={selectedProfile}
          setProfile={setProfile}
          eventEnabled={eventEnabled}
          setEventEnabled={setEventEnabled}
          setActivePage={openPage}
        />
      )}

      {activePage === 'map' && <CampusMap route={route} reports={reports} />}

      {activePage === 'route' && (
        <RoutePlanner
          profile={profile}
          setProfile={setProfile}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          route={route}
          saveFavorite={saveFavorite}
        />
      )}

      {activePage === 'report' && <Reports reports={reports} setReports={setReports} addReport={addReport} />}

      {activePage === 'profile' && (
        <Profile
          profile={profile}
          setProfile={setProfile}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          largeText={largeText}
          setLargeText={setLargeText}
          favorites={favorites}
          eventEnabled={eventEnabled}
          setEventEnabled={setEventEnabled}
        />
      )}
    </main>
  )
}

function NavigationMenu({ activePage, menuOpen, setMenuOpen, openPage }) {
  const activeLabel = navigationItems.find(([id]) => id === activePage)?.[1] || 'Menu'

  return (
    <div className="app-menu">
      <button
        className="flex items-center justify-between gap-3 rounded-2xl bg-[#2E7D32] px-5 py-4 font-black text-white shadow-lg"
        aria-expanded={menuOpen}
        aria-controls="main-menu"
        onClick={() => setMenuOpen((current) => !current)}
      >
        Menu
        <span className="rounded-full bg-white/20 px-3 py-1 text-sm">{activeLabel}</span>
      </button>

      {menuOpen && (
        <div id="main-menu" className="app-menu-panel rounded-3xl border border-emerald-100 bg-white p-3 shadow-2xl">
          {navigationItems.map(([id, label]) => (
            <button
              key={id}
              className={`mb-2 flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left font-black ${
                activePage === id ? 'bg-[#2E7D32] text-white' : 'bg-emerald-50 text-emerald-950'
              }`}
              onClick={() => openPage(id)}
            >
              {label}
              <span>{activePage === id ? 'Ouvert' : 'Choisir'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Hero({ permissions, requestPermission, profiles, selectedProfile, setProfile, eventEnabled, setEventEnabled, setActivePage }) {
  return (
    <section className="bg-gradient-to-br from-emerald-950 via-[#2E7D32] to-[#81C784] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em]">Demarrage du guidage</p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
            Activez votre position, choisissez votre handicap, puis lancez le guidage.
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-emerald-50">
            BlueAcces doit d abord savoir ou vous etes, puis adapter le menu, les consignes et l itineraire a votre besoin : fauteuil,
            aveugle ou malvoyant, sourd ou malentendant, ou handicap cognitif.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-white px-6 py-4 font-black text-[#2E7D32]" onClick={() => setActivePage('route')}>
              Lancer un guidage
            </button>
            <button className="rounded-2xl border border-white/60 px-6 py-4 font-black text-white" onClick={() => setActivePage('map')}>
              Voir la carte
            </button>
          </div>
        </div>

        <aside className="space-y-5 rounded-[2rem] bg-white p-6 text-emerald-950 shadow-2xl">
          <PermissionSetup permissions={permissions} requestPermission={requestPermission} />
          <ProfileSelector profiles={profiles} selectedProfile={selectedProfile} setProfile={setProfile} />
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-black">Module lancement</h3>
                <p className="text-sm text-slate-700">Jeu de piste QR codes, temporaire et administrable.</p>
              </div>
              <button
                className={`rounded-full px-4 py-2 font-bold ${eventEnabled ? 'bg-[#2E7D32] text-white' : 'bg-slate-200 text-slate-800'}`}
                onClick={() => setEventEnabled(!eventEnabled)}
              >
                {eventEnabled ? 'Actif' : 'Inactif'}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function PermissionSetup({ permissions, requestPermission }) {
  return (
    <div>
      <h2 className="text-2xl font-black">1. Autoriser la position</h2>
      <p className="mt-2 text-slate-700">L app simule aussi le mode campus si le navigateur refuse une permission.</p>
      <div className="mt-4 grid gap-3">
        {permissionRequests.map((permission) => (
          <button
            key={permission.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-white p-4 text-left shadow-sm"
            onClick={() => requestPermission(permission.id)}
          >
            <span>
              <strong className="block text-emerald-950">{permission.title}</strong>
              <span className="text-sm text-slate-700">{permission.description}</span>
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-900">{permissions[permission.id]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ProfileSelector({ profiles, selectedProfile, setProfile }) {
  return (
    <div>
      <h2 className="text-2xl font-black">2. Selectionner votre handicap</h2>
      <p className="mt-2 text-slate-700">Le guidage, les consignes et le menu s adaptent a ce choix.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {profiles.map((item) => (
          <button
            key={item.id}
            className={`rounded-2xl border p-4 text-left ${
              selectedProfile.id === item.id ? 'border-[#2E7D32] bg-emerald-100' : 'border-emerald-100 bg-white'
            }`}
            onClick={() => setProfile(item.id)}
          >
            <span className="text-2xl" aria-hidden="true">
              {item.icon}
            </span>
            <strong className="mt-2 block text-emerald-950">{item.label}</strong>
            <span className="mt-1 block text-sm text-slate-700">{item.guidance}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function CampusMap({ route, reports }) {
  const routePositions = route.path.map((id) => getPlace(id).position)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <SectionHeader title="Carte interactive" text="Visualisez les batiments, services, infrastructures et obstacles en temps reel." />
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-xl">
          <MapContainer center={[48.94655, 2.36475]} zoom={18} scrollWheelZoom className="h-[65vh] min-h-[420px]">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {places.map((place) => (
              <CircleMarker
                key={place.id}
                center={place.position}
                radius={place.type === 'Accessibilite' ? 12 : 9}
                pathOptions={{ color: place.accessibility === 'excellent' ? '#2E7D32' : '#0f766e', fillColor: '#81C784', fillOpacity: 0.85 }}
              >
                <Popup>
                  <strong>{place.name}</strong>
                  <br />
                  {place.description}
                  <br />
                  Accessibilite : {place.accessibility}
                  <br />
                  Etat : {place.status}
                </Popup>
              </CircleMarker>
            ))}
            {routePositions.length > 1 && <Polyline positions={routePositions} pathOptions={{ color: '#2E7D32', weight: 8 }} />}
          </MapContainer>
        </div>

        <aside className="space-y-4">
          {places.map((place) => (
            <article key={place.id} className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black text-emerald-950">{place.name}</h3>
                  <p className="font-bold text-[#2E7D32]">{place.type}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-900">{place.accessibility}</span>
              </div>
              <p className="mt-3 text-slate-700">{place.equipment.join(' / ')}</p>
            </article>
          ))}
          {reports.filter((report) => report.active).map((report) => (
            <article key={report.id} className="rounded-3xl border border-orange-200 bg-orange-50 p-5">
              <h3 className="font-black text-orange-950">Obstacle signale</h3>
              <p>{report.label}</p>
            </article>
          ))}
        </aside>
      </div>
    </section>
  )
}

function RoutePlanner({ profile, setProfile, start, setStart, end, setEnd, route, saveFavorite }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <SectionHeader title="Itineraire accessible" text="Selectionnez un depart, une arrivee et un profil pour calculer le meilleur parcours." />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <form className="rounded-[2rem] bg-white p-6 shadow-xl">
          <Field label="Profil de handicap">
            <select value={profile} onChange={(event) => setProfile(event.target.value)}>
              {profiles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Point de depart">
            <select value={start} onChange={(event) => setStart(event.target.value)}>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Destination">
            <select value={end} onChange={(event) => setEnd(event.target.value)}>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </Field>
          <button type="button" className="mt-4 w-full rounded-2xl bg-[#2E7D32] px-5 py-4 font-black text-white" onClick={saveFavorite}>
            Sauvegarder ce trajet
          </button>
        </form>

        <div className="rounded-[2rem] bg-white p-6 shadow-xl">
          <h2 className="text-3xl font-black text-emerald-950">Parcours recommande</h2>
          <p className="mt-2 text-slate-700">Score de trajet : {route.distance} m adaptes environ</p>
          <ol className="mt-6 space-y-4">
            {route.instructions.map((instruction) => (
              <li key={instruction} className="rounded-2xl bg-emerald-50 p-4 text-lg font-semibold text-emerald-950">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Reports({ reports, setReports, addReport }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <SectionHeader title="Signalement d obstacles" text="Les obstacles actifs sont pris en compte dans le calcul des parcours." />
      <div className="grid gap-6 lg:grid-cols-2">
        <form className="rounded-[2rem] bg-white p-6 shadow-xl" onSubmit={addReport}>
          <Field label="Lieu concerne">
            <select name="place">
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Type de signalement">
            <input name="label" required placeholder="Ascenseur en panne, travaux, obstacle temporaire..." />
          </Field>
          <Field label="Impact">
            <select name="severity">
              <option value="information">Information</option>
              <option value="bloquant">Bloquant pour le parcours</option>
            </select>
          </Field>
          <button className="mt-4 w-full rounded-2xl bg-[#2E7D32] px-5 py-4 font-black text-white">Envoyer le signalement</button>
        </form>
        <div className="space-y-4">
          {reports.map((report) => (
            <article key={report.id} className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black text-emerald-950">{report.label}</h3>
              <p className="text-slate-700">
                {getPlace(report.place).name} - {report.severity}
              </p>
              <button
                className="mt-3 rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-900"
                onClick={() => setReports((current) => current.map((item) => (item.id === report.id ? { ...item, active: !item.active } : item)))}
              >
                {report.active ? 'Marquer resolu' : 'Reactiver'}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Profile({ profile, setProfile, highContrast, setHighContrast, largeText, setLargeText, favorites, eventEnabled, setEventEnabled }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <SectionHeader title="Profil utilisateur" text="Adaptez BlueAcces a vos besoins de lecture, de guidage et de mobilite." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl">
          <Field label="Type de handicap">
            <select value={profile} onChange={(event) => setProfile(event.target.value)}>
              {profiles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Toggle label="Contraste eleve" enabled={highContrast} onClick={() => setHighContrast(!highContrast)} />
          <Toggle label="Grande taille de texte" enabled={largeText} onClick={() => setLargeText(!largeText)} />
          <Toggle label="Module evenementiel QR codes" enabled={eventEnabled} onClick={() => setEventEnabled(!eventEnabled)} />
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-xl">
          <h2 className="text-3xl font-black text-emerald-950">Trajets favoris</h2>
          {favorites.length === 0 ? (
            <p className="mt-4 text-slate-700">Aucun trajet sauvegarde pour le moment.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {favorites.map((favorite) => (
                <li key={favorite} className="rounded-2xl bg-emerald-50 p-4 font-bold text-emerald-950">
                  {favorite}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ title, text }) {
  return (
    <div className="mb-6">
      <p className="font-black uppercase tracking-[0.2em] text-[#2E7D32]">BlueAcces</p>
      <h1 className="text-4xl font-black text-emerald-950">{title}</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-700">{text}</p>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="mb-4 block">
      <span className="mb-2 block font-black text-emerald-950">{label}</span>
      {children}
    </label>
  )
}

function Toggle({ label, enabled, onClick }) {
  return (
    <button className="mb-3 flex w-full items-center justify-between rounded-2xl bg-emerald-50 p-4 font-black text-emerald-950" onClick={onClick}>
      {label}
      <span className={`rounded-full px-4 py-2 ${enabled ? 'bg-[#2E7D32] text-white' : 'bg-slate-200 text-slate-800'}`}>
        {enabled ? 'Oui' : 'Non'}
      </span>
    </button>
  )
}

export default App

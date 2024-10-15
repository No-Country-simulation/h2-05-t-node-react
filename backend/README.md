# API de Partidos de Fútbol

Este proyecto expone una serie de endpoints para obtener información sobre partidos de fútbol, equipos, jugadores y ligas de manera detallada. A continuación se documentan las rutas disponibles y su uso.

## Rutas

### 1. Obtener información de partidos específicos
- **Endpoint:** `/api_match`
- **Método:** `GET`
- **Descripción:** Devuelve información detallada sobre partidos entre las fechas especificadas, incluyendo probabilidades si están disponibles.
- **Parámetros:**
  - `from` (Date, obligatorio): Fecha de inicio.
  - `to` (Date, obligatorio): Fecha de finalización.
  - `league` (número, opcional): Identificador de la liga (league_id).
  - `match_id` (número, opcional): Identificador del partido (match_id).

---

### 2. Obtener todos los partidos de una fecha específica
- **Endpoint:** `/api_AllMatch`
- **Método:** `GET`
- **Descripción:** Devuelve todos los partidos del día elegido, incluyendo escudos de los equipos.
- **Parámetros:**
  - `from` (Date, obligatorio): Fecha de inicio.
  - `to` (Date, obligatorio): Fecha de finalización.
  - `league` (número, opcional): Identificador de la liga (league_id).
  - `match_id` (número, opcional): Identificador del partido (match_id).

---

### 3. Obtener los últimos partidos entre dos equipos
- **Endpoint:** `/api_record`
- **Método:** `GET`
- **Descripción:** Devuelve los últimos 4 partidos jugados entre dos equipos específicos.
- **Parámetros:**
  - `to` (Date, obligatorio): Fecha límite para buscar partidos.
  - `league` (número, obligatorio): Identificador de la liga (league_id).
  - `team_a` (string, obligatorio): Nombre del primer equipo.
  - `team_b` (string, obligatorio): Nombre del segundo equipo.
- **Nota:** Es importante escribir correctamente los nombres de los equipos para obtener resultados.

---

### 4. Obtener todos los países
- **Endpoint:** `/api_country`
- **Método:** `GET`
- **Descripción:** Devuelve una lista con todos los países disponibles.

---

### 5. Obtener ligas de un país específico
- **Endpoint:** `/api_league`
- **Método:** `GET`
- **Descripción:** Devuelve todas las ligas de un país específico.
- **Parámetros:**
  - `id` (número, obligatorio): Identificador del país (country_id).

---

### 6. Obtener equipos de una liga específica
- **Endpoint:** `/api_team`
- **Método:** `GET`
- **Descripción:** Devuelve todos los equipos de una liga específica.
- **Parámetros:**
  - `id` (número, obligatorio): Identificador de la liga (league_id).

---

### 7. Obtener jugadores de un equipo en una liga específica
- **Endpoint:** `/api_players`
- **Método:** `GET`
- **Descripción:** Devuelve todos los jugadores de un equipo en una liga específica.
- **Parámetros:**
  - `id` (número, obligatorio): Identificador de la liga (league_id).
  - `tid` (número, obligatorio): Identificador del equipo (team_id).

---

### 8. Buscar jugador por nombre
- **Endpoint:** `/api_Oneplayers`
- **Método:** `GET`
- **Descripción:** Devuelve todos los jugadores con un nombre específico.
- **Parámetros:**
  - `name` (string, obligatorio): Nombre del jugador.

## Ejemplos de Uso

1. **Obtener información de partidos entre dos fechas:**

   ```bash
   GET /api_match?from=2023-10-01&to=2023-10-15&league=666

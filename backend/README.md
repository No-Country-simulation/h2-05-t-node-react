# API Documentation

## Endpoints de Usuarios

### 1. Obtener todos los usuarios

- **URL**: `/`
- **Método**: `GET`
- **Descripción**: Devuelve una lista con todos los usuarios registrados en el sistema.
- **Respuesta exitosa**:
  - **Código**: `200 OK`
  - **Body**: Lista de usuarios en formato JSON.

---

### 2. Obtener un usuario por ID

- **URL**: `/:id`
- **Método**: `GET`
- **Descripción**: Obtiene un usuario específico según su ID.
- **Parámetros**:
  - `id` (obligatorio): ID del usuario a obtener.
- **Respuesta exitosa**:
  - **Código**: `200 OK`
  - **Body**: Datos del usuario en formato JSON.
- **Errores**:
  - **Código**: `404 Not Found` si el usuario no existe.
  - **Código**: `500 Internal Server Error` si ocurre un error en el servidor.

---

### 3. Crear un nuevo usuario

- **URL**: `/createUser`
- **Método**: `POST`
- **Descripción**: Crea un nuevo usuario en el sistema.
- **Body** (campos obligatorios):
  - `username`
  - `email`
  - `password`
- **Respuesta exitosa**:
  - **Código**: `200 Created`
  - **Body**: Datos del usuario creado en formato JSON.
- **Errores**:
  - **Código**: `400 Bad Request` si hay errores de validación.
  - **Código**: `500 Internal Server Error` si ocurre un error en el servidor.

---

### 4. Iniciar sesión

- **URL**: `/login`
- **Método**: `POST`
- **Descripción**: Inicia sesión en el sistema con el email y la contraseña del usuario. Devuelve un token JWT.
- **Body** (campos obligatorios):
  - `email`
  - `password`
- **Respuesta exitosa**:
  - **Código**: `200 OK`
  - **Body**: Token JWT en formato JSON.
- **Errores**:
  - **Código**: `401 Unauthorized` si las credenciales son incorrectas.
  - **Código**: `500 Internal Server Error` si ocurre un error en el servidor.

---

### 5. Eliminar un usuario

- **URL**: `/:id`
- **Método**: `DELETE`
- **Descripción**: Elimina un usuario específico del sistema.
- **Parámetros**:
  - `id` (obligatorio): ID del usuario a eliminar.
- **Autenticación**: Requiere autenticación mediante token JWT.
- **Respuesta exitosa**:
  - **Código**: `200 OK`
  - **Body**: Mensaje de confirmación de eliminación en formato JSON.
- **Errores**:
  - **Código**: `404 Not Found` si el usuario no existe.
  - **Código**: `403 Forbidden` si el token JWT no es válido.
  - **Código**: `500 Internal Server Error` si ocurre un error en el servidor.

---

### 6. Actualizar un usuario

- **URL**: `/:id`
- **Método**: `PUT`
- **Descripción**: Actualiza los datos de un usuario específico.
- **Parámetros**:
  - `id` (obligatorio): ID del usuario a actualizar.
- **Body** (campos opcionales):
  - `username`
  - `email`
  - `password`
- **Autenticación**: Requiere autenticación mediante token JWT.
- **Respuesta exitosa**:
  - **Código**: `200 OK`
  - **Body**: Datos del usuario actualizado en formato JSON.
- **Errores**:
  - **Código**: `404 Not Found` si el usuario no existe.
  - **Código**: `403 Forbidden` si el token JWT no es válido.
  - **Código**: `500 Internal Server Error` si ocurre un error en el servidor.

---

# API de Partidos de Fútbol

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
   ```

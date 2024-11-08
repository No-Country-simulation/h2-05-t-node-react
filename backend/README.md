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

### 9. Buscar la clasificación de una liga

- **Endpoint:** `/api_standings`
- **Método:** `GET`
- **Descripción:** Devuelve la clasificación de una liga en una temprada específica.
- **Parámetros:**
  - `id` (number, obligatorio): Id de la liga.
  - `season` (number, obligatorio): Temporada que se busca.

### 10. Buscar los partidos de una liga en una fecha dada

- **Endpoint:** `/api_fixture`
- **Método:** `GET`
- **Descripción:** Devuelve los partidos en una fecha dada.
- **Parámetros:**
  - `league` (number, obligatorio): Id de la liga.
  - `season` (number, obligatorio): Temporada que se busca.
  - `from` (string, obligatorio): Fecha en formato YYYY-MM-DD.
  - `to` (string, obligatorio): Fecha en formato YYYY-MM-DD.

### 11. Buscar las probabilidades un partido de una liga.

- **Endpoint:** `/api_odds`
- **Método:** `GET`
- **Descripción:** Devuelve las probabilidades de un partido específico.
- **Parámetros:**
  - `league` (number, obligatorio): Id de la liga.
  - `season` (number, obligatorio): Temporada que se busca.
  - `fixture` (string, obligatorio): Id del partido, se obtiene del endpoint anterior.

### 12. Buscar las probabilidades un partido de una liga.

- **Endpoint:** `/api_NewTeam`
- **Método:** `GET`
- **Descripción:** Devuelve los jugadores de un equipo.
- **Parámetros:**
  - `team` (number, obligatorio): Id del equipo.
  - `season` (number, obligatorio): Temporada que se busca.
  - `page` (number, obligatorio): La informacion esta paginada.

### 13. Buscar las ligas y copas de un pais.

- **Endpoint:** `/api_NewLeague`
- **Método:** `GET`
- **Descripción:** Devuelve las competencias del país especificado.
- **Parámetros:**
  - `search` (string, obligatorio): Nombre del país buscado, World es para las internacionales.

### 14. Buscar la estadistica de los jugadores de un partido terminado.

- **Endpoint:** `/api_NewMatchEndad`
- **Método:** `GET`
- **Descripción:** Devuelve el rendimiento de cada jugador (goles, asisitencias, tarjetas, puntuación).
- **Parámetros:**
  - `fixtureId` (number, obligatorio): El id del partido, se obtiene en fixture.

## Ejemplos de Uso

1. **Obtener información de partidos entre dos fechas:**

   ```bash
   GET /api_match?from=2023-10-01&to=2023-10-15&league=666
   ```

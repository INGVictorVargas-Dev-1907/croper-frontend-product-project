# Sistema de Gestión de Productos - Proyecto FullStack Croper

Sistema completo desarrollado con NestJS + MongoDB (backend) y React + Redux (frontend) para gestionar un catálogo de productos.

## Frontend - React Application

### Estructura del proyecto
```bash
src/
├── components/             # Componentes React
│   ├── Navbar.jsx         # Barra de navegación
│   ├── ProductList.jsx    # Lista de productos
│   ├── ProductForm.jsx    # Formulario de productos
│   ├── Login.jsx          # Formulario de login
│   ├── Register.jsx       # Formulario de registro
│   ├── Alert.jsx          # Componente de alertas
│   ├── Pagination.jsx     # Paginación
│   └── PrivateRoute.jsx   # Ruta protegida
├── store/                 # Gestión de estado (Redux)
│   ├── actions/           # Acciones
│   ├── reducers/          # Reducers
│   └── index.js           # Configuración store
├── services/              # Servicios API
│   └── api.js             # Cliente HTTP
├── hooks/                 # Hooks personalizados
│   └── useAuth.js         # Hook de autenticación
├── styles/                # Estilos CSS
└── App.js                 # Componente principal
```

### Tecnologías Utilizadas
- **React** - Biblioteca para interfaces de usuario
- **Redux Toolkit** - Gestión de estado predictible
- **React Router** - Navegación
- **React Bootstrap** - UI Framework
- **Bootstrap Icons** - Iconografía
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios

###  Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd croper-fullstack-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### Variables de Entorno
```env
REACT_APP_API_URL=http://localhost:3000/api
```

### Ejecución
```bash
# Desarrollo
npm start

# Build producción
npm run build
```

### Funcionalidades
#### Autenticación
- Registro de usuarios
- Login con JWT
- Logout automático
- Rutas protegidas

#### Gestión de Productos
- CRUD completo de productos
- Paginación
- Búsqueda por nombre y categoría
- Filtros avanzados
- Interface responsive

#### Características UX
- Diseño mobile-first
-Loading states
--Mensajes de error amigables
-Confirmación de acciones
-Formularios validados


### URLs de Acceso
- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **Documentación Swagger:** http://localhost:3000/api/docs

### Despliegue

#### Backend(Producción)
```bash
npm run build
npm run start:prod
```

#### Frontend (Producción)
```bash
npm run build
# Servir los archivos estáticos con nginx/apache
```

### Scripts Disponibles

#### Backend
```json
{
  "start:dev": "nest start --watch",
  "start:prod": "node dist/main",
  "build": "nest build",
  "test": "jest"
}
```

#### Frontend
```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

### Soporte
contactar al equipo de desarrollo atravez del perfil en el repositorio.


### Licencia
Este proyecto está bajo la Licencia MIT.

### Autor
Victor Alfonso Vargas Diaz

¡Desarrollo exitoso con gran satisfacción!

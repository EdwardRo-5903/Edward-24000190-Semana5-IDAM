# Aplicación Web de Aves de Guatemala

## Información del Proyecto

**Curso:** Desarrollo de Aplicaciones Móviles  
**Estudiante:** Edward Ronaldo Hernández Gómez (Carnet: 24000190)  
**Semana:** 5 - IDAM  
**Framework:** React + Vite  
**API:** Xeno-Canto v3 + iNaturalist  

## Descripción

Aplicación web móvil responsiva que muestra información detallada de **359+ especies de aves de Guatemala**. La aplicación obtiene datos de grabaciones de sonido del servicio Xeno-Canto v3 e imágenes reales de iNaturalist.

### 🌟 Características Principales

- ✅ **359+ especies de aves de Guatemala** - Datos en tiempo real de Xeno-Canto
- ✅ **Imágenes reales** - Integración con iNaturalist para fotos de aves
- ✅ **Audio de aves** - Reproducción de grabaciones de sonidos únicos
- ✅ **Información completa** - Familia, nombre científico, ubicaciones, descubridores
- ✅ **Ubicaciones agrupadas** - Muestra múltiples sitios de avistamiento con expande/contrae
- ✅ **Descubridores expandibles** - Lista de recordistas con opción de ver más
- ✅ **Control de audio único** - Solo un sonido a la vez
- ✅ **Diseño responsivo** - Optimizado para móviles y escritorio
- ✅ **Sin datos de demo** - Datos reales de API

## Flujo de la Aplicación

1. **Landing Page**: Formulario con nombre y carnet fijo (no editable)
2. **Bird List**: Lista de 359 especies únicas de Guatemala con:
   - Foto real del ave (iNaturalist)
   - Nombre común y científico
   - Familia (género)
   - Descubridores (expandible)
   - Ubicaciones de avistamiento (expandible)
   - Botón de reproducción de audio

## Tecnologías Utilizadas

- **React 19.2.0** - UI Framework
- **Vite 7.2.6** - Build tool
- **React Router DOM** - Navegación
- **Xeno-Canto API v3** - Grabaciones de aves
- **iNaturalist API** - Fotos de especies
- **CSS3 Responsive** - Diseño mobile-first

## ⚠️ Configuración de API Key

La aplicación requiere una **API key de Xeno-Canto v3** para funcionar.

### Obtener la API Key

1. Regístrate en https://xeno-canto.org/register
2. Verifica tu email
3. Ve a https://xeno-canto.org/account
4. Copia tu API key personal

### Configurar la API Key

**Opción 1: Variable de Entorno (Recomendado)**
```powershell
$env:VITE_XENO_CANTO_API_KEY = "tu-api-key-aqui"
npm run dev
```

**Opción 2: Archivo `.env.local`**
```
VITE_XENO_CANTO_API_KEY=tu-api-key-aqui
```

**Opción 3: Directamente en `src/config/api.js`**
```javascript
apiKey: 'tu-api-key-aqui'
```

## Requisitos Previos

- **Node.js** 16+
- **npm** (incluido con Node.js)

```powershell
node -v  # Verificar versión
npm -v
```

## Instalación

```powershell
# Navegar a la carpeta del proyecto
cd appbird

# Instalar dependencias
npm install
```

## Ejecución

### Modo Desarrollo
```powershell
npm run dev
```
Disponible en: `http://localhost:5173/`

### Compilar para Producción
```powershell
npm run build
```
Genera carpeta `dist/` con archivos optimizados

### Previsualizar Build
```powershell
npm run preview
```

## Estructura del Proyecto

```
appbird/
├── src/
│   ├── components/
│   │   ├── BirdCard.jsx      # Tarjeta de ave con imagen, info, audio
│   │   └── BirdCard.css      # Estilos (cards separadas, imagen redondeada)
│   ├── pages/
│   │   ├── Landing.jsx       # Inicio con nombre/carnet fijo
│   │   ├── BirdList.jsx      # Lista de 359 aves agrupadas
│   │   ├── Landing.css
│   │   └── BirdList.css
│   ├── config/
│   │   └── api.js            # Configuración API Xeno-Canto v3
│   ├── App.jsx               # Router principal
│   └── main.jsx              # Punto de entrada
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Características por Pantalla

### 🏠 Pantalla de Inicio (Landing)
- Nombre y carnet **fijo** (no editable)
- Botón "Cargar" que navega a aves
- Almacena datos en localStorage

### 🦅 Pantalla de Aves (Bird List)
- **359 especies únicas** de Guatemala
- Por cada ave:
  - 📸 Foto real del iNaturalist (o espectrograma como fallback)
  - 🏷️ Nombre común y científico
  - 👨‍🔬 Familia (género)
  - 📍 **Ubicaciones agrupadas** - Muestra 2, expande con botón "+X más"
  - 👤 **Descubridores** - Hasta 2 recordistas, opción de expandir
  - 🔊 Botón play redondeado (reproduce audio único, pausa otros)

## Integración de APIs

### Xeno-Canto API v3
- **Endpoint:** `https://xeno-canto.org/api/3/recordings`
- **Query:** `cnt:guatemala grp:birds` (Guatemala, solo aves)
- **Paginación:** Hasta 5 páginas de 500 registros cada una
- **Datos:** Grabaciones, ubicaciones, recordistas, archivos MP3

### iNaturalist API
- **Endpoint:** `https://api.inaturalist.org/v1/taxa`
- **Uso:** Obtiene foto de cada especie por nombre científico
- **Cache:** Memoriza imágenes para evitar llamadas repetidas
- **Fallback:** Usa espectrograma si no hay foto

## Optimizaciones Implementadas

✅ Agrupación de aves por especie (elimina duplicados)  
✅ Caché de imágenes en memoria  
✅ Audio único a la vez (pausa automática de otros)  
✅ Paginación paralela (Promise.all)  
✅ Diseño responsive (100% móvil)  
✅ Bordes redondeados e imagen con padding  
✅ Separación visual entre cards  
✅ Ubicaciones y descubridores expandibles  

## Notas Importantes

- ⚠️ Sin API key válida: Error visible
- ⚠️ Sin conexión internet: Error visible  
- 📄 Código sin comentarios (limpio)
- 🎨 Diseño orientado a móvil

- La aplicación guarda el nombre y carnet en `localStorage`
- Los sonidos se reproducen usando la API nativa `Audio` del navegador
- Las imágenes usan los espectrogramas proporcionados por Xeno-Canto
- Manejo de errores para imágenes no disponibles (fallback a placeholder)

## Capturas de Pantalla

Las capturas de pantalla de la aplicación funcionando se encuentran en el documento PDF entregable.

## Autor

**Edward**  
Carnet: 24000190  
Curso: Desarrollo de Aplicaciones Móviles  
Fecha: Diciembre 2025

---

Para cualquier duda o consulta, revisar el código fuente en los archivos del proyecto.

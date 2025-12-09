# 📋 Guía de Ejecución - Aplicación Aves de Guatemala

## 1️⃣ CONFIGURAR API KEY

### Opción A: Variable de Entorno (Recomendado)

```powershell
# Abre PowerShell en Windows y ejecuta:
$env:VITE_XENO_CANTO_API_KEY = "tu-api-key-aqui"

# Ejemplo con API key real:
$env:VITE_XENO_CANTO_API_KEY = "abc123xyz456"
```

### Opción B: Archivo `.env.local`

1. En la carpeta `appbird/`, crea un archivo llamado `.env.local`
2. Agrega esta línea:
```
VITE_XENO_CANTO_API_KEY=tu-api-key-aqui
```

3. Guarda el archivo

### Opción C: Editar `src/config/api.js` (Solo desarrollo)

```javascript
// En src/config/api.js, línea ~12:
apiKey: 'tu-api-key-aqui',  // Reemplaza 'tu-api-key-aqui' con tu clave real
```

---

## 2️⃣ INSTALAR DEPENDENCIAS

```powershell
# Abre PowerShell en la carpeta del proyecto
cd c:\Users\EdwardDev\Desktop\Edward-24000190-Semana5-IDAM\appbird

# Instala las dependencias
npm install

# Espera a que termine (toma 1-3 minutos la primera vez)
```

---

## 3️⃣ EJECUTAR EN MODO DESARROLLO

```powershell
# En la carpeta appbird, ejecuta:
npm run dev

# Verás algo como:
#   ➜  Local:   http://localhost:5173/
#   ➜  press h + enter to show help
```

**Abre en tu navegador:** `http://localhost:5173/`

---

## 4️⃣ COMPILAR PARA PRODUCCIÓN

```powershell
# En la carpeta appbird, ejecuta:
npm run build

# Se generará una carpeta 'dist/' con los archivos optimizados
```

---

## 5️⃣ PREVISUALIZAR BUILD DE PRODUCCIÓN

```powershell
# Después de ejecutar: npm run build

# Ejecuta:
npm run preview

# Abre en navegador: http://localhost:4173/
```

---

## 🔍 OBTENER TU API KEY DE XENO-CANTO

1. Ve a: https://xeno-canto.org/register
2. Crea una cuenta con tu email
3. Verifica tu email (revisa spam si no llega)
4. Inicia sesión en: https://xeno-canto.org/account
5. En la sección "API key" encontrarás tu clave personal
6. Cópiala completamente (sin espacios)

---

## ✅ VERIFICAR QUE FUNCIONA

1. Ejecuta: `npm run dev`
2. Abre: `http://localhost:5173/`
3. Deberías ver:
   - ✅ Pantalla de inicio con nombre "Edward Ronaldo Hernández Gómez" y carnet "24000190"
   - ✅ Botón "Cargar" funcional
   - ✅ Al hacer clic, va a listado de aves
   - ✅ Se cargan **359 especies de aves de Guatemala**
   - ✅ Cada ave tiene foto, sonido reproducible, ubicaciones expandibles

---

## ❌ SOLUCIONAR ERRORES

### Error: "API key no configurada"
- Verifica haber configurado la API key en uno de los 3 métodos
- Cierra y abre PowerShell de nuevo
- Reinicia el servidor: `npm run dev`

### Error: "Puerto 5173 en uso"
- Vite usará automáticamente el siguiente puerto: 5174, 5175, etc.
- Busca la URL en la consola

### Error: "npm no es reconocido"
- Reinstala Node.js desde: https://nodejs.org/
- Cierra y abre PowerShell nuevamente

### Las aves no cargan
- Verifica conexión a internet
- Abre la consola del navegador: F12
- Revisa si hay errores en la pestaña "Console"
- Prueba tu API key en: https://xeno-canto.org/api/3/recordings?key=TU-KEY&query=cnt:guatemala&per_page=1

---

## 📱 PROBAR EN MÓVIL

### Desde PC a Teléfono (misma red WiFi)

```powershell
# Ejecuta con --host:
npm run dev -- --host

# Verás algo como:
#   ➜  Local:   http://localhost:5173/
#   ➜  Network: http://192.168.X.X:5173/

# Copia la URL de "Network" (la que empieza con 192.168)
# Abrela en el navegador de tu teléfono
```

---

## 🛑 DETENER LA APLICACIÓN

```powershell
# En PowerShell, presiona:
Ctrl + C

# Confirma: Y
```

---

## 📝 RESUMEN RÁPIDO

```powershell
# 1. Configurar API key (una sola vez)
$env:VITE_XENO_CANTO_API_KEY = "tu-clave-aqui"

# 2. Instalar dependencias (primera vez)
npm install

# 3. Ejecutar
npm run dev

# 4. Abre navegador
# http://localhost:5173/

# 5. ¡Listo! Ya ves las 359 aves de Guatemala
```

---

## ✨ CARACTERÍSTICAS QUE DEBERÍAS VER

✅ **Landing:** Nombre y carnet fijo (no editable)  
✅ **Aves:** 359 especies únicas de Guatemala  
✅ **Fotos:** Imágenes reales del iNaturalist  
✅ **Audio:** Botón play redondeado para reproducir sonidos  
✅ **Información:** Familia, nombre científico, ubicaciones, descubridores  
✅ **Expandibles:** Ubicaciones y descubridores se expanden al hacer clic  
✅ **Responsivo:** Se adapta a móvil y escritorio  
✅ **Único audio:** Solo uno se reproduce a la vez  

---

## 🎯 ¿NECESITAS AYUDA?

Si algo no funciona:
1. Verifica la consola del navegador (F12)
2. Cierra PowerShell y Node
3. Limpia caché: `npm cache clean --force`
4. Reinstala: `npm install`
5. Vuelve a ejecutar: `npm run dev`

**¡Éxito! 🚀**

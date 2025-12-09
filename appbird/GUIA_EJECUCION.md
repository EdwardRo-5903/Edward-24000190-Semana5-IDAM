Guía de Ejecución Técnica: Aplicación Aves de Guatemala
1.	Configuración de la Clave API (API Key)
Para el correcto funcionamiento de la aplicación, es necesario configurar la credencial de acceso a Xeno-Canto. Seleccione uno de los siguientes métodos.
1.1.	Opción B: Archivo de configuración local: Este método es persistente y seguro para el entorno de desarrollo.
•	En la carpeta raíz del proyecto (appbird/), cree un archivo llamado .env.local.
•	Agregue la siguiente línea dentro del archivo y guarde los cambios:
VITE_XENO_CANTO_API_KEY=api-key.generada-xeno
2.	Instalación de Dependencias:
•	Antes de ejecutar el sistema, es necesario descargar las librerías requeridas.
•	Abra PowerShell y navegue a la carpeta del proyecto:
•	Ejecute el comando de instalación:
•	PowerShell
•	npm install
Este proceso puede tardar entre 1 y 3 minutos.
3.	Ejecución en Entorno de Desarrollo:
•	Para iniciar la aplicación en modo local:
•	PowerShell
•	npm run dev
•	El sistema indicará que el servidor está activo, generalmente en la dirección http://localhost:5173/. Ingrese dicha dirección en su navegador web.
4.	Compilación para Producción: Para generar una versión optimizada de la aplicación lista para su despliegue:

•	PowerShell
•	npm run build
•	Este comando generará una carpeta denominada dist/ que contiene los archivos estáticos optimizados. Para previsualizar esta versión, utilice el comando:
•	PowerShell
•	npm run preview
5.	Obtención de Credenciales (Xeno-Canto): Si no cuenta con una clave API, siga estos pasos:
•	Regístrese en el portal oficial: https://xeno-canto.org/register.
•	Verifique su cuenta a través del correo electrónico.
•	Acceda a su perfil en la sección "API key" para obtener la cadena alfanumérica necesaria.
6.	Verificación del Sistema: Una vez iniciada la aplicación, se deben validar los siguientes elementos funcionales:
•	Interfaz de Inicio: Visualización del nombre "Edward Ronaldo Hernández Gómez" y carnet "24000190".
•	Carga de Datos: Funcionalidad del botón "Cargar" que debe desplegar el listado de especies.
•	Integridad de Datos: Visualización de 359 especies de aves de Guatemala.
•	Multimedia: Correcta carga de fotografías (iNaturalist) y reproducción de audio.
•	Interactividad: Despliegue de información adicional (ubicaciones y descubridores) al interactuar con los elementos.
7.	Solución de Problemas Comunes
7.1.	Error: API key no configurada: Si la aplicación no carga datos, verifique que la variable de entorno se haya configurado correctamente según la Sección 1. Se recomienda reiniciar la terminal y el servidor de desarrollo.
7.2.	Error: Puerto en uso: Si el puerto 5173 está ocupado, Vite asignará automáticamente el siguiente puerto disponible (ej. 5174). Verifique la URL mostrada en la consola.
7.3.	Problemas de visualización de datos: Si las aves no se visualizan:
•	Verifique su conexión a internet.
•	Inspeccione la consola del navegador (F12) en busca de errores.
•	Valide su API Key realizando una petición directa en el navegador: https://xeno-canto.org/api/3/recordings?key=SU-CLAVE&query=cnt:guatemala

8.	Pruebas en Dispositivos Móviles: Para acceder a la aplicación desde un dispositivo móvil conectado a la misma red Wi-Fi:
•	Ejecute el servidor con el parámetro de host:
•	PowerShell
•	npm run dev -- --host
•	Identifique la dirección IP de red mostrada en la consola (ej. http://192.168.x.x:5173/).
•	Ingrese dicha dirección en el navegador del dispositivo móvil.

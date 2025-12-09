// Configuración de la API de Xeno-Canto

// API v3 Configuration
export const XENO_CANTO_CONFIG = {
  // API v3 endpoint
  baseUrl: 'https://xeno-canto.org/api/3/recordings',
  
  // API Key (obligatoria en v3)
  // Defínela como variable de entorno VITE_XENO_CANTO_API_KEY
  // o edita este valor directamente solo para desarrollo local.
  apiKey: import.meta.env.VITE_XENO_CANTO_API_KEY || '',
  
  // Parámetros por defecto
  defaultParams: {
    per_page: 500, // Número de resultados por página (50-500)
    page: 1        // Página inicial
  },
  
  // Queries predefinidas priorizando aves de Guatemala (solo válidas en API v3)
  guatemalaQueries: [
    'cnt:guatemala+grp:birds',  // País Guatemala, grupo aves
    'cnt:guatemala'             // País Guatemala (fallback)
  ]
};

// Función helper para construir URL de la API
export const buildApiUrl = (query, page = 1, perPage = 500) => {
  const params = new URLSearchParams({
    query: query,
    key: XENO_CANTO_CONFIG.apiKey,
    per_page: perPage.toString(),
    page: page.toString()
  });
  
  return `${XENO_CANTO_CONFIG.baseUrl}?${params.toString()}`;
};

// Información sobre cómo obtener tu propia API key
export const API_KEY_INFO = {
  howToGet: [
    '1. Regístrate en https://xeno-canto.org/register',
    '2. Verifica tu correo electrónico',
    '3. Visita tu página de cuenta en https://xeno-canto.org/account',
    '4. Copia tu API key personal',
    '5. Reemplaza la key "demo" en este archivo'
  ],
  important: [
    '⚠️ No compartas tu API key con otros',
    '⚠️ No la publiques en repositorios públicos de git',
    '⚠️ El abuso prolongado puede resultar en revocación de la key',
    '✅ Se recomienda usar variables de entorno en producción'
  ]
};

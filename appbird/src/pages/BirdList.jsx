import { useState, useEffect } from 'react';
import BirdCard from '../components/BirdCard';
import { buildApiUrl, XENO_CANTO_CONFIG } from '../config/api';
import './BirdList.css';

function BirdList() {
  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBirds();
  }, []);

  const fetchBirds = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!XENO_CANTO_CONFIG.apiKey) {
        throw new Error('Configura tu API key en VITE_XENO_CANTO_API_KEY o en src/config/api.js');
      }

      console.log('🔍 Iniciando petición a la API v3 de Xeno-Canto...');
      
      let allRecordings = [];
      let lastError = null;
      let success = false;
      
      for (const query of XENO_CANTO_CONFIG.guatemalaQueries) {
        try {
          console.log(`🔄 Intentando con API v3: ${query}`);
          
          const firstUrl = buildApiUrl(query, 1, 500);
          const firstResponse = await fetch(firstUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            }
          });
          
          console.log(`📡 Response status: ${firstResponse.status}`);
          
          if (firstResponse.ok) {
            const firstData = await firstResponse.json();
            console.log('📦 Data recibida:', firstData);
            
            if (firstData.recordings && firstData.recordings.length > 0) {
              allRecordings = [...firstData.recordings];
              success = true;
              
              const totalRecordings = firstData.numRecordings;
              const recordingsPerPage = 500;
              const totalPages = Math.ceil(totalRecordings / recordingsPerPage);
              
              console.log(`✅ Página 1/${totalPages}: ${firstData.recordings.length} grabaciones`);
              console.log(`📊 Total disponible: ${totalRecordings} grabaciones de ${firstData.numSpecies} especies`);
              
              // Obtener las páginas restantes
              if (totalPages > 1) {
                const pagePromises = [];
                for (let page = 2; page <= Math.min(totalPages, 5); page++) {
                  pagePromises.push(
                    fetch(buildApiUrl(query, page, 500), {
                      method: 'GET',
                      headers: { 'Accept': 'application/json' }
                    })
                  );
                }
                
                console.log(`🔄 Obteniendo ${pagePromises.length} páginas adicionales...`);
                const responses = await Promise.all(pagePromises);
                
                for (let i = 0; i < responses.length; i++) {
                  if (responses[i].ok) {
                    const pageData = await responses[i].json();
                    if (pageData.recordings) {
                      allRecordings = allRecordings.concat(pageData.recordings);
                      console.log(`✅ Página ${i + 2}: ${pageData.recordings.length} grabaciones`);
                    }
                  }
                }
              }
              
              console.log(`🐦 Total cargado: ${allRecordings.length} grabaciones`);
              break;
            } else {
              lastError = new Error('Sin resultados para la consulta');
            }
          } else {
            let message = `HTTP ${firstResponse.status}`;
            try {
              const errorData = await firstResponse.json();
              console.log('⚠️ Error de API:', errorData);
              message = errorData.error?.message || message;
            } catch (e) {
              // Parse error
            }
            if (!success) lastError = new Error(message);
          }
        } catch (err) {
          console.log(`❌ Falló ${query}:`, err.message);
          if (!success) lastError = err;
        }
      }
      
      if (!success || allRecordings.length === 0) {
        throw new Error(lastError?.message || 'No se encontraron grabaciones de aves de Guatemala');
      }

      // Agrupar por especie (gen + sp)
      const speciesMap = new Map();
      
      allRecordings.forEach(record => {
        const speciesKey = `${record.gen} ${record.sp}`.trim();
        
        if (!speciesMap.has(speciesKey)) {
          speciesMap.set(speciesKey, {
            ...record,
            locations: [],
            recordists: new Set(),
            audioFiles: []
          });
        }
        
        const species = speciesMap.get(speciesKey);
        
        if (record.loc && !species.locations.includes(record.loc)) {
          species.locations.push(record.loc);
        }
        
        if (record.rec) {
          species.recordists.add(record.rec);
        }
        
        if (record.file) {
          species.audioFiles.push({
            file: record.file,
            location: record.loc,
            date: record.date
          });
        }
      });
      
      const uniqueBirds = Array.from(speciesMap.values()).map(bird => ({
        ...bird,
        recordists: Array.from(bird.recordists)
      })).sort((a, b) => {
        const nameA = a.en || `${a.gen} ${a.sp}`;
        const nameB = b.en || `${b.gen} ${b.sp}`;
        return nameA.localeCompare(nameB);
      });

      setBirds(uniqueBirds);
      setError(null);
      console.log('✅ Aves cargadas exitosamente desde la API v3');
    } catch (err) {
      console.error('❌ Error completo:', err);
      setBirds([]);
      setError(err.message || 'Error al cargar los datos. Revisa tu API key y conexión.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bird-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando aves de Guatemala...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bird-list-container">
        <div className="error">
          <p>❌ {error}</p>
          <button onClick={fetchBirds} className="btn-retry">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bird-list-container">
      <header className="bird-list-header">
        <h1>Aves de Guatemala</h1>
        <p className="bird-count">{birds.length} especies encontradas</p>
      </header>

      <div className="bird-list">
        {birds.map((bird, index) => (
          <BirdCard key={bird.id || index} bird={bird} />
        ))}
      </div>
    </div>
  );
}

export default BirdList;

import { useEffect, useRef, useState } from 'react';
import './BirdCard.css';

let currentAudio = null;
let currentStopper = null;
const imageCache = new Map();

function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (currentStopper) {
    currentStopper();
    currentStopper = null;
  }
}

function BirdCard({ bird }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [birdImage, setBirdImage] = useState(() => {
    const scientificName = `${bird.gen} ${bird.sp}`.trim();
    return imageCache.get(scientificName) || null;
  });
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showAllRecordists, setShowAllRecordists] = useState(false);
  const mountedRef = useRef(true);

  const playSound = () => {
    if (isPlaying && audio) {
      stopCurrentAudio();
      setAudio(null);
      setIsPlaying(false);
      return;
    }

    stopCurrentAudio();

    const audioFile = bird.audioFiles && bird.audioFiles.length > 0 
      ? bird.audioFiles[0].file 
      : bird.file;
    
    if (!audioFile) return;

    const newAudio = new Audio(audioFile);
    currentAudio = newAudio;
    currentStopper = () => {
      if (!mountedRef.current) return;
      setIsPlaying(false);
      setAudio(null);
    };
    newAudio.play();
    setAudio(newAudio);
    setIsPlaying(true);

    newAudio.onended = () => {
      if (currentAudio === newAudio) {
        currentAudio = null;
      }
      if (currentStopper) currentStopper();
      currentStopper = null;
    };
  };

  useEffect(() => {
    const scientificName = `${bird.gen} ${bird.sp}`.trim();
    if (!scientificName || scientificName === ' ') {
      return;
    }

    if (birdImage) {
      return;
    }

    (async () => {
      try {
        const searchUrl = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(scientificName)}&rank=species&per_page=1`;
        const response = await fetch(searchUrl);
        const data = await response.json();
        
        if (data.results && data.results.length > 0 && data.results[0].default_photo) {
          const photoUrl = data.results[0].default_photo.medium_url || data.results[0].default_photo.square_url;
          imageCache.set(scientificName, photoUrl);
          if (mountedRef.current) {
            setBirdImage(photoUrl);
          }
        }
      } catch (e) {
        void e;
      }
    })();
  }, [bird.gen, bird.sp, birdImage]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      if (audio && currentAudio === audio) {
        stopCurrentAudio();
      }
      mountedRef.current = false;
    };
  }, [audio]);

  const imageUrl = birdImage || bird.sono?.small || bird.sono?.med || 'https://via.placeholder.com/150x150?text=Ave';
  const familia = bird.gen || 'Desconocido';
  const nombre = bird.en || `${bird.gen} ${bird.sp}`.trim() || 'Sin nombre';
  const recordistas = bird.recordists || (bird.rec ? [bird.rec] : []);
  const displayRecordistas = showAllRecordists ? recordistas : recordistas.slice(0, 2);
  const hiddenRecordistsCount = recordistas.length - displayRecordistas.length;
  const locations = bird.locations || (bird.loc ? [bird.loc] : []);
  const displayLocations = showAllLocations ? locations : locations.slice(0, 2);
  const hiddenCount = locations.length - displayLocations.length;

  return (
    <div className="bird-card">
      <div className="bird-image-container">
        <img 
          src={imageUrl} 
          alt={nombre}
          className="bird-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150x150?text=Ave';
          }}
        />
      </div>

      <div className="bird-info">
        <div className="bird-title">{nombre}</div>
        <div className="bird-scientific">{bird.gen} {bird.sp}</div>
        
        <div className="bird-details">
          <div className="bird-detail-item">
            <span className="detail-label">Familia:</span>
            <span className="detail-value">{familia}</span>
          </div>
          
          {recordistas.length > 0 && (
            <div className="bird-detail-item recordists-section">
              <span className="detail-label">Descubridor:</span>
              <div className="recordists-container">
                <div className="recordists-list">
                  {displayRecordistas.map((rec, idx) => (
                    <span key={idx} className="recordist-tag">{rec}</span>
                  ))}
                  {hiddenRecordistsCount > 0 && (
                    <button 
                      className="recordist-more"
                      onClick={() => setShowAllRecordists(!showAllRecordists)}
                    >
                      {showAllRecordists ? 'Ver menos' : `+${hiddenRecordistsCount} más`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {locations.length > 0 && (
          <div className="bird-locations">
            <span className="locations-label">Avistado en:</span>
            <div className="locations-list">
              {displayLocations.map((loc, idx) => (
                <span key={idx} className="location-tag">{loc}</span>
              ))}
              {hiddenCount > 0 && (
                <button 
                  className="location-more"
                  onClick={() => setShowAllLocations(!showAllLocations)}
                >
                  {showAllLocations ? 'Ver menos' : `+${hiddenCount} más`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {(bird.file || (bird.audioFiles && bird.audioFiles.length > 0)) && (
        <button 
          className={`btn-play-right ${isPlaying ? 'playing' : ''}`}
          onClick={playSound}
          title={isPlaying ? 'Detener Sonido' : 'Reproducir Sonido'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}
    </div>
  );
}

export default BirdCard;

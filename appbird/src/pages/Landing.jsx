import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const fullName = 'Edward Ronaldo Hernández Gómez';
  const carnetNumber = '24000190';
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Guardar en localStorage
    localStorage.setItem('userName', fullName);
    localStorage.setItem('userCarnet', carnetNumber);
    // Navegar a la lista de aves
    navigate('/aves');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Inicio</h1>
        
        <form onSubmit={handleSubmit} className="landing-form">
          <div className="form-group">
            <label htmlFor="fullName">Nombre Completo</label>
            <div className="fixed-value" id="fullName">{fullName}</div>
          </div>

          <div className="form-group">
            <label htmlFor="carnetNumber">NUMERO DE CARNET</label>
            <div className="fixed-value" id="carnetNumber">{carnetNumber}</div>
          </div>

          <button type="submit" className="btn-cargar">
            Cargar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Landing;

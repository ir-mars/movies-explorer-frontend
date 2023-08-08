import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import { useEffect } from 'react';

function NotFound () {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  }

  useEffect(() => {
    document.title = "Ошибка 404 - страница не найдена";
  }, [])

  return (
    <section className="not-found" aria-label="Страница не найдена">
      <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <button onClick={handleClick} className="not-found__link">Назад</button>
    </section >
  )
}

export default NotFound;
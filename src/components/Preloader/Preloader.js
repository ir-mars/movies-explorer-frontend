import "./Preloader.css";

function Preloader ({ text = "Загрузка данных" }) {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
      <span>{text}</span>
    </div>
  );
}

export default Preloader;

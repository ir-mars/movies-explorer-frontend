import './Like.css';

function Like ({ isLiked, handleLikeClick }) {
  return (
    <button
      type="button"
      className={`card__like-button${isLiked ? "card__like-button_active" : ""}`}
      onClick={handleLikeClick}
      title={`${isLiked ? "Удалить из избранного" : "Добавить в избранное"}`}
    >&#10084;</button>
  )
}

export default Like;
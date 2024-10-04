import { UserProps } from "../types/user";
import { MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';
import classes from './User.module.css';
const User = ({ login, avatar_url, followers, following, location }: UserProps) => {
  return (
    <div className={classes.user}>
      <img src={avatar_url} alt={login} />
      <h2>{login}</h2>
      <p className={classes.location}>
        <MdLocationPin />
        <span>{location ? location : "Localização não disponível"}</span> {/* Tratando caso a localização seja nula */}
      </p>
      <div className={classes.stats}>
        <div>
          <p className={classes.follow}>Seguidores:</p>
          <p className={classes.number}>{followers}</p>
        </div>
        <div>
          <p className={classes.follow}>Seguindo:</p>
          <p className={classes.number}>{following}</p>
        </div>
      </div>
      <Link to={`/repos/${login}`}>Ver melhores projetos</Link>
    </div>
  );
};

export default User;
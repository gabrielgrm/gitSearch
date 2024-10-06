import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import classes from './Repos.module.css';

interface RepoProps {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
}

const Repos = () => {
  const { login } = useParams<{ login: string }>();
  const navigate = useNavigate();
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get(`https://api.github.com/users/${login}/repos`);
        const sortedRepos = res.data.sort((a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count);
        setRepos(sortedRepos);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError(true);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [login]);

  if (loading) {
    return <p>Carregando repositórios...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro ao buscar os repositórios.</p>;
  }

  return (
    <div className={classes.reposContainer}>
      <h2>Repositórios de {login}</h2>
      <ul className={classes.reposList}>
        {repos.map(repo => (
          <li key={repo.id} className={classes.repoItem}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <span className={classes.stars}>⭐ {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)} className={classes.backButton}>
        <BiArrowBack className={classes.backIcon} />
      </button>
    </div>
  );
};

export default Repos;
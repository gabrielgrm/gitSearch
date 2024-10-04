import { useState, KeyboardEvent } from 'react';
import { BsSearch } from 'react-icons/bs';
import classes from './Search.module.css';

type SearchProps = {
  loadUser: (user: string) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState("");

  const handleSearch = () => {
    if (userName) {
      loadUser(userName);
    }
  };

  const handleKeyDown = (e:KeyboardEvent) => {
    if(e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className={classes.search}>
      <h2>Busque por usuário:</h2>
      <p>Conheça seus melhores repositórios</p>
      <div className={classes.search_container}>
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
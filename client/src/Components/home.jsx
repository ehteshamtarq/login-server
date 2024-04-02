import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={() => navigate('/login')}
          value={"Log in"}
        />

        <input
          className={"inputButton"}
          type="button"
          onClick={() => navigate('/signup')}
          value={"Sign Up"}
        />
      </div>
    </div>
  );
};

export default Home;

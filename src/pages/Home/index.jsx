import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <p>
        <Link to="/sign-up">Cadastre-se</Link>
      </p>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

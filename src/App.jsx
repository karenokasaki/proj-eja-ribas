import { Route, Routes } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";
import PostarAtividadePage from "./pages/PostarAtividadePage";
import DetailAtividade from "./pages/DetailAtividade";

import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Dashboard />}>
            <Route
              path="/profile"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route
              path="/postar-atividade/:stage"
              element={<ProtectedRoute component={PostarAtividadePage} />}
            />

            <Route
              path="/atividade/:idAtividade"
              element={<ProtectedRoute component={DetailAtividade} />}
            />

            <Route
              path="/editar-perfil"
              element={<ProtectedRoute component={EditProfilePage} />}
            />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;

import { useContext, useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";

import {
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import formatDate from "../../utils/dateFormater";

function AdminPage() {
  const { setLoggedInUser } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();

  const [allPosts, setAllPosts] = useState([]);
  console.log("allPosts", allPosts);

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/users/profile");
      const response2 = await api.get("/posts/admin/all-posts");
      setUser(response.data);
      setAllPosts(response2.data);
      setIsLoading(false);
    }

    fetchUser();
  }, [reload]);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }

  async function handleVisible(e, id) {
    try {
      const response = await api.put(`/posts/${id}`, {
        visible: e.target.checked,
      });
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const statusStyles = {
    success: "bg-green-100 text-green-800",
    processing: "bg-yellow-100 text-yellow-800",
    failed: "bg-gray-100 text-gray-800",
  };

  function findStage(stage) {
    let ETAPAS = [
      { etapa: 1, delivery: "31/03/2023" },
      { etapa: 2, delivery: "31/05/2023" },
      { etapa: 3, delivery: "30/06/2023" },
      { etapa: 4, delivery: "06/07/2023" },
    ];
    let found = ETAPAS.find((cE) => cE.etapa == stage);
    return found.delivery;
  }

  return (
    <>
      {!isLoading && (
        <>
          <main className="flex-1 pb-8">
            {/* Page header */}
            <div className="bg-white shadow">
              <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                  <div className="min-w-0 flex-1">
                    {/* Profile */}
                    <div className="flex items-center">
                      <img
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src={user.photo}
                        alt="foto de perfil"
                      />
                      <div>
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 rounded-full sm:hidden"
                            src={user.photo}
                            alt="foto de perfil"
                          />
                          <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                            {user.name}
                          </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                            <BuildingOfficeIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            Escola Estadual Dr. João Ponse de Arruda
                          </dd>
                          <dt className="sr-only">Account status</dt>
                          <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                            <CheckCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                            ADMINISTRADORA DA PÁGINA
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                    <Link
                      to="/postar-atividade"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Postar Atividade
                    </Link>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      Ver Portifolio
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                ETAPA 1
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul
                  role="list"
                  className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
                >
                  {allPosts
                    .filter((post) => post.stage === "1")
                    .map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/atividade/${post._id}`}
                          className="block bg-white px-4 py-4 hover:bg-gray-50"
                        >
                          <span className="flex items-center space-x-4">
                            <span className="flex flex-1 space-x-2 truncate">
                              <span className="flex flex-col truncate text-sm text-gray-500">
                                <span className="truncate">{post.title}</span>
                              </span>
                            </span>
                            <span className="flex flex-2 space-x-2 truncate">
                              <span className="flex flex-col truncate text-sm text-gray-500">
                                <span className="truncate">{post.stage}</span>
                              </span>
                            </span>
                            <ChevronRightIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className="mt-2 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Título
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Temática
                            </th>
                            <th
                              className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                              scope="col"
                            >
                              Etapa
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Professor
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Entrega
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {allPosts
                            .filter((post) => post.stage === "1")
                            .map((post) => (
                              <tr key={post._id} className="bg-white">
                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    <Link to={`/atividade/${post._id}`}>
                                      {post.title}
                                    </Link>
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {post.theme}
                                  </span>
                                </td>
                                <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                  <span
                                    className={classNames(
                                      statusStyles["success"],
                                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                    )}
                                  >
                                    {post.stage}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  {post.user.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  <time dateTime={post.createdAt}>
                                    {post.createdAt &&
                                      formatDate(post.createdAt)}
                                  </time>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                ETAPA 2
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul
                  role="list"
                  className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
                >
                  {allPosts
                    .filter((post) => post.stage === "2")
                    .map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/atividade/${post._id}`}
                          className="block bg-white px-4 py-4 hover:bg-gray-50"
                        >
                          <span className="flex items-center space-x-4">
                            <span className="flex flex-1 space-x-2 truncate">
                              <span className="flex flex-col truncate text-sm text-gray-500">
                                <span className="truncate">{post.title}</span>
                              </span>
                            </span>
                            <span className="flex flex-2 space-x-2 truncate">
                              <span className="flex flex-col truncate text-sm text-gray-500">
                                <span className="truncate">{post.stage}</span>
                              </span>
                            </span>
                            <ChevronRightIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className="mt-2 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Título
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Temática
                            </th>
                            <th
                              className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                              scope="col"
                            >
                              Etapa
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Professor
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Entrega
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {allPosts
                            .filter((post) => post.stage === "2")
                            .map((post) => (
                              <tr key={post._id} className="bg-white">
                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    <Link to={`/atividade/${post._id}`}>
                                      {post.title}
                                    </Link>
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {post.theme}
                                  </span>
                                </td>
                                <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                  <span
                                    className={classNames(
                                      statusStyles["success"],
                                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                    )}
                                  >
                                    {post.stage}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  {post.user.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  <time dateTime={post.createdAt}>
                                    {post.createdAt &&
                                      formatDate(post.createdAt)}
                                  </time>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                ETAPA 3
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul
                  role="list"
                  className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
                >
                  {allPosts
                    .filter((post) => post.stage === "3")
                    .map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/atividade/${post._id}`}
                          className="block bg-white px-4 py-4 hover:bg-gray-50"
                        >
                          <span className="flex items-center space-x-4">
                            <span className="flex flex-1 space-x-2 truncate">
                              <span className="flex flex-col truncate text-sm text-gray-500">
                                <span className="truncate">{post.title}</span>
                              </span>
                            </span>
                            <span className="flex flex-2 space-x-2 truncate">
                              <span className="flex flex-col truncate text-sm text-gray-500">
                                <span className="truncate">{post.stage}</span>
                              </span>
                            </span>
                            <ChevronRightIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className="mt-2 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Título
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Temática
                            </th>
                            <th
                              className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                              scope="col"
                            >
                              Etapa
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Professor
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Entrega
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {allPosts
                            .filter((post) => post.stage === "3")
                            .map((post) => (
                              <tr key={post._id} className="bg-white">
                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    <Link to={`/atividade/${post._id}`}>
                                      {post.title}
                                    </Link>
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {post.theme}
                                  </span>
                                </td>
                                <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                  <span
                                    className={classNames(
                                      statusStyles["success"],
                                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                    )}
                                  >
                                    {post.stage}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  {post.user.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  <time dateTime={post.createdAt}>
                                    {post.createdAt &&
                                      formatDate(post.createdAt)}
                                  </time>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
                ETAPA 4
              </h2>

              {/* Activity list (smallest breakpoint only) */}
              <div className="shadow sm:hidden">
                <ul
                  role="list"
                  className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
                >
                  {allPosts
                    .filter((post) => post.stage === "4")
                    .map((post) => (
                      <li key={post._id}>
                        <Link
                          to={`/atividade/${post._id}`}
                          className="block bg-white px-4 py-4 hover:bg-gray-50"
                        >
                          <span className="flex items-center space-x-4">
                            <span className="flex flex-1 space-x-2 truncate">
                              <span className="flex flex-col truncate text-sm text-gray-500">
                                <span className="truncate">{post.title}</span>
                              </span>
                            </span>
                            <span className="flex flex-2 space-x-2 truncate">
                              <span className="flex flex-col truncate text-sm text-gray-500">
                                <span className="truncate">{post.stage}</span>
                              </span>
                            </span>
                            <ChevronRightIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Activity table (small breakpoint and up) */}
              <div className="hidden sm:block">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className="mt-2 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Título
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Temática
                            </th>
                            <th
                              className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                              scope="col"
                            >
                              Etapa
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Professor
                            </th>
                            <th
                              className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                              scope="col"
                            >
                              Entrega
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {allPosts
                            .filter((post) => post.stage === "4")
                            .map((post) => (
                              <tr key={post._id} className="bg-white">
                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    <Link to={`/atividade/${post._id}`}>
                                      {post.title}
                                    </Link>
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {post.theme}
                                  </span>
                                </td>
                                <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                                  <span
                                    className={classNames(
                                      statusStyles["success"],
                                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                    )}
                                  >
                                    {post.stage}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  {post.user.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                                  <time dateTime={post.createdAt}>
                                    {post.createdAt &&
                                      formatDate(post.createdAt)}
                                  </time>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <div className="inline-flex items-center justify-center">
            <button
              className="inline-flex items-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              onClick={handleLogOut}
            >
              Sair
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default AdminPage;
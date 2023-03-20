import { useEffect, useReducer, useState } from "react";
import { api } from "../../api/api";
import formatDate from "../../utils/dateFormater";
import { useParams } from "react-router-dom";

function PortifolioPage() {
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userName, idUser } = useParams();

  useEffect(() => {
    const formattedStr = userName.replace(/-/g, " ");
    setUser(formattedStr);
  }, [isLoading]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await api.get(`/posts/unprotect/${idUser}`);
      setPosts(response.data);
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

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
      <h1 className="text-4xl text-white py-4 block text-center mt-6 font-bold tracking-tight bg-teal-700">
        Portifolio {user}
      </h1>
      {!isLoading && posts.length > 0 && (
        <>
          <div className="mx-auto mt-6 mb-6 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              {posts &&
                posts
                  .filter((post) => post.visible)
                  .map((post) => {
                    return (
                      <section
                        key={post._id}
                        aria-labelledby="applicant-information-title"
                      >
                        <div className="bg-white shadow sm:rounded-lg">
                          <div className="px-4 py-5 sm:px-6">
                            <h2
                              id="applicant-information-title"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              {post.title}
                            </h2>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              {post.theme} - {post.areaOfKnowledge}
                            </p>
                          </div>
                          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Temática
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {post.theme}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Etapa
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {post.stage}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Prazo limite da entrega
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {post.stage && findStage(post.stage)}
                                </dd>
                              </div>
                              <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                  Atividade entregue
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {post.createdAt && formatDate(post.createdAt)}
                                </dd>
                              </div>
                              <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">
                                  Descrição
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  {post.description}
                                </dd>
                              </div>
                              <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">
                                  Anexos
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                  <ul
                                    role="list"
                                    className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                                  >
                                    {post.photos?.map((photo, i) => (
                                      <li key={`${photo}${i}`}>
                                        <img
                                          className=" w-full rounded-2xl object-cover"
                                          src={photo}
                                          alt={photo}
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </section>
                    );
                  })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PortifolioPage;

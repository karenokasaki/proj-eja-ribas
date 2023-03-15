import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../api/api";

import { PaperClipIcon } from "@heroicons/react/20/solid";

function DetailAtividade() {
  const { idAtividade } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/posts/${idAtividade}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }

    fetchPost();
  }, []);

  console.log("post", post);

  return (
    <div>
      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          {/* Description list*/}
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {post.title}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {post.theme}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Temática
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{post.theme}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Etapa</dt>
                    <dd className="mt-1 text-sm text-gray-900">{post.stage}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Prazo limite da entrega
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">30/03/2022</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Atividade entregue
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {post.createdAt?.slice(0, 10)}
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
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        {post.photos?.map((photo) => (
                          <li
                            key={photo}
                            className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                          >
                            <div className="flex w-0 flex-1 items-center">
                              <PaperClipIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-2 w-0 flex-1 truncate">
                                {photo}
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href={photo}
                                className="font-medium text-blue-600 hover:text-blue-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <a
                  href="#"
                  className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                >
                  Ver anexos
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DetailAtividade;

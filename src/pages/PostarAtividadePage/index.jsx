import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { TrashIcon } from "@heroicons/react/24/outline";
import PDFViewer from "../../components/PDFViewer";

function PostarAtividadePage() {
  const { stage } = useParams();
  const navigate = useNavigate();

  const [imgs, setImgs] = useState([]);
  const [form, setForm] = useState({
    stage: stage,
    theme: "",
    title: "",
    description: "",
  });
  const [pdf, setPdf] = useState([]);

  useEffect(() => {
    setForm({
      stage: stage,
      theme: "",
      title: "",
      description: "",
    });
  }, [stage]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

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

  async function handleUpload(e) {
    console.log("handleupdate");
    try {
      const uploadData = new FormData();
      uploadData.append("picture", e.target.files[0]);

      const response = await api.post("/upload-image", uploadData);
      setImgs([...imgs, response.data.url]);

      alert("Foto adiciona com sucesso");
    } catch (error) {
      console.log(error);
      alert("Algo deu errado");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/posts", {
        ...form,
        photos: imgs,
        pdf: pdf,
      });
      console.log(response);
      navigate(`/atividade/${response.data._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePhoto(i, url) {
    let clone = [...imgs];
    clone.splice(i, 1);
    setImgs(clone);

    try {
      const publicId = url.split("/").slice(-1)[0].split(".")[0];

      const response = await api.delete(
        `/upload-image/delete-image/${publicId}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Algo deu errado");
    }
  }

  async function handleFileChange(event) {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "ml_default");
    formData.append("resource_type", "auto");

    console.log(formData);

    const response = await api.post("/upload-image/pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setPdf([...pdf, response.data.url]);
  }

  async function handleDeletePdf(i, url) {
    let clone = [...pdf];
    clone.splice(i, 1);
    setPdf(clone);

    try {
      const publicId = url.split("/").slice(-1)[0].split(".")[0];

      const response = await api.delete(
        `/upload-image/delete-image/${publicId}`
      );
    } catch (error) {
      console.log(error);
      alert("Algo deu errado");
    }
  }

  return (
    <div className="mt-6 mb-6 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols">
      <div className="bg-white shadow sm:rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200 p-7"
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Atividade - Etapa {stage}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Entrega para o dia {findStage(stage)}
                </p>
              </div>

              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Titulo
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={form.value}
                      onChange={handleChange}
                      className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Temática
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <input
                      id="theme"
                      type="text"
                      name="theme"
                      value={form.theme}
                      onChange={handleChange}
                      className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Área de conhecimento
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <select
                      id="areaOfKnowledge"
                      name="areaOfKnowledge"
                      className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    >
                      <option>Selecione uma opção</option>
                      <option>linguagens</option>
                      <option>ciências humanas</option>
                      <option>ciências da natureza</option>
                      <option>matemática</option>
                    </select>
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Descrição
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={10}
                      className="block w-full max-w-lg rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Adicionar foto
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload de fotos</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleUpload}
                              accept="image/jpeg, image/png"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, até 4MB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* adicionar arquivo ainda não está funcionando */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Adicionar Arquivo
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <input
                              type="file"
                              accept="application/pdf"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">apenas PDF.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-8 sm:space-y-2 sm:pt-2">
                <ul
                  role="list"
                  className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-8 items-center sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                  {imgs.map((photo, i) => (
                    <li key={`${photo}${i}`}>
                      <img
                        className=" w-full rounded-2xl object-cover"
                        src={photo}
                        alt={photo}
                      />
                      <button
                        onClick={() => handleDeletePhoto(i, photo)}
                        className="flex justify-items-end"
                      >
                        <TrashIcon className="h-6 w-6 text-red-600" /> Excluir
                      </button>
                    </li>
                  ))}
                </ul>

                <ul
                  role="list"
                  className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-8 items-center sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                  {pdf?.map((url, i) => (
                    <li key={url + i}>
                      <PDFViewer key={`${url}${i}`} url={url}></PDFViewer>
                      <button
                        onClick={() => handleDeletePdf(i, url)}
                        className="flex justify-items-end"
                      >
                        <TrashIcon className="h-6 w-6 text-red-600" /> Excluir
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end gap-x-3">
              <button
                type="button"
                className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostarAtividadePage;

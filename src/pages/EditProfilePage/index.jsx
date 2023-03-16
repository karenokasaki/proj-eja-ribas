import { useState, useEffect, useRef } from "react";
import { api } from "../../api/api";

function EditProfilePage() {
  const [user, setUser] = useState({});
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/users/profile");
      setUser(response.data);
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleUpload(e) {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", e.target.files[0]);

      const response = await api.post("/upload-image", uploadData);
      setUser({ ...user, photo: response.data.url });
      await api.put("/users/profile/update", {
        photo: response.data.url,
      });
      alert("Foto adiciona com sucesso");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.put("/users/profile/update", user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePhoto(e) {
    try {
      e.preventDefault();
      await api.put("/users/profile/update", {
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYE2EOfj-iQsL0fUlsZ1GxmRBpN0XJhpVZ3UEZi1Q8SBGkseVjrlwl4IO7aOTraRAeClU&usqp=CAU",
      });
      setUser({
        ...user,
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYE2EOfj-iQsL0fUlsZ1GxmRBpN0XJhpVZ3UEZi1Q8SBGkseVjrlwl4IO7aOTraRAeClU&usqp=CAU",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-1 xl:overflow-y-auto">
      <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Editar conta
        </h1>
        {!isLoading && (
          <form className="divide-y-slate-200 mt-6 space-y-8 divide-y">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-slate-900">Perfil</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Essas informações estarão disponíveis no seu portifólio.
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  id="first-name"
                  autoComplete="given-name"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Escola
                </label>
                <input
                  type="text"
                  name="school"
                  value={user.school}
                  id="school"
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Curso
                </label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  value={user.course}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center">
                  <img
                    className="inline-block h-24 w-24 rounded-full"
                    src={img || user.photo}
                    alt="profile"
                  />
                  <div className="relative ml-4">
                    <input
                      type="file"
                      className="peer absolute inset-0 h-full w-full rounded-md opacity-0"
                      onChange={handleUpload}
                    />
                    <label
                      htmlFor="user-photo"
                      className="pointer-events-none block rounded-md bg-white py-2 px-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 peer-hover:bg-slate-50 peer-focus:ring-2 peer-focus:ring-blue-600"
                    >
                      <span>Change</span>
                      <span className="sr-only"> user photo</span>
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={deletePhoto}
                    className="ml-6 text-sm font-medium leading-6 text-slate-900"
                  >
                    Remover
                  </button>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Fale um pouco sobre você
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="about"
                    value={user.about}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full rounded-md border-0 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:py-1.5 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Uma breve descrição sobre você e seu trabalho.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-x-3 pt-8">
              <button
                type="button"
                className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={handleSubmit}
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditProfilePage;

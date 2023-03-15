function EditProfilePage() {
  return (
    <div className="flex-1 xl:overflow-y-auto">
      <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Editar conta
        </h1>

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
                name="first-name"
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
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
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
                name="url"
                id="url"
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
                name="url"
                id="url"
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
                  className="inline-block h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                  alt=""
                />
                <div className="relative ml-4">
                  <input
                    id="user-photo"
                    name="user-photo"
                    type="file"
                    className="peer absolute inset-0 h-full w-full rounded-md opacity-0"
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
                  className="ml-6 text-sm font-medium leading-6 text-slate-900"
                >
                  Remove
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
                  name="description"
                  rows={4}
                  className="block w-full rounded-md border-0 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:py-1.5 sm:text-sm sm:leading-6"
                  defaultValue={""}
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
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;

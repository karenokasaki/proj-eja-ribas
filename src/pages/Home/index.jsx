import { Link, useNavigate } from "react-router-dom";
import { Fragment, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import eja from "../../assets/eja.jpeg";
import jopa from "../../assets/jopa.jpeg";
import { api } from "../../api/api";

export function Home() {
  const coordRef = useRef(null);
  const signupRef = useRef(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const navigation = [{ name: "Cadastre-se" }, { name: "Coordenação" }];
  const collabs = [
    {
      id: 1,
      person: "Almira Rodrigues da Mata",
      about:
        "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      id: 2,
      person: "Outra pessoa",
      about:
        "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      id: 3,
      person: "Outra pessoa",
      about:
        "You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
  ];
  const footerNavigation = {
    social: [
      {
        name: "GitHub",
        href: "https://github.com/karenokasaki",
        icon: (props) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/karen-okasaki",
        icon: (props) => (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path
              d="M20 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V6C22 4.89543 21.1046 4 20 4ZM9.65458 18.6004H6.94717V9.45044H9.65458V18.6004ZM8.30187 8.84705H8.28067C7.55751 8.84705 7 8.29033 7 7.56717C7 6.83431 7.55751 6.27759 8.30187 6.27759C9.04623 6.27759 9.60374 6.83431 9.60374 7.56717C9.60374 8.29033 9.04623 8.84705 8.30187 8.84705ZM19.3859 18.6004H16.6785V13.4038C16.6785 12.2252 16.2209 11.4586 15.1701 11.4586C14.4177 11.4586 13.9783 12.0395 13.8104 12.5514C13.7472 12.7155 13.7325 13.007 13.7325 13.2985V18.6004H11.0251C11.0251 18.6004 11.1082 10.7148 11.0251 9.45044H13.7325V10.5859C14.2451 9.79487 15.0402 8.97205 16.8472 8.97205C19.4062 8.97205 19.3859 11.2363 19.3859 13.1419V18.6004Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
  };

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/users/sign-up", { ...form });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  console.log(form);
  return (
    <div className="bg-white">
      <header className="relative bg-sky-800 pb-24 sm:pb-32">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
            alt=""
          />
          <div
            className="absolute inset-0 bg-gradient-to-l from-sky-800 to-cyan-700 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <Popover as="div" className="relative z-10">
          <nav
            className="relative mx-auto flex max-w-7xl items-center justify-between px-6 pt-6 pb-2 lg:px-8"
            aria-label="Global"
          >
            <div className="flex w-full items-center justify-between lg:w-auto">
              <a href="#">
                <span className="sr-only">Eja</span>
                <img className="h-20 w-auto sm:h-24" src={eja} alt="eja" />
              </a>
              <div className="-mr-2 flex items-center lg:hidden">
                <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-sky-800 bg-opacity-0 p-2 text-cyan-100 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden space-x-10 lg:ml-10 lg:flex">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.name === "Coordenação") scrollToRef(coordRef);
                    else scrollToRef(signupRef);
                  }}
                  className="text-base font-medium text-white hover:text-cyan-100"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <a
                href="#"
                className="rounded-md border border-transparent bg-white bg-opacity-10 py-2 px-6 text-base font-medium text-white hover:bg-opacity-20"
              >
                Entrar
              </a>
            </div>
          </nav>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 origin-top transform p-2 transition lg:hidden"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <img className="h-20 w-auto" src={eja} alt="eja" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-stone-400 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                      <span className="sr-only">Fechar menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          if (item.name === "Coordenação")
                            scrollToRef(coordRef);
                          else scrollToRef(signupRef);
                        }}
                        className="block rounded-md px-3 py-2 text-base font-medium text-stone-900 hover:bg-stone-50"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                    <a
                      href="#"
                      className="block w-full rounded-md border border-transparent bg-green-400 py-2 px-4 text-center font-medium text-white shadow hover:bg-green-500"
                    >
                      Entrar
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <div className="relative mx-auto mt-24 max-w-md px-6 sm:mt-32 sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Conectando saberes
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-cyan-100">
            Plataforma de acompanhamento da profissionalização de professores do
            EJA 2023 especialmente criada para professores da Escola Estadual
            Dr. João Ponce de Arruda.
          </p>
        </div>
      </header>

      <main>
        {/* Side-by-side grid */}
        <div className="bg-white" ref={signupRef}>
          <div className="mx-auto max-w-md py-18 px-6 sm:max-w-3xl sm:py-8 lg:max-w-7xl lg:px-8">
            <div className="divide-y divide-stone-200">
              <section aria-labelledby="contact-heading">
                <h2
                  id="contact-heading"
                  className="text-2xl font-bold text-stone-900 sm:text-3xl sm:tracking-tight"
                ></h2>

                <div className="pt-8">
                  <div>
                    <h3 className="text-3xl font-semibold  leading-6 text-gray-900">
                      Professor cadastre-se na plataforma
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Use a plataforma para publicar suas atividades e guardar
                      seus relatórios.
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nome completo
                      </label>
                      <div className="mt-2">
                        <input
                          id="formName"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Telefone
                      </label>
                      <div className="mt-2">
                        <input
                          type="phone"
                          name="phone"
                          id="phone"
                          value={form.phone}
                          onChange={handleChange}
                          autoComplete="phone"
                          className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          id="formEmail"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Senha
                      </label>
                      <div className="mt-2">
                        <input
                          id="formPassword"
                          name="password"
                          type="password"
                          value={form.password}
                          onChange={handleChange}
                          autoComplete="password"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mt-12 rounded-md border border-transparent bg-green-700 bg-opacity-2 py-2 px-6 text-base font-medium text-white hover:bg-opacity-80"
                >
                  Cadastrar
                </button>
              </section>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="relative pt-4">
          <div
            className="absolute left-0 right-0 h-1/2 bg-stone-50"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <div className="rounded-3xl bg-gradient-to-l from-sky-800 to-cyan-700 py-10 px-6 sm:py-16 sm:px-12 lg:flex lg:items-center lg:py-20 lg:px-20">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Escola Estadual Dr. João Ponce de Arruda
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-cyan-100">
                  Um pouco da história da escola.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-5 sm:w-full sm:flex-row lg:mt-0 lg:ml-8 lg:flex-1">
                <img
                  src={jopa}
                  alt="logo da escola"
                  className="w-56 rounded-full"
                />
                <img
                  src={eja}
                  alt="logo da escola"
                  className="w-56 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-stone-50" ref={coordRef}>
          <div className="mx-auto max-w-md py-6 px-6 sm:max-w-3xl sm:py-12 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-stone-900">
                  Coordenação
                </h2>
                <p className="mt-4 text-lg text-stone-500">
                  Quem está por trás do{" "}
                  <span
                    href="#"
                    className="font-medium text-cyan-700 hover:text-cyan-600"
                  >
                    projeto
                  </span>
                  .
                </p>
              </div>
              <div className="mt-12 lg:col-span-2 lg:mt-0">
                <dl className="space-y-12">
                  {collabs.map((cE) => (
                    <div key={cE.id}>
                      <dt className="text-lg font-medium text-stone-900">
                        {cE.person}
                      </dt>
                      <dd className="mt-2 text-base text-stone-500">
                        {cE.about}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-md py-4 px-6 sm:max-w-3xl sm:py-8 lg:max-w-7xl lg:px-8">
          <div className="border-t border-stone-200 pt-8 flex">
            <p className="text-base text-stone-400 xl:text-center">
              &copy; 2023 Karen Okasaki. All rights reserved.
            </p>
            {footerNavigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-stone-400 hover:text-stone-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

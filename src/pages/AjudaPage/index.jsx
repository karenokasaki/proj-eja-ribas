function AjudaPage() {
  return (
    <div className="mt-6 mb-6 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="p-4 border rounded-md m-3 text-lg bg-slate-100 lg:p-6">
          <p>
            Essa plataforma foi desenvolvida para ajudar os professores a se
            organizarem com suas atividades entregáveis.
          </p>
          <p>
            Guarde aqui as informações de suas atividades para que no fim das
            etapas elas estejam reunidas em um só lugar e já formatadas.
          </p>
        </div>

        <div className="px-3 py-3 border rounded-md m-3 lg:p-6">
          <p className="bg-slate-400 p-2 rounded-md text-lg text-white font-semibold">
            Quem pode ver minhas atividades?
          </p>
          <p className="px-3">
            Todas as atividades que estiverem como visíveis estarão
            disponibilizadas em seu portifólio e poderão ser acessadas por
            qualquer pessoa que tenha o link da sua pagina.
          </p>
          <p className="font-semibold text-slate-700 px-3">
            IMPORTANTE: Sua coordenadora verá sua atividade independente se ela
            está visível ou não.
          </p>
        </div>

        <div className="px-3 py-3 border rounded-md m-3 lg:p-6">
          <p className="bg-slate-400 p-2 rounded-md text-lg text-white font-semibold">
            Como posso compartilhar meu portifólio?
          </p>
          <p className="px-3">
            No menu, clique em "Portifolio" e envie o link dessa página para
            qualquer pessoa que você queira.
          </p>
        </div>

        <div className="px-3 py-3 border rounded-md m-3 lg:p-6">
          <p className="bg-slate-400 p-2 rounded-md text-lg text-white font-semibold">
            Posso adicionar várias fotos e arquivos?
          </p>
          <p className="px-3">
            Sim!! Fique a vontade para adicionar quantas fotos e PDFs forem
            necessários para sua atividade, só lembre-se de que as fotos e PDF's
            não podem ter mais de 4MB.
          </p>
        </div>

        <div className="px-3 py-3 border rounded-md m-3 lg:p-6">
          <p className="bg-slate-400 p-2 rounded-md text-lg text-white font-semibold">
            Minha imagem está muito pequena, o que eu faço?
          </p>
          <p className="px-3">
            Ao clicar na imagem ela irá abrir em outra janela em seu tamanho
            original. Lá você também poderá salva-lá.
          </p>
        </div>
        <div className="px-3 py-3 border rounded-md m-3 lg:p-6">
          <p className="bg-slate-400 p-2 rounded-md text-lg text-white font-semibold">
            Postei minha atividade porém preciso fazer uma alteração. E agora?
          </p>
          <p className="px-3">
            Abra a atividade e encontre o botão "Editar Atividade" no canto
            inferior direito da tela.
          </p>
        </div>

        <div className="px-3 py-3 border rounded-md m-3 lg:p-6">
          <p className="bg-slate-400 p-2 rounded-md text-lg text-white font-semibold">
            Posso postar mais de uma atividade por etapa?
          </p>
          <p className="px-3">
            Sim! Poste quantas atividades por etapa forem necessárias.
          </p>
        </div>

        <div className="px-3 py-3 border rounded-md m-3 lg:p-6">
          <p className="bg-slate-400 p-2 rounded-md text-lg text-white font-semibold">
            Como posso adicionar uma foto em meu perfil?
          </p>
          <p className="px-3">
            No menu, clique em "Editar Perfil". Nessa página você poderá alterar
            todas as informações sobre seu perfil, como também adicionar ou
            remover sua foto.
          </p>
        </div>

        <div className="px-3 py-3 border rounded-md m-3 lg:p-6">
          <p className="bg-slate-400 p-2 rounded-md text-lg text-white font-semibold">
            Ainda precisa de ajuda com a plataforma?{" "}
          </p>
          <p className="px-3">
            Por favor envie sua dúvida ao email: oks.karen@gmail.com que
            entraremos em contato o mais breve possível.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AjudaPage;

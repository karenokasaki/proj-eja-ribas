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

export default findStage;

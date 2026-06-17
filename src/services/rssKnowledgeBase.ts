import { WasteGroup } from '../types';

export interface RssKnowledgeAnswer {
  id: string;
  group: WasteGroup;
  question: string;
  answer: string;
  reference: string;
  keywords: string[];
}

const fallbackByGroup: Record<WasteGroup, RssKnowledgeAnswer> = {
  A: {
    id: 'a-fallback',
    group: 'A',
    question: 'Nao encontrei uma resposta direta',
    answer:
      'Nao encontrei uma resposta segura na base estruturada para esta duvida. Para o Grupo A, confirme o subgrupo A1 a A5, se ha tratamento obrigatorio, presenca de sangue ou liquidos corporeos na forma livre e o fluxo previsto no PGRSS da unidade.',
    reference: 'RDC 222/2018, Anexo I, Arts. 13 a 17 e Art. 55',
    keywords: [],
  },
  B: {
    id: 'b-fallback',
    group: 'B',
    question: 'Nao encontrei uma resposta direta',
    answer:
      'Nao encontrei uma resposta segura na base estruturada para esta duvida. Para o Grupo B, confira a periculosidade, FISPQ quando aplicavel, compatibilidade quimica, estado fisico e o PGRSS antes de acondicionar ou destinar o residuo.',
    reference: 'RDC 222/2018, Arts. 18, 19, 56, 57, 58 e 60',
    keywords: [],
  },
  C: {
    id: 'c-fallback',
    group: 'C',
    question: 'Nao encontrei uma resposta direta',
    answer:
      'Nao encontrei uma resposta segura na base estruturada para esta duvida. Para o Grupo C, o manejo deve seguir o Plano de Protecao Radiologica, normas da CNEN e orientacao do supervisor de protecao radiologica.',
    reference: 'RDC 222/2018, Arts. 20, 33 e 72 a 79',
    keywords: [],
  },
  D: {
    id: 'd-fallback',
    group: 'D',
    question: 'Nao encontrei uma resposta direta',
    answer:
      'Nao encontrei uma resposta segura na base estruturada para esta duvida. Para o Grupo D, confirme se nao ha sinal ou suspeita de contaminacao biologica, quimica ou radiologica e siga o PGRSS e as orientacoes da limpeza urbana.',
    reference: 'RDC 222/2018, Arts. 21, 22 e 80 a 84',
    keywords: [],
  },
  E: {
    id: 'e-fallback',
    group: 'E',
    question: 'Nao encontrei uma resposta direta',
    answer:
      'Nao encontrei uma resposta segura na base estruturada para esta duvida. Para o Grupo E, trate como perfurocortante quando houver ponta, corte ou risco de escarificacao, e identifique tambem riscos biologicos, quimicos ou radiologicos associados.',
    reference: 'RDC 222/2018, Arts. 86 a 89',
    keywords: [],
  },
};

export const rssKnowledgeBase: Record<WasteGroup, RssKnowledgeAnswer[]> = {
  A: [
    {
      id: 'a-definition',
      group: 'A',
      question: 'O que entra no Grupo A?',
      answer:
        'Grupo A inclui residuos com possivel presenca de agentes biologicos que, por suas caracteristicas, podem apresentar risco de infeccao. A classificacao deve considerar os subgrupos A1 a A5.',
      reference: 'RDC 222/2018, Anexo I - Grupo A',
      keywords: ['grupo a', 'infectante', 'biologico', 'agente biologico', 'infeccao', 'subgrupo'],
    },
    {
      id: 'a-gloves-depends',
      group: 'A',
      question: 'Posso descartar luvas no Grupo A?',
      answer:
        'Depende. Luvas com sangue, liquidos corporeos na forma livre, secrecoes ou suspeita de contaminacao biologica devem seguir o fluxo do risco biologico definido no PGRSS. Luvas sem sinais ou suspeita de contaminacao biologica, quimica ou radiologica podem ser manejadas como Grupo D.',
      reference: 'RDC 222/2018, Anexo I - Grupo A e Art. 82',
      keywords: ['luva', 'luvas', 'descartar luva', 'descartar luvas', 'luva usada', 'luvas usadas', 'posso descartar luvas'],
    },
    {
      id: 'a-gloves-contaminated',
      group: 'A',
      question: 'Luva com sangue ou secrecao vai em qual grupo?',
      answer:
        'Luvas com sangue, liquidos corporeos na forma livre, secrecoes ou suspeita de contaminacao biologica nao devem ir para lixo comum. Classifique pelo risco biologico e siga o fluxo do Grupo A previsto no PGRSS.',
      reference: 'RDC 222/2018, Anexo I - Grupo A',
      keywords: ['luva com sangue', 'luvas com sangue', 'secrecao', 'secrecoes', 'fluido', 'liquido corporeo', 'contaminada', 'contaminadas'],
    },
    {
      id: 'a-white-bag',
      group: 'A',
      question: 'Quando usar saco branco leitoso?',
      answer:
        'Use saco branco leitoso para RSS do Grupo A que nao precisam obrigatoriamente de tratamento e para RSS apos tratamento. Esses rejeitos devem seguir para disposicao final ambientalmente adequada.',
      reference: 'RDC 222/2018, Art. 15',
      keywords: ['saco branco', 'branco leitoso', 'apos tratamento', 'sem tratamento', 'rejeito'],
    },
    {
      id: 'a-red-bag',
      group: 'A',
      question: 'Quando usar saco vermelho?',
      answer:
        'Quando houver obrigacao de tratamento dos RSS do Grupo A, eles devem ser acondicionados em saco vermelho. O saco branco pode substituir em algumas regras locais de tratamento indiscriminado, exceto para o subgrupo A5.',
      reference: 'RDC 222/2018, Art. 16',
      keywords: ['saco vermelho', 'tratamento obrigatorio', 'autoclave', 'autoclavacao', 'tratar'],
    },
    {
      id: 'a-a5',
      group: 'A',
      question: 'Como manejar o subgrupo A5?',
      answer:
        'RSS do subgrupo A5 devem ser segregados em saco vermelho duplo, contidos em recipiente exclusivo devidamente identificado e encaminhados para tratamento por incineracao.',
      reference: 'RDC 222/2018, Art. 55',
      keywords: ['a5', 'prion', 'saco vermelho duplo', 'incineracao', 'duplo'],
    },
    {
      id: 'a-bag-limit',
      group: 'A',
      question: 'Qual o limite de uso do saco do Grupo A?',
      answer:
        'Os sacos do Grupo A devem ser substituidos ao atingir 2/3 da capacidade ou a cada 48 horas, independentemente do volume. Residuos de facil putrefacao devem ser substituidos em ate 24 horas.',
      reference: 'RDC 222/2018, Art. 14',
      keywords: ['2/3', 'dois tercos', '48 horas', '24 horas', 'putrefacao', 'limite', 'encher'],
    },
    {
      id: 'a-collector',
      group: 'A',
      question: 'Como deve ser o coletor do saco de RSS?',
      answer:
        'O coletor do saco deve ser liso, lavavel, resistente a punctura, ruptura, vazamento e tombamento, com tampa sem contato manual e cantos arredondados, salvo situacoes de substituicao imediata do saco apos procedimento.',
      reference: 'RDC 222/2018, Art. 17',
      keywords: ['coletor', 'lixeira', 'tampa', 'pedal', 'sem contato', 'cantos arredondados'],
    },
    {
      id: 'a-culture',
      group: 'A',
      question: 'Culturas e placas de Petri podem sair sem tratamento?',
      answer:
        'Culturas, estoques de microrganismos, meios de cultura e instrumentais usados para inoculacao/mistura de culturas pertencem ao subgrupo A1 e exigem fluxo de tratamento quando aplicavel antes de sair da unidade, conforme PGRSS.',
      reference: 'RDC 222/2018, Anexo I - Subgrupo A1 e Art. 16',
      keywords: ['cultura', 'placa', 'petri', 'meio de cultura', 'microorganismo', 'a1', 'laboratorio'],
    },
    {
      id: 'a-clean-paper',
      group: 'A',
      question: 'Papel limpo ou embalagem limpa vai no Grupo A?',
      answer:
        'Nao. Material sem sinal ou suspeita de contaminacao biologica, quimica ou radiologica pode ter manejo como Grupo D. Nao use o fluxo infectante para residuos limpos apenas por estarem em area de saude.',
      reference: 'RDC 222/2018, Art. 82',
      keywords: ['papel limpo', 'embalagem limpa', 'invólucro', 'involucro', 'sem contaminacao', 'limpo'],
    },
  ],
  B: [
    {
      id: 'b-definition',
      group: 'B',
      question: 'O que entra no Grupo B?',
      answer:
        'Grupo B abrange residuos contendo produtos quimicos que apresentam periculosidade a saude publica ou ao meio ambiente, conforme inflamabilidade, corrosividade, reatividade, toxicidade, carcinogenicidade, teratogenicidade, mutagenicidade e quantidade.',
      reference: 'RDC 222/2018, Anexo I - Grupo B e Art. 56',
      keywords: ['grupo b', 'quimico', 'toxico', 'corrosivo', 'inflamavel', 'reativo', 'periculosidade'],
    },
    {
      id: 'b-liquid',
      group: 'B',
      question: 'Como acondicionar residuo quimico liquido?',
      answer:
        'RSS liquidos devem ser acondicionados em recipiente compativel com o liquido, resistente, rigido, estanque, com tampa que garanta contencao e identificacao adequada.',
      reference: 'RDC 222/2018, Art. 18',
      keywords: ['liquido', 'efluente', 'frasco', 'estanque', 'tampa', 'vazamento'],
    },
    {
      id: 'b-solid',
      group: 'B',
      question: 'Como acondicionar residuo quimico solido?',
      answer:
        'RSS quimicos solidos devem ser acondicionados em recipiente rigido, resistente, compativel com as caracteristicas do produto quimico e identificado conforme o risco.',
      reference: 'RDC 222/2018, Art. 19',
      keywords: ['solido', 'recipiente rigido', 'po', 'comprimido', 'medicamento vencido'],
    },
    {
      id: 'b-incompatible',
      group: 'B',
      question: 'Posso misturar residuos quimicos?',
      answer:
        'Nao misture substancias quimicas incompatíveis. O acondicionamento deve observar incompatibilidades quimicas e separar riscos conforme PGRSS, FISPQ e anexos da RDC.',
      reference: 'RDC 222/2018, Art. 60 e Anexos III/IV',
      keywords: ['misturar', 'mistura', 'incompativel', 'incompatibilidade', 'reagir', 'explodir', 'gases'],
    },
    {
      id: 'b-liquid-destination',
      group: 'B',
      question: 'Liquido quimico perigoso pode ir para aterro?',
      answer:
        'Nao. RSS do Grupo B com periculosidade no estado liquido devem ser tratados antes da disposicao final, e e vedado encaminhar RSS liquido para disposicao final em aterros sanitarios.',
      reference: 'RDC 222/2018, Art. 58',
      keywords: ['aterro', 'liquido perigoso', 'descarte liquido', 'pia', 'esgoto', 'tratamento'],
    },
    {
      id: 'b-solid-destination',
      group: 'B',
      question: 'Qual destino para rejeito quimico solido perigoso?',
      answer:
        'RSS do Grupo B no estado solido, com caracteristicas de periculosidade e considerados rejeitos, devem ser dispostos em aterro de residuos perigosos Classe I.',
      reference: 'RDC 222/2018, Art. 57',
      keywords: ['classe i', 'aterro classe i', 'rejeito solido', 'solido perigoso'],
    },
    {
      id: 'b-medicine',
      group: 'B',
      question: 'Medicamentos perigosos seguem qual regra?',
      answer:
        'Medicamentos como hormonais, antimicrobianos, citostaticos, antineoplasicos, imunossupressores, digitálicos, imunomoduladores e antirretrovirais devem ser submetidos a tratamento ou dispostos em aterro de residuos perigosos Classe I.',
      reference: 'RDC 222/2018, Art. 59',
      keywords: ['medicamento', 'antineoplasico', 'quimioterapico', 'antimicrobiano', 'hormonal', 'antirretroviral'],
    },
    {
      id: 'b-mercury',
      group: 'B',
      question: 'Mercurio ou metal pesado entra em qual grupo?',
      answer:
        'Residuos contendo metais pesados, como mercurio, enquadram-se como Grupo B. Se houver vidro quebrado ou material cortante, tambem ha risco perfurocortante associado e o recipiente deve identificar todos os riscos.',
      reference: 'RDC 222/2018, Anexo I - Grupo B e Art. 88',
      keywords: ['mercurio', 'metal pesado', 'termometro', 'vidro quebrado', 'risco associado'],
    },
  ],
  C: [
    {
      id: 'c-definition',
      group: 'C',
      question: 'O que entra no Grupo C?',
      answer:
        'Grupo C inclui material que contenha radionuclideo em quantidade superior aos niveis de dispensa especificados pela CNEN, quando a reutilizacao e impropria ou nao prevista.',
      reference: 'RDC 222/2018, Anexo I - Grupo C',
      keywords: ['grupo c', 'radioativo', 'radionuclideo', 'radiacao', 'cnen', 'rejeito radioativo'],
    },
    {
      id: 'c-ppr',
      group: 'C',
      question: 'Quem define o manejo do rejeito radioativo?',
      answer:
        'O gerenciamento do Grupo C deve obedecer ao Plano de Protecao Radiologica do servico, normas da CNEN e demais normas aplicaveis, com procedimentos definidos pelo supervisor de protecao radiologica.',
      reference: 'RDC 222/2018, Arts. 20 e 33',
      keywords: ['ppr', 'plano de protecao', 'supervisor', 'cnen', 'quem define', 'responsavel'],
    },
    {
      id: 'c-segregation',
      group: 'C',
      question: 'Como segregar rejeitos radioativos?',
      answer:
        'Rejeitos radioativos devem ser segregados por radionuclideo ou natureza da radiacao, estado fisico, concentracao e taxa de exposicao.',
      reference: 'RDC 222/2018, Art. 72',
      keywords: ['segregar', 'radionuclideo', 'taxa de exposicao', 'concentracao', 'estado fisico'],
    },
    {
      id: 'c-container',
      group: 'C',
      question: 'Como deve ser o recipiente do Grupo C?',
      answer:
        'O recipiente deve ser adequado as caracteristicas fisicas, quimicas, biologicas e radiologicas do rejeito, possuir vedacao e ter conteudo identificado conforme normas vigentes.',
      reference: 'RDC 222/2018, Art. 73',
      keywords: ['recipiente', 'vedacao', 'identificado', 'acondicionamento', 'container'],
    },
    {
      id: 'c-chemical-radioactive',
      group: 'C',
      question: 'E se o rejeito for quimico e radioativo?',
      answer:
        'RSS quimicos radioativos devem ser acondicionados em coletores proprios, identificados quanto aos riscos radiologico e quimico, e armazenados no local de decaimento ate atingir o limite de dispensa.',
      reference: 'RDC 222/2018, Art. 74',
      keywords: ['quimico radioativo', 'risco quimico', 'risco radiologico', 'dois riscos', 'misto'],
    },
    {
      id: 'c-sharp-radioactive',
      group: 'C',
      question: 'Perfurocortante radioativo pode ser separado?',
      answer:
        'Perfurocortantes radioativos devem ser transportados ate o armazenamento para decaimento em recipiente blindado. E vedada a separacao do conjunto seringa-agulha com radionuclideos e o reencape manual.',
      reference: 'RDC 222/2018, Art. 75',
      keywords: ['perfurocortante radioativo', 'agulha radioativa', 'seringa', 'blindado', 'reencape'],
    },
    {
      id: 'c-decay',
      group: 'C',
      question: 'Onde armazenar para decaimento?',
      answer:
        'O armazenamento para decaimento pode ocorrer na sala de manipulacao ou em sala especifica identificada como SALA DE DECAIMENTO. Liquidos exigem contenção ou absorcao com capacidade para o dobro do volume presente.',
      reference: 'RDC 222/2018, Art. 76',
      keywords: ['decaimento', 'sala de decaimento', 'armazenar', 'liquido radioativo', 'bacia de contencao'],
    },
    {
      id: 'c-release',
      group: 'C',
      question: 'Quando retirar o rotulo de radioativo?',
      answer:
        'Quando o decaimento atingir o limite de dispensa, o rotulo de rejeito radioativo deve ser retirado apenas apos medicao da radiacao. Devem permanecer as identificacoes dos demais riscos presentes.',
      reference: 'RDC 222/2018, Art. 79',
      keywords: ['limite de dispensa', 'retirar rotulo', 'medicao', 'liberacao', 'descaracterizar'],
    },
  ],
  D: [
    {
      id: 'd-definition',
      group: 'D',
      question: 'O que entra no Grupo D?',
      answer:
        'Grupo D inclui residuos que nao apresentam risco biologico, quimico ou radiologico a saude ou ao meio ambiente, podendo ser equiparados aos residuos domiciliares.',
      reference: 'RDC 222/2018, Anexo I - Grupo D',
      keywords: ['grupo d', 'comum', 'domiciliar', 'sem risco', 'lixo comum'],
    },
    {
      id: 'd-clean-material',
      group: 'D',
      question: 'EPI ou material de trabalho limpo pode ser Grupo D?',
      answer:
        'Sim, artigos e materiais usados na area de trabalho, incluindo vestimentas e EPI, podem ter manejo como Grupo D desde que nao apresentem sinais ou suspeita de contaminacao quimica, biologica ou radiologica.',
      reference: 'RDC 222/2018, Art. 82',
      keywords: ['epi limpo', 'luva limpa', 'jaleco', 'mascara', 'sem contaminacao', 'vestimenta'],
    },
    {
      id: 'd-packaging',
      group: 'D',
      question: 'Como acondicionar Grupo D?',
      answer:
        'RSS do Grupo D devem ser acondicionados conforme orientacoes dos orgaos locais responsaveis pelo servico de limpeza urbana. Os sacos do Grupo D nao precisam de identificacao de RSS.',
      reference: 'RDC 222/2018, Arts. 21 e 22',
      keywords: ['acondicionar', 'saco comum', 'identificacao', 'limpeza urbana', 'lixeira'],
    },
    {
      id: 'd-recyclable',
      group: 'D',
      question: 'Como lidar com reciclaveis limpos?',
      answer:
        'Os procedimentos de segregacao, acondicionamento e identificacao dos coletores do Grupo D para reciclagem devem estar descritos no PGRSS.',
      reference: 'RDC 222/2018, Art. 83',
      keywords: ['reciclavel', 'papelao', 'papel', 'plastico limpo', 'coleta seletiva'],
    },
    {
      id: 'd-compost',
      group: 'D',
      question: 'O que pode ir para compostagem?',
      answer:
        'Podem ir para compostagem forracoes de animais de bioterios sem risco biologico associado, flores, podas, jardinagem, sobras de alimentos e restos alimentares de refeitórios ou de pacientes que nao estejam em isolamento.',
      reference: 'RDC 222/2018, Art. 84',
      keywords: ['compostagem', 'resto alimentar', 'refeitorio', 'poda', 'jardinagem', 'forracao'],
    },
    {
      id: 'd-reject',
      group: 'D',
      question: 'Quando Grupo D vira rejeito?',
      answer:
        'Quando nao encaminhado para reutilizacao, recuperacao, reciclagem, compostagem, logistica reversa ou aproveitamento energetico, o Grupo D deve ser classificado como rejeito.',
      reference: 'RDC 222/2018, Art. 80',
      keywords: ['rejeito', 'destino', 'disposicao final', 'nao reciclavel', 'aproveitamento'],
    },
    {
      id: 'd-food-patient',
      group: 'D',
      question: 'Resto alimentar de paciente e Grupo D?',
      answer:
        'Pode ser Grupo D quando nao houver risco biologico associado. Para compostagem, a RDC limita restos alimentares de pacientes aos que nao estejam em isolamento.',
      reference: 'RDC 222/2018, Anexo I - Grupo D e Art. 84',
      keywords: ['resto alimentar', 'paciente', 'isolamento', 'alimento', 'sobras'],
    },
    {
      id: 'd-contaminated-gloves',
      group: 'D',
      question: 'Luvas ou gazes contaminadas podem ir para Grupo D?',
      answer:
        'Nao, se houver sinais ou suspeita de contaminacao biologica, quimica ou radiologica, o material nao deve ser manejado como Grupo D. Classifique pelo risco presente.',
      reference: 'RDC 222/2018, Art. 82',
      keywords: ['luva contaminada', 'gaze', 'sangue', 'secrecao', 'contaminado'],
    },
    {
      id: 'd-clean-gloves',
      group: 'D',
      question: 'Luvas limpas podem ir para Grupo D?',
      answer:
        'Sim. Luvas, vestimentas e EPIs sem sinais ou suspeita de contaminacao biologica, quimica ou radiologica podem ter manejo como RSS do Grupo D.',
      reference: 'RDC 222/2018, Art. 82',
      keywords: ['luva', 'luvas', 'luva limpa', 'luvas limpas', 'descartar luvas', 'epi limpo', 'sem contaminacao'],
    },
  ],
  E: [
    {
      id: 'e-definition',
      group: 'E',
      question: 'O que entra no Grupo E?',
      answer:
        'Grupo E inclui materiais perfurocortantes ou escarificantes, como laminas, agulhas, escalpes, ampolas de vidro, brocas, limas, lancetas, tubos capilares, ponteiras, laminas/laminulas, espatulas e vidro quebrado de laboratorio.',
      reference: 'RDC 222/2018, Anexo I - Grupo E',
      keywords: ['grupo e', 'perfurocortante', 'agulha', 'lamina', 'bisturi', 'ampola', 'vidro quebrado'],
    },
    {
      id: 'e-container',
      group: 'E',
      question: 'Onde descartar perfurocortantes?',
      answer:
        'Perfurocortantes devem ser descartados em recipientes identificados, rigidos, com tampa, resistentes a punctura, ruptura e vazamento.',
      reference: 'RDC 222/2018, Art. 86',
      keywords: ['onde descartar', 'coletor', 'caixa', 'recipiente rigido', 'tampa'],
    },
    {
      id: 'e-limit',
      group: 'E',
      question: 'Qual limite da caixa de perfurocortante?',
      answer:
        'O recipiente deve ser substituido conforme demanda, ao atingir 3/4 da capacidade ou conforme instrucoes do fabricante. E proibido esvaziamento manual e reaproveitamento.',
      reference: 'RDC 222/2018, Art. 87',
      keywords: ['3/4', 'tres quartos', 'limite', 'cheia', 'encher', 'reaproveitar', 'esvaziar'],
    },
    {
      id: 'e-associated-risk',
      group: 'E',
      question: 'E se o perfurocortante tiver risco biologico, quimico ou radioativo?',
      answer:
        'Quando contaminado por agentes biologicos, quimicos ou substancias radioativas, o Grupo E deve seguir o manejo de cada risco associado, e o recipiente deve conter a identificacao de todos os riscos presentes.',
      reference: 'RDC 222/2018, Art. 88',
      keywords: ['risco associado', 'quimico', 'biologico', 'radioativo', 'todos os riscos', 'misto'],
    },
    {
      id: 'e-no-treatment',
      group: 'E',
      question: 'Perfurocortante sem risco adicional precisa de tratamento?',
      answer:
        'Seringas, agulhas e demais perfurocortantes sem risco quimico, biologico ou radiologico nao necessitam de tratamento previo a disposicao final ambientalmente adequada.',
      reference: 'RDC 222/2018, Art. 89',
      keywords: ['sem risco', 'tratamento previo', 'disposicao final', 'agulha limpa', 'seringa'],
    },
    {
      id: 'e-recap',
      group: 'E',
      question: 'Pode reencapar ou desconectar agulha?',
      answer:
        'Nao. A RDC veda reencape manual e desconexao manual de agulhas. A separacao do conjunto seringa-agulha so e permitida com auxilio de dispositivos de seguranca.',
      reference: 'RDC 222/2018, Art. 89',
      keywords: ['reencapar', 'reencape', 'desconectar', 'separar agulha', 'seringa agulha'],
    },
    {
      id: 'e-glass',
      group: 'E',
      question: 'Vidro quebrado de laboratorio entra no Grupo E?',
      answer:
        'Sim. Utensilios de vidro quebrados no laboratorio, como pipetas, tubos de coleta sanguinea e placas de Petri, sao exemplos de Grupo E.',
      reference: 'RDC 222/2018, Anexo I - Grupo E',
      keywords: ['vidro quebrado', 'pipeta', 'tubo de coleta', 'placa de petri', 'laminula'],
    },
    {
      id: 'e-radioactive-sharp',
      group: 'E',
      question: 'Agulha com radionuclideo pode ser separada?',
      answer:
        'Nao. Perfurocortante radioativo deve ser transportado para decaimento em recipiente blindado, sendo vedada a separacao do conjunto seringa-agulha contendo radionuclideos e o reencape manual.',
      reference: 'RDC 222/2018, Art. 75',
      keywords: ['radionuclideo', 'radioativo', 'agulha radioativa', 'seringa radioativa', 'blindado'],
    },
  ],
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function scoreAnswer(answer: RssKnowledgeAnswer, normalizedQuestion: string) {
  return answer.keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    const keywordWords = normalizedKeyword.split(/\s+/).filter(Boolean);
    const hasExactKeyword = normalizedQuestion.includes(normalizedKeyword);
    const wordMatches = keywordWords.filter((word) => normalizedQuestion.includes(word)).length;

    if (hasExactKeyword) return score + normalizedKeyword.length + 10;
    if (keywordWords.length > 1 && wordMatches === keywordWords.length) return score + normalizedKeyword.length;
    if (keywordWords.length === 1 && wordMatches === 1 && normalizedKeyword.length >= 4) return score + 4;

    return score;
  }, 0);
}

export function searchRssKnowledge(group: WasteGroup, question: string) {
  const normalizedQuestion = normalizeText(question);

  if (!normalizedQuestion.trim()) {
    return null;
  }

  if (group === 'A' && /\bluva(s)?\b/.test(normalizedQuestion)) {
    const isContaminatedQuestion = /sangue|secrecao|secrecoes|fluido|liquido corporeo|contaminad/.test(normalizedQuestion);
    const answerId = isContaminatedQuestion ? 'a-gloves-contaminated' : 'a-gloves-depends';
    return rssKnowledgeBase.A.find((answer) => answer.id === answerId) || fallbackByGroup.A;
  }

  if (group === 'D' && /\bluva(s)?\b/.test(normalizedQuestion)) {
    const isContaminatedQuestion = /sangue|secrecao|secrecoes|fluido|liquido corporeo|contaminad/.test(normalizedQuestion);
    const answerId = isContaminatedQuestion ? 'd-contaminated-gloves' : 'd-clean-gloves';
    return rssKnowledgeBase.D.find((answer) => answer.id === answerId) || fallbackByGroup.D;
  }

  const rankedAnswers = rssKnowledgeBase[group]
    .map((answer) => ({ answer, score: scoreAnswer(answer, normalizedQuestion) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return rankedAnswers[0]?.answer || fallbackByGroup[group];
}

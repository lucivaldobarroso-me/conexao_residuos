import React from 'react';
import { HelpCircle, Search, ShieldCheck } from 'lucide-react';
import { Language, WasteGroup } from '../types';
import { RssKnowledgeAnswer, rssKnowledgeBase, searchRssKnowledge } from '../services/rssKnowledgeBase';

interface GroupQuestionBoxProps {
  group: WasteGroup;
  language: Language;
}

const translations = {
  pt: {
    eyebrow: (group: WasteGroup) => `Pergunte sobre o Grupo ${group}`,
    title: 'Dúvidas respondidas com base na RDC 222/2018',
    description:
      'Digite uma dúvida sobre classificação, identificação, acondicionamento, tratamento ou destinação. A busca usa respostas estruturadas da RDC e informa a referência normativa.',
    placeholder: 'Ex.: quando usar saco vermelho?',
    answerButton: 'Responder',
    reference: 'Referência',
  },
  en: {
    eyebrow: (group: WasteGroup) => `Ask about Group ${group}`,
    title: 'Questions answered according to RDC 222/2018',
    description:
      'Enter a question about classification, identification, packaging, treatment, or destination. The search uses structured RDC-based answers and shows the regulatory reference.',
    placeholder: 'Example: when should I use a red bag?',
    answerButton: 'Answer',
    reference: 'Reference',
  },
  es: {
    eyebrow: (group: WasteGroup) => `Pregunte sobre el Grupo ${group}`,
    title: 'Preguntas respondidas con base en la RDC 222/2018',
    description:
      'Escriba una duda sobre clasificación, identificación, acondicionamiento, tratamiento o destinación. La búsqueda usa respuestas estructuradas de la RDC e informa la referencia normativa.',
    placeholder: 'Ej.: ¿cuándo usar bolsa roja?',
    answerButton: 'Responder',
    reference: 'Referencia',
  },
};

const spanishFallbackByGroup: Record<WasteGroup, RssKnowledgeAnswer> = {
  A: {
    id: 'es-a-fallback',
    group: 'A',
    question: 'No encontré una respuesta directa',
    answer:
      'Para el Grupo A, confirme el subgrupo A1 a A5, si existe tratamiento obligatorio, la presencia de sangre o líquidos corporales libres y el flujo previsto en el PGRSS de la unidad.',
    reference: 'RDC 222/2018, Anexo I, Arts. 13 a 17 y Art. 55',
    keywords: [],
  },
  B: {
    id: 'es-b-fallback',
    group: 'B',
    question: 'No encontré una respuesta directa',
    answer:
      'Para el Grupo B, verifique la peligrosidad, la compatibilidad química, el estado físico, la FISPQ cuando corresponda y el PGRSS antes de acondicionar o destinar el residuo.',
    reference: 'RDC 222/2018, Arts. 18, 19, 56, 57, 58 y 60',
    keywords: [],
  },
  C: {
    id: 'es-c-fallback',
    group: 'C',
    question: 'No encontré una respuesta directa',
    answer:
      'Para el Grupo C, el manejo debe seguir el Plan de Protección Radiológica, las normas de la CNEN y la orientación del supervisor de protección radiológica.',
    reference: 'RDC 222/2018, Arts. 20, 33 y 72 a 79',
    keywords: [],
  },
  D: {
    id: 'es-d-fallback',
    group: 'D',
    question: 'No encontré una respuesta directa',
    answer:
      'Para el Grupo D, confirme que no exista señal o sospecha de contaminación biológica, química o radiológica y siga el PGRSS y las orientaciones del servicio de limpieza urbana.',
    reference: 'RDC 222/2018, Arts. 21, 22 y 80 a 84',
    keywords: [],
  },
  E: {
    id: 'es-e-fallback',
    group: 'E',
    question: 'No encontré una respuesta directa',
    answer:
      'Para el Grupo E, trate como punzocortante todo material con punta, corte o riesgo de escarificación, identificando también los riesgos biológicos, químicos o radiológicos asociados.',
    reference: 'RDC 222/2018, Arts. 86 a 89',
    keywords: [],
  },
};

const spanishKnowledgeBase: Record<WasteGroup, RssKnowledgeAnswer[]> = {
  A: [
    {
      id: 'es-a-definition',
      group: 'A',
      question: '¿Qué entra en el Grupo A?',
      answer:
        'El Grupo A incluye residuos con posible presencia de agentes biológicos que pueden presentar riesgo de infección. La clasificación debe considerar los subgrupos A1 a A5.',
      reference: 'RDC 222/2018, Anexo I - Grupo A',
      keywords: ['grupo a', 'infectante', 'biológico', 'infección', 'subgrupo'],
    },
    {
      id: 'es-a-gloves',
      group: 'A',
      question: '¿Puedo descartar guantes en el Grupo A?',
      answer:
        'Depende. Guantes con sangre, líquidos corporales libres, secreciones o sospecha de contaminación biológica deben seguir el flujo del riesgo biológico definido en el PGRSS. Guantes sin contaminación pueden manejarse como Grupo D.',
      reference: 'RDC 222/2018, Anexo I - Grupo A y Art. 82',
      keywords: ['guante', 'guantes', 'sangre', 'secreción', 'contaminado'],
    },
    {
      id: 'es-a-white-red-bag',
      group: 'A',
      question: '¿Cuándo usar bolsa blanca o roja?',
      answer:
        'La bolsa blanca lechosa se usa para residuos del Grupo A que no requieren tratamiento obligatorio o después del tratamiento. La bolsa roja se usa cuando existe obligación de tratamiento, según el PGRSS.',
      reference: 'RDC 222/2018, Arts. 15 y 16',
      keywords: ['bolsa blanca', 'bolsa roja', 'tratamiento', 'autoclave'],
    },
    {
      id: 'es-a-limit',
      group: 'A',
      question: '¿Cuál es el límite de uso de la bolsa del Grupo A?',
      answer:
        'Las bolsas del Grupo A deben sustituirse al alcanzar 2/3 de la capacidad o cada 48 horas. Residuos de fácil putrefacción deben sustituirse en hasta 24 horas.',
      reference: 'RDC 222/2018, Art. 14',
      keywords: ['2/3', '48 horas', '24 horas', 'límite', 'capacidad'],
    },
  ],
  B: [
    {
      id: 'es-b-definition',
      group: 'B',
      question: '¿Qué entra en el Grupo B?',
      answer:
        'El Grupo B incluye residuos con productos químicos que presentan riesgo por inflamabilidad, corrosividad, reactividad, toxicidad u otras características de peligrosidad.',
      reference: 'RDC 222/2018, Anexo I - Grupo B y Art. 56',
      keywords: ['grupo b', 'químico', 'tóxico', 'corrosivo', 'inflamable'],
    },
    {
      id: 'es-b-liquid',
      group: 'B',
      question: '¿Cómo acondicionar residuo químico líquido?',
      answer:
        'Debe acondicionarse en recipiente compatible con el líquido, resistente, rígido, estanco, con tapa que garantice contención e identificación adecuada.',
      reference: 'RDC 222/2018, Art. 18',
      keywords: ['líquido', 'frasco', 'estanco', 'fuga', 'tapa'],
    },
    {
      id: 'es-b-incompatible',
      group: 'B',
      question: '¿Puedo mezclar residuos químicos?',
      answer:
        'No. Sustancias químicas incompatibles deben segregarse, acondicionarse e identificarse por separado conforme al riesgo, compatibilidad, FISPQ y PGRSS.',
      reference: 'RDC 222/2018, Art. 60 y Anexos III/IV',
      keywords: ['mezclar', 'mezcla', 'incompatible', 'reactivo', 'gases'],
    },
    {
      id: 'es-b-mercury',
      group: 'B',
      question: '¿Mercurio o metal pesado entra en qué grupo?',
      answer:
        'Residuos con metales pesados, como mercurio, se encuadran como Grupo B. Si hay vidrio quebrado, también existe riesgo punzocortante asociado y el recipiente debe identificar todos los riesgos.',
      reference: 'RDC 222/2018, Anexo I - Grupo B y Art. 88',
      keywords: ['mercurio', 'metal pesado', 'termómetro', 'vidrio'],
    },
  ],
  C: [
    {
      id: 'es-c-definition',
      group: 'C',
      question: '¿Qué entra en el Grupo C?',
      answer:
        'El Grupo C incluye materiales con radionúclidos en cantidad superior a los niveles de dispensa especificados por la CNEN.',
      reference: 'RDC 222/2018, Anexo I - Grupo C',
      keywords: ['grupo c', 'radioactivo', 'radionúclido', 'radiación', 'cnen'],
    },
    {
      id: 'es-c-management',
      group: 'C',
      question: '¿Quién define el manejo del residuo radioactivo?',
      answer:
        'El manejo debe obedecer al Plan de Protección Radiológica, a las normas de la CNEN y a los procedimientos definidos por el supervisor de protección radiológica.',
      reference: 'RDC 222/2018, Arts. 20 y 33',
      keywords: ['ppr', 'protección radiológica', 'supervisor', 'cnen'],
    },
    {
      id: 'es-c-decay',
      group: 'C',
      question: '¿Dónde almacenar para decaimiento?',
      answer:
        'El almacenamiento para decaimiento puede ocurrir en la sala de manipulación o en sala específica identificada como sala de decaimiento, con condiciones adecuadas de contención.',
      reference: 'RDC 222/2018, Art. 76',
      keywords: ['decaimiento', 'sala', 'almacenar', 'líquido radioactivo'],
    },
    {
      id: 'es-c-release',
      group: 'C',
      question: '¿Cuándo retirar la etiqueta de radioactivo?',
      answer:
        'Solo después de alcanzar el límite de dispensa y realizar la medición de radiación. Deben permanecer las identificaciones de otros riesgos presentes.',
      reference: 'RDC 222/2018, Art. 79',
      keywords: ['etiqueta', 'medición', 'dispensa', 'liberación'],
    },
  ],
  D: [
    {
      id: 'es-d-definition',
      group: 'D',
      question: '¿Qué entra en el Grupo D?',
      answer:
        'El Grupo D incluye residuos sin riesgo biológico, químico o radiológico para la salud o el ambiente, similares a residuos domiciliarios.',
      reference: 'RDC 222/2018, Anexo I - Grupo D',
      keywords: ['grupo d', 'común', 'domiciliario', 'sin riesgo'],
    },
    {
      id: 'es-d-clean-gloves',
      group: 'D',
      question: '¿Guantes limpios pueden ir al Grupo D?',
      answer:
        'Sí. Guantes, vestimentas y EPI sin señales o sospecha de contaminación biológica, química o radiológica pueden manejarse como Grupo D.',
      reference: 'RDC 222/2018, Art. 82',
      keywords: ['guante limpio', 'guantes limpios', 'epi', 'sin contaminación'],
    },
    {
      id: 'es-d-recyclable',
      group: 'D',
      question: '¿Cómo manejar reciclables limpios?',
      answer:
        'Los procedimientos de segregación, acondicionamiento e identificación de recolectores para reciclaje deben estar descritos en el PGRSS.',
      reference: 'RDC 222/2018, Art. 83',
      keywords: ['reciclable', 'papel', 'cartón', 'plástico limpio'],
    },
    {
      id: 'es-d-contaminated',
      group: 'D',
      question: '¿Guantes o gasas contaminadas pueden ir al Grupo D?',
      answer:
        'No. Si hay señal o sospecha de contaminación biológica, química o radiológica, el material no debe manejarse como Grupo D. Debe clasificarse por el riesgo presente.',
      reference: 'RDC 222/2018, Art. 82',
      keywords: ['contaminado', 'gasa', 'sangre', 'secreción'],
    },
  ],
  E: [
    {
      id: 'es-e-definition',
      group: 'E',
      question: '¿Qué entra en el Grupo E?',
      answer:
        'El Grupo E incluye materiales punzocortantes o escarificantes, como agujas, hojas de bisturí, ampollas de vidrio, lancetas, brocas, limas y vidrio quebrado de laboratorio.',
      reference: 'RDC 222/2018, Anexo I - Grupo E',
      keywords: ['grupo e', 'punzocortante', 'aguja', 'bisturí', 'vidrio'],
    },
    {
      id: 'es-e-container',
      group: 'E',
      question: '¿Dónde descartar punzocortantes?',
      answer:
        'Deben descartarse en recipientes identificados, rígidos, con tapa, resistentes a punción, ruptura y fuga.',
      reference: 'RDC 222/2018, Art. 86',
      keywords: ['descartar', 'recolector', 'recipiente rígido', 'tapa'],
    },
    {
      id: 'es-e-limit',
      group: 'E',
      question: '¿Cuál es el límite del recolector de punzocortantes?',
      answer:
        'El recipiente debe sustituirse según la demanda, al alcanzar 3/4 de la capacidad o según instrucciones del fabricante. Está prohibido vaciarlo manualmente y reutilizarlo.',
      reference: 'RDC 222/2018, Art. 87',
      keywords: ['3/4', 'límite', 'lleno', 'capacidad', 'reutilizar'],
    },
    {
      id: 'es-e-recap',
      group: 'E',
      question: '¿Se puede reencapuchar o desconectar una aguja?',
      answer:
        'No. La RDC prohíbe el reencapuchado manual y la desconexión manual de agujas. La separación del conjunto solo se permite con dispositivos de seguridad.',
      reference: 'RDC 222/2018, Art. 89',
      keywords: ['reencapuchar', 'desconectar', 'aguja', 'jeringa'],
    },
  ],
};

const englishFallbackByGroup: Record<WasteGroup, RssKnowledgeAnswer> = {
  A: {
    id: 'en-a-fallback',
    group: 'A',
    question: 'I did not find a direct answer',
    answer:
      'For Group A, confirm the A1 to A5 subgroup, whether treatment is mandatory, whether there is free-flowing blood or body fluids, and the flow defined in the facility PGRSS.',
    reference: 'RDC 222/2018, Annex I, Arts. 13 to 17 and Art. 55',
    keywords: [],
  },
  B: {
    id: 'en-b-fallback',
    group: 'B',
    question: 'I did not find a direct answer',
    answer:
      'For Group B, verify hazardous characteristics, chemical compatibility, physical state, SDS information when applicable, and the PGRSS before packaging or destination.',
    reference: 'RDC 222/2018, Arts. 18, 19, 56, 57, 58 and 60',
    keywords: [],
  },
  C: {
    id: 'en-c-fallback',
    group: 'C',
    question: 'I did not find a direct answer',
    answer:
      'For Group C, management must follow the Radiation Protection Plan, CNEN standards, and instructions from the radiation protection supervisor.',
    reference: 'RDC 222/2018, Arts. 20, 33 and 72 to 79',
    keywords: [],
  },
  D: {
    id: 'en-d-fallback',
    group: 'D',
    question: 'I did not find a direct answer',
    answer:
      'For Group D, confirm there is no sign or suspicion of biological, chemical, or radiological contamination, then follow the PGRSS and local urban cleaning guidance.',
    reference: 'RDC 222/2018, Arts. 21, 22 and 80 to 84',
    keywords: [],
  },
  E: {
    id: 'en-e-fallback',
    group: 'E',
    question: 'I did not find a direct answer',
    answer:
      'For Group E, treat any material with a point, cutting edge, or scarifying risk as sharps, while also identifying any associated biological, chemical, or radiological risks.',
    reference: 'RDC 222/2018, Arts. 86 to 89',
    keywords: [],
  },
};

const englishKnowledgeBase: Record<WasteGroup, RssKnowledgeAnswer[]> = {
  A: [
    {
      id: 'en-a-definition',
      group: 'A',
      question: 'What belongs in Group A?',
      answer:
        'Group A includes waste with possible presence of biological agents that may present infection risk. Classification must consider subgroups A1 to A5.',
      reference: 'RDC 222/2018, Annex I - Group A',
      keywords: ['group a', 'infectious', 'biological', 'infection', 'subgroup'],
    },
    {
      id: 'en-a-gloves',
      group: 'A',
      question: 'Can I discard gloves in Group A?',
      answer:
        'It depends. Gloves with blood, free-flowing body fluids, secretions, or suspected biological contamination must follow the biological-risk flow defined in the PGRSS. Gloves without contamination may be managed as Group D.',
      reference: 'RDC 222/2018, Annex I - Group A and Art. 82',
      keywords: ['glove', 'gloves', 'blood', 'secretion', 'contaminated'],
    },
    {
      id: 'en-a-white-red-bag',
      group: 'A',
      question: 'When should I use a white or red bag?',
      answer:
        'The milky white bag is used for Group A waste that does not require mandatory treatment or after treatment. The red bag is used when treatment is mandatory, according to the PGRSS.',
      reference: 'RDC 222/2018, Arts. 15 and 16',
      keywords: ['white bag', 'red bag', 'treatment', 'autoclave'],
    },
    {
      id: 'en-a-limit',
      group: 'A',
      question: 'What is the use limit for Group A bags?',
      answer:
        'Group A bags must be replaced at 2/3 capacity or every 48 hours. Easily putrescible waste must be replaced within 24 hours.',
      reference: 'RDC 222/2018, Art. 14',
      keywords: ['2/3', '48 hours', '24 hours', 'limit', 'capacity'],
    },
  ],
  B: [
    {
      id: 'en-b-definition',
      group: 'B',
      question: 'What belongs in Group B?',
      answer:
        'Group B includes waste containing chemicals that present risk due to flammability, corrosivity, reactivity, toxicity, or other hazardous characteristics.',
      reference: 'RDC 222/2018, Annex I - Group B and Art. 56',
      keywords: ['group b', 'chemical', 'toxic', 'corrosive', 'flammable'],
    },
    {
      id: 'en-b-liquid',
      group: 'B',
      question: 'How should liquid chemical waste be packaged?',
      answer:
        'It must be packaged in a container compatible with the liquid, resistant, rigid, leak-proof, with a lid that ensures containment and proper identification.',
      reference: 'RDC 222/2018, Art. 18',
      keywords: ['liquid', 'bottle', 'leak-proof', 'leak', 'lid'],
    },
    {
      id: 'en-b-incompatible',
      group: 'B',
      question: 'Can I mix chemical waste?',
      answer:
        'No. Incompatible chemicals must be segregated, packaged, and identified separately according to risk, compatibility, SDS information, and the PGRSS.',
      reference: 'RDC 222/2018, Art. 60 and Annexes III/IV',
      keywords: ['mix', 'mixing', 'incompatible', 'reactive', 'gas'],
    },
    {
      id: 'en-b-mercury',
      group: 'B',
      question: 'What group includes mercury or heavy metals?',
      answer:
        'Waste with heavy metals, such as mercury, belongs to Group B. If broken glass is present, there is also an associated sharps risk and the container must identify all risks.',
      reference: 'RDC 222/2018, Annex I - Group B and Art. 88',
      keywords: ['mercury', 'heavy metal', 'thermometer', 'glass'],
    },
  ],
  C: [
    {
      id: 'en-c-definition',
      group: 'C',
      question: 'What belongs in Group C?',
      answer:
        'Group C includes materials containing radionuclides above the clearance levels specified by CNEN.',
      reference: 'RDC 222/2018, Annex I - Group C',
      keywords: ['group c', 'radioactive', 'radionuclide', 'radiation', 'cnen'],
    },
    {
      id: 'en-c-management',
      group: 'C',
      question: 'Who defines radioactive waste management?',
      answer:
        'Management must follow the Radiation Protection Plan, CNEN standards, and procedures defined by the radiation protection supervisor.',
      reference: 'RDC 222/2018, Arts. 20 and 33',
      keywords: ['ppr', 'radiation protection', 'supervisor', 'cnen'],
    },
    {
      id: 'en-c-decay',
      group: 'C',
      question: 'Where should waste be stored for decay?',
      answer:
        'Decay storage may occur in the handling room or in a specific room identified as a decay room, with adequate containment conditions.',
      reference: 'RDC 222/2018, Art. 76',
      keywords: ['decay', 'room', 'store', 'radioactive liquid'],
    },
    {
      id: 'en-c-release',
      group: 'C',
      question: 'When can the radioactive label be removed?',
      answer:
        'Only after reaching the clearance level and measuring radiation. Identification for any remaining associated risks must be kept.',
      reference: 'RDC 222/2018, Art. 79',
      keywords: ['label', 'measurement', 'clearance', 'release'],
    },
  ],
  D: [
    {
      id: 'en-d-definition',
      group: 'D',
      question: 'What belongs in Group D?',
      answer:
        'Group D includes waste without biological, chemical, or radiological risk to health or the environment, similar to household waste.',
      reference: 'RDC 222/2018, Annex I - Group D',
      keywords: ['group d', 'common', 'household', 'no risk'],
    },
    {
      id: 'en-d-clean-gloves',
      group: 'D',
      question: 'Can clean gloves go to Group D?',
      answer:
        'Yes. Gloves, garments, and PPE without signs or suspicion of biological, chemical, or radiological contamination may be managed as Group D.',
      reference: 'RDC 222/2018, Art. 82',
      keywords: ['clean glove', 'clean gloves', 'ppe', 'no contamination'],
    },
    {
      id: 'en-d-recyclable',
      group: 'D',
      question: 'How should clean recyclables be managed?',
      answer:
        'Segregation, packaging, and identification procedures for recycling collectors must be described in the PGRSS.',
      reference: 'RDC 222/2018, Art. 83',
      keywords: ['recyclable', 'paper', 'cardboard', 'clean plastic'],
    },
    {
      id: 'en-d-contaminated',
      group: 'D',
      question: 'Can contaminated gloves or gauze go to Group D?',
      answer:
        'No. If there is any sign or suspicion of biological, chemical, or radiological contamination, the material must not be managed as Group D. Classify it by the risk present.',
      reference: 'RDC 222/2018, Art. 82',
      keywords: ['contaminated', 'gauze', 'blood', 'secretion'],
    },
  ],
  E: [
    {
      id: 'en-e-definition',
      group: 'E',
      question: 'What belongs in Group E?',
      answer:
        'Group E includes sharps or scarifying materials such as needles, scalpel blades, glass ampoules, lancets, burs, files, and broken laboratory glass.',
      reference: 'RDC 222/2018, Annex I - Group E',
      keywords: ['group e', 'sharps', 'needle', 'scalpel', 'glass'],
    },
    {
      id: 'en-e-container',
      group: 'E',
      question: 'Where should sharps be discarded?',
      answer:
        'They must be discarded in identified, rigid containers with lids, resistant to puncture, rupture, and leakage.',
      reference: 'RDC 222/2018, Art. 86',
      keywords: ['discard', 'container', 'rigid container', 'lid'],
    },
    {
      id: 'en-e-limit',
      group: 'E',
      question: 'What is the sharps container fill limit?',
      answer:
        'The container must be replaced according to demand, at 3/4 capacity or according to manufacturer instructions. Manual emptying and reuse are prohibited.',
      reference: 'RDC 222/2018, Art. 87',
      keywords: ['3/4', 'limit', 'full', 'capacity', 'reuse'],
    },
    {
      id: 'en-e-recap',
      group: 'E',
      question: 'Can a needle be recapped or disconnected?',
      answer:
        'No. RDC prohibits manual recapping and manual needle disconnection. Separation of the assembly is allowed only with safety devices.',
      reference: 'RDC 222/2018, Art. 89',
      keywords: ['recap', 'disconnect', 'needle', 'syringe'],
    },
  ],
};

function normalizeQuestionText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function searchSpanishKnowledge(group: WasteGroup, question: string) {
  const normalizedQuestion = normalizeQuestionText(question);
  if (!normalizedQuestion.trim()) return null;

  const answers = spanishKnowledgeBase[group];
  const matchedAnswer = answers.find((answer) =>
    answer.keywords.some((keyword) => normalizedQuestion.includes(normalizeQuestionText(keyword)))
  );

  return matchedAnswer || spanishFallbackByGroup[group];
}

function searchEnglishKnowledge(group: WasteGroup, question: string) {
  const normalizedQuestion = normalizeQuestionText(question);
  if (!normalizedQuestion.trim()) return null;

  const answers = englishKnowledgeBase[group];
  const matchedAnswer = answers.find((answer) =>
    answer.keywords.some((keyword) => normalizedQuestion.includes(normalizeQuestionText(keyword)))
  );

  return matchedAnswer || englishFallbackByGroup[group];
}

export const GroupQuestionBox: React.FC<GroupQuestionBoxProps> = ({ group, language }) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState<ReturnType<typeof searchRssKnowledge>>(null);
  const suggestions =
    language === 'es'
      ? spanishKnowledgeBase[group].slice(0, 4)
      : language === 'en'
        ? englishKnowledgeBase[group].slice(0, 4)
        : rssKnowledgeBase[group].slice(0, 4);
  const t = translations[language];

  const handleSearch = (nextQuestion = question) => {
    setQuestion(nextQuestion);
    if (language === 'es') {
      setAnswer(searchSpanishKnowledge(group, nextQuestion));
      return;
    }

    if (language === 'en') {
      setAnswer(searchEnglishKnowledge(group, nextQuestion));
      return;
    }

    setAnswer(searchRssKnowledge(group, nextQuestion));
  };

  React.useEffect(() => {
    setQuestion('');
    setAnswer(null);
  }, [group]);

  return (
    <section className="rounded-[28px] border border-primary/10 bg-white p-5 shadow-sm md:rounded-[32px] md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">
            <HelpCircle size={14} />
            {t.eyebrow(group)}
          </div>
          <h3 className="text-xl font-black leading-tight text-on-surface md:text-2xl">{t.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
            {t.description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSearch();
            }}
            placeholder={t.placeholder}
            className="w-full rounded-2xl border border-outline-variant bg-surface py-4 pl-12 pr-4 text-sm font-medium outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
        </div>
        <button
          onClick={() => handleSearch()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-black text-white transition-all hover:scale-[1.01] active:scale-[0.98] md:w-auto"
        >
          {t.answerButton}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => handleSearch(suggestion.question)}
            className="rounded-xl border border-outline-variant bg-surface-container px-3 py-2 text-left text-xs font-bold text-on-surface-variant transition-all hover:border-primary/40 hover:text-primary"
          >
            {suggestion.question}
          </button>
        ))}
      </div>

      {answer && (
        <div className="mt-6 rounded-3xl border border-primary/10 bg-primary/5 p-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-primary">{answer.question}</p>
              <p className="mt-2 text-base font-bold leading-relaxed text-on-surface">{answer.answer}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {t.reference}: {answer.reference}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

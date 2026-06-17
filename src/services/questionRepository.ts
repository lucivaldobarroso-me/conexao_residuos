import { QUIZ } from '../constants';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Language, QuizQuestion } from '../types';

const QUESTIONS_TABLE = 'questions';

interface QuestionRow {
  id: number;
  title: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_option: string;
  explanation: string;
}

const spanishQuestionTranslations: Record<string, Omit<QuizQuestion, 'id'>> = {
  'Conceito do Grupo A': {
    category: 'Concepto del Grupo A',
    question: 'Según la clasificación de los Residuos de Servicios de Salud (RSS), los residuos con posible presencia de agentes biológicos que pueden presentar riesgo de infección pertenecen a qué grupo?',
    options: ['Grupo A', 'Grupo B', 'Grupo C'],
    correctAnswer: 0,
    explanation: 'El Grupo A incluye residuos con posible presencia de agentes biológicos y riesgo de infección. El Grupo B corresponde a residuos químicos y el Grupo C a rechazos radioactivos.',
  },
  'Conceito do Grupo B': {
    category: 'Concepto del Grupo B',
    question: 'Medicamentos vencidos, reactivos de laboratorio y efluentes de equipos automatizados con toxicidad deben clasificarse en qué grupo?',
    options: ['Grupo D', 'Grupo B', 'Grupo E'],
    correctAnswer: 1,
    explanation: 'El Grupo B reúne residuos con sustancias químicas que presentan riesgo por inflamabilidad, corrosividad, reactividad o toxicidad.',
  },
  'Conceito do Grupo C': {
    category: 'Concepto del Grupo C',
    question: 'Materiales resultantes de actividades humanas que contienen radionúclidos por encima de los límites de exención pertenecen al:',
    options: ['Grupo A', 'Grupo C', 'Grupo E'],
    correctAnswer: 1,
    explanation: 'El Grupo C corresponde a rechazos radioactivos, cuyo manejo sigue normas de la CNEN.',
  },
  'Conceito do Grupo D': {
    category: 'Concepto del Grupo D',
    question: 'Papel toalla de baño, restos de alimentos de comedores y papeles de oficina son ejemplos de residuos del:',
    options: ['Grupo C', 'Grupo A', 'Grupo D'],
    correctAnswer: 2,
    explanation: 'El Grupo D reúne residuos sin riesgo biológico, químico o radiológico, similares a residuos domiciliarios.',
  },
  'Conceito do Grupo E': {
    category: 'Concepto del Grupo E',
    question: 'Hojas de bisturí, agujas, escalpes y vidrios de laboratorio quebrados se clasifican como:',
    options: ['Grupo E', 'Grupo B', 'Grupo D'],
    correctAnswer: 0,
    explanation: 'El Grupo E incluye materiales punzocortantes o escarificantes, contaminados o no.',
  },
  'Acondicionamento de luvas e jalecos limpos': {
    category: 'Guantes y batas sin contaminación',
    question: 'Guantes y batas desechables usados en laboratorio, pero sin contaminación biológica, química o radiológica, deben descartarse en el:',
    options: ['Grupo A', 'Grupo E', 'Grupo D'],
    correctAnswer: 2,
    explanation: 'Materiales sin señal o sospecha de contaminación pueden manejarse como Grupo D.',
  },
  'Norma de descarte de agulhas': {
    category: 'Descarte de agujas',
    question: 'Según la NR 32 y normas de bioseguridad, cuál es el procedimiento correcto al descartar una jeringa con aguja después del uso?',
    options: ['Reencapuchar la aguja y descartar en residuo común.', 'Descartar todo el conjunto sin reencapuchar en recolector rígido.', 'Desconectar manualmente la aguja para ahorrar espacio.'],
    correctAnswer: 1,
    explanation: 'No se debe reencapuchar ni desconectar manualmente. El conjunto debe descartarse inmediatamente en recipiente rígido para punzocortantes.',
  },
  'Limite de enchimento do Grupo E': {
    category: 'Límite del Grupo E',
    question: 'Para garantizar seguridad, los recolectores para residuos punzocortantes deben llenarse hasta qué límite?',
    options: ['Hasta 3/4 de su capacidad o según el fabricante.', 'Hasta 100% de su capacidad.', 'Hasta 1/3 de su capacidad.'],
    correctAnswer: 0,
    explanation: 'La RDC 222/2018 orienta sustituir los recolectores al alcanzar 3/4 de la capacidad o conforme a las instrucciones del fabricante.',
  },
  'Cores dos sacos para Grupo A': {
    category: 'Bolsas del Grupo A',
    question: 'Cuál es el color de la bolsa para residuos biológicos del Grupo A que obligatoriamente requieren tratamiento previo en la unidad?',
    options: ['Bolsa negra.', 'Bolsa amarilla.', 'Bolsa roja.'],
    correctAnswer: 2,
    explanation: 'Cuando el Grupo A requiere tratamiento obligatorio, debe acondicionarse en bolsa roja, conforme a la RDC 222/2018.',
  },
  'Mistura de Residuos Quimicos (Grupo B)': {
    category: 'Mezcla de residuos químicos',
    question: 'Para optimizar espacio en el laboratorio, está permitido mezclar diferentes residuos químicos del Grupo B en el mismo recipiente?',
    options: ['Sí, si todos son líquidos.', 'Sí, si el recipiente es amarillo.', 'No, no se deben mezclar residuos químicos diferentes.'],
    correctAnswer: 2,
    explanation: 'Residuos químicos incompatibles pueden reaccionar, liberar gases, causar incendios o explosiones. Deben segregarse por compatibilidad.',
  },
  'Termometro quebrado com mercurio': {
    category: 'Termómetro con mercurio',
    question: 'Si un termómetro de vidrio con mercurio se rompe en el laboratorio, cómo debe clasificarse y descartarse?',
    options: ['Como Grupo E con riesgo químico asociado.', 'Solo como Grupo D, envolviendo el vidrio.', 'Solo como Grupo A, por uso en pacientes.'],
    correctAnswer: 0,
    explanation: 'El vidrio quebrado tiene riesgo punzocortante y el mercurio es residuo químico peligroso. Deben identificarse los riesgos asociados.',
  },
  'Efeito do Tratamento (Autoclavacao)': {
    category: 'Efecto del tratamiento',
    question: 'Cuando un residuo biológico del Grupo A es autoclavado y pierde sus características de riesgo, cómo puede descartarse después?',
    options: ['Puede acondicionarse como residuo común del Grupo D.', 'Pasa a ser Grupo C.', 'Debe ser incinerado obligatoriamente por el fabricante.'],
    correctAnswer: 0,
    explanation: 'El tratamiento adecuado puede permitir el manejo como Grupo D, cuando el residuo pierde las características de riesgo y se sigue el PGRSS.',
  },
  'Descarte de Carcacas de Animais de Laboratorio': {
    category: 'Animales de laboratorio',
    question: 'Las carcasas de animales de experimentación sometidos a eutanasia en bioterio pertenecen a qué grupo y requieren qué destinación?',
    options: ['Grupo D, pudiendo enterrarse en cualquier área externa.', 'Grupo A, con tratamiento y/o incineración según el PGRSS.', 'Grupo C, porque emiten radiación después de la muerte.'],
    correctAnswer: 1,
    explanation: 'Carcasas de animales de laboratorio pueden tener riesgo biológico y deben seguir el flujo del Grupo A/subgrupo aplicable.',
  },
  'Saco Plastico Preto': {
    category: 'Bolsa negra',
    question: 'Qué grupo de residuos debe descartarse en bolsas plásticas de color negro?',
    options: ['Grupo A - Cultivos bacterianos.', 'Grupo D - Residuos comunes no reciclables.', 'Grupo E - Hojas y bisturíes.'],
    correctAnswer: 1,
    explanation: 'La bolsa negra se usa para residuos comunes no reciclables, equivalentes a residuos domiciliarios, conforme al PGRSS local.',
  },
  'Entidade reguladora do Grupo C': {
    category: 'Norma del Grupo C',
    question: 'Cuál es el órgano responsable por las normas que especifican límites de exención para clasificación y descarte de rechazos radioactivos?',
    options: ['Comisión Nacional de Energía Nuclear (CNEN).', 'Agencia Nacional de Aguas (ANA).', 'Instituto Nacional de Metrología (Inmetro).'],
    correctAnswer: 0,
    explanation: 'El manejo de rechazos radioactivos debe seguir las normas de la CNEN.',
  },
  'Tratamento de Sobras Biologicas (Subgrupo A1)': {
    category: 'Subgrupo A1',
    question: 'Cultivos de microorganismos en placas de Petri del subgrupo A1 pueden enviarse directamente a la recolección pública?',
    options: ['Sí, si están en bolsa blanca.', 'No, deben pasar por tratamiento previo de descontaminación.', 'Sí, si las placas están selladas con cinta.'],
    correctAnswer: 1,
    explanation: 'Cultivos y medios de cultivo del subgrupo A1 requieren tratamiento o flujo definido antes de salir de la unidad, según el PGRSS.',
  },
  'Regras dos Contentores Rigidos (Grupo E)': {
    category: 'Recolectores rígidos',
    question: 'Por qué los punzocortantes deben acondicionarse solo en recipientes rígidos con tapa?',
    options: ['Para impedir fuga de radiación gamma.', 'Porque son reciclables de alto valor.', 'Para evitar rupturas, fugas y accidentes por perforación.'],
    correctAnswer: 2,
    explanation: 'El recipiente rígido protege a trabajadores y evita perforaciones, fugas y accidentes con materiales cortantes.',
  },
  'Residuos Comuns Reciclaveis': {
    category: 'Residuos comunes reciclables',
    question: 'Cómo debe manejarse la fracción limpia y reciclable del Grupo D, como cajas de cartón íntegras del almacén?',
    options: ['Segregar en origen y depositar en recolectores de recolección selectiva.', 'Incinerar con residuos del Grupo B.', 'Guardar en cajas blindadas de plomo.'],
    correctAnswer: 0,
    explanation: 'Los residuos reciclables limpios del Grupo D deben seguir la recolección selectiva prevista en el PGRSS.',
  },
  'A cor branca no lixo biologico': {
    category: 'Bolsa blanca lechosa',
    question: 'Según ANVISA, la bolsa blanca lechosa con símbolo de sustancia infectante se destina a qué situación?',
    options: ['Residuo administrativo reciclable.', 'Residuos biológicos del Grupo A que no requieren tratamiento previo o ya tratados.', 'Medicamentos quimioterápicos volátiles.'],
    correctAnswer: 1,
    explanation: 'La bolsa blanca lechosa identifica residuos del Grupo A que no requieren tratamiento inicial o que ya fueron tratados, según el flujo aplicable.',
  },
  'Manutencao de lixeiras e armazenamento': {
    category: 'Papeleras y almacenamiento',
    question: 'La RDC exige prácticas operativas para protección colectiva, entre ellas:',
    options: ['Papeleras de infectantes sin tapa para ventilación.', 'Higienización solo cada 6 meses.', 'Papeleras con tapa accionada por pedal y bolsas fuera del piso.'],
    correctAnswer: 2,
    explanation: 'El manejo debe evitar contacto manual, contaminación cruzada y almacenamiento directo en el piso.',
  },
};

const englishQuestionTranslations: Record<string, Omit<QuizQuestion, 'id'>> = {
  'Conceito do Grupo A': {
    category: 'Group A Concept',
    question: 'According to healthcare waste classification, waste with possible presence of biological agents that may present infection risk belongs to which group?',
    options: ['Group A', 'Group B', 'Group C'],
    correctAnswer: 0,
    explanation: 'Group A includes waste with possible presence of biological agents and infection risk. Group B is chemical waste and Group C is radioactive waste.',
  },
  'Conceito do Grupo B': {
    category: 'Group B Concept',
    question: 'Expired medicines, laboratory reagents, and toxic effluents from automated analysis equipment should be classified in which group?',
    options: ['Group D', 'Group B', 'Group E'],
    correctAnswer: 1,
    explanation: 'Group B includes waste containing chemical substances that pose risk due to flammability, corrosivity, reactivity, or toxicity.',
  },
  'Conceito do Grupo C': {
    category: 'Group C Concept',
    question: 'Materials resulting from human activities that contain radionuclides above clearance limits belong to:',
    options: ['Group A', 'Group C', 'Group E'],
    correctAnswer: 1,
    explanation: 'Group C corresponds to radioactive waste, whose management must follow CNEN standards.',
  },
  'Conceito do Grupo D': {
    category: 'Group D Concept',
    question: 'Bathroom paper towels, cafeteria food leftovers, and office paper are examples of waste from:',
    options: ['Group C', 'Group A', 'Group D'],
    correctAnswer: 2,
    explanation: 'Group D includes waste without biological, chemical, or radiological risk, similar to household waste.',
  },
  'Conceito do Grupo E': {
    category: 'Group E Concept',
    question: 'Scalpel blades, needles, scalpels, and broken laboratory glassware are classified as:',
    options: ['Group E', 'Group B', 'Group D'],
    correctAnswer: 0,
    explanation: 'Group E includes sharps or scarifying materials, whether contaminated or not.',
  },
  'Acondicionamento de luvas e jalecos limpos': {
    category: 'Clean Gloves and Gowns',
    question: 'Disposable gloves and gowns used in a laboratory, but without biological, chemical, or radiological contamination, should be discarded as:',
    options: ['Group A', 'Group E', 'Group D'],
    correctAnswer: 2,
    explanation: 'Materials with no sign or suspicion of contamination may be managed as Group D.',
  },
  'Norma de descarte de agulhas': {
    category: 'Needle Disposal',
    question: 'According to NR 32 and biosafety standards, what is the correct procedure for discarding a syringe with needle after use?',
    options: ['Recap the needle and discard it as common waste.', 'Discard the entire assembly without recapping in a rigid sharps container.', 'Manually disconnect the needle to save container space.'],
    correctAnswer: 1,
    explanation: 'Needles must not be manually recapped or disconnected. The assembly should be immediately discarded in a rigid sharps container.',
  },
  'Limite de enchimento do Grupo E': {
    category: 'Group E Fill Limit',
    question: 'For safety, sharps containers should be filled up to what limit?',
    options: ['Up to 3/4 of capacity or as indicated by the manufacturer.', 'Up to 100% of capacity.', 'Up to 1/3 of capacity.'],
    correctAnswer: 0,
    explanation: 'RDC 222/2018 requires replacement at 3/4 capacity or according to manufacturer instructions.',
  },
  'Cores dos sacos para Grupo A': {
    category: 'Group A Bags',
    question: 'What bag color is used for Group A biological waste that must undergo prior treatment in the facility?',
    options: ['Black bag.', 'Yellow bag.', 'Red bag.'],
    correctAnswer: 2,
    explanation: 'When Group A waste requires mandatory treatment, it should be packaged in a red bag, according to RDC 222/2018.',
  },
  'Mistura de Residuos Quimicos (Grupo B)': {
    category: 'Chemical Waste Mixing',
    question: 'To optimize lab space, is it allowed to mix different Group B chemical waste in the same container?',
    options: ['Yes, if all are liquids.', 'Yes, if the container is yellow.', 'No, different chemical waste should not be mixed.'],
    correctAnswer: 2,
    explanation: 'Incompatible chemicals can react, release gases, cause fires, or explode. They must be segregated by compatibility.',
  },
  'Termometro quebrado com mercurio': {
    category: 'Mercury Thermometer',
    question: 'If a glass thermometer with mercury breaks in the laboratory, how should this waste be classified?',
    options: ['As Group E with associated chemical risk.', 'Only as Group D, wrapping the glass.', 'Only as Group A, because it was used with patients.'],
    correctAnswer: 0,
    explanation: 'Broken glass is a sharps risk and mercury is hazardous chemical waste. Both associated risks must be identified.',
  },
  'Efeito do Tratamento (Autoclavacao)': {
    category: 'Treatment Effect',
    question: 'When Group A biological waste is autoclaved and loses its risk characteristics, how may it be handled afterward?',
    options: ['It may be handled as Group D common waste.', 'It becomes Group C.', 'It must be incinerated by the manufacturer.'],
    correctAnswer: 0,
    explanation: 'Adequate treatment may allow Group D management when the waste loses its risk characteristics and the PGRSS flow is followed.',
  },
  'Descarte de Carcacas de Animais de Laboratorio': {
    category: 'Laboratory Animals',
    question: 'Carcasses of experimental animals euthanized in animal facilities belong to which group and require what destination?',
    options: ['Group D, and may be buried in any external area.', 'Group A, with treatment and/or incineration according to the PGRSS.', 'Group C, because they emit radiation after death.'],
    correctAnswer: 1,
    explanation: 'Laboratory animal carcasses may have biological risk and must follow the applicable Group A/subgroup flow.',
  },
  'Saco Plastico Preto': {
    category: 'Black Bag',
    question: 'Which waste group should be discarded in black plastic bags?',
    options: ['Group A - bacterial cultures.', 'Group D - non-recyclable common waste.', 'Group E - blades and scalpels.'],
    correctAnswer: 1,
    explanation: 'Black bags are used for non-recyclable common waste, equivalent to household waste, according to the local PGRSS.',
  },
  'Entidade reguladora do Grupo C': {
    category: 'Group C Standards',
    question: 'Which body is responsible for standards specifying clearance limits for radioactive waste classification and disposal?',
    options: ['National Nuclear Energy Commission (CNEN).', 'National Water Agency (ANA).', 'National Institute of Metrology (Inmetro).'],
    correctAnswer: 0,
    explanation: 'Radioactive waste management must follow CNEN standards.',
  },
  'Tratamento de Sobras Biologicas (Subgrupo A1)': {
    category: 'Subgroup A1',
    question: 'Can microorganism cultures in Petri dishes from subgroup A1 be sent directly to public collection?',
    options: ['Yes, if placed in a white bag.', 'No, they must undergo prior decontamination treatment.', 'Yes, if plates are sealed with tape.'],
    correctAnswer: 1,
    explanation: 'Cultures and culture media from subgroup A1 require treatment or a defined flow before leaving the facility.',
  },
  'Regras dos Contentores Rigidos (Grupo E)': {
    category: 'Rigid Containers',
    question: 'Why must sharps be packaged only in rigid containers with lids?',
    options: ['To prevent gamma radiation leakage.', 'Because they are high-value recyclable materials.', 'To prevent rupture, leakage, and puncture accidents.'],
    correctAnswer: 2,
    explanation: 'Rigid containers protect workers and prevent punctures, leaks, and injuries from sharp materials.',
  },
  'Residuos Comuns Reciclaveis': {
    category: 'Recyclable Common Waste',
    question: 'How should clean recyclable Group D waste, such as intact cardboard boxes from storage, be managed?',
    options: ['Segregate at the source and place in selective collection containers.', 'Incinerate with Group B waste.', 'Store in lead-shielded boxes.'],
    correctAnswer: 0,
    explanation: 'Clean recyclable Group D waste should follow the selective collection procedures described in the PGRSS.',
  },
  'A cor branca no lixo biologico': {
    category: 'Milky White Bag',
    question: 'According to ANVISA standards, the milky white bag with infectious substance symbol is intended for which situation?',
    options: ['Administrative recyclable waste.', 'Group A biological waste that does not require prior treatment or has already been treated.', 'Volatile chemotherapy medicines.'],
    correctAnswer: 1,
    explanation: 'The milky white bag identifies Group A waste that does not require initial treatment or has already been treated, according to the applicable flow.',
  },
  'Manutencao de lixeiras e armazenamento': {
    category: 'Bins and Storage',
    question: 'RDC requires operational practices for collective protection, including:',
    options: ['Infectious waste bins without lids for ventilation.', 'Cleaning only every 6 months.', 'Bins with pedal-operated lids and bags kept off the floor.'],
    correctAnswer: 2,
    explanation: 'Waste management should avoid hand contact, cross-contamination, and direct storage of bags on the floor.',
  },
};

const optionToIndex: Record<string, number> = {
  A: 0,
  B: 1,
  C: 2,
};

function getSpanishFallbackQuestions(): QuizQuestion[] {
  return Object.values(spanishQuestionTranslations).map((question, index) => ({
    id: index + 1,
    ...question,
  }));
}

function getEnglishFallbackQuestions(): QuizQuestion[] {
  return Object.values(englishQuestionTranslations).map((question, index) => ({
    id: index + 1,
    ...question,
  }));
}

function toTranslatedQuizQuestion(row: QuestionRow, language: Extract<Language, 'es' | 'en'>): QuizQuestion {
  const translations = language === 'es' ? spanishQuestionTranslations : englishQuestionTranslations;
  const translatedQuestion = translations[row.title];
  if (translatedQuestion) {
    return {
      id: row.id,
      ...translatedQuestion,
    };
  }

  return {
    id: row.id,
    category: row.title,
    question: row.question_text,
    options: [row.option_a, row.option_b, row.option_c],
    correctAnswer: optionToIndex[row.correct_option.toUpperCase()],
    explanation: row.explanation,
  };
}

export async function loadQuizQuestions(language: Language): Promise<QuizQuestion[]> {
  const fallbackQuestions =
    language === 'es' ? getSpanishFallbackQuestions() : language === 'en' ? getEnglishFallbackQuestions() : QUIZ[language];

  if (!isSupabaseConfigured || !supabase) {
    return fallbackQuestions;
  }

  const { data, error } = await supabase
    .from(QUESTIONS_TABLE)
    .select('id,title,question_text,option_a,option_b,option_c,correct_option,explanation')
    .order('id', { ascending: true });

  if (error) {
    console.warn('Supabase questions load failed. Falling back to local quiz.', error);
    return fallbackQuestions;
  }

  if (!data || data.length === 0) {
    return fallbackQuestions;
  }

  if (language === 'es' || language === 'en') {
    return (data as QuestionRow[]).map((row) => toTranslatedQuizQuestion(row, language));
  }

  return (data as QuestionRow[]).map((row) => ({
    id: row.id,
    category: row.title,
    question: row.question_text,
    options: [row.option_a, row.option_b, row.option_c],
    correctAnswer: optionToIndex[row.correct_option.toUpperCase()],
    explanation: row.explanation,
  }));
}

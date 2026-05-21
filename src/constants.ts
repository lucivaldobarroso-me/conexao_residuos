import { WasteInfo, Scenario, QuizQuestion, Language, UIStrings } from './types';

export const UI_STRINGS: Record<Language, UIStrings> = {
  pt: {
    dashboard: 'Dashboard',
    groups: 'Grupos RSS',
    scenarios: 'Cenários',
    quiz: 'Quiz',
    history: 'Histórico',
    back: 'Voltar',
    search: 'Buscar resíduos, siglas ou tipos...',
    risks: 'Riscos Associados',
    mistakes: 'Erros Comuns de Descarte',
    technicalSummary: 'Resumo Técnico',
    practicalTipTitle: 'Dica Prática para o Dia a Dia',
    share: 'Compartilhar recurso!',
    examplesTitle: 'Exemplos de Resíduos',
    instructions: 'Instruções de Descarte',
    container: 'Recipiente Recomendado',
    clearHistory: 'Limpar Histórico',
    noHistory: 'Nenhum histórico encontrado',
    noHistorySub: 'Suas atividades aparecerão aqui conforme você navega pelos protocolos e realiza os desafios.',
    results: 'Resultados',
    score: 'Sua pontuação',
    restart: 'Reiniciar Quiz'
  },
  en: {
    dashboard: 'Dashboard',
    groups: 'Waste Groups',
    scenarios: 'Scenarios',
    quiz: 'Quiz',
    history: 'History',
    back: 'Back',
    search: 'Search for waste, acronyms or types...',
    risks: 'Associated Risks',
    mistakes: 'Common Disposal Mistakes',
    technicalSummary: 'Technical Summary',
    practicalTipTitle: 'Practical Daily Tip',
    share: 'Share resource!',
    examplesTitle: 'Waste Examples',
    instructions: 'Disposal Instructions',
    container: 'Recommended Container',
    clearHistory: 'Clear History',
    noHistory: 'No history found',
    noHistorySub: 'Your activities will appear here as you navigate through protocols and complete challenges.',
    results: 'Results',
    score: 'Your score',
    restart: 'Restart Quiz'
  },
  es: {
    dashboard: 'Panel',
    groups: 'Grupos de Residuos',
    scenarios: 'Escenarios',
    quiz: 'Cuestionario',
    history: 'Historial',
    back: 'Volver',
    search: 'Buscar residuos, siglas o tipos...',
    risks: 'Riesgos Asociados',
    mistakes: 'Errores Comunes de Eliminación',
    technicalSummary: 'Resumen Técnico',
    practicalTipTitle: 'Consejo Práctico Diario',
    share: '¡Compartir recurso!',
    examplesTitle: 'Ejemplos de Residuos',
    instructions: 'Instrucciones de Eliminación',
    container: 'Contenedor Recomendado',
    clearHistory: 'Limpiar Historial',
    noHistory: 'No se encontró historial',
    noHistorySub: 'Tus actividades aparecerán aquí a medida que navegues por los protocolos y completes desafíos.',
    results: 'Resultados',
    score: 'Tu puntuación',
    restart: 'Reiniciar Cuestionario'
  }
};

export const WASTE_DATA: Record<Language, Record<string, WasteInfo>> = {
  pt: {
    A: {
      id: 'A',
      title: 'Grupo A: Perigo Biológico',
      subtitle: 'Resíduos Infectantes',
      description: 'Resíduos com a possível presença de agentes biológicos que, por suas características de maior virulência ou concentração, podem apresentar risco de infecção.',
      examples: [
        { label: 'Luvas com Sangue', description: 'Luvas manchadas de sangue usadas durante procedimentos.', icon: 'Droplets' },
        { label: 'Gazes e Curativos', description: 'Gazes e curativos de feridas abertas.', icon: 'Bandage' },
        { label: 'Bolsas Transfusoriais', description: 'Bolsas de transfusão de sangue vazias ou vencidas.', icon: 'HeartPulse' },
        { label: 'Meios de Cultura', description: 'Meios de cultura laboratorial e placas inoculadas.', icon: 'Microscope' },
      ],
      disposal: {
        instructions: 'Saco Branco Leitoso (Padrão para descarte de risco biológico em unidades de saúde).',
        container: 'Saco Branco Leitoso',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBbFfBb0NST1QkQ5NhsgqdWhqt8kHvJt3VPWMKgPqUT7yu6opBTRi4hIggUs8Muhg7e0a3WTW5G7B_9ncGahXJort60qU4dHsAYdywSsF0h6cNaeD6Ait-rm6RO2b3A5LwuBzQqOutA1Wo2SvuZN0xmHvhsu566lKf_m0Mr3QZquRpRtjasxhGRB-BngHe-Smh6f0c31AR0JhpCtXfWZ_F_DISoeQwvWlbtIYRqIHsWCzPS0fTqYBZ9FTisYS2ap4IpSomGKYSdMZ_',
      },
      risks: [
        'Exposição a patógenos como HIV e Hepatites (B e C).',
        'Contaminação cruzada em ambientes estéreis.',
      ],
      mistakes: [
        'Descartar papel toalha limpo no saco branco.',
        'Misturar perfurocortantes (Grupo E) no saco de infectantes.',
      ],
      summary: [
        { attribute: 'Identificação', specification: 'Símbolo de risco biológico em rótulo de fundo branco, desenho e contornos pretos, acrescido da expressão RESÍDUO INFECTANTE.', term: 'Anexo II - Grupo A' },
        { attribute: 'Acondicionamento', specification: 'Saco constituído de material resistente a ruptura, vazamento e impermeável; saco branco leitoso para RSS que não precisam de tratamento obrigatório ou após tratamento.', term: 'Arts. 13 e 15' },
        { attribute: 'Tratamento obrigatório', specification: 'Quando houver obrigação de tratamento, acondicionar em saco vermelho; o subgrupo A5 deve ser segregado em saco vermelho duplo e encaminhado para incineração.', term: 'Arts. 16 e 55' },
        { attribute: 'Limite de uso', specification: 'Substituir o saco ao atingir 2/3 da capacidade ou a cada 48 horas; resíduos de fácil putrefação devem ser substituídos em até 24 horas.', term: 'Art. 14' },
        { attribute: 'Destinação', specification: 'Os rejeitos tratados ou que não exigem tratamento devem seguir para disposição final ambientalmente adequada, conforme licenciamento aplicável.', term: 'Art. 15' },
      ],
      practicalTip: 'Na dúvida entre o saco comum (preto/azul) e o infectante (branco), se houve contato direto com secreções ou fluídos corporais do paciente, o descarte deve ser obrigatoriamente no Grupo A.',
    },
    B: {
      id: 'B',
      title: 'Grupo B: Resíduos Químicos',
      subtitle: 'Resíduos Químicos',
      description: 'Substâncias químicas que apresentam risco à saúde pública ou ao meio ambiente devido às suas características de inflamabilidade, corrosividade, reatividade ou toxicidade.',
      examples: [
        { label: 'Solventes Orgânicos', description: 'Inflamável: Frasco de vidro âmbar ou PEAD.', icon: 'FlaskConical' },
        { label: 'Ácido Sulfúrico', description: 'Corrosivo: Recipiente resistente a ácidos forte.', icon: 'TestTubeDiagonal' },
        { label: 'Medicamentos Vencidos', description: 'Tóxico: Embalagem original ou rígido laranja.', icon: 'Pill' },
        { label: 'Metais Pesados', description: 'Persistente: Selagem hermética obrigatória.', icon: 'Skull' },
      ],
      disposal: {
        instructions: 'Utilizar recipientes rígidos, resistentes à perfuração e com tampa rosqueada, identificados com o símbolo de resíduo químico.',
        container: 'Recipiente Laranja',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaG4kwlCOPwPgbuuiB7gzHDaWsleQUb395dnT2x4ZxD7LlfGUngC5sP-XVIHj5vF90MKzRqNJSLwKORWWRNdb_RTMFnaVK_uSH4xOmEXzP1V9gXtypUbRPPLHp3T9GT0S67I9_w-GbmP6cOJpuX0eK3cU3UNooA6KtUfNPKnR4-_lr2kFbewrafBiATbgnX2jorWOtbMsH7j8minJO_SgoN4VdAQRgj84xU73LAQdDPl2RrX193TDm3pLD3djmsNPzyDWPsHq2fTHl',
      },
      risks: [
        'Queimaduras Químicas: Lesões graves por contato direto com ácidos ou bases.',
        'Contaminação Ambiental: Danos irreversíveis a lençóis freáticos e fauna local.',
      ],
      mistakes: [
        'Descartar líquidos em pias comuns.',
        'Misturar substâncias incompatíveis.',
        'Omitir identificação no recipiente.',
      ],
      summary: [
        { attribute: 'Identificação', specification: 'Símbolo e frase de risco associados à periculosidade do resíduo químico; símbolos e frases do GHS podem ser usados conforme o risco.', term: 'Anexo II - Grupo B' },
        { attribute: 'Acondicionamento líquido', specification: 'Recipiente de material compatível com o líquido, resistente, rígido, estanque, com tampa que garanta contenção e identificação.', term: 'Art. 18' },
        { attribute: 'Acondicionamento sólido', specification: 'Recipiente rígido, resistente, compatível com as características do produto químico acondicionado e identificado.', term: 'Art. 19' },
        { attribute: 'Segregação', specification: 'Substâncias químicas incompatíveis ou de categorias distintas devem ser segregadas, acondicionadas e identificadas separadamente.', term: 'Anexos III e IV' },
        { attribute: 'Tratamento e destino', specification: 'RSS químicos perigosos líquidos devem ser tratados antes da disposição final; rejeitos sólidos perigosos seguem para aterro de resíduos perigosos Classe I.', term: 'Arts. 57 e 58' },
      ],
      practicalTip: 'Todo resíduo químico deve estar devidamente rotulado com o nome da substância, data e responsável.',
    },
    C: {
      id: 'C',
      title: 'Grupo C: Resíduos Radioativos',
      subtitle: 'Resíduos Radioativos',
      description: 'Materiais que contêm radionuclídeos em quantidades superiores aos limites de isenção estabelecidos pela CNEN.',
      examples: [
        { label: 'Medicina Nuclear', description: 'Serviços de Medicina Nuclear e Radioterapia.', icon: 'Radiation' },
        { label: 'Pesquisa', description: 'Laboratórios de pesquisa com Radioisótopos.', icon: 'Microscope' },
        { label: 'Fluidos Corporais', description: 'Fluidos corporais de pacientes em tratamento.', icon: 'Droplets' },
        { label: 'Contaminados', description: 'Agulhas, seringas e luvas contaminadas.', icon: 'Biohazard' },
      ],
      disposal: {
        instructions: 'Devem ser guardados em recipientes blindados (geralmente chumbo) até o decaimento total.',
        container: 'Blindagem de Chumbo',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkTKvBqo4d10NWR1gef27d99lgx5StWrhHqEjPq1YikehYcsfCa5GWAQuJc62D-xxkSfBLSjNayDh5GSNaOfpxamm4cYhm88Whxhaca3gnH-x1XTvmrrhDlsx6oi6EqnQu1vk4_diFvfI-HxxtwbN6RkmTJjsUcl18wgxXc_KAQ3DU24af58Bf8-9tcHzgrUqQ4Qq3TMh36lWhbDZZMGOwWdOtEKxjsVB-z8QcmmpCOXpurVJuyVgspDS8YCHhLRdOSey7_wERoED2',
      },
      risks: [
        'Radiação Ionizante: Danos celulares e mutações genéticas.',
        'Queimaduras Radiológicas: Lesões severas por exposição direta.',
      ],
      mistakes: [
        'Descartar resíduo sem verificar a meia-vida.',
        'Misturar com resíduos do Grupo A.',
        'Falta de identificação de data de entrada.',
      ],
      summary: [
        { attribute: 'Identificação', specification: 'Símbolo internacional de radiação ionizante em rótulo de fundo amarelo, com a expressão MATERIAL RADIOATIVO, REJEITO RADIOATIVO ou RADIOATIVO.', term: 'Anexo II - Grupo C' },
        { attribute: 'Acondicionamento', specification: 'Procedimentos definidos pelo supervisor de proteção radiológica qualificado pela CNEN; recipientes adequados às características físicas, químicas, biológicas e radiológicas.', term: 'Arts. 20 e 73' },
        { attribute: 'Segregação', specification: 'Segregar de acordo com radionuclídeo ou natureza da radiação, estado físico, concentração e taxa de exposição.', term: 'Art. 72' },
        { attribute: 'Decaimento', specification: 'Armazenar em condições adequadas para decaimento, na área de manipulação ou em sala específica identificada como SALA DE DECAIMENTO.', term: 'Art. 76' },
        { attribute: 'Reclassificação', specification: 'Após atingir o limite de dispensa, retirar a identificação de risco radiológico mediante medição e classificar o resíduo conforme o risco remanescente.', term: 'Art. 80' },
      ],
      practicalTip: 'A blindagem é obrigatória para todos os resíduos do Grupo C até que o decaimento permita o descarte.',
    },
    D: {
      id: 'D',
      title: 'Grupo D: Resíduos Comuns',
      subtitle: 'Resíduos Comuns',
      description: 'Resíduos que não apresentam risco biológico, químico ou radiológico. Similares aos resíduos domésticos.',
      examples: [
        { label: 'Papel e Papelão', description: 'Não contaminados: papéis e embalagens.', icon: 'FileText' },
        { label: 'Restos de Alimentos', description: 'Copa, recepção e áreas administrativas.', icon: 'Utensils' },
        { label: 'Papel Esterilizado', description: 'Embalagens de papel esterilizado limpas.', icon: 'ShieldCheck' },
        { label: 'Plásticos Limpos', description: 'Copos e garrafas não utilizados na assistência.', icon: 'GlassWater' },
      ],
      disposal: {
        instructions: 'Sacos de cor azul ou cinza em lixeiras acionadas por pedal.',
        container: 'Saco Azul/Cinza',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0RUtsfI5RpolMN02EJrGn1M8DKfcrv8QUAx6bxNhcP6SE0UMP0Csmjyvux8iYK46JEZTyoSkOz8-KeVlpb-plYphN7009gDu3XDtTxLw6z2F0q60cazziSVR11GT6sisDNd2csQKnzjiTMyi4_lWHCXGAI-wsfJXiISChPJv3ta9kgz6sXJ_A1I_d1Zg7GETA_dbf2gAi_ectIdy0drd4tCGz0kE_-qebuj7u9RAP2K3KNPRhSHppzBymiOb0Km53uOAB3fVrrQHq',
      },
      risks: [
        'Contaminação do Reciclável: Misturar com lixo orgânico.',
        'Desperdício: Descartar resíduo infectante como comum.',
      ],
      mistakes: [
        'Misturar lixo orgânico com material reciclável.',
        'Descartar luvas ou gazes contaminadas no Grupo D.',
      ],
      summary: [
        { attribute: 'Identificação', specification: 'Identificação conforme definido pelo órgão de limpeza urbana; os sacos que acondicionam RSS do Grupo D não precisam ser identificados.', term: 'Anexo II e Art. 22, §1º' },
        { attribute: 'Acondicionamento', specification: 'Acondicionar de acordo com as orientações dos órgãos locais responsáveis pelo serviço de limpeza urbana.', term: 'Art. 21' },
        { attribute: 'Reciclagem', specification: 'Procedimentos de segregação, acondicionamento e identificação dos coletores para reciclagem devem estar descritos no PGRSS.', term: 'Art. 83' },
        { attribute: 'Compostagem', specification: 'Podem seguir para compostagem apenas os resíduos orgânicos permitidos, como sobras de alimentos e forrações sem risco biológico associado.', term: 'Art. 84' },
        { attribute: 'Critério de grupo', specification: 'Materiais sem sinais ou suspeita de contaminação química, biológica ou radiológica podem ter manejo como Grupo D.', term: 'Art. 82' },
      ],
      practicalTip: 'Papel toalha de banheiros e pia de lavagem de mãos é Grupo D.',
    },
    E: {
      id: 'E',
      title: 'Grupo E: Perfurocortantes',
      subtitle: 'Perfurocortantes',
      description: 'Materiais perfurocortantes ou escarificantes, como agulhas, lâminas de bisturi, ampolas de vidro e escalpes.',
      examples: [
        { label: 'Agulhas e Seringas', description: 'Todo material perfurante usado ou não.', icon: 'Syringe' },
        { label: 'Lâminas de Bisturi', description: 'Materiais de corte cirúrgico.', icon: 'Scissors' },
        { label: 'Ampolas de Vidro', description: 'Frascos e ampolas que podem quebrar.', icon: 'FlaskRound' },
        { label: 'Escalpes e Lancetas', description: 'Materiais de punção capilar e venosa.', icon: 'Zap' },
      ],
      disposal: {
        instructions: 'Recipientes rígidos e resistentes a perfuração (caixa de papelão amarelo).',
        container: 'Caixa de Perfurocortante',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0ztjmOIWXKc6pb6Ge2CdimcvWatS6dn4vPh0TZGMa-XXMN50OwjbIta-I-OZR-JrrUBEIu_-J7RnLksNt1kysOyKJ518llBeZekh2YgMChXLTqN77UXR8J9SyEJhD2mp3rhsNW4OclEN-KFwPHp_6IV161FM4L9csA59xxOWljGZVh_9O4hQNnMCaOPSBlrgc23OP_hOTlkTy0PYmHw-Vmn5rDVUIV6AHb_m3JZvmwuLliVA37khMzho2M_PFetOsGzh9Pd2pd0WB',
      },
      risks: [
        'Acidente Percutâneo: Risco de transmissão de HIV e Hepatites.',
        'Perfuração de Sacos: Risco para a equipe de limpeza.',
      ],
      mistakes: [
        'Reencapar agulhas antes de descartar.',
        'Descartar agulhas em sacos plásticos.',
        'Ultrapassar o limite de 5cm do topo da caixa.',
      ],
      summary: [
        { attribute: 'Identificação', specification: 'Símbolo de risco biológico em rótulo de fundo branco, desenho e contorno preto, acrescido da inscrição RESÍDUO PERFUROCORTANTE ou PERFUROCORTANTE.', term: 'Anexo II - Grupo E' },
        { attribute: 'Acondicionamento', specification: 'Descartar em recipientes identificados, rígidos, providos com tampa, resistentes à punctura, ruptura e vazamento.', term: 'Art. 86' },
        { attribute: 'Limite de uso', specification: 'Substituir conforme demanda, ao atingir 3/4 da capacidade ou conforme instruções do fabricante; é proibido esvaziamento manual e reaproveitamento.', term: 'Art. 87' },
        { attribute: 'Risco associado', specification: 'Quando contaminados por agentes biológicos, químicos ou substâncias radioativas, o manejo deve seguir cada classe de risco associada.', term: 'Art. 88' },
        { attribute: 'Segurança', specification: 'O descarte deve ocorrer imediatamente após o uso, sem reencape manual de agulhas ou separação de conjunto contaminado quando houver risco associado.', term: 'RDC 222/2018' },
      ],
      practicalTip: 'Nunca reencape agulhas. Descarte imediatamente após o uso no coletor rígido mais próximo.',
    },
  },
  en: {
    A: {
      id: 'A',
      title: 'Group A: Biological Hazard',
      subtitle: 'Infectious Waste',
      description: 'Waste with the possible presence of biological agents that, due to their higher virulence or concentration, may present a risk of infection.',
      examples: [
        { label: 'Blood-Stained Gloves', description: 'Gloves stained with blood used during procedures.', icon: 'Droplets' },
        { label: 'Gauze and Dressings', description: 'Gauze and dressings from open wounds.', icon: 'Bandage' },
        { label: 'Transfusion Bags', description: 'Empty or expired blood transfusion bags.', icon: 'HeartPulse' },
        { label: 'Culture Media', description: 'Laboratory culture media and inoculated plates.', icon: 'Microscope' },
      ],
      disposal: {
        instructions: 'Milky White Bag (Standard for biohazard disposal in healthcare units).',
        container: 'Milky White Bag',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBbFfBb0NST1QkQ5NhsgqdWhqt8kHvJt3VPWMKgPqUT7yu6opBTRi4hIggUs8Muhg7e0a3WTW5G7B_9ncGahXJort60qU4dHsAYdywSsF0h6cNaeD6Ait-rm6RO2b3A5LwuBzQqOutA1Wo2SvuZN0xmHvhsu566lKf_m0Mr3QZquRpRtjasxhGRB-BngHe-Smh6f0c31AR0JhpCtXfWZ_F_DISoeQwvWlbtIYRqIHsWCzPS0fTqYBZ9FTisYS2ap4IpSomGKYSdMZ_',
      },
      risks: [
        'Exposure to pathogens such as HIV and Hepatitis (B and C).',
        'Cross-contamination in sterile environments.',
      ],
      mistakes: [
        'Discarding clean paper towels in the white bag.',
        'Mixing sharps (Group E) into the infectious waste bag.',
      ],
      summary: [
        { attribute: 'Identification', specification: 'Biohazard symbol on a white-background label, with black drawing and outline, plus the wording INFECTIOUS WASTE.', term: 'Annex II - Group A' },
        { attribute: 'Packaging', specification: 'Bag made of rupture-resistant, leak-resistant and impermeable material; milky white bag for waste that does not require mandatory treatment or after treatment.', term: 'Arts. 13 and 15' },
        { attribute: 'Mandatory treatment', specification: 'When treatment is required, use a red bag; subgroup A5 must be segregated in a double red bag and sent for incineration.', term: 'Arts. 16 and 55' },
        { attribute: 'Use limit', specification: 'Replace the bag at 2/3 capacity or every 48 hours; easily putrescible waste must be replaced within 24 hours.', term: 'Art. 14' },
        { attribute: 'Destination', specification: 'Treated waste or waste that does not require treatment must go to environmentally appropriate final disposal under applicable licensing.', term: 'Art. 15' },
      ],
      practicalTip: 'When in doubt between common (black/blue) and infectious (white) bags, if there was direct contact with body fluids, it must go in Group A.',
    },
    B: {
      id: 'B',
      title: 'Group B: Chemical Waste',
      subtitle: 'Chemical Waste',
      description: 'Chemical substances that present a risk to public health or the environment due to their flammability, corrosivity, reactivity, or toxicity.',
      examples: [
        { label: 'Organic Solvents', description: 'Flammable: Amber glass or HDPE bottle.', icon: 'FlaskConical' },
        { label: 'Sulfuric Acid', description: 'Corrosive: Container resistant to strong acids.', icon: 'TestTubeDiagonal' },
        { label: 'Expired Medicaments', description: 'Toxic: Original or rigid orange packaging.', icon: 'Pill' },
        { label: 'Heavy Metals', description: 'Persistent: Hermetic sealing mandatory.', icon: 'Skull' },
      ],
      disposal: {
        instructions: 'Use rigid, puncture-resistant containers with screw caps, identified with the chemical waste symbol.',
        container: 'Orange Container',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaG4kwlCOPwPgbuuiB7gzHDaWsleQUb395dnT2x4ZxD7LlfGUngC5sP-XVIHj5vF90MKzRqNJSLwKORWWRNdb_RTMFnaVK_uSH4xOmEXzP1V9gXtypUbRPPLHp3T9GT0S67I9_w-GbmP6cOJpuX0eK3cU3UNooA6KtUfNPKnR4-_lr2kFbewrafBiATbgnX2jorWOtbMsH7j8minJO_SgoN4VdAQRgj84xU73LAQdDPl2RrX193TDm3pLD3djmsNPzyDWPsHq2fTHl',
      },
      risks: [
        'Chemical Burns: Serious injuries from direct contact with acids or bases.',
        'Environmental Contamination: Irreversible damage to groundwater and local fauna.',
      ],
      mistakes: [
        'Discarding liquids in common sinks.',
        'Mixing incompatible substances.',
        'Omitting identification on the container.',
      ],
      summary: [
        { attribute: 'Identification', specification: 'Symbol and risk phrase associated with the chemical waste hazard; GHS symbols and phrases may be used according to the risk.', term: 'Annex II - Group B' },
        { attribute: 'Liquid packaging', specification: 'Container compatible with the liquid, resistant, rigid, leak-proof, with a lid that ensures containment and identification.', term: 'Art. 18' },
        { attribute: 'Solid packaging', specification: 'Rigid, resistant container compatible with the characteristics of the chemical product and properly identified.', term: 'Art. 19' },
        { attribute: 'Segregation', specification: 'Incompatible chemicals or different categories must be segregated, packaged and identified separately.', term: 'Annexes III and IV' },
        { attribute: 'Treatment and destination', specification: 'Hazardous liquid chemical waste must be treated before final disposal; hazardous solid rejects go to Class I hazardous waste landfill.', term: 'Arts. 57 and 58' },
      ],
      practicalTip: 'All chemical waste must be properly labeled with the substance name, date, and responsible person.',
    },
    C: {
      id: 'C',
      title: 'Group C: Radioactive Waste',
      subtitle: 'Radioactive Waste',
      description: 'Materials containing radionuclides in quantities exceeding the exemption limits established by radiation authorities.',
      examples: [
        { label: 'Nuclear Medicine', description: 'Nuclear Medicine and Radiotherapy services.', icon: 'Radiation' },
        { label: 'Research', description: 'Research labs using Radioisotopes.', icon: 'Microscope' },
        { label: 'Body Fluids', description: 'Body fluids from patients under treatment.', icon: 'Droplets' },
        { label: 'Contaminated', description: 'Contaminated needles, syringes, and gloves.', icon: 'Biohazard' },
      ],
      disposal: {
        instructions: 'Must be stored in shielded containers (usually lead) until total decay.',
        container: 'Lead Shielding',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkTKvBqo4d10NWR1gef27d99lgx5StWrhHqEjPq1YikehYcsfCa5GWAQuJc62D-xxkSfBLSjNayDh5GSNaOfpxamm4cYhm88Whxhaca3gnH-x1XTvmrrhDlsx6oi6EqnQu1vk4_diFvfI-HxxtwbN6RkmTJjsUcl18wgxXc_KAQ3DU24af58Bf8-9tcHzgrUqQ4Qq3TMh36lWhbDZZMGOwWdOtEKxjsVB-z8QcmmpCOXpurVJuyVgspDS8YCHhLRdOSey7_wERoED2',
      },
      risks: [
        'Ionizing Radiation: Cellular damage and genetic mutations.',
        'Radiological Burns: Severe injuries from direct exposure.',
      ],
      mistakes: [
        'Discarding waste without checking half-life.',
        'Mixing with Group A waste.',
        'Lack of entry date identification.',
      ],
      summary: [
        { attribute: 'Identification', specification: 'International ionizing radiation symbol on a yellow-background label, with the wording RADIOACTIVE MATERIAL, RADIOACTIVE REJECT or RADIOACTIVE.', term: 'Annex II - Group C' },
        { attribute: 'Packaging', specification: 'Procedures defined by a radiation protection supervisor qualified by CNEN; containers suited to the physical, chemical, biological and radiological characteristics.', term: 'Arts. 20 and 73' },
        { attribute: 'Segregation', specification: 'Segregate by radionuclide or nature of radiation, physical state, concentration and exposure rate.', term: 'Art. 72' },
        { attribute: 'Decay', specification: 'Store under suitable conditions for decay, in the handling area or in a specific room identified as DECAY ROOM.', term: 'Art. 76' },
        { attribute: 'Reclassification', specification: 'After reaching the clearance level, remove radiological-risk identification after measurement and classify by remaining risk.', term: 'Art. 80' },
      ],
      practicalTip: 'Shielding is mandatory for all Group C waste until decay allows disposal.',
    },
    D: {
      id: 'D',
      title: 'Group D: General Waste',
      subtitle: 'General Waste',
      description: 'Waste that does not present a biological, chemical, or radiological risk. Similar to household waste.',
      examples: [
        { label: 'Paper and Cardboard', description: 'Non-contaminated: papers and packaging.', icon: 'FileText' },
        { label: 'Food Scraps', description: 'Kitchen, reception, and administrative areas.', icon: 'Utensils' },
        { label: 'Sterile Paper', description: 'Clean sterile paper packaging.', icon: 'ShieldCheck' },
        { label: 'Clean Plastics', description: 'Cups and bottles not used in care.', icon: 'GlassWater' },
      ],
      disposal: {
        instructions: 'Blue or gray bags in pedal-operated bins.',
        container: 'Blue/Gray Bag',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0RUtsfI5RpolMN02EJrGn1M8DKfcrv8QUAx6bxNhcP6SE0UMP0Csmjyvux8iYK46JEZTyoSkOz8-KeVlpb-plYphN7009gDu3XDtTxLw6z2F0q60cazziSVR11GT6sisDNd2csQKnzjiTMyi4_lWHCXGAI-wsfJXiISChPJv3ta9kgz6sXJ_A1I_d1Zg7GETA_dbf2gAi_ectIdy0drd4tCGz0kE_-qebuj7u9RAP2K3KNPRhSHppzBymiOb0Km53uOAB3fVrrQHq',
      },
      risks: [
        'Recyclable Contamination: Mixing with organic waste.',
        'Wastefulness: Discarding infectious waste as common.',
      ],
      mistakes: [
        'Mixing organic waste with recyclable material.',
        'Discarding contaminated gloves or gauze in Group D.',
      ],
      summary: [
        { attribute: 'Identification', specification: 'Identification as defined by the local urban cleaning authority; bags holding Group D waste do not need identification.', term: 'Annex II and Art. 22, §1' },
        { attribute: 'Packaging', specification: 'Package according to the guidance of local bodies responsible for urban cleaning services.', term: 'Art. 21' },
        { attribute: 'Recycling', specification: 'Segregation, packaging and collector identification procedures for recycling must be described in the PGRSS.', term: 'Art. 83' },
        { attribute: 'Composting', specification: 'Only permitted organic waste may go to composting, such as food leftovers and animal bedding without associated biological risk.', term: 'Art. 84' },
        { attribute: 'Group criterion', specification: 'Materials without signs or suspicion of chemical, biological or radiological contamination may be managed as Group D.', term: 'Art. 82' },
      ],
      practicalTip: 'Paper towels from bathrooms and hand washing sinks are Group D.',
    },
    E: {
      id: 'E',
      title: 'Group E: Sharps',
      subtitle: 'Sharps Waste',
      description: 'Sharps or cutting materials, such as needles, scalpel blades, glass ampoules, and lancets.',
      examples: [
        { label: 'Needles and Syringes', description: 'All piercing material used or not.', icon: 'Syringe' },
        { label: 'Scalpel Blades', description: 'Surgical cutting materials.', icon: 'Scissors' },
        { label: 'Glass Ampoules', description: 'Flasks and ampoules that can break.', icon: 'FlaskRound' },
        { label: 'Lancets', description: 'Capillary and venous puncture materials.', icon: 'Zap' },
      ],
      disposal: {
        instructions: 'Rigid and puncture-resistant containers (yellow cardboard box).',
        container: 'Sharps Container',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0ztjmOIWXKc6pb6Ge2CdimcvWatS6dn4vPh0TZGMa-XXMN50OwjbIta-I-OZR-JrrUBEIu_-J7RnLksNt1kysOyKJ518llBeZekh2YgMChXLTqN77UXR8J9SyEJhD2mp3rhsNW4OclEN-KFwPHp_6IV161FM4L9csA59xxOWljGZVh_9O4hQNnMCaOPSBlrgc23OP_hOTlkTy0PYmHw-Vmn5rDVUIV6AHb_m3JZvmwuLliVA37khMzho2M_PFetOsGzh9Pd2pd0WB',
      },
      risks: [
        'Percutaneous Accident: Risk of HIV and Hepatitis transmission.',
        'Bag Puncture: Risk for cleaning staff.',
      ],
      mistakes: [
        'Recapping needles before discarding.',
        'Discarding needles in plastic bags.',
        'Exceeding the 5cm limit from the top of the box.',
      ],
      summary: [
        { attribute: 'Identification', specification: 'Biohazard symbol on a white-background label, with black drawing and outline, plus the wording SHARPS WASTE or SHARPS.', term: 'Annex II - Group E' },
        { attribute: 'Packaging', specification: 'Dispose in identified, rigid containers with lid, resistant to puncture, rupture and leakage.', term: 'Art. 86' },
        { attribute: 'Use limit', specification: 'Replace according to demand, at 3/4 capacity or according to manufacturer instructions; manual emptying and reuse are prohibited.', term: 'Art. 87' },
        { attribute: 'Associated risk', specification: 'When contaminated by biological agents, chemicals or radioactive substances, management must follow each associated risk class.', term: 'Art. 88' },
        { attribute: 'Safety', specification: 'Dispose immediately after use, without manual needle recapping or separation of contaminated assemblies when associated risk exists.', term: 'RDC 222/2018' },
      ],
      practicalTip: 'Never recap needles. Discard immediately after use in the nearest rigid collector.',
    },
  },
  es: {
    A: {
      id: 'A',
      title: 'Grupo A: Peligro Biológico',
      subtitle: 'Residuos Infectantes',
      description: 'Residuos con la posible presencia de agentes biológicos que, por su mayor virulencia ou concentración, pueden presentar riesgo de infección.',
      examples: [
        { label: 'Guantes con Sangre', description: 'Guantes manchados con sangre usados durante procedimientos.', icon: 'Droplets' },
        { label: 'Gasas y Vendajes', description: 'Gasas y vendajes de heridas abiertas.', icon: 'Bandage' },
        { label: 'Bolsas de Transfusión', description: 'Bolsas de transfusión sanguínea vacías o caducadas.', icon: 'HeartPulse' },
        { label: 'Medios de Cultivo', description: 'Medios de cultivo de laboratorio y placas inoculadas.', icon: 'Microscope' },
      ],
      disposal: {
        instructions: 'Bolsa Blanca Lechosa (Estándar para eliminación de riesgos biológicos en unidades de salud).',
        container: 'Bolsa Blanca Lechosa',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBbFfBb0NST1QkQ5NhsgqdWhqt8kHvJt3VPWMKgPqUT7yu6opBTRi4hIggUs8Muhg7e0a3WTW5G7B_9ncGahXJort60qU4dHsAYdywSsF0h6cNaeD6Ait-rm6RO2b3A5LwuBzQqOutA1Wo2SvuZN0xmHvhsu566lKf_m0Mr3QZquRpRtjasxhGRB-BngHe-Smh6f0c31AR0JhpCtXfWZ_F_DISoeQwvWlbtIYRqIHsWCzPS0fTqYBZ9FTisYS2ap4IpSomGKYSdMZ_',
      },
      risks: [
        'Exposición a patógenos como VIH y Hepatitis (B y C).',
        'Contaminación cruzada en ambientes estériles.',
      ],
      mistakes: [
        'Desechar toallas de papel limpias en la bolsa blanca.',
        'Mezclar punzocortantes (Grupo E) en la bolsa de residuos infectantes.',
      ],
      summary: [
        { attribute: 'Identificación', specification: 'Símbolo de riesgo biológico en etiqueta de fondo blanco, dibujo y contornos negros, con la expresión RESIDUO INFECTANTE.', term: 'Anexo II - Grupo A' },
        { attribute: 'Acondicionamiento', specification: 'Bolsa de material resistente a ruptura, fuga e impermeable; bolsa blanca lechosa para residuos que no requieren tratamiento obligatorio o después del tratamiento.', term: 'Arts. 13 y 15' },
        { attribute: 'Tratamiento obligatorio', specification: 'Cuando el tratamiento sea obligatorio, usar bolsa roja; el subgrupo A5 debe segregarse en bolsa roja doble y enviarse a incineración.', term: 'Arts. 16 y 55' },
        { attribute: 'Límite de uso', specification: 'Sustituir la bolsa al alcanzar 2/3 de la capacidad o cada 48 horas; residuos fácilmente putrescibles deben sustituirse en hasta 24 horas.', term: 'Art. 14' },
        { attribute: 'Destino', specification: 'Los residuos tratados o que no requieren tratamiento deben ir a disposición final ambientalmente adecuada según la licencia aplicable.', term: 'Art. 15' },
      ],
      practicalTip: 'En caso de duda entre bolsas comunes (negra/azul) e infectantes (blanca), si hubo contacto directo con fluidos corporales, debe ir al Grupo A.',
    },
    B: {
      id: 'B',
      title: 'Grupo B: Residuos Químicos',
      subtitle: 'Residuos Químicos',
      description: 'Sustancias químicas que presentan un riesgo para la salud pública o el medio ambiente debido a su inflamabilidad, corrosividad, reactividad o toxicidade.',
      examples: [
        { label: 'Solventes Orgánicos', description: 'Inflamable: Frasco de vidrio ámbar o HDPE.', icon: 'FlaskConical' },
        { label: 'Ácido Sulfúrico', description: 'Corrosivo: Contenedor resistente a ácidos fuertes.', icon: 'TestTubeDiagonal' },
        { label: 'Medicamentos Caducados', description: 'Tóxico: Envase original o rígido naranja.', icon: 'Pill' },
        { label: 'Metales Pesados', description: 'Persistente: Sellado hermético obligatorio.', icon: 'Skull' },
      ],
      disposal: {
        instructions: 'Utilizar recipientes rígidos, resistentes a pinchazos y con tapón de rosca, identificados con el símbolo de residuo químico.',
        container: 'Contenedor Naranja',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaG4kwlCOPwPgbuuiB7gzHDaWsleQUb395dnT2x4ZxD7LlfGUngC5sP-XVIHj5vF90MKzRqNJSLwKORWWRNdb_RTMFnaVK_uSH4xOmEXzP1V9gXtypUbRPPLHp3T9GT0S67I9_w-GbmP6cOJpuX0eK3cU3UNooA6KtUfNPKnR4-_lr2kFbewrafBiATbgnX2jorWOtbMsH7j8minJO_SgoN4VdAQRgj84xU73LAQdDPl2RrX193TDm3pLD3djmsNPzyDWPsHq2fTHl',
      },
      risks: [
        'Quemaduras Químicas: Lesiones graves por contacto directo con ácidos o bases.',
        'Contaminación Ambiental: Daños irreversibles a aguas subterráneas y fauna local.',
      ],
      mistakes: [
        'Desechar líquidos en fregaderos comunes.',
        'Mezclar sustancias incompatibles.',
        'Omitir la identificación en el contenedor.',
      ],
      summary: [
        { attribute: 'Identificación', specification: 'Símbolo y frase de riesgo asociados a la peligrosidad del residuo químico; pueden usarse símbolos y frases GHS según el riesgo.', term: 'Anexo II - Grupo B' },
        { attribute: 'Acondicionamiento líquido', specification: 'Recipiente compatible con el líquido, resistente, rígido, estanco, con tapa que garantice contención e identificación.', term: 'Art. 18' },
        { attribute: 'Acondicionamiento sólido', specification: 'Recipiente rígido, resistente, compatible con las características del producto químico acondicionado e identificado.', term: 'Art. 19' },
        { attribute: 'Segregación', specification: 'Sustancias químicas incompatibles o de categorías distintas deben segregarse, acondicionarse e identificarse por separado.', term: 'Anexos III y IV' },
        { attribute: 'Tratamiento y destino', specification: 'Residuos químicos peligrosos líquidos deben tratarse antes de la disposición final; rechazos sólidos peligrosos van a vertedero Clase I.', term: 'Arts. 57 y 58' },
      ],
      practicalTip: 'Todos los residuos químicos deben estar debidamente etiquetados con el nombre de la sustancia, fecha y responsable.',
    },
    C: {
      id: 'C',
      title: 'Grupo C: Residuos Radiactivos',
      subtitle: 'Residuos Radiactivos',
      description: 'Materiales que contienen radionúclidos en cantidades superiores a los límites de exención establecidos por las autoridades de radiación.',
      examples: [
        { label: 'Medicina Nuclear', description: 'Servicios de Medicina Nuclear e Radioterapia.', icon: 'Radiation' },
        { label: 'Investigación', description: 'Laboratorios de investigación que usan radioisótopos.', icon: 'Microscope' },
        { label: 'Fluidos Corporais', description: 'Fluidos corporales de pacientes em tratamento.', icon: 'Droplets' },
        { label: 'Contaminados', description: 'Agulhas, seringas e luvas contaminadas.', icon: 'Biohazard' },
      ],
      disposal: {
        instructions: 'Deben guardarse en contenedores blindados (generalmente plomo) hasta su decaimiento total.',
        container: 'Blindaje de Plomo',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkTKvBqo4d10NWR1gef27d99lgx5StWrhHqEjPq1YikehYcsfCa5GWAQuJc62D-xxkSfBLSjNayDh5GSNaOfpxamm4cYhm88Whxhaca3gnH-x1XTvmrrhDlsx6oi6EqnQu1vk4_diFvfI-HxxtwbN6RkmTJjsUcl18wgxXc_KAQ3DU24af58Bf8-9tcHzgrUqQ4Qq3TMh36lWhbDZZMGOwWdOtEKxjsVB-z8QcmmpCOXpurVJuyVgspDS8YCHhLRdOSey7_wERoED2',
      },
      risks: [
        'Radiación Ionizante: Daños celulares y mutaciones genéticas.',
        'Quemaduras Radiológicas: Lesiones graves por exposición directa.',
      ],
      mistakes: [
        'Desechar residuos sin verificar la vida media.',
        'Mezclar con residuos del Grupo A.',
        'Falta de identificación de la fecha de entrada.',
      ],
      summary: [
        { attribute: 'Identificación', specification: 'Símbolo internacional de radiación ionizante en etiqueta de fondo amarillo, con la expresión MATERIAL RADIOACTIVO, RECHAZO RADIOACTIVO o RADIOACTIVO.', term: 'Anexo II - Grupo C' },
        { attribute: 'Acondicionamiento', specification: 'Procedimientos definidos por supervisor de protección radiológica calificado por CNEN; recipientes adecuados a características físicas, químicas, biológicas y radiológicas.', term: 'Arts. 20 y 73' },
        { attribute: 'Segregación', specification: 'Segregar según radionúclido o naturaleza de la radiación, estado físico, concentración y tasa de exposición.', term: 'Art. 72' },
        { attribute: 'Decaimiento', specification: 'Almacenar en condiciones adecuadas para decaimiento, en el área de manipulación o en sala específica identificada como SALA DE DECAIMIENTO.', term: 'Art. 76' },
        { attribute: 'Reclasificación', specification: 'Tras alcanzar el límite de dispensa, retirar la identificación de riesgo radiológico mediante medición y clasificar según el riesgo remanente.', term: 'Art. 80' },
      ],
      practicalTip: 'El blindaje es obligatorio para todos los residuos del Grupo C hasta que el decaimiento permita su eliminación.',
    },
    D: {
      id: 'D',
      title: 'Grupo D: Residuos Comunes',
      subtitle: 'Residuos Comunes',
      description: 'Residuos que no presentan un riesgo biológico, químico o radiológico. Similares a los residuos domésticos.',
      examples: [
        { label: 'Papel y Cartón', description: 'No contaminados: papeles y envases.', icon: 'FileText' },
        { label: 'Restos de Comida', description: 'Cocina, recepción y áreas administrativas.', icon: 'Utensils' },
        { label: 'Papel Estéril', description: 'Envases de papel estéril limpios.', icon: 'ShieldCheck' },
        { label: 'Plásticos Limpios', description: 'Vasos y botellas no utilizados en la asistencia.', icon: 'GlassWater' },
      ],
      disposal: {
        instructions: 'Bolsas de color azul o gris en contenedores accionados por pedal.',
        container: 'Bolsa Azul/Gris',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0RUtsfI5RpolMN02EJrGn1M8DKfcrv8QUAx6bxNhcP6SE0UMP0Csmjyvux8iYK46JEZTyoSkOz8-KeVlpb-plYphN7009gDu3XDtTxLw6z2F0q60cazziSVR11GT6sisDNd2csQKnzjiTMyi4_lWHCXGAI-wsfJXiISChPJv3ta9kgz6sXJ_A1I_d1Zg7GETA_dbf2gAi_ectIdy0drd4tCGz0kE_-qebuj7u9RAP2K3KNPRhSHppzBymiOb0Km53uOAB3fVrrQHq',
      },
      risks: [
        'Contaminación de Reciclables: Mezclar con residuos orgánicos.',
        'Desperdicio: Desechar residuos infectantes como comunes.',
      ],
      mistakes: [
        'Mezclar residuos orgánicos con material reciclable.',
        'Desechar guantes o gasas contaminadas en el Grupo D.',
      ],
      summary: [
        { attribute: 'Identificación', specification: 'Identificación conforme lo definido por el órgano de limpieza urbana; las bolsas que acondicionan residuos del Grupo D no necesitan identificación.', term: 'Anexo II y Art. 22, §1º' },
        { attribute: 'Acondicionamiento', specification: 'Acondicionar de acuerdo con las orientaciones de los órganos locales responsables del servicio de limpieza urbana.', term: 'Art. 21' },
        { attribute: 'Reciclaje', specification: 'Los procedimientos de segregación, acondicionamiento e identificación de colectores para reciclaje deben estar descritos en el PGRSS.', term: 'Art. 83' },
        { attribute: 'Compostaje', specification: 'Solo residuos orgánicos permitidos pueden ir a compostaje, como sobras de alimentos y forrajes sin riesgo biológico asociado.', term: 'Art. 84' },
        { attribute: 'Criterio de grupo', specification: 'Materiales sin señales o sospecha de contaminación química, biológica o radiológica pueden manejarse como Grupo D.', term: 'Art. 82' },
      ],
      practicalTip: 'Las toallas de papel de los baños y lavabos son del Grupo D.',
    },
    E: {
      id: 'E',
      title: 'Grupo E: Punzocortantes',
      subtitle: 'Residuos Punzocortantes',
      description: 'Materiales punzocortantes o escarificantes, como agujas, hojas de bisturí, ampollas de vidrio y lancetas.',
      examples: [
        { label: 'Agujas y Jeringas', description: 'Todo material punzante usado o no.', icon: 'Syringe' },
        { label: 'Hojas de Bisturí', description: 'Materiales de corte quirúrgico.', icon: 'Scissors' },
        { label: 'Ampollas de Vidrio', description: 'Frascos y ampollas que pueden romperse.', icon: 'FlaskRound' },
        { label: 'Lancetas', description: 'Materiales de punción capilar y venosa.', icon: 'Zap' },
      ],
      disposal: {
        instructions: 'Contenedores rígidos y resistentes a pinchazos (caja de cartón amarilla).',
        container: 'Contenedor Punzocortante',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0ztjmOIWXKc6pb6Ge2CdimcvWatS6dn4vPh0TZGMa-XXMN50OwjbIta-I-OZR-JrrUBEIu_-J7RnLksNt1kysOyKJ518llBeZekh2YgMChXLTqN77UXR8J9SyEJhD2mp3rhsNW4OclEN-KFwPHp_6IV161FM4L9csA59xxOWljGZVh_9O4hQNnMCaOPSBlrgc23OP_hOTlkTy0PYmHw-Vmn5rDVUIV6AHb_m3JZvmwuLliVA37khMzho2M_PFetOsGzh9Pd2pd0WB',
      },
      risks: [
        'Accidente Percutáneo: Riesgo de transmisión de VIH y Hepatitis.',
        'Perforación de Bolsas: Riesgo para el personal de limpieza.',
      ],
      mistakes: [
        'Reencapuchar agujas antes de desecharlas.',
        'Desechar agujas en bolsas de plástico.',
        'Exceder el límite de 5 cm desde la parte superior de la caja.',
      ],
      summary: [
        { attribute: 'Identificación', specification: 'Símbolo de riesgo biológico en etiqueta de fondo blanco, dibujo y contorno negro, con la inscripción RESIDUO PUNZOCORTANTE o PUNZOCORTANTE.', term: 'Anexo II - Grupo E' },
        { attribute: 'Acondicionamiento', specification: 'Descartar en recipientes identificados, rígidos, con tapa, resistentes a punción, ruptura y fuga.', term: 'Art. 86' },
        { attribute: 'Límite de uso', specification: 'Sustituir según demanda, al alcanzar 3/4 de la capacidad o según instrucciones del fabricante; se prohíbe vaciado manual y reutilización.', term: 'Art. 87' },
        { attribute: 'Riesgo asociado', specification: 'Cuando estén contaminados por agentes biológicos, químicos o sustancias radioactivas, el manejo debe seguir cada clase de riesgo asociada.', term: 'Art. 88' },
        { attribute: 'Seguridad', specification: 'El descarte debe ocurrir inmediatamente después del uso, sin reencapuchar agujas ni separar conjuntos contaminados cuando exista riesgo asociado.', term: 'RDC 222/2018' },
      ],
      practicalTip: 'Nunca reencapuche agujas. Deséchelas inmediatamente después de su uso en el recolector rígido más cercano.',
    },
  },
};

export const SCENARIOS: Record<Language, Scenario[]> = {
  pt: [
    {
      id: 'samu',
      title: 'Atendimento SAMU',
      category: 'Emergência Extra-hospitalar',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM6x_dPnnP5fi0MxCat9ErVsTA5RkAYFhUeDIRMKpCQuX7L6QiMaAHY8K2-XqTzIPo8UqFyOrN3KJF_ThJRRWvRLB2VMXPKxHv3TRuRnhu9bDcpRK6vmDdI5q70I7J5E46BsqYUAqNJMEtiSxK-ywVz7SODbGOsBO4cof8_wOwuSlLnXPfKbgJ6MgMvF5YQ3Zf38kbBRk0oJ52GXrzWkbMwN0mRwoB-NxMyVTWN2F5ehTNGdLycPIXg4Ok3bTUEeEwDIyiOmWHTBFj',
      wrong: 'Descartar agulhas de acesso venoso no lixo comum ou sacos plásticos infectantes dentro da viatura.',
      right: 'Uso imediato do coletor de perfurocortantes (caixa amarela) logo após o procedimento, mesmo em trânsito.',
    },
    {
      id: 'uti',
      title: 'Troca de Sonda na UTI',
      category: 'Unidade de Terapia Intensiva',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBbFfBb0NST1QkQ5NhsgqdWhqt8kHvJt3VPWMKgPqUT7yu6opBTRi4hIggUs8Muhg7e0a3WTW5G7B_9ncGahXJort60qU4dHsAYdywSsF0h6cNaeD6Ait-rm6RO2b3A5LwuBzQqOutA1Wo2SvuZN0xmHvhsu566lKf_m0Mr3QZquRpRtjasxhGRB-BngHe-Smh6f0c31AR0JhpCtXfWZ_F_DISoeQwvWlbtIYRqIHsWCzPS0fTqYBZ9FTisYS2ap4IpSomGKYSdMZ_',
      wrong: 'Descartar o invólucro plástico limpo no saco branco de infectantes.',
      right: 'Descarte a sonda no saco branco (Grupo A). O invólucro limpo vai para o Grupo D.',
      attention: 'Lixeiras devem ser acionadas por pedal.',
    },
    {
      id: 'cc',
      title: 'Centro Cirúrgico',
      category: 'Pós-Operatório',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1qvjiKgaA2i7XucKzr1OUphoL_HgQoPGfY5KyfNwOLpPg757zrcdnvr5U-WtpEtpjrGnnYdmcY1BfulQzU_Wd9CEDHqQhxzU-LwKzzYxxkM97d0ZUSIdri65yRpHj0Ws1fxM-5w2TORPDBes_iTwoLZ3kcusdpJV2wk-gAIObmJC1u941iWzOwYBRmcX4K0IcLKM3HCQUtqImPb1c-tgGWfvoYoTVnVuXAaFvnbYfQXNceHDD_AsVzxZRhkygDhbYaJ9xLC3yU0zy',
      wrong: 'Encaminhar peças anatômicas (tecidos) para o lixo infectante comum.',
      right: 'Peças anatômicas devem ser encaminhadas para anatomia patológica em fluxo diferenciado.',
    }
  ],
  en: [
    {
      id: 'samu',
      title: 'SAMU Care',
      category: 'Out-of-hospital Emergency',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM6x_dPnnP5fi0MxCat9ErVsTA5RkAYFhUeDIRMKpCQuX7L6QiMaAHY8K2-XqTzIPo8UqFyOrN3KJF_ThJRRWvRLB2VMXPKxHv3TRuRnhu9bDcpRK6vmDdI5q70I7J5E46BsqYUAqNJMEtiSxK-ywVz7SODbGOsBO4cof8_wOwuSlLnXPfKbgJ6MgMvF5YQ3Zf38kbBRk0oJ52GXrzWkbMwN0mRwoB-NxMyVTWN2F5ehTNGdLycPIXg4Ok3bTUEeEwDIyiOmWHTBFj',
      wrong: 'Discarding venous access needles in common waste or infectious plastic bags inside the vehicle.',
      right: 'Immediate use of sharps collector (yellow box) right after the procedure, even in transit.',
    },
    {
      id: 'uti',
      title: 'Catheter Exchange in ICU',
      category: 'Intensive Care Unit',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBbFfBb0NST1QkQ5NhsgqdWhqt8kHvJt3VPWMKgPqUT7yu6opBTRi4hIggUs8Muhg7e0a3WTW5G7B_9ncGahXJort60qU4dHsAYdywSsF0h6cNaeD6Ait-rm6RO2b3A5LwuBzQqOutA1Wo2SvuZN0xmHvhsu566lKf_m0Mr3QZquRpRtjasxhGRB-BngHe-Smh6f0c31AR0JhpCtXfWZ_F_DISoeQwvWlbtIYRqIHsWCzPS0fTqYBZ9FTisYS2ap4IpSomGKYSdMZ_',
      wrong: 'Discarding clean plastic wrap in the white infectious bag.',
      right: 'Discard the catheter in the white bag (Group A). Clean wrap goes to Group D.',
      attention: 'Bins must be pedal-operated.',
    },
    {
      id: 'cc',
      title: 'Operating Room',
      category: 'Post-Operative',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1qvjiKgaA2i7XucKzr1OUphoL_HgQoPGfY5KyfNwOLpPg757zrcdnvr5U-WtpEtpjrGnnYdmcY1BfulQzU_Wd9CEDHqQhxzU-LwKzzYxxkM97d0ZUSIdri65yRpHj0Ws1fxM-5w2TORPDBes_iTwoLZ3kcusdpJV2wk-gAIObmJC1u941iWzOwYBRmcX4K0IcLKM3HCQUtqImPb1c-tgGWfvoYoTVnVuXAaFvnbYfQXNceHDD_AsVzxZRhkygDhbYaJ9xLC3yU0zy',
      wrong: 'Sending anatomical parts (tissues) to common infectious waste.',
      right: 'Anatomical parts must be sent to pathology in a separate flow.',
    }
  ],
  es: [
    {
      id: 'samu',
      title: 'Atención SAMU',
      category: 'Emergencia Extrahospitalaria',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM6x_dPnnP5fi0MxCat9ErVsTA5RkAYFhUeDIRMKpCQuX7L6QiMaAHY8K2-XqTzIPo8UqFyOrN3KJF_ThJRRWvRLB2VMXPKxHv3TRuRnhu9bDcpRK6vmDdI5q70I7J5E46BsqYUAqNJMEtiSxK-ywVz7SODbGOsBO4cof8_wOwuSlLnXPfKbgJ6MgMvF5YQ3Zf38kbBRk0oJ52GXrzWkbMwN0mRwoB-NxMyVTWN2F5ehTNGdLycPIXg4Ok3bTUEeEwDIyiOmWHTBFj',
      wrong: 'Desechar agujas de acceso venoso en la basura común o bolsas de plástico infectantes dentro de la ambulancia.',
      right: 'Uso inmediato del recolector de punzocortantes (caja amarilla) justo después del procedimiento, incluso en tránsito.',
    },
    {
      id: 'uti',
      title: 'Cambio de Sonda en UCI',
      category: 'Unidad de Cuidados Intensivos',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBbFfBb0NST1QkQ5NhsgqdWhqt8kHvJt3VPWMKgPqUT7yu6opBTRi4hIggUs8Muhg7e0a3WTW5G7B_9ncGahXJort60qU4dHsAYdywSsF0h6cNaeD6Ait-rm6RO2b3A5LwuBzQqOutA1Wo2SvuZN0xmHvhsu566lKf_m0Mr3QZquRpRtjasxhGRB-BngHe-Smh6f0c31AR0JhpCtXfWZ_F_DISoeQwvWlbtIYRqIHsWCzPS0fTqYBZ9FTisYS2ap4IpSomGKYSdMZ_',
      wrong: 'Desechar el envoltorio plástico limpio en la bolsa blanca de infectantes.',
      right: 'Deseche la sonda en la bolsa blanca (Grupo A). El envoltorio limpio va al Grupo D.',
      attention: 'Los cubos de basura deben ser accionados por pedal.',
    },
    {
      id: 'cc',
      title: 'Centro Quirúrgico',
      category: 'Posoperatorio',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1qvjiKgaA2i7XucKzr1OUphoL_HgQoPGfY5KyfNwOLpPg757zrcdnvr5U-WtpEtpjrGnnYdmcY1BfulQzU_Wd9CEDHqQhxzU-LwKzzYxxkM97d0ZUSIdri65yRpHj0Ws1fxM-5w2TORPDBes_iTwoLZ3kcusdpJV2wk-gAIObmJC1u941iWzOwYBRmcX4K0IcLKM3HCQUtqImPb1c-tgGWfvoYoTVnVuXAaFvnbYfQXNceHDD_AsVzxZRhkygDhbYaJ9xLC3yU0zy',
      wrong: 'Enviar piezas anatómicas (tejidos) a la basura infectante común.',
      right: 'Las piezas anatómicas deben enviarse a anatomía patológica en un flujo diferenciado.',
    }
  ]
};

export const QUIZ: Record<Language, QuizQuestion[]> = {
  pt: [
    {
      id: 1,
      category: 'Resíduos Infectantes',
      question: 'Paciente apresenta curativo com sangue vivo após procedimento. Qual o descarte correto segundo o protocolo Grupo A?',
      options: [
        'Saco branco leitoso com símbolo de risco biológico.',
        'Recipiente rígido resistente a perfurações (Perfurocortantes).',
        'Lixeira comum (saco preto/cinza) para posterior triagem.'
      ],
      correctAnswer: 0,
      explanation: 'Materiais com sangue excessivo devem ser segredados imediatamente no saco branco leitoso para prevenir riscos biológicos.'
    },
    {
      id: 2,
      category: 'Segurança com Perfurocortantes',
      question: 'Qual a conduta correta ao finalizar o uso de uma agulha de punção?',
      options: [
        'Reencapar e descartar no saco branco.',
        'Descartar imediatamente sem reencapar na caixa amarela.',
        'Colocar na bandeja para descarte posterior pela equipe de limpeza.'
      ],
      correctAnswer: 1,
      explanation: 'Nunca reencape agulhas. O descarte deve ser imediato no coletor rígido (Grupo E).'
    }
  ],
  en: [
    {
      id: 1,
      category: 'Infectious Waste',
      question: 'Patient presents a dressing with brisk bleeding after a procedure. What is the correct disposal according to Group A protocol?',
      options: [
        'Milky white bag with biohazard symbol.',
        'Rigid puncture-resistant container (Sharps).',
        'Common trash can (black/gray bag) for later sorting.'
      ],
      correctAnswer: 0,
      explanation: 'Materials with excessive blood must be immediately segregated in the milky white bag to prevent biological risks.'
    },
    {
      id: 2,
      category: 'Sharps Safety',
      question: 'What is the correct procedure when finishing the use of a puncture needle?',
      options: [
        'Recap and discard in the white bag.',
        'Discard immediately without recapping in the yellow box.',
        'Place on the tray for later disposal by the cleaning staff.'
      ],
      correctAnswer: 1,
      explanation: 'Never recap needles. Disposal must be immediate in the rigid collector (Group E).'
    }
  ],
  es: [
    {
      id: 1,
      category: 'Residuos Infectantes',
      question: 'El paciente presenta un vendaje con sangre viva después de un procedimiento. ¿Cuál es el desecho correcto según el protocolo del Grupo A?',
      options: [
        'Bolsa blanca lechosa con símbolo de riesgo biológico.',
        'Contenedor rígido resistente a pinchazos (Punzocortantes).',
        'Cubo de basura común (bolsa negra/gris) para clasificación posterior.'
      ],
      correctAnswer: 0,
      explanation: 'Los materiales con exceso de sangre deben segregarse inmediatamente en la bolsa blanca lechosa para prevenir riesgos biológicos.'
    },
    {
      id: 2,
      category: 'Seguridad con Punzocortantes',
      question: '¿Cuál es la conducta correcta al finalizar el uso de una aguja de punción?',
      options: [
        'Reencapuchar y desechar en la bolsa blanca.',
        'Desechar inmediatamente sin reencapuchar en la caja amarilla.',
        'Colocar en la bandeja para su posterior eliminación por el personal de limpieza.'
      ],
      correctAnswer: 1,
      explanation: 'Nunca reencapuche agujas. El desecho debe ser inmediato en el recolector rígido (Grupo E).'
    }
  ]
};

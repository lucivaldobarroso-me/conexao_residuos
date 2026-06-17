insert into public.questions
  (title, question_text, option_a, option_b, option_c, correct_option, explanation)
values
  (
    'Conceito do Grupo A',
    'De acordo com a classificacao dos Residuos de Servicos de Saude (RSS), os residuos com possivel presenca de agentes biologicos que podem apresentar risco de infeccao pertencem a qual grupo?',
    'Grupo A',
    'Grupo B',
    'Grupo C',
    'A',
    'A (Correta): O Grupo A engloba todos os residuos com possivel presenca de agentes biologicos (como culturas, carcacas e pecas anatomicas) que apresentam risco de infeccao.
B (Incorreta): O Grupo B e destinado aos residuos que contem substancias quimicas com risco a saude publica ou ao meio ambiente.
C (Incorreta): O Grupo C e exclusivo para os rejeitos radioativos contendo radionuclideos.'
  ),
  (
    'Conceito do Grupo B',
    'Medicamentos vencidos, reagentes de laboratorio e efluentes de equipamentos automatizados de analises que apresentam toxicidade devem ser classificados em qual grupo?',
    'Grupo D',
    'Grupo B',
    'Grupo E',
    'B',
    'A (Incorreta): O Grupo D abriga residuos comuns, equiparados ao lixo domiciliar, que nao possuem risco quimico, biologico ou radiologico.
B (Correta): O Grupo B classifica os residuos contendo substancias quimicas que apresentam risco em funcao de sua inflamabilidade, corrosividade, reatividade ou toxicidade.
C (Incorreta): O Grupo E e reservado aos materiais perfurocortantes ou escarificantes.'
  ),
  (
    'Conceito do Grupo C',
    'Quaisquer materiais resultantes de atividades humanas que contenham radionuclideos em quantidades superiores aos limites de isencao pertencem ao:',
    'Grupo A',
    'Grupo C',
    'Grupo E',
    'B',
    'A (Incorreta): O Grupo A e focado em riscos biologicos (agentes infecciosos) e nao radioativos.
B (Correta): O Grupo C e estritamente voltado para rejeitos radioativos cujos limites de eliminacao sao regidos pelas normas da Comissao Nacional de Energia Nuclear (CNEN).
C (Incorreta): O Grupo E trata dos materiais que perfuram ou cortam, nao definindo o risco radioativo.'
  ),
  (
    'Conceito do Grupo D',
    'Papel toalha do banheiro, restos de alimentos de refeitorios e papeis de escritorio sao exemplos de residuos do:',
    'Grupo C',
    'Grupo A',
    'Grupo D',
    'C',
    'A (Incorreta): Estes materiais nao emitem radiacao, logo nao sao do Grupo C.
B (Incorreta): Estes materiais (quando nao utilizados em contato com fluidos corporais infectantes) nao contem agentes biologicos, nao pertencendo ao Grupo A.
C (Correta): Estes sao residuos que nao apresentam riscos biologicos, quimicos ou radiologicos a saude ou ao meio ambiente, equiparando-se ao lixo domiciliar comum (Grupo D).'
  ),
  (
    'Conceito do Grupo E',
    'Laminas de bisturi, agulhas, escalpes e vidrarias de laboratorio quebradas sao classificados como:',
    'Grupo E',
    'Grupo B',
    'Grupo D',
    'A',
    'A (Correta): O Grupo E engloba todos os materiais perfurocortantes ou escarificantes, sejam eles contaminados ou nao.
B (Incorreta): O Grupo B e voltado para produtos quimicos nao envasados em formato cortante (embora um perfurocortante com quimica tenha manejo misto, a classificacao primaria do objeto afiado e Grupo E).
C (Incorreta): Vidros quebrados e laminas apresentam risco de perfuracao, portanto, nao podem ir para o Grupo D (lixo comum) sob risco de ferir os trabalhadores.'
  ),
  (
    'Acondicionamento de luvas e jalecos limpos',
    'Luvas e jalecos descartaveis que foram usados no laboratorio, mas que nao sofreram contaminacao biologica, quimica ou radioativa, devem ser descartados no:',
    'Grupo A',
    'Grupo E',
    'Grupo D',
    'C',
    'A (Incorreta): Como nao houve contato ou contaminacao com agentes infecciosos, nao representam risco biologico (Grupo A).
B (Incorreta): Luvas e jalecos nao possuem cantos, bordas ou pontas capazes de perfurar, descartando o Grupo E.
C (Correta): Materiais de laboratorio limpos e sem qualquer contaminacao sao equiparados aos residuos domiciliares, enquadrando-se no Grupo D.'
  ),
  (
    'Norma de descarte de agulhas',
    'De acordo com a Norma Regulamentadora no 32 (NR 32) e os manuais de biosseguranca, qual e o procedimento correto ao descartar uma seringa com agulha apos o uso?',
    'Reencapar a agulha e desprezar em lixo comum (Grupo D).',
    'Desprezar todo o conjunto (seringa e agulha) sem reencapar no coletor rigido (Grupo E).',
    'Desconectar a agulha da seringa manualmente para economizar espaco no coletor.',
    'B',
    'A (Incorreta): A NR 32 proibe o reencape para evitar acidentes de trabalho e veda o descarte de perfurocortantes no lixo comum.
B (Correta): A legislacao veda expressamente o reencape e a desconexao manual, exigindo que o conjunto inteiro seja desprezado imediatamente em recipientes rigidos proprios para perfurocortantes.
C (Incorreta): A desconexao manual da agulha aumenta severamente o risco de acidente com material biologico, sendo estritamente proibida.'
  ),
  (
    'Limite de enchimento do Grupo E',
    'Para garantir a seguranca no descarte, as caixas coletoras para residuos perfurocortantes (Grupo E) devem ser preenchidas ate que limite?',
    'Ate 3/4 de sua capacidade maxima ou conforme limite indicado pelo fabricante.',
    'Ate 100% de sua capacidade (ficar completamente cheias).',
    'Ate 1/3 de sua capacidade maxima.',
    'A',
    'A (Correta): A RDC 222/2018 orienta substituir os coletores de perfurocortantes ao atingir 3/4 da capacidade ou conforme as instrucoes do fabricante, permitindo fechamento seguro e evitando vazamentos ou perfuracoes.
B (Incorreta): Preencher 100% causaria a projecao de agulhas para fora do recipiente, o que provocaria acidentes e impediria a vedacao da caixa.
C (Incorreta): Preencher apenas 1/3 causaria um alto desperdicio de recipientes coletores, nao sendo este o padrao exigido.'
  ),
  (
    'Cores dos sacos para Grupo A',
    'Qual e a cor do saco plastico padronizada para acondicionar residuos biologicos do Grupo A que obrigatoriamente precisam de tratamento previo (ex: autoclavacao) na instituicao antes da destinacao final?',
    'Saco preto.',
    'Saco amarelo.',
    'Saco vermelho.',
    'C',
    'A (Incorreta): Os sacos pretos sao exclusivos para lixo comum (Grupo D) nao reciclavel.
B (Incorreta): Sacos amarelos (ou recipientes rigidos dessa cor, dependendo da norma local) sinalizam risco para residuos quimicos ou mistos e nao sao o padrao primario para risco biologico pre-tratamento.
C (Correta): A RDC no 222/2018 exige a cor vermelha com o simbolo de substancia infectante para os residuos do Grupo A que obrigatoriamente requerem tratamento previo.'
  ),
  (
    'Mistura de Residuos Quimicos (Grupo B)',
    'Para otimizar o espaco no laboratorio, e permitido misturar diferentes residuos quimicos (Grupo B) no mesmo recipiente coletor?',
    'Sim, desde que todos sejam liquidos.',
    'Sim, contanto que o recipiente seja amarelo.',
    'Nao, nao se deve misturar residuos quimicos diferentes.',
    'C',
    'A (Incorreta): O estado fisico da materia nao impede que substancias reajam. Dois liquidos incompativeis misturados podem explodir ou liberar gases toxicos.
B (Incorreta): A cor do recipiente indica apenas a classe de risco, nao garantindo a seguranca de uma mistura quimica nao planejada.
C (Correta): E estritamente proibido misturar residuos quimicos diferentes, pois as substancias podem ser incompativeis, reagir violentamente entre si, causar incendios, explosoes ou a formacao de gases letais.'
  ),
  (
    'Termometro quebrado com mercurio',
    'Se um termometro de vidro com mercurio quebra no laboratorio, como este residuo deve ser classificado e descartado?',
    'Como Grupo E com risco quimico associado.',
    'Apenas como Grupo D, embalando o vidro em papel grosso.',
    'Apenas como Grupo A, pois era usado em pacientes.',
    'A',
    'A (Correta): O vidro quebrado atua como perfurocortante (Grupo E) e o mercurio e um metal pesado altamente toxico (Grupo B). Por isso, classifica-se como perfurocortante com risco quimico associado, devendo ser embalado em caixa rigida resistente e encaminhado ao descarte quimico.
B (Incorreta): O mercurio tem altissima toxicidade; descarta-lo como lixo comum (Grupo D) e um grave crime ambiental e risco a saude publica.
C (Incorreta): Mesmo que usado em pacientes, o risco do mercurio (quimico) e o corte do vidro sobrepoem-se, nao sendo apenas uma questao biologica (Grupo A).'
  ),
  (
    'Efeito do Tratamento (Autoclavacao)',
    'Quando um residuo biologico (Grupo A) e autoclavado de modo que o processo reduza sua carga microbiana a niveis seguros e retire suas caracteristicas fisicas iniciais (descaracterizacao), como ele pode ser descartado a seguir?',
    'Ele pode ser acondicionado como residuo comum (Grupo D).',
    'Ele passa a ser classificado como Grupo C (Rejeito Radioativo).',
    'Ele deve ser obrigatoriamente incinerado pelo fabricante.',
    'A',
    'A (Correta): O objetivo do tratamento termico (autoclavacao) e converter residuos infectantes em residuos comuns. Se for descaracterizado e perder sua identificacao original, o material passa a ser lixo comum (Grupo D).
B (Incorreta): O calor umido nao cria radioatividade; portanto, o lixo jamais se transformaria no Grupo C.
C (Incorreta): Embora alguns residuos precisem ser incinerados (como carcacas ou agentes de classe de risco 4), a maioria do lixo biologico de bancada (nivel 1 ou 2) que foi adequadamente tratado e descaracterizado pode ir para lixo comum.'
  ),
  (
    'Descarte de Carcacas de Animais de Laboratorio',
    'As carcacas de animais de experimentacao submetidos a eutanasia no bioterio pertencem a qual grupo e exigem qual destinacao?',
    'Grupo D, podendo ser enterrados em qualquer area externa.',
    'Grupo A, devendo preferencialmente ser autoclavados e/ou incinerados.',
    'Grupo C, pois as celulas animais emitem radiacao apos a morte.',
    'B',
    'A (Incorreta): Carcacas usadas em laboratorio podem conter agentes biologicos ou drogas de uso veterinario, nao sendo lixo comum, e enterros irregulares contaminam o solo.
B (Correta): Animais de bioterio que manipularam amostras ou tecidos sao considerados residuos com potencial de infeccao (Grupo A). Os manuais de biosseguranca exigem sua esterilizacao (como autoclavacao) e incineracao.
C (Incorreta): Celulas animais normais nao emitem radiacao ionizante. A morte natural ou eutanasia nao torna o animal radioativo (Grupo C).'
  ),
  (
    'Saco Plastico Preto',
    'Qual grupo de residuos deve ser descartado nos sacos plasticos de cor preta?',
    'Grupo A - Culturas de bacterias.',
    'Grupo D - Residuos comuns nao reciclaveis (ex: papel higienico, restos alimentares).',
    'Grupo E - Laminas e bisturis.',
    'B',
    'A (Incorreta): O Grupo A usa sacos vermelhos ou brancos leitosos.
B (Correta): Residuos semelhantes aos domesticos, nao reciclaveis, como papeis de banheiro e copas, compoem a fracao nao reciclavel do Grupo D e sao descartados no saco preto.
C (Incorreta): O Grupo E jamais vai em sacos (pretos ou de qualquer cor); exige involucros rigidos para evitar perfuracao.'
  ),
  (
    'Entidade reguladora do Grupo C',
    'Qual e o orgao responsavel pelas normas que especificam os limites de isencao para a classificacao e descarte dos Rejeitos Radioativos (Grupo C)?',
    'Comissao Nacional de Energia Nuclear (CNEN).',
    'Agencia Nacional de Aguas (ANA).',
    'Instituto Nacional de Metrologia, Qualidade e Tecnologia (Inmetro).',
    'A',
    'A (Correta): Todo manuseio, controle e descarte de rejeitos radioativos em territorio brasileiro deve obrigatoriamente seguir as diretrizes rigidas da CNEN, conforme citado nas normativas do Grupo C.
B (Incorreta): A ANA cuida dos recursos hidricos, nao sendo a autarquia responsavel pelas normas de elementos radioativos.
C (Incorreta): O Inmetro e focado na metrologia, padronizacao e qualidade de produtos em geral, nao estabelecendo niveis de decaimento radiologico.'
  ),
  (
    'Tratamento de Sobras Biologicas (Subgrupo A1)',
    'Cultura de microrganismos isolados em placas de Petri (subgrupo A1) pode ser enviada diretamente para o caminhao de coleta publica (lixo comum)?',
    'Sim, contanto que seja em saco branco leitoso.',
    'Nao, residuos A1 devem obrigatoriamente passar por tratamento previo de descontaminacao na unidade.',
    'Sim, se as placas forem seladas com fita adesiva.',
    'B',
    'A (Incorreta): O saco branco leitoso e para residuos biologicos que nao necessitam de tratamento previo ou ja tratados. Uma placa de Petri recem retirada da estufa nao se enquadra.
B (Correta): As culturas (A1) possuem alta concentracao viral/bacteriana e sao muito infecciosas. A legislacao obriga que elas nao deixem a unidade geradora sem tratamento previo de inativacao biologica (geralmente por calor umido/autoclave).
C (Incorreta): Fita adesiva nao elimina a carga microbiana do lixo. Caso a placa quebre no caminhao coletor, infectara os trabalhadores da limpeza publica.'
  ),
  (
    'Regras dos Contentores Rigidos (Grupo E)',
    'Por que os residuos perfurocortantes (Grupo E) devem ser acondicionados unicamente em recipientes de paredes rigidas com tampas?',
    'Para impedir o vazamento de radiacoes gama.',
    'Porque sao materiais reciclaveis de alto valor comercial e a caixa evita furtos.',
    'Para evitar rupturas, vazamentos e acidentes que perfurem e infectem os profissionais da limpeza.',
    'C',
    'A (Incorreta): A radiacao gama exigiria blindagem de chumbo ou concreto, e a maior parte do lixo E nao tem radiacao associada.
B (Incorreta): O Grupo E hospitalar ou laboratorial e residuo com potencial biologico elevado e jamais deve ser reciclado ou comercializado devido ao risco a saude.
C (Correta): Materiais afiados como laminas rompem facilmente sacos plasticos. A caixa rigida contem a ponta e a parede dura atua como barreira fisica para proteger todos os profissionais de sofrerem uma infeccao acidental.'
  ),
  (
    'Residuos Comuns Reciclaveis',
    'Como deve ser o manejo da fracao limpa e reciclavel dos residuos comuns (Grupo D), como caixas de papelao integras do almoxarifado?',
    'Devem ser segregadas na origem e depositadas em contentores coloridos de coleta seletiva (ex: azul para papel).',
    'Devem ser incineradas juntamente com as sobras do Grupo B.',
    'Devem ser estocadas em caixas de chumbo blindadas.',
    'A',
    'A (Correta): O lixo comum (Grupo D) possui uma fracao que pode ser reciclada (como papel, metal, plastico limpos). A norma indica a adocao da coleta seletiva para preservar o meio ambiente, utilizando lixeiras no padrao de cores (azul para papel).
B (Incorreta): Misturar reciclavel limpo com residuo perigoso quimico e incinerar gera desperdicio financeiro imenso e vai contra os principios da gestao sustentavel.
C (Incorreta): Blindagens como caixas de chumbo podem ser indicadas para certos rejeitos radioativos do Grupo C, mas sao incompativeis e desnecessarias para lixo de escritorio comum.'
  ),
  (
    'A cor branca no lixo biologico',
    'De acordo com os Padroes da ANVISA para manejo de RSS, o saco de cor branca leitosa contendo o simbolo de substancia infectante se destina a qual situacao?',
    'Lixo comum reciclavel oriundo de setores administrativos da gestao.',
    'Residuos biologicos (Grupo A) que nao necessitam de tratamento previo ou que ja foram adequadamente tratados sem perda de caracteristicas.',
    'Medicamentos quimioterapicos altamente volateis e toxicos em suspensao gasosa.',
    'B',
    'A (Incorreta): O lixo administrativo nao tem simbolo de substancia infectante e nao pertence ao Grupo A.
B (Correta): A legislacao indica sacos brancos leitosos, obrigatoriamente com o logo de Risco Biologico, para o acondicionamento de residuos do Grupo A que nao exigem tratamento inicial ou ja sofreram uma autoclavagem mas ainda mantem seu formato.
C (Incorreta): Medicamentos quimioterapicos sao elementos toxicos da Classe B (quimica), descartados em recipientes compativeis, identificados e definidos pelo PGRSS.'
  ),
  (
    'Manutencao de lixeiras e armazenamento',
    'A RDC exige algumas praticas operacionais relacionadas as lixeiras do laboratorio para protecao coletiva, entre as quais:',
    'As lixeiras de materiais infectantes nao devem ter tampas, permitindo ventilacao continua e evaporacao de odores.',
    'As lixeiras devem ser higienizadas apenas a cada 6 meses, pois sao protegidas pelos sacos.',
    'As lixeiras devem possuir tampas com acionamento por pedal (sem contato manual) e os sacos nao devem ficar diretamente no chao.',
    'C',
    'A (Incorreta): Odores de lixo organico hospitalar atraem vetores. As lixeiras nao devem estar sempre abertas e sem protecao de tampa.
B (Incorreta): As normas orientam a lavagem pelo menos semanal ou imediata se o saco rasgar e vazar.
C (Correta): As lixeiras exigem sistema de acionamento sem contato com as maos (pedais) para impedir a contaminacao cruzada do trabalhador, devendo os sacos e contentores de armazenamento temporario repousarem em suportes e nunca direto no piso.'
  )
on conflict (title) do update set
  question_text = excluded.question_text,
  option_a = excluded.option_a,
  option_b = excluded.option_b,
  option_c = excluded.option_c,
  correct_option = excluded.correct_option,
  explanation = excluded.explanation;

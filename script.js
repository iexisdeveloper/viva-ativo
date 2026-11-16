// --------------------------------------------------------------------------
// WEBHOOK PARA SALVAR FEEDBACK
// --------------------------------------------------------------------------
const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwIcDs9j_ImN4OrbcSbOImfTw3PICAG92nAU8RnkrPqLmMZy8xD3T99qv4isI2vfQPj/exec';

// --------------------------------------------------------------------------
// 1. CATÁLOGO DE EXERCÍCIOS
// "objetivos": objetivos do cadastro que o exercício atende
// "evitarSe": limitações físicas em que o exercício não deve ser sugerido
// --------------------------------------------------------------------------
const EXERCISES = [
  {
    id: 'ex-abracos-joelhos',
    title: 'Abraços nos Joelhos em Pé',
    category: 'Mobilidade de Quadril e Lombar',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Alívio lombar',
    objetivos: ['Aliviar dores posturais', 'Melhorar flexibilidade e circulação'],
    evitarSe: ['equilibrio'],
    description: 'Alongamento em pé flexionando e abraçando o joelho contra o peito, descomprimindo a coluna lombar e soltando os glúteos e quadris.',
    gifFileName: 'Abraços nos Joelhos em Pé.gif',
    breathingTip: 'Inspire preparando e expire ao abraçar suavemente o joelho em direção ao tronco.',
    steps: [
      { stepNumber: 1, title: 'Postura Inicial', instruction: 'Fique em pé com a coluna ereta, abdômen ativo e pés paralelos na largura do quadril.' },
      { stepNumber: 2, title: 'Elevação e Abraço', instruction: 'Flexione um dos joelhos trazendo-o em direção ao peito e abrace a canela com ambas as mãos.' },
      { stepNumber: 3, title: 'Sustentação e Troca', instruction: 'Puxe suavemente por 20 a 30 segundos mantendo o equilíbrio. Desça com calma e repita na outra perna.' }
    ]
  },
  {
    id: 'ex-afundo',
    title: 'Afundo',
    category: 'Ativação e Força dos Membros Inferiores',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Pernas & glúteos',
    objetivos: ['Aumentar energia e disposição'],
    evitarSe: ['joelhos', 'equilibrio'],
    description: 'Passada com flexão alternada das pernas até 90 graus, estimulando a circulação das pernas e fortalecendo quadríceps e glúteos.',
    gifFileName: 'Afundo.gif',
    breathingTip: 'Inspire ao flexionar as pernas e expire ao empurrar o solo retornando à posição em pé.',
    steps: [
      { stepNumber: 1, title: 'Passada à Frente', instruction: 'Dê um passo largo à frente com um dos pés, mantendo o tronco firme e vertical.' },
      { stepNumber: 2, title: 'Descida em 90°', instruction: 'Flexione ambos os joelhos até cerca de 90°, sem deixar o joelho da frente passar da ponta do pé.' },
      { stepNumber: 3, title: 'Impulso e Alternância', instruction: 'Empurre o solo com o calcanhar da frente retornando ao início. Alterne as pernas no seu ritmo por 1 minuto.' }
    ]
  },
  {
    id: 'ex-alongamento-assistido-reverso',
    title: 'Alongamento assistido reverso (peitoral e ombros)',
    category: 'Abertura Torácica e Postura',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Cadeira, mesa ou apoio estável',
    tag: 'Abertura de peitoral',
    objetivos: ['Aliviar dores posturais'],
    evitarSe: ['ombros', 'punhos'],
    description: 'Apoio das mãos para trás em uma mesa ou encosto de cadeira com leve flexão dos joelhos, expandindo o tórax e corrigindo ombros curvados.',
    gifFileName: 'Alongamento assistido reverso (peitoral e ombros).gif',
    breathingTip: 'Faça respirações profundas e lentas, permitindo que a caixa torácica expanda.',
    steps: [
      { stepNumber: 1, title: 'Posicionamento', instruction: 'Fique de costas para uma cadeira ou mesa e apoie as palmas das mãos para trás na borda firme.' },
      { stepNumber: 2, title: 'Flexão Suave', instruction: 'Mantenha os braços estendidos e flexione levemente os joelhos, descendo um pouco o quadril.' },
      { stepNumber: 3, title: 'Abertura do Peitoral', instruction: 'Sinta o peitoral e a frente dos ombros alongarem suavemente. Permaneça respirando por 30 a 45 segundos.' }
    ]
  },
  {
    id: 'ex-costas-superior',
    title: 'Alongamento da parte superior das costas',
    category: 'Alívio Escapular e Coluna Torácica',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Alívio escapular',
    objetivos: ['Aliviar dores posturais', 'Combater o sedentarismo no trabalho'],
    evitarSe: [],
    description: 'Dedos entrelaçados empurrando à frente na linha dos ombros com costas arredondadas, aliviando a tensão entre as escápulas acumulada no trabalho.',
    gifFileName: 'Alongamento da parte superior das costas.gif',
    breathingTip: 'Solte o ar enquanto empurra as mãos para a frente, sentindo as escápulas se afastarem.',
    steps: [
      { stepNumber: 1, title: 'Dedos Entrelaçados', instruction: 'Em pé com os pés firmes, entrelace os dedos das duas mãos com as palmas voltadas para a frente.' },
      { stepNumber: 2, title: 'Empurre para a Frente', instruction: 'Estenda os braços na altura dos ombros, empurrando para a frente enquanto arredonda suavemente a parte alta das costas.' },
      { stepNumber: 3, title: 'Incline o Queixo', instruction: 'Abaixe ligeiramente o queixo em direção ao peito e mantenha a posição por 30 segundos respirando normalmente.' }
    ]
  },
  {
    id: 'ex-rotacao-coluna-em-pe',
    title: 'Alongamento de rotação da coluna em pé',
    category: 'Mobilidade da Coluna Vertebral',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Mobilidade torácica',
    objetivos: ['Aliviar dores posturais', 'Aumentar energia e disposição'],
    evitarSe: [],
    description: 'Rotação controlada do tronco em pé com as mãos atrás da cabeça ou cotovelos abertos, restaurando a mobilidade da coluna e diminuindo o enrijecimento.',
    gifFileName: 'Alongamento de rotação da coluna em pé.gif',
    breathingTip: 'Expire ao girar para um lado e inspire ao retornar ao centro.',
    steps: [
      { stepNumber: 1, title: 'Base Confortável', instruction: 'Fique em pé com os pés na largura dos ombros e joelhos levemente destravados.' },
      { stepNumber: 2, title: 'Posição das Mãos', instruction: 'Apoie as pontas dos dedos suavemente atrás da cabeça, mantendo o peito aberto e cotovelos alinhados.' },
      { stepNumber: 3, title: 'Giro Controlado', instruction: 'Gire o tronco suavemente para a direita e depois para a esquerda, mantendo o quadril o mais estável possível.' }
    ]
  },
  {
    id: 'ex-dinamico-peitoral',
    title: 'Alongamento Dinâmico do Peitoral',
    category: 'Abertura e Circulação Superior',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Expansão torácica',
    objetivos: ['Aumentar energia e disposição', 'Combater o sedentarismo no trabalho', 'Melhorar flexibilidade e circulação'],
    evitarSe: [],
    description: 'Abertura e fechamento rítmico dos braços na horizontal, reativando a circulação e desfazendo a contração peitoral do uso de computador e celular.',
    gifFileName: 'Alongamento Dinâmico do Peitoral.gif',
    breathingTip: 'Inspire profundamente ao abrir os braços e expire ao cruzar na frente.',
    steps: [
      { stepNumber: 1, title: 'Braços à Frente', instruction: 'Em pé com boa postura, estenda ambos os braços para frente na altura do peito.' },
      { stepNumber: 2, title: 'Abertura Ampla', instruction: 'Abra os braços lateralmente puxando-os para trás até sentir o peito expandir de forma confortável.' },
      { stepNumber: 3, title: 'Movimento Contínuo', instruction: 'Retorne cruzando os braços suavemente à frente e repita o ciclo dinâmico durante todo o minuto.' }
    ]
  },
  {
    id: 'ex-ombros-tras-costas',
    title: 'Alongamento dos ombros por trás das costas',
    category: 'Flexibilidade de Ombros e Tríceps',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Ombros e tríceps',
    objetivos: ['Combater o sedentarismo no trabalho', 'Melhorar flexibilidade e circulação'],
    evitarSe: ['ombros'],
    description: 'Aproximação das mãos pelas costas (um braço por cima do ombro e outro por baixo), soltando o manguito rotador e aumentando a mobilidade articular.',
    gifFileName: 'Alongamento dos ombros por trás das costas.gif',
    breathingTip: 'Respire suavemente sem forçar a cabeça para a frente.',
    steps: [
      { stepNumber: 1, title: 'Braço Superior', instruction: 'Eleve o braço direito, dobre o cotovelo e posicione a mão nas costas próximo à escápula.' },
      { stepNumber: 2, title: 'Braço Inferior', instruction: 'Leve o braço esquerdo por baixo pelas costas com cotovelo flexionado, buscando aproximar ou tocar os dedos.' },
      { stepNumber: 3, title: 'Sustentação e Inversão', instruction: 'Segure suavemente por 25 a 30 segundos, desfaça com calma e inverta os lados.' }
    ]
  },
  {
    id: 'ex-inclinado-lateral',
    title: 'Alongamento Inclinado Lateral em Pé',
    category: 'Descompressão Lateral e Lombar',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Alongamento lateral',
    objetivos: ['Aliviar dores posturais', 'Melhorar flexibilidade e circulação'],
    evitarSe: [],
    description: 'Inclinação suave do tronco para o lado com braço sobre a cabeça, descomprimindo a fáscia lateral, o músculo quadrado lombar e as costelas.',
    gifFileName: 'Alongamento Inclinado Lateral em Pé.gif',
    breathingTip: 'Solte o ar ao inclinar lateralmente, sentindo a lateral do tronco abrir.',
    steps: [
      { stepNumber: 1, title: 'Posição dos Pés', instruction: 'Fique em pé com os pés na largura do quadril e apoie uma das mãos na cintura.' },
      { stepNumber: 2, title: 'Braço Elevado', instruction: 'Eleve o outro braço estendido ou flexionado acima da cabeça.' },
      { stepNumber: 3, title: 'Inclinação Lateral', instruction: 'Incline o tronco para o lado oposto sem girar a bacia. Segure 25 segundos e repita para o outro lado.' }
    ]
  },
  {
    id: 'ex-lateral-interna-coxa',
    title: 'Alongamento Lateral da Parte Interna da Coxa',
    category: 'Mobilidade de Quadril e Adutores',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Adutores & virilha',
    objetivos: ['Aumentar energia e disposição', 'Melhorar flexibilidade e circulação'],
    evitarSe: ['joelhos', 'equilibrio'],
    description: 'Passo largo lateral com flexão de um joelho e extensão da perna oposta, alongando a cadeia adutora e melhorando a mobilidade pélvica.',
    gifFileName: 'Alongamento Lateral da Parte Interna da Coxa.gif',
    breathingTip: 'Respire pausadamente enquanto mantém o equilíbrio e a descida controlada.',
    steps: [
      { stepNumber: 1, title: 'Abertura Larga', instruction: 'Afaste as pernas bem além da largura dos ombros com os pés apontados para a frente.' },
      { stepNumber: 2, title: 'Flexão Lateral', instruction: 'Flexione um dos joelhos e transfira o peso para esse lado, mantendo a outra perna esticada.' },
      { stepNumber: 3, title: 'Sensação do Alongamento', instruction: 'Sinta a parte interna da coxa estendida alongar com suavidade. Fique 25 segundos e inverta o lado.' }
    ]
  },
  {
    id: 'ex-reverso-pulso',
    title: 'Alongamento Reverso de Pulso',
    category: 'Prevenção de LER / DORT e Digitação',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Alívio digitação',
    objetivos: ['Combater o sedentarismo no trabalho'],
    evitarSe: ['punhos'],
    description: 'Alongamento dos punhos e tendões dos antebraços com os dedos direcionados para baixo, essencial para aliviar o uso excessivo de teclado e mouse.',
    gifFileName: 'Alongamento Reverso de Pulso.gif',
    breathingTip: 'Inspire e expire relaxando a musculatura das mãos e dedos.',
    steps: [
      { stepNumber: 1, title: 'Posição das Mãos', instruction: 'Junte as palmas ou as costas das mãos com as pontas dos dedos apontadas para baixo.' },
      { stepNumber: 2, title: 'Pressão Gradual', instruction: 'Eleve suavemente os cotovelos mantendo os punhos em contato para intensificar a descompressão.' },
      { stepNumber: 3, title: 'Rotação Suave', instruction: 'Segure por 30 segundos e depois faça suaves círculos com as mãos para destravar as articulações.' }
    ]
  },
  {
    id: 'ex-elevacao-panturrilha',
    title: 'Elevação de Panturrilhas',
    category: 'Bomba Circulatória e Retorno Venoso',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos (apoio de parede opcional)',
    tag: 'Circulação e pernas',
    objetivos: ['Aumentar energia e disposição', 'Combater o sedentarismo no trabalho', 'Melhorar flexibilidade e circulação'],
    evitarSe: [],
    description: 'Subidas na ponta dos pés ritmadas contraindo as panturrilhas, ativando a bomba venosa das pernas para combater inchaço e cansaço.',
    gifFileName: 'Elevação de Panturrilhas.gif',
    breathingTip: 'Suba soltando o ar e desça inspirando de maneira controlada.',
    steps: [
      { stepNumber: 1, title: 'Posição em Pé', instruction: 'Fique em pé com postura ereta. Se preferir equilíbrio extra, apoie levemente as mãos na parede.' },
      { stepNumber: 2, title: 'Subida na Ponta dos Pés', instruction: 'Suba o máximo que puder na ponta dos dois pés, contraindo as panturrilhas no topo por 1 segundo.' },
      { stepNumber: 3, title: 'Descida Controlada', instruction: 'Desça os calcanhares lentamente até quase encostar no chão. Repita de forma contínua durante 1 minuto.' }
    ]
  },
  {
    id: 'ex-rotacao-externa-ombro',
    title: 'Rotação externa do ombro',
    category: 'Manguito Rotador e Postura Escapular',
    durationSeconds: 60,
    durationLabel: '1 min',
    equipments: 'Sem equipamentos',
    tag: 'Manguito rotador',
    objetivos: ['Aliviar dores posturais', 'Combater o sedentarismo no trabalho'],
    evitarSe: [],
    description: 'Rotação externa dos antebraços com cotovelos colados ao tronco a 90 graus, fortalecendo os rotadores posteriores e corrigindo postura curvada.',
    gifFileName: 'Rotação externa do ombro.gif',
    breathingTip: 'Inspire ao abrir os antebraços e expire ao retornar à posição neutra.',
    steps: [
      { stepNumber: 1, title: 'Cotovelos a 90°', instruction: 'Fique em pé, mantenha os cotovelos colados ao corpo e antebraços flexionados a 90 graus com as palmas para cima.' },
      { stepNumber: 2, title: 'Giro para Fora', instruction: 'Sem afastar os cotovelos do tronco, gire as mãos e antebraços para fora o máximo que conseguir confortavelmente.' },
      { stepNumber: 3, title: 'Ativação Escapular', instruction: 'Sinta as escápulas se aproximarem atrás das costas. Retorne devagar e continue o movimento por 1 minuto.' }
    ]
  }
];

// --------------------------------------------------------------------------
// 2. CAMADA DE PERSISTÊNCIA LOCAL
// --------------------------------------------------------------------------
const STORAGE_KEYS = {
  USER_PROFILE: 'viva_ativo_user_profile',
  DAILY_CYCLE: 'viva_ativo_daily_cycle',
  ACTIVITIES_HISTORY: 'viva_ativo_activities_history',
  FEEDBACKS: 'viva_ativo_feedbacks',
  STREAK_LAST_DATE: 'viva_ativo_streak_last_date',
  STREAK_COUNT: 'viva_ativo_streak_count',
  WEEKLY_PLAN: 'viva_ativo_weekly_plan',
};

const DEFAULT_PROFILE = {
  name: '',
  primaryGoal: 'Aliviar dores posturais',
  limitations: [],
  intervalMinutes: 45,
  soundEnabled: true,
  hasCompletedOnboarding: false,
};

function getTodayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getUserProfile() {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!val) return { ...DEFAULT_PROFILE };
    return { ...DEFAULT_PROFILE, ...JSON.parse(val) };
  } catch (e) {
    return { ...DEFAULT_PROFILE };
  }
}

function saveUserProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.warn('Erro ao salvar perfil:', e);
  }
}

function getCompletedActivities() {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.ACTIVITIES_HISTORY);
    return val ? JSON.parse(val) : [];
  } catch (e) {
    return [];
  }
}

function updateStreak(todayKey) {
  try {
    const lastDate = localStorage.getItem(STORAGE_KEYS.STREAK_LAST_DATE);
    let currentStreak = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK_COUNT) || '1', 10);

    if (!lastDate) {
      localStorage.setItem(STORAGE_KEYS.STREAK_LAST_DATE, todayKey);
      localStorage.setItem(STORAGE_KEYS.STREAK_COUNT, '1');
      return;
    }
    if (lastDate === todayKey) return;

    const today = new Date(todayKey);
    const last = new Date(lastDate);
    const diffDays = Math.ceil(Math.abs(today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak += 1;
    } else {
      currentStreak = 1;
    }
    localStorage.setItem(STORAGE_KEYS.STREAK_LAST_DATE, todayKey);
    localStorage.setItem(STORAGE_KEYS.STREAK_COUNT, String(currentStreak));
  } catch (e) {}
}

function saveCompletedActivity(exercise) {
  const todayKey = getTodayKey();
  const activity = {
    id: 'act-' + Date.now(),
    exerciseId: exercise.id,
    exerciseTitle: exercise.title,
    category: exercise.category,
    durationSeconds: exercise.durationSeconds || 60,
    completedAt: new Date().toISOString(),
    dateKey: todayKey,
  };

  const list = getCompletedActivities();
  list.unshift(activity);
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES_HISTORY, JSON.stringify(list));
    updateStreak(todayKey);
  } catch (e) {}
}

function getNextExercise(cycle) {
  const remainingIds = cycle.exerciseSequence.filter((id) => !cycle.completedIds.includes(id));
  const nextId = remainingIds[0] || cycle.exerciseSequence[0] || EXERCISES[0].id;
  return EXERCISES.find((e) => e.id === nextId) || EXERCISES[0];
}

function calculateNextTimeString(minutes) {
  const target = new Date(Date.now() + minutes * 60 * 1000);
  const h = String(target.getHours()).padStart(2, '0');
  const m = String(target.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

// --------------------------------------------------------------------------
// LÓGICA DE SUGESTÃO DE ATIVIDADES
// Remove os exercícios que não combinam com as limitações informadas e
// coloca primeiro os que atendem ao objetivo escolhido. Dentro de cada
// grupo a ordem é sorteada, e o sorteio é controlado por semana: a mesma
// ordem não se repete na semana e cada dia tenta começar por um exercício
// diferente dos dias anteriores.
// --------------------------------------------------------------------------
function isExerciseAllowed(exercise, profile) {
  const limitations = profile.limitations || [];
  return !exercise.evitarSe.some((limit) => limitations.includes(limit));
}

function buildSuggestedSequence(profile, usedOrders = []) {
  const allowed = EXERCISES.filter((ex) => isExerciseAllowed(ex, profile));
  const matchGoal = allowed.filter((ex) => ex.objetivos.includes(profile.primaryGoal));
  const others = allowed.filter((ex) => !ex.objetivos.includes(profile.primaryGoal));

  const usedSequences = usedOrders.map((order) => order.join(','));
  const usedFirsts = usedOrders.map((order) => order[0]);

  let sequence = [];
  for (let attempt = 0; attempt < 50; attempt++) {
    sequence = [...shuffle(matchGoal), ...shuffle(others)].map((ex) => ex.id);
    const repeatedOrder = usedSequences.includes(sequence.join(','));
    const repeatedFirst = usedFirsts.includes(sequence[0]);
    // A ordem nunca pode repetir. O primeiro exercício diferente é tentado
    // primeiro, mas pode repetir quando há poucos exercícios para o objetivo.
    if (!repeatedOrder && (!repeatedFirst || attempt >= 30)) break;
  }
  return sequence;
}

// Segunda-feira da semana atual, usada para identificar a semana
function getWeekKey() {
  const d = new Date();
  const daysSinceMonday = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - daysSinceMonday);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

// Guarda as ordens já usadas na semana para não repetir
function getNextWeeklySequence(profile) {
  const weekKey = getWeekKey();
  const profileKey = getProfileKey(profile);
  let plan = null;
  try {
    plan = JSON.parse(localStorage.getItem(STORAGE_KEYS.WEEKLY_PLAN) || 'null');
  } catch (e) {}
  if (!plan || plan.weekKey !== weekKey || plan.profileKey !== profileKey || !Array.isArray(plan.orders)) {
    plan = { weekKey, profileKey, orders: [] };
  }

  const sequence = buildSuggestedSequence(profile, plan.orders);
  plan.orders.push(sequence);
  try {
    localStorage.setItem(STORAGE_KEYS.WEEKLY_PLAN, JSON.stringify(plan));
  } catch (e) {}
  return sequence;
}

// Identifica o perfil usado para montar o ciclo. Se o usuário mudar o
// objetivo ou as limitações, o ciclo do dia é montado de novo.
function getProfileKey(profile) {
  const limitations = [...(profile.limitations || [])].sort().join(',');
  return `${profile.primaryGoal}|${limitations}`;
}

function getDailyCycle(profile = getUserProfile()) {
  const todayKey = getTodayKey();
  const intervalMinutes = profile.intervalMinutes || 45;
  const profileKey = getProfileKey(profile);
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_CYCLE);
    if (raw) {
      const cycle = JSON.parse(raw);
      if (cycle.dateKey === todayKey && cycle.profileKey === profileKey && Array.isArray(cycle.exerciseSequence)) {
        if (!cycle.nextScheduledTimestamp) {
          cycle.nextScheduledTimestamp = Date.now() + (intervalMinutes || 45) * 60 * 1000;
          saveDailyCycle(cycle);
        }
        return cycle;
      }
    }
  } catch (e) {}

  // Se o perfil mudou no mesmo dia, mantém os exercícios já feitos hoje
  let alreadyDone = [];
  try {
    const old = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_CYCLE) || 'null');
    if (old && old.dateKey === todayKey && Array.isArray(old.completedIds)) alreadyDone = old.completedIds;
  } catch (e) {}

  const sequence = getNextWeeklySequence(profile);
  const targetTimestamp = Date.now() + intervalMinutes * 60 * 1000;
  const newCycle = {
    dateKey: todayKey,
    profileKey,
    cycleNumber: 1,
    exerciseSequence: sequence,
    completedIds: alreadyDone.filter((id) => sequence.includes(id)),
    currentIndex: 0,
    nextScheduledTime: calculateNextTimeString(intervalMinutes),
    nextScheduledTimestamp: targetTimestamp,
  };
  saveDailyCycle(newCycle);
  return newCycle;
}

function saveDailyCycle(cycle) {
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_CYCLE, JSON.stringify(cycle));
  } catch (e) {}
}

function completeExerciseInCycle(exerciseId, profile = getUserProfile()) {
  const intervalMinutes = profile.intervalMinutes || 45;
  const cycle = getDailyCycle(profile);
  let completed = [...cycle.completedIds];
  if (!completed.includes(exerciseId)) {
    completed.push(exerciseId);
  }

  let newSequence = [...cycle.exerciseSequence];
  let cycleNumber = cycle.cycleNumber;

  // Se completou todos os exercícios sugeridos, inicia nova rodada
  if (completed.length >= newSequence.length) {
    cycleNumber += 1;
    completed = [];
    newSequence = getNextWeeklySequence(profile);
  }

  const remaining = newSequence.filter((id) => !completed.includes(id));
  const nextId = remaining[0] || newSequence[0];
  const nextIndex = newSequence.indexOf(nextId);

  const targetTimestamp = Date.now() + intervalMinutes * 60 * 1000;
  const updatedCycle = {
    ...cycle,
    cycleNumber,
    exerciseSequence: newSequence,
    completedIds: completed,
    currentIndex: nextIndex >= 0 ? nextIndex : 0,
    nextScheduledTime: calculateNextTimeString(intervalMinutes),
    nextScheduledTimestamp: targetTimestamp,
  };
  saveDailyCycle(updatedCycle);
  return updatedCycle;
}

function getAppStats() {
  const todayKey = getTodayKey();
  const allActs = getCompletedActivities();
  const todayActs = allActs.filter((a) => a.dateKey === todayKey);

  const count = todayActs.length;
  const totalSeconds = todayActs.reduce((acc, c) => acc + (c.durationSeconds || 60), 0);
  const minutes = Math.max(1, Math.round(totalSeconds / 60));

  let streak = 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK_COUNT);
    streak = raw ? parseInt(raw, 10) : (count > 0 ? 1 : 0);
  } catch (e) {}

  return {
    todayCount: count,
    todayMinutes: count > 0 ? minutes : 0,
    streakDays: Math.max(streak, count > 0 ? 1 : 0),
  };
}

function getFeedbacks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveFeedback(item) {
  const list = getFeedbacks();
  const newFeedback = {
    id: 'fb-' + Date.now(),
    submittedAt: new Date().toISOString(),
    ...item,
  };
  list.unshift(newFeedback);
  try {
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(list));
  } catch (e) {}
  return newFeedback;
}

function resetAllData() {
  try {
    localStorage.clear();
  } catch (e) {}
}

// --------------------------------------------------------------------------
// 3. ÁUDIO WEB
// --------------------------------------------------------------------------
let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playNotificationSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);
      gain.gain.setValueAtTime(0, now + idx * 0.14);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.14 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.14 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.14);
      osc.stop(now + idx * 0.14 + 0.65);
    });
  } catch (e) {}
}

function playCompletionSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [349.23, 440.00, 523.25, 659.25];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.85);
    });
  } catch (e) {}
}

function playTickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {}
}

// --------------------------------------------------------------------------
// 4. ESTADO DA APLICAÇÃO E NAVEGAÇÃO ENTRE TELAS
// --------------------------------------------------------------------------
let currentActiveExercise = null;
let timerInterval = null;
let secondsRemaining = 60;
let isTimerRunning = false;
let selectedFeedbackRating = 5;
let selectedFeedbackCategory = 'ideia';
let reminderCheckInterval = null;

// --- Sistema de Notificações para Android e PC ---
async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch (e) {
    return 'denied';
  }
}

function showInAppReminderBanner(exercise) {
  const banner = document.getElementById('exercise-reminder-banner');
  if (!banner) return;
  const titleEl = document.getElementById('reminder-banner-title');
  const descEl = document.getElementById('reminder-banner-desc');
  if (titleEl) titleEl.textContent = 'Hora da sua pausa ativa!';
  if (descEl) descEl.textContent = `Próximo: ${exercise ? exercise.title : 'Exercício do dia'}.`;

  banner.classList.add('active');

  const startBtn = document.getElementById('btn-reminder-start');
  if (startBtn) {
    startBtn.onclick = () => {
      banner.classList.remove('active');
      if (exercise) startExercise(exercise);
    };
  }

  const closeBtn = document.getElementById('btn-reminder-close');
  if (closeBtn) {
    closeBtn.onclick = () => {
      banner.classList.remove('active');
    };
  }

  setTimeout(() => {
    banner.classList.remove('active');
  }, 12000);
}

async function sendSystemNotification(title, body, nextExercise) {
  const profile = getUserProfile();
  if (profile.soundEnabled !== false) {
    playNotificationSound();
  }

  showInAppReminderBanner(nextExercise);

  if (!('Notification' in window)) return;

  if (Notification.permission === 'default') {
    await requestNotificationPermission();
  }

  if (Notification.permission !== 'granted') return;

  const notifOptions = {
    body: body || 'Hora da sua pausa ativa de 1 minuto!',
    icon: './icons/icone-192.png',
    badge: './icons/icone-192.png',
    tag: 'viva-ativo-alert-' + Date.now(),
    renotify: true,
    vibrate: [200, 100, 200, 100, 200],
    data: {
      url: './',
      exerciseId: nextExercise ? nextExercise.id : ''
    }
  };


  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        await reg.showNotification(title, notifOptions);
        return;
      }
    }
  } catch (err) {
    console.warn('Falha no envio de notificação via ServiceWorker, tentando direto:', err);
  }

  
  try {
    new Notification(title, notifOptions);
  } catch (err) {
    console.warn('Falha ao disparar Notification direto:', err);
  }
}

function checkScheduledExerciseAlert() {
  const profile = getUserProfile();
  if (!profile.hasCompletedOnboarding) return;

  const cycle = getDailyCycle(profile);
  if (!cycle) return;

  const now = Date.now();
  if (!cycle.nextScheduledTimestamp) {
    cycle.nextScheduledTimestamp = now + (profile.intervalMinutes || 45) * 60 * 1000;
    saveDailyCycle(cycle);
    return;
  }

  if (now >= cycle.nextScheduledTimestamp) {
    const nextExercise = getNextExercise(cycle);

    // Avança o horário programado para o próximo ciclo
    cycle.nextScheduledTimestamp = now + (profile.intervalMinutes || 45) * 60 * 1000;
    cycle.nextScheduledTime = calculateNextTimeString(profile.intervalMinutes || 45);
    saveDailyCycle(cycle);

    // Se estiver visualizando a home, atualiza o texto do próximo exercício
    const suggestedTimeEl = document.getElementById('suggested-exercise-time');
    if (suggestedTimeEl) {
      suggestedTimeEl.textContent = `Próximo às ${cycle.nextScheduledTime}`;
    }

    // Dispara a notificação para a barra de notificações do Android e PC
    sendSystemNotification(
      'Viva Ativo - Hora do Exercício!',
      `Hora de levantar e se movimentar! Próximo: ${nextExercise.title}.`,
      nextExercise
    );
  }
}

function startReminderWatcher() {
  if (reminderCheckInterval) clearInterval(reminderCheckInterval);
  reminderCheckInterval = setInterval(checkScheduledExerciseAlert, 5000);
}

function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach((screen) => {
    screen.classList.remove('active');
  });
  const target = document.getElementById('screen-' + screenId);
  if (target) {
    target.classList.add('active');
    // Scroll container to top
    const container = document.getElementById('app-container');
    if (container) container.scrollTop = 0;
  }

  if (screenId === 'home') {
    renderHomeScreen();
  }
}

function openModal(modalId) {
  const modal = document.getElementById('modal-' + modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById('modal-' + modalId);
  if (modal) modal.classList.remove('active');
}

// --------------------------------------------------------------------------
// 5. RENDERIZAÇÃO DA TELA INICIAL (HOME)
// --------------------------------------------------------------------------
function renderHomeScreen() {
  const profile = getUserProfile();
  const stats = getAppStats();
  const cycle = getDailyCycle(profile);
  const totalExercises = cycle.exerciseSequence.length;

  // Saudação
  const greetingEl = document.getElementById('home-greeting-name');
  if (greetingEl) {
    greetingEl.textContent = profile.name ? `Olá, ${profile.name}` : 'Olá, Atleta';
  }

  // Progresso da rodada atual de exercícios sugeridos
  const completedCount = cycle.completedIds ? cycle.completedIds.length : 0;
  const progressPercent = totalExercises > 0 ? Math.min(100, Math.round((completedCount / totalExercises) * 100)) : 0;

  const progressTitleEl = document.getElementById('home-progress-title');
  if (progressTitleEl) {
    progressTitleEl.textContent = `${completedCount} de ${totalExercises} exercícios realizados hoje`;
  }

  const progressBarEl = document.getElementById('home-progress-bar-fill');
  if (progressBarEl) {
    progressBarEl.style.width = `${progressPercent}%`;
  }

  const progressNumEl = document.getElementById('home-progress-number');
  if (progressNumEl) {
    progressNumEl.textContent = `${progressPercent}%`;
  }

  // Métricas
  const streakEl = document.getElementById('stat-streak');
  if (streakEl) streakEl.textContent = `${stats.streakDays} dias`;

  const minutesEl = document.getElementById('stat-minutes');
  if (minutesEl) minutesEl.textContent = `${stats.todayMinutes} min`;

  // Próximo exercício sugerido
  const nextExercise = getNextExercise(cycle);

  const suggestedTitleEl = document.getElementById('suggested-exercise-title');
  if (suggestedTitleEl) suggestedTitleEl.textContent = nextExercise.title;

  const suggestedCatEl = document.getElementById('suggested-exercise-cat');
  if (suggestedCatEl) suggestedCatEl.textContent = `${nextExercise.category} - ${nextExercise.durationLabel}`;

  const suggestedTagEl = document.getElementById('suggested-exercise-tag');
  if (suggestedTagEl) {
    suggestedTagEl.textContent = nextExercise.objetivos.includes(profile.primaryGoal)
      ? 'Para o seu objetivo'
      : nextExercise.tag;
  }

  const suggestedTimeEl = document.getElementById('suggested-exercise-time');
  if (suggestedTimeEl) {
    suggestedTimeEl.textContent = `Próximo às ${cycle.nextScheduledTime || '15:30'}`;
  }

  const startSuggestedBtn = document.getElementById('btn-start-suggested');
  if (startSuggestedBtn) {
    startSuggestedBtn.onclick = () => startExercise(nextExercise);
  }

  // Catálogo: primeiro os exercícios sugeridos, depois os não recomendados
  const catalogTitleEl = document.getElementById('catalog-title');
  if (catalogTitleEl) {
    catalogTitleEl.textContent = `Catálogo de Exercícios (${totalExercises} sugeridos de ${EXERCISES.length})`;
  }

  const catalogListEl = document.getElementById('catalog-list');
  if (catalogListEl) {
    catalogListEl.innerHTML = '';
    const suggested = cycle.exerciseSequence.map((id) => EXERCISES.find((e) => e.id === id)).filter(Boolean);
    const notRecommended = EXERCISES.filter((ex) => !cycle.exerciseSequence.includes(ex.id));

    [...suggested, ...notRecommended].forEach((ex) => {
      const isDone = cycle.completedIds && cycle.completedIds.includes(ex.id);
      const isAllowed = isExerciseAllowed(ex, profile);
      let badgeText = ex.tag;
      let badgeStyle = '';
      if (isDone) {
        badgeText = 'Feito';
        badgeStyle = 'background-color:#dcfce7;color:#166534;';
      } else if (!isAllowed) {
        badgeText = 'Não recomendado';
        badgeStyle = 'background-color:#fee2e2;color:#991b1b;';
      }
      const item = document.createElement('div');
      item.className = isAllowed ? 'exercise-item' : 'exercise-item not-recommended';
      item.innerHTML = `
        <div class="exercise-item-info">
          <h4>${ex.title}</h4>
          <p>${ex.category} - ${ex.durationLabel}</p>
        </div>
        <div class="exercise-item-badge" style="${badgeStyle}">
          ${badgeText}
        </div>
      `;
      item.onclick = () => startExercise(ex);
      catalogListEl.appendChild(item);
    });
  }
}

// --------------------------------------------------------------------------
// 6. TELA DE EXERCÍCIO
// --------------------------------------------------------------------------
function startExercise(exercise) {
  currentActiveExercise = exercise;
  secondsRemaining = exercise.durationSeconds || 60;
  isTimerRunning = true;

  // Atualiza cabeçalho e informações estruturadas por tópicos
  const titleEl = document.getElementById('active-title');
  if (titleEl) titleEl.textContent = exercise.title;

  const focusEl = document.getElementById('active-detail-focus');
  if (focusEl) focusEl.textContent = exercise.category;

  const timeEl = document.getElementById('active-detail-time');
  if (timeEl) timeEl.textContent = exercise.durationLabel || '1 min';

  // Mantém retrocompatibilidade se active-category for procurado
  const catEl = document.getElementById('active-category');
  if (catEl && !focusEl) {
    catEl.textContent = `${exercise.category} - ${exercise.durationLabel} - ${exercise.equipments}`;
  }

  // Imagem GIF
  const imgEl = document.getElementById('active-gif-img');
  const fallbackEl = document.getElementById('active-gif-fallback');
  const fallbackNameEl = document.getElementById('fallback-gif-name');

  if (imgEl && fallbackEl) {
    imgEl.style.display = 'block';
    fallbackEl.classList.remove('active');

    // Tenta carregar o GIF testando caminhos relativos e raiz
    const possiblePaths = [
      `./data/gif/${encodeURIComponent(exercise.gifFileName)}`
    ];
    let pathIndex = 0;
    imgEl.src = possiblePaths[0];
    imgEl.alt = exercise.title;

    imgEl.onerror = () => {
      pathIndex++;
      if (pathIndex < possiblePaths.length) {
        imgEl.src = possiblePaths[pathIndex];
      } else {
        // Fallback amigável mostrando onde colocar o arquivo
        imgEl.style.display = 'none';
        fallbackEl.classList.add('active');
        if (fallbackNameEl) fallbackNameEl.textContent = `data/gif/${exercise.gifFileName}`;
      }
    };
  }

  // Passos de execução
  const stepsContainer = document.getElementById('active-steps-list');
  if (stepsContainer) {
    stepsContainer.innerHTML = '';
    exercise.steps.forEach((step) => {
      const stepEl = document.createElement('div');
      stepEl.className = 'step-card';
      stepEl.innerHTML = `
        <div class="step-number">${step.stepNumber}</div>
        <div class="step-content">
          <h5>${step.title}</h5>
          <p>${step.instruction}</p>
        </div>
      `;
      stepsContainer.appendChild(stepEl);
    });
  }

  updateTimerDisplay();
  startTimerCountdown();
  navigateTo('active');
}

function formatTime(totalSecs) {
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  const timeEl = document.getElementById('timer-countdown-text');
  if (timeEl) timeEl.textContent = formatTime(secondsRemaining);

  const toggleBtn = document.getElementById('btn-timer-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = isTimerRunning ? '⏸' : '▶';
    toggleBtn.title = isTimerRunning ? 'Pausar' : 'Continuar';
  }
}

function startTimerCountdown() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (isTimerRunning && secondsRemaining > 0) {
      secondsRemaining--;
      updateTimerDisplay();

      const profile = getUserProfile();
      if (profile.soundEnabled && secondsRemaining <= 3 && secondsRemaining > 0) {
        playTickSound();
      }

      if (secondsRemaining <= 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        updateTimerDisplay();
        if (profile.soundEnabled) playCompletionSound();
      }
    }
  }, 1000);
}

function completeActiveExercise() {
  if (!currentActiveExercise) return;
  if (timerInterval) clearInterval(timerInterval);

  const profile = getUserProfile();
  if (profile.soundEnabled) playCompletionSound();

  saveCompletedActivity(currentActiveExercise);
  completeExerciseInCycle(currentActiveExercise.id, profile);

  navigateTo('home');
}

// --------------------------------------------------------------------------
// 7. INICIALIZAÇÃO DE EVENTOS E CONFIGURAÇÃO DOS FORMULÁRIOS
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Registra Service Worker para notificações nativas no Android e PC
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.warn('Registro de Service Worker:', err);
    });
  }

  // Inicia o verificador automático de horário de exercícios
  startReminderWatcher();

  const profile = getUserProfile();

  // Se o usuário já concluiu o onboarding, vai para a Home; senão, Welcome
  if (profile.hasCompletedOnboarding) {
    navigateTo('home');
  } else {
    navigateTo('welcome');
  }

  // --- Botão Entrar na Tela de Boas-Vindas ---
  const btnWelcomeEnter = document.getElementById('btn-welcome-enter');
  if (btnWelcomeEnter) {
    btnWelcomeEnter.addEventListener('click', () => {
      // Inicia o contexto de áudio em resposta a um clique de usuário
      getAudioContext();
      const currentProfile = getUserProfile();
      if (currentProfile.hasCompletedOnboarding) {
        navigateTo('home');
      } else {
        navigateTo('onboarding');
      }
    });
  }

  // --- Tela de Onboarding / Formulário de Metas ---
  let selectedGoal = 'Aliviar dores posturais';
  let selectedInterval = 45;
  let selectedLimitations = [];

  function updateGoalButtons() {
    document.querySelectorAll('.goal-option-btn').forEach((b) => {
      const isSelected = b.getAttribute('data-goal') === selectedGoal;
      b.classList.toggle('selected', isSelected);
      const checkSpan = b.querySelectorAll('span')[1];
      if (checkSpan) checkSpan.textContent = isSelected ? '✓' : '';
    });
  }

  function updateLimitButtons() {
    document.querySelectorAll('.limit-btn').forEach((b) => {
      b.classList.toggle('selected', selectedLimitations.includes(b.getAttribute('data-limit')));
    });
  }

  function updateOnboardingIntervalButtons() {
    document.querySelectorAll('.onboarding-interval-btn').forEach((b) => {
      b.classList.toggle('selected', parseInt(b.getAttribute('data-interval'), 10) === selectedInterval);
    });
  }

  // Preenche o formulário com o perfil salvo (usado ao editar o perfil)
  function fillOnboardingForm(profile) {
    const inputName = document.getElementById('input-name');
    if (inputName) inputName.value = profile.name || '';
    selectedGoal = profile.primaryGoal || 'Aliviar dores posturais';
    selectedInterval = profile.intervalMinutes || 45;
    selectedLimitations = [...(profile.limitations || [])];
    updateGoalButtons();
    updateLimitButtons();
    updateOnboardingIntervalButtons();
  }

  document.querySelectorAll('.goal-option-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedGoal = btn.getAttribute('data-goal');
      updateGoalButtons();
    });
  });

  document.querySelectorAll('.limit-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const limit = btn.getAttribute('data-limit');
      if (selectedLimitations.includes(limit)) {
        selectedLimitations = selectedLimitations.filter((l) => l !== limit);
      } else {
        selectedLimitations.push(limit);
      }
      updateLimitButtons();
    });
  });

  document.querySelectorAll('.onboarding-interval-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedInterval = parseInt(btn.getAttribute('data-interval'), 10);
      updateOnboardingIntervalButtons();
    });
  });

  const onboardingForm = document.getElementById('onboarding-form');
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('input-name').value.trim();

      const currentProfile = getUserProfile();
      const updatedProfile = {
        ...currentProfile,
        name: name || 'Usuário',
        primaryGoal: selectedGoal,
        limitations: [...selectedLimitations],
        intervalMinutes: selectedInterval,
        hasCompletedOnboarding: true,
      };

      saveUserProfile(updatedProfile);

      // Solicita permissão para notificações no Android e PC
      await requestNotificationPermission();

      navigateTo('home');
    });
  }

  // --- Controles da Tela Ativa ---
  const btnCloseActive = document.getElementById('btn-close-active');
  if (btnCloseActive) {
    btnCloseActive.addEventListener('click', () => {
      if (timerInterval) clearInterval(timerInterval);
      navigateTo('home');
    });
  }

  const btnTimerToggle = document.getElementById('btn-timer-toggle');
  if (btnTimerToggle) {
    btnTimerToggle.addEventListener('click', () => {
      isTimerRunning = !isTimerRunning;
      updateTimerDisplay();
    });
  }

  const btnTimerReset = document.getElementById('btn-timer-reset');
  if (btnTimerReset) {
    btnTimerReset.addEventListener('click', () => {
      if (currentActiveExercise) {
        secondsRemaining = currentActiveExercise.durationSeconds || 60;
        isTimerRunning = true;
        updateTimerDisplay();
        startTimerCountdown();
      }
    });
  }

  const btnCompleteExercise = document.getElementById('btn-complete-exercise');
  if (btnCompleteExercise) {
    btnCompleteExercise.addEventListener('click', completeActiveExercise);
  }

  // Adia o próximo lembrete para daqui a 5 minutos
  const btnSnooze5 = document.getElementById('btn-snooze-5');
  if (btnSnooze5) {
    btnSnooze5.addEventListener('click', () => {
      if (timerInterval) clearInterval(timerInterval);
      const cycle = getDailyCycle();
      cycle.nextScheduledTimestamp = Date.now() + 5 * 60 * 1000;
      cycle.nextScheduledTime = calculateNextTimeString(5);
      saveDailyCycle(cycle);
      navigateTo('home');
    });
  }

  // --- Botões do Top Bar da Home (Configurações e Feedback) ---
  const btnOpenSettings = document.getElementById('btn-open-settings');
  if (btnOpenSettings) {
    btnOpenSettings.addEventListener('click', () => {
      renderSettingsModal();
      openModal('settings');
    });
  }

  const btnOpenFeedback = document.getElementById('btn-open-feedback');
  if (btnOpenFeedback) {
    btnOpenFeedback.addEventListener('click', () => {
      renderFeedbackModal();
      openModal('feedback');
    });
  }

  // --- Fechar Modais ao Clicar no Botão X ou fora ---
  document.querySelectorAll('.modal-close-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  // --- Configurações do Modal de Feedback ---
  document.querySelectorAll('.star-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedFeedbackRating = parseInt(btn.getAttribute('data-rating'), 10);
      updateStarButtons(selectedFeedbackRating);
    });
  });

  document.querySelectorAll('#feedback-form .category-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#feedback-form .category-btn').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedFeedbackCategory = btn.getAttribute('data-category');
    });
  });

  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msgInput = document.getElementById('feedback-message');
      const message = msgInput.value.trim();
      if (!message) return;

      const prof = getUserProfile();
      const nameInput = document.getElementById('feedback-name');
      const authorName = (nameInput ? nameInput.value.trim() : '') || prof.name || 'Usuário Viva Ativo';

      // Lê diretamente os botões ativos no DOM para garantir sincronia absoluta com a tela
      let activeRating = 5;
      const activeStars = document.querySelectorAll('.star-btn.active');
      if (activeStars.length > 0) {
        let maxVal = 1;
        activeStars.forEach((s) => {
          const val = parseInt(s.getAttribute('data-rating'), 10);
          if (val > maxVal) maxVal = val;
        });
        activeRating = maxVal;
      } else if (selectedFeedbackRating) {
        activeRating = selectedFeedbackRating;
      }

      let activeCategory = 'ideia';
      let activeCategoryLabel = 'Ideia / Sugestão';
      const selectedCatBtn = document.querySelector('#feedback-form .category-btn.selected');
      if (selectedCatBtn) {
        activeCategory = selectedCatBtn.getAttribute('data-category') || 'ideia';
        activeCategoryLabel = selectedCatBtn.textContent.trim();
      } else if (selectedFeedbackCategory) {
        activeCategory = selectedFeedbackCategory;
      }

      const feedbackItem = {
        authorName,
        rating: activeRating,
        category: activeCategoryLabel,
        message,
      };
      saveFeedback(feedbackItem);

      // Envia automaticamente para o Google Sheets se a URL estiver declarada no código
      if (typeof GOOGLE_SHEETS_WEBHOOK_URL === 'string' && GOOGLE_SHEETS_WEBHOOK_URL.trim() !== '') {
        try {
          const webhookUrl = GOOGLE_SHEETS_WEBHOOK_URL.trim();
          const timestampStr = new Date().toLocaleString('pt-BR');

          // Parâmetros de URL (compatível com e.parameter no Google Apps Script)
          const params = new URLSearchParams();
          params.append('nome', authorName);
          params.append('name', authorName);
          params.append('estrelas', String(activeRating));
          params.append('nota', String(activeRating));
          params.append('rating', String(activeRating));
          params.append('categoria', activeCategoryLabel);
          params.append('category', activeCategoryLabel);
          params.append('mensagem', message);
          params.append('message', message);
          params.append('feedback', message);
          params.append('comentario', message);
          params.append('dataHora', timestampStr);

          // Payload JSON no corpo (compatível com JSON.parse(e.postData.contents))

          const payload = {
            nome: authorName,
            name: authorName,
            estrelas: activeRating,
            nota: activeRating,
            rating: activeRating,
            categoria: activeCategoryLabel,
            category: activeCategoryLabel,
            categoriaSlug: activeCategory,
            mensagem: message,
            message: message,
            feedback: message,
            comentario: message,
            dataHora: timestampStr,
            timestamp: timestampStr,
            data: timestampStr,
          };

          const separator = webhookUrl.includes('?') ? '&' : '?';
          const fullUrl = `${webhookUrl}${separator}${params.toString()}`;

          fetch(fullUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
          }).catch((err) => console.warn('Erro ao enviar feedback para Google Sheets via POST:', err));
        } catch (err) {
          console.warn('Falha no envio automático para Google Sheets:', err);
        }
      }

      // Exibe caixa de sucesso
      document.getElementById('feedback-form-content').style.display = 'none';
      document.getElementById('feedback-success-box').classList.add('active');
    });
  }

  const btnFeedbackDone = document.getElementById('btn-feedback-done');
  if (btnFeedbackDone) {
    btnFeedbackDone.addEventListener('click', () => {
      closeModal('feedback');
      document.getElementById('feedback-form-content').style.display = 'block';
      document.getElementById('feedback-success-box').classList.remove('active');
      document.getElementById('feedback-message').value = '';
    });
  }

  // --- Configurações do Modal de Settings ---
  const soundToggle = document.getElementById('setting-sound-toggle');
  if (soundToggle) {
    soundToggle.addEventListener('change', (e) => {
      const prof = getUserProfile();
      prof.soundEnabled = e.target.checked;
      saveUserProfile(prof);
      if (prof.soundEnabled) playNotificationSound();
    });
  }

  const btnTestSound = document.getElementById('btn-test-sound');
  if (btnTestSound) {
    btnTestSound.addEventListener('click', async () => {
      playNotificationSound();
      await requestNotificationPermission();
      const nextExercise = getNextExercise(getDailyCycle());
      sendSystemNotification(
        'Viva Ativo - Teste de Alerta',
        'Notificações ativas! Você receberá alertas na barra de notificações no Android e PC.',
        nextExercise
      );
    });
  }

  document.querySelectorAll('.setting-interval-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.setting-interval-btn').forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      const interval = parseInt(btn.getAttribute('data-interval'), 10);
      const prof = getUserProfile();
      prof.intervalMinutes = interval;
      saveUserProfile(prof);

      // Reagenda o próximo lembrete com o novo intervalo
      const cycle = getDailyCycle(prof);
      cycle.nextScheduledTimestamp = Date.now() + interval * 60 * 1000;
      cycle.nextScheduledTime = calculateNextTimeString(interval);
      saveDailyCycle(cycle);
      renderHomeScreen();
    });
  });

  const btnEditProfile = document.getElementById('btn-edit-profile');
  if (btnEditProfile) {
    btnEditProfile.addEventListener('click', () => {
      fillOnboardingForm(getUserProfile());
      closeModal('settings');
      navigateTo('onboarding');
    });
  }

  const btnResetCycle = document.getElementById('btn-reset-cycle');
  if (btnResetCycle) {
    btnResetCycle.addEventListener('click', () => {
      try {
        localStorage.removeItem(STORAGE_KEYS.DAILY_CYCLE);
        closeModal('settings');
        renderHomeScreen();
      } catch (e) {}
    });
  }

  const btnResetAll = document.getElementById('btn-reset-all');
  if (btnResetAll) {
    btnResetAll.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal('confirm-reset');
    });
  }

  const btnCancelReset = document.getElementById('btn-cancel-reset');
  if (btnCancelReset) {
    btnCancelReset.addEventListener('click', () => {
      closeModal('confirm-reset');
    });
  }

  const btnConfirmReset = document.getElementById('btn-confirm-reset');
  if (btnConfirmReset) {
    btnConfirmReset.addEventListener('click', () => {
      // 1. Limpa todo o armazenamento local
      resetAllData();

      // 2. Fecha modais de confirmação e configurações
      closeModal('confirm-reset');
      closeModal('settings');

      // 3. Volta o formulário de cadastro para os valores padrão
      fillOnboardingForm({ ...DEFAULT_PROFILE });
      const inputName = document.getElementById('input-name');

      // 4. Navega diretamente para a tela de cadastro e foca no nome
      navigateTo('onboarding');

      setTimeout(() => {
        if (inputName) inputName.focus();
      }, 100);
    });
  }
});

function updateStarButtons(rating) {
  document.querySelectorAll('.star-btn').forEach((btn) => {
    const val = parseInt(btn.getAttribute('data-rating'), 10);
    if (val <= rating) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function renderFeedbackModal() {
  selectedFeedbackRating = 5;
  selectedFeedbackCategory = 'ideia';
  updateStarButtons(5);

  const formContent = document.getElementById('feedback-form-content');
  const successBox = document.getElementById('feedback-success-box');
  const msgInput = document.getElementById('feedback-message');
  const nameInput = document.getElementById('feedback-name');

  if (formContent) formContent.style.display = 'block';
  if (successBox) successBox.classList.remove('active');
  if (msgInput) msgInput.value = '';
  if (nameInput) {
    const prof = getUserProfile();
    nameInput.value = prof.name || '';
  }

  document.querySelectorAll('#feedback-form .category-btn').forEach((btn) => {
    if (btn.getAttribute('data-category') === 'ideia') {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

function renderSettingsModal() {
  const profile = getUserProfile();
  const soundToggle = document.getElementById('setting-sound-toggle');
  if (soundToggle) soundToggle.checked = profile.soundEnabled !== false;

  document.querySelectorAll('.setting-interval-btn').forEach((btn) => {
    const interval = parseInt(btn.getAttribute('data-interval'), 10);
    if (interval === profile.intervalMinutes) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

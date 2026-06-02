const rules = [
  {
    name: "Géographie",
    icon: "🌍",
    keywords: [
      "capitale", "pays", "continent", "océan", "mer", "fleuve", "montagne",
      "désert", "ville", "région", "île", "archipel", "détroit", "isthme",
      "frontière", "kilimandjaro", "nil", "amazone", "himalaya", "alpes",
      "andés", "rocheuses", "oural", "pyréné", "atlas", "sahara", "kalahari",
      "volcan", "lac victoria", "lac tanganyika", "équateur", "tropique",
      "hémisphère", "latitude", "longitude", "altitude", "relief", "carte",
      "fuseau", "méridien", "greenwich", "lagune", "vallée", "plateau",
      "plaine", "érosion", "géographie physique", "géographie humaine",
      "géographie économique", "géologie", "lithosphère", "atmosphère",
      "hydrosphère", "biosphère", "relief"
    ],
  },
  {
    name: "Sciences",
    icon: "🔬",
    keywords: [
      "scientifique", "chimique", "atome", "molécule", "newton", "einstein",
      "tesla", "darwin", "gutenberg", "imprimerie", "téléphone", "invention",
      "unité", "mesure", "watt", "volt", "ampère", "ohm", "force", "puissance",
      "énergie", "thermomètre", "baromètre", "anémomètre", "hygromètre",
      "pluviomètre", "température", "pression", "précipitation", "météorologie",
      "climat", "équinoxe", "solstice", "rotation", "révolution",
      "système solaire", "planète", "lune", "soleil", "étoile", "corps céleste",
      "fusée", "espace", "gravité", "espérance de vie", "échelle de beaufort",
      "ornithologie", "dermatologie", "anthropologie", "épistémologie",
      "axiome", "nyctalope",
    ],
  },
  {
    name: "Sport",
    icon: "⚽",
    keywords: [
      "sport", "football", "basket", "tennis", "nba", "euro", "coupe du monde",
      "ballon d'or", "wimbledon", "olympique", "rodri", "alcaraz", "celtics",
      "lakers", "warriors", "heat", "mbappé", "messi", "ronaldo", "djokovic",
      "federer", "nadal", "rugby",
    ],
  },
  {
    name: "Histoire",
    icon: "📜",
    keywords: [
      "guerre mondiale", "révolution", "antiquité", "moyen âge", "préhistoire",
      "empire", "colonie", "colonisation", "pharaon", "pyramide", "écriture",
      "1492", "1789", "1914", "1918", "1939", "1945", "christophe colomb",
      "magellan", "luther", "bourgeoisie", "capitalisme", "impérialisme",
      "socialisme", "communisme", "prolétariat", "révolution française",
      "napoléon", "démocratie", "roi", "reine", "traité", "paix", "guerre",
      "bataille", "armistice", "capitulation", "hiéroglyphe", "conquistador",
      "sdn", "onu", "ot an",
      "période", "siècle", "ère", "date", "chronologie", "événement",
      "paléolithique", "néolithique", "âge des métaux", "âge du bronze",
      "homo habilis", "homo erectus", "homo sapiens", "sédentarisation",
      "ecclésia", "sparte", "athènes", "début", "achève",
    ],
  },
  {
    name: "Religion",
    icon: "🕌",
    keywords: [
      "islam", "coran", "sourate", "prophète", "musulman", "imam", "calife",
      "pèlerinage", "mecque", "ramadan", "jeûne", "aumône", "prière",
      "pilier de l'islam", "foi", "dieu", "église", "protestant", "catholique",
      "orthodoxe", "luthérien", "bible", "torah", "religion", "spirituel",
      "médersa", "madrasa", "hégire", "fâtima", "muhammad",
    ],
  },
  {
    name: "Culture",
    icon: "🎭",
    keywords: [
      "livre", "auteur", "écrit", "poème", "roman", "littérature", "balzac",
      "hugo", "saint-exupéry", "camus", "diop", "badian", "marouba fall",
      "écrivain", "poète", "comédie humaine", "vol de nuit", "coup de pilon",
      "sous l'orage", "collégienne", "alphabet", "langue",
    ],
  },
  {
    name: "Politique & Économie",
    icon: "🏛️",
    keywords: [
      "président", "république", "politique", "élection", "impôt", "fiscalité",
      "contribuable", "capitalisme", "socialisme", "communisme", "bourse",
      "action", "banque", "monnaie", "commerce", "exportation", "importation",
      "pib", "pnb", "marché", "offre", "demande", "prix", "profit",
      "investissement", "spéculation", "capital", "secteur primaire",
      "secteur secondaire", "secteur tertiaire", "économie",
      "régime présidentiel", "régime parlementaire", "assemblée", "sénat",
      "gouvernement", "état", "métropole", "colonie", "directoire",
      "loi du marché",
    ],
  },
  {
    name: "Mathématiques",
    icon: "📐",
    keywords: [
      "nombre", "polygone", "triangle", "cercle", "pi", "racine cubique",
      "équation", "chiffre", "angle", "côté", "parallèle", "perpendiculaire",
      "isocèle", "équilatéral", "hexagone", "octogone", "décagone",
      "tangente", "sécante",
    ],
  },
];

const cache = new Map();

export function getCategory(question) {
  if (cache.has(question)) return cache.get(question);

  const q = question.toLowerCase();
  for (const rule of rules) {
    for (const kw of rule.keywords) {
      if (q.includes(kw.toLowerCase())) {
        cache.set(question, rule.name);
        return rule.name;
      }
    }
  }

  cache.set(question, "Culture");
  return "Culture";
}

export const categories = rules.map((r) => ({ name: r.name, icon: r.icon }));

export function filterByCategory(questions, category) {
  if (!category || category === "Toutes") return questions;
  return questions.filter((q) => getCategory(q.question) === category);
}

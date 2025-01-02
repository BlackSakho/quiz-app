import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './index.css';



const App = () => {
    const [step, setStep] = useState('home');
    const [questions ] = useState([
        {
            question: 'Quelle est la capitale de la France ?',
            answers: [
                { text: 'Paris', isCorrect: true },
                { text: 'Londres', isCorrect: false },
                { text: 'Berlin', isCorrect: false },
                { text: 'Rome', isCorrect: false },
            ],
        },
        {
            question: 'Combien de continents y a-t-il ?',
            answers: [
                { text: '5', isCorrect: false },
                { text: '6', isCorrect: false },
                { text: '7', isCorrect: true },
                { text: '8', isCorrect: false },
            ],
        },
        {
          question: "Comment appelle-t-on un polygone qui a 8 côtés ?",
          answers: [
              { text: "Hexagone", isCorrect: false },
              { text: "Octogone", isCorrect: true },
              { text: "Décagone", isCorrect: false },
              { text: "Pentagone", isCorrect: false },
          ],
      },
      {
          question: "Que signifie ANSD ?",
          answers: [
              { text: "Agence Nationale de la Sécurité des Données", isCorrect: false },
              { text: "Agence Nationale de la Statistique et de la Démographie", isCorrect: true },
              { text: "Association Nationale pour le Développement Social", isCorrect: false },
              { text: "Agence Nationale des Services Digitalisés", isCorrect: false },
          ],
      },
      {
          question: "De quelle nationalité est l'actuel secrétaire général de la francophonie ?",
          answers: [
              { text: "Rwandaise", isCorrect: true },
              { text: "Sénégalaise", isCorrect: false },
              { text: "Canadienne", isCorrect: false },
              { text: "Française", isCorrect: false },
          ],
      },
      {
          question: "Quel scientifique a développé la théorie du 3/6/9 ?",
          answers: [
              { text: "Albert Einstein", isCorrect: false },
              { text: "Nicolas Tesla", isCorrect: true },
              { text: "Isaac Newton", isCorrect: false },
              { text: "Stephen Hawking", isCorrect: false },
          ],
      },
      {
          question: "Quelle est la capitale de la Finlande ?",
          answers: [
              { text: "Oslo", isCorrect: false },
              { text: "Helsinki", isCorrect: true },
              { text: "Stockholm", isCorrect: false },
              { text: "Copenhague", isCorrect: false },
          ],
      },
      {
          question: "Qui est le prix Nobel de la paix en 2024 ?",
          answers: [
              { text: "Muhammad Yunus", isCorrect: true },
              { text: "Malala Yousafzai", isCorrect: false },
              { text: "Nelson Mandela", isCorrect: false },
              { text: "Barack Obama", isCorrect: false },
          ],
      },
      {
          question: "Quelle est l’unité utilisée pour donner la dimension d’un écran ?",
          answers: [
              { text: "Pouce", isCorrect: true },
              { text: "Centimètre", isCorrect: false },
              { text: "Mètre", isCorrect: false },
              { text: "Pied", isCorrect: false },
          ],
      },
      {
          question: "Quel monument de pierre quadrangulaire en forme d’aiguille est terminé par une pyramide ?",
          answers: [
              { text: "Obélisque", isCorrect: true },
              { text: "Sphinx", isCorrect: false },
              { text: "Colosse", isCorrect: false },
              { text: "Statue", isCorrect: false },
          ],
      },
      {
          question: "Dans quel pays se trouve le Kilimandjaro ?",
          answers: [
              { text: "Kenya", isCorrect: false },
              { text: "Tanzanie", isCorrect: true },
              { text: "Ouganda", isCorrect: false },
              { text: "Éthiopie", isCorrect: false },
          ],
      },
      {
          question: "Quelle est la racine cubique de 64 ?",
          answers: [
              { text: "8", isCorrect: false },
              { text: "4", isCorrect: true },
              { text: "6", isCorrect: false },
              { text: "2", isCorrect: false },
          ],
      },
      {
        question: "Qui a remporté le tournoi de Tennis Wimbledon 2024 ?",
        answers: [
            { text: "Novak Djokovic", isCorrect: false },
            { text: "Carlos Alcaraz", isCorrect: true },
            { text: "Roger Federer", isCorrect: false },
            { text: "Rafael Nadal", isCorrect: false },
        ],
    },
    {
        question: "Qui a été élu meilleur joueur de l’Euro 2024 ?",
        answers: [
            { text: "Lionel Messi", isCorrect: false },
            { text: "Rodri", isCorrect: true },
            { text: "Kylian Mbappé", isCorrect: false },
            { text: "Cristiano Ronaldo", isCorrect: false },
        ],
    },
    {
        question: "Quel est le thème de la première édition des universités du ramadan ?",
        answers: [
            { text: "Sous le regard de Dieu", isCorrect: true },
            { text: "La jeunesse et la foi", isCorrect: false },
            { text: "La paix intérieure", isCorrect: false },
            { text: "Les chemins de la vertu", isCorrect: false },
        ],
    },
    {
        question: "Qui est l'auteur de 'Sous l'orage' ?",
        answers: [
            { text: "David Diop", isCorrect: false },
            { text: "Seydou Badian", isCorrect: true },
            { text: "Marouba Fall", isCorrect: false },
            { text: "Antoine de Saint-Exupéry", isCorrect: false },
        ],
    },
    {
        question: "Quel pays d’Afrique est traversé par la Vallée du Grand Rift et abrite le Kilimandjaro ?",
        answers: [
            { text: "Kenya", isCorrect: false },
            { text: "Tanzanie", isCorrect: true },
            { text: "Éthiopie", isCorrect: false },
            { text: "Ouganda", isCorrect: false },
        ],
    },
    {
        question: "Quel oiseau coloré est souvent élevé pour sa capacité à reproduire des sons humains ?",
        answers: [
            { text: "Perroquet", isCorrect: true },
            { text: "Colibri", isCorrect: false },
            { text: "Flamant rose", isCorrect: false },
            { text: "Hirondelle", isCorrect: false },
        ],
    },
    {
        question: "Quel est le nom du fondateur de Microsoft ?",
        answers: [
            { text: "Steve Jobs", isCorrect: false },
            { text: "Bill Gates", isCorrect: true },
            { text: "Mark Zuckerberg", isCorrect: false },
            { text: "Elon Musk", isCorrect: false },
        ],
    },
    {
        question: "Que signifie FMI ?",
        answers: [
            { text: "Fonds Monétaire International", isCorrect: true },
            { text: "Fédération Mondiale des Industries", isCorrect: false },
            { text: "Fonds Multinational d’Investissement", isCorrect: false },
            { text: "Fonds pour les Missions Internationales", isCorrect: false },
        ],
    },
    {
        question: "Quel est le symbole chimique de l’or ?",
        answers: [
            { text: "Au", isCorrect: true },
            { text: "Ag", isCorrect: false },
            { text: "Pb", isCorrect: false },
            { text: "Fe", isCorrect: false },
        ],
    },
    {
        question: "Quelle est la capitale du Botswana ?",
        answers: [
            { text: "Harare", isCorrect: false },
            { text: "Gaborone", isCorrect: true },
            { text: "Windhoek", isCorrect: false },
            { text: "Lusaka", isCorrect: false },
        ],
    },

    {
      question: "Quel est le plus grand lac d'Afrique ?",
      answers: [
          { text: "Lac Tanganyika", isCorrect: false },
          { text: "Lac Victoria", isCorrect: true },
          { text: "Lac Malawi", isCorrect: false },
          { text: "Lac Tchad", isCorrect: false },
      ],
  },
  {
      question: "Quel Français a écrit 'La Comédie Humaine' ?",
      answers: [
          { text: "Victor Hugo", isCorrect: false },
          { text: "Honoré de Balzac", isCorrect: true },
          { text: "Gustave Flaubert", isCorrect: false },
          { text: "Émile Zola", isCorrect: false },
      ],
  },
  {
      question: "Quel est le rapport entre le diamètre d’un cercle et sa circonférence ?",
      answers: [
          { text: "Phi", isCorrect: false },
          { text: "Pi", isCorrect: true },
          { text: "Epsilon", isCorrect: false },
          { text: "Sigma", isCorrect: false },
      ],
  },
  {
      question: "Quelle est la science qui étudie les oiseaux ?",
      answers: [
          { text: "Ichtyologie", isCorrect: false },
          { text: "Ornithologie", isCorrect: true },
          { text: "Entomologie", isCorrect: false },
          { text: "Herpétologie", isCorrect: false },
      ],
  },
  {
      question: "Quel désert se situe entre les fleuves Orange et Zambèze ?",
      answers: [
          { text: "Sahara", isCorrect: false },
          { text: "Kalahari", isCorrect: true },
          { text: "Namib", isCorrect: false },
          { text: "Gobi", isCorrect: false },
      ],
  },
  {
      question: "Qui a inventé l’imprimerie ?",
      answers: [
          { text: "Isaac Newton", isCorrect: false },
          { text: "Johannes Gutenberg", isCorrect: true },
          { text: "Galilée", isCorrect: false },
          { text: "Leonard de Vinci", isCorrect: false },
      ],
  },
  {
      question: "Dans quel pays d'Afrique se trouve le désert du Kalahari ?",
      answers: [
          { text: "Afrique du Sud", isCorrect: false },
          { text: "Botswana", isCorrect: true },
          { text: "Namibie", isCorrect: false },
          { text: "Angola", isCorrect: false },
      ],
  },
  {
      question: "Quel est le nom donné à un triangle dont les trois angles sont égaux ?",
      answers: [
          { text: "Isocèle", isCorrect: false },
          { text: "Équilatéral", isCorrect: true },
          { text: "Scalène", isCorrect: false },
          { text: "Rectangle", isCorrect: false },
      ],
  },
  {
      question: "Quel est le nom du premier homme à avoir marché sur la lune ?",
      answers: [
          { text: "Buzz Aldrin", isCorrect: false },
          { text: "Neil Armstrong", isCorrect: true },
          { text: "Yuri Gagarin", isCorrect: false },
          { text: "Michael Collins", isCorrect: false },
      ],
  },
  {
      question: "Quel animal est connu pour sa capacité à voler et à polliniser ?",
      answers: [
          { text: "Abeille", isCorrect: true },
          { text: "Colibri", isCorrect: false },
          { text: "Chauve-souris", isCorrect: false },
          { text: "Papillon", isCorrect: false },
      ],
  },

  {
    question: "Quel événement a eu lieu en 1945 où les Alliés se sont partagés le monde ?",
    answers: [
        { text: "Conférence de Yalta", isCorrect: true },
        { text: "Conférence de Potsdam", isCorrect: false },
        { text: "Traité de Versailles", isCorrect: false },
        { text: "Accords de Téhéran", isCorrect: false },
    ],
},
{
    question: "Quel est le nom de l'étude des climats et des températures ?",
    answers: [
        { text: "Astronomie", isCorrect: false },
        { text: "Météorologie", isCorrect: true },
        { text: "Géologie", isCorrect: false },
        { text: "Océanographie", isCorrect: false },
    ],
},
{
    question: "Quel nom désigne la disparition d’un astre par interposition d’un corps ?",
    answers: [
        { text: "Eclipse", isCorrect: true },
        { text: "Transit", isCorrect: false },
        { text: "Occultation", isCorrect: false },
        { text: "Réfraction", isCorrect: false },
    ],
},
{
    question: "Quelle technique agricole consiste à laisser une terre sans culture pendant un temps ?",
    answers: [
        { text: "Assolement", isCorrect: false },
        { text: "Jachère", isCorrect: true },
        { text: "Monoculture", isCorrect: false },
        { text: "Culture intensive", isCorrect: false },
    ],
},
{
    question: "Quelle science étudie la structure physique et culturelle des humains ?",
    answers: [
        { text: "Anthropologie", isCorrect: true },
        { text: "Sociologie", isCorrect: false },
        { text: "Éthologie", isCorrect: false },
        { text: "Psychologie", isCorrect: false },
    ],
},
{
    question: "Quel homme politique a été président du Sénégal après son indépendance en 1960 ?",
    answers: [
        { text: "Léopold Sédar Senghor", isCorrect: true },
        { text: "Macky Sall", isCorrect: false },
        { text: "Abdoulaye Wade", isCorrect: false },
        { text: "Cheikh Anta Diop", isCorrect: false },
    ],
},
{
    question: "Qui a remporté les finals NBA 2024 ?",
    answers: [
        { text: "Los Angeles Lakers", isCorrect: false },
        { text: "Boston Celtics", isCorrect: true },
        { text: "Golden State Warriors", isCorrect: false },
        { text: "Miami Heat", isCorrect: false },
    ],
},
{
    question: "Quelle est la dernière lettre de l’alphabet grecque ?",
    answers: [
        { text: "Alpha", isCorrect: false },
        { text: "Oméga", isCorrect: true },
        { text: "Delta", isCorrect: false },
        { text: "Pi", isCorrect: false },
    ],
},
{
    question: "Quel est le plus haut sommet d’Afrique ?",
    answers: [
        { text: "Mont Kenya", isCorrect: false },
        { text: "Kilimandjaro", isCorrect: true },
        { text: "Mont Elgon", isCorrect: false },
        { text: "Rwenzori", isCorrect: false },
    ],
},
{
    question: "Quel animal, emblème de l'Australie, utilise sa poche ventrale pour nourrir ses petits ?",
    answers: [
        { text: "Koala", isCorrect: false },
        { text: "Kangourou", isCorrect: true },
        { text: "Échidné", isCorrect: false },
        { text: "Wombat", isCorrect: false },
    ],
},
{
  question: "Quelle est la mer qui sépare l'Égypte et l'Arabie Saoudite ?",
  answers: [
      { text: "Mer Méditerranée", isCorrect: false },
      { text: "Mer Rouge", isCorrect: true },
      { text: "Mer Noire", isCorrect: false },
      { text: "Mer Adriatique", isCorrect: false },
  ],
},
{
  question: "Quelle unité de mesure est utilisée pour la force dans le système international (SI) ?",
  answers: [
      { text: "Newton", isCorrect: true },
      { text: "Joule", isCorrect: false },
      { text: "Watt", isCorrect: false },
      { text: "Pascal", isCorrect: false },
  ],
},
{
  question: "Quelle science s'occupe de l'étude de la peau ?",
  answers: [
      { text: "Dermatologie", isCorrect: true },
      { text: "Cardiologie", isCorrect: false },
      { text: "Neurologie", isCorrect: false },
      { text: "Hématologie", isCorrect: false },
  ],
},
{
  question: "Quel mot désigne deux lignes côte à côte qui ne se rencontreront jamais ?",
  answers: [
      { text: "Tangentes", isCorrect: false },
      { text: "Parallèles", isCorrect: true },
      { text: "Sécantes", isCorrect: false },
      { text: "Méridiens", isCorrect: false },
  ],
},
{
  question: "Qui a écrit 'Vol de nuit' ?",
  answers: [
      { text: "Antoine de Saint-Exupéry", isCorrect: true },
      { text: "Albert Camus", isCorrect: false },
      { text: "André Gide", isCorrect: false },
      { text: "Victor Hugo", isCorrect: false },
  ],
},
{
  question: "Qui a mis au point le téléphone portable ?",
  answers: [
      { text: "Alexander Graham Bell", isCorrect: true },
      { text: "Thomas Edison", isCorrect: false },
      { text: "Nikola Tesla", isCorrect: false },
      { text: "Samuel Morse", isCorrect: false },
  ],
},
{
  question: "En quelle année a eu lieu la première édition du Checkpoint Céleste ?",
  answers: [
      { text: "2018", isCorrect: false },
      { text: "2022", isCorrect: true },
      { text: "2020", isCorrect: false },
      { text: "2024", isCorrect: false },
  ],
},
{
  question: "Quel est le thème de la deuxième édition de la Re-création ?",
  answers: [
      { text: "La jeunesse et la spiritualité", isCorrect: false },
      { text: "Al Ihsaan, gage d'une servitude féconde", isCorrect: true },
      { text: "La paix intérieure", isCorrect: false },
      { text: "Élever l'esprit par la foi", isCorrect: false },
  ],
},

{
  question: "Quel pays, situé au nord-ouest de l'Afrique, a des côtes sur l'Atlantique et la Méditerranée ?",
  answers: [
      { text: "Algérie", isCorrect: false },
      { text: "Maroc", isCorrect: true },
      { text: "Tunisie", isCorrect: false },
      { text: "Libye", isCorrect: false },
  ],
},
{
  question: "Quel félin peut atteindre une vitesse de 110 km/h dans les plaines africaines ?",
  answers: [
      { text: "Lion", isCorrect: false },
      { text: "Guépard", isCorrect: true },
      { text: "Léopard", isCorrect: false },
      { text: "Tigre", isCorrect: false },
  ],
},
{
  question: "Quelle est l'année où Keur Massar est devenu le 46e département du Sénégal ?",
  answers: [
      { text: "2021", isCorrect: false },
      { text: "2022", isCorrect: true },
      { text: "2020", isCorrect: false },
      { text: "2019", isCorrect: false },
  ],
},
{
  question: "Qui est l'auteur de 'Coup de Pilon' ?",
  answers: [
      { text: "David Diop", isCorrect: true },
      { text: "Seydou Badian", isCorrect: false },
      { text: "Marouba Fall", isCorrect: false },
      { text: "Antoine de Saint-Exupéry", isCorrect: false },
  ],
},
{
  question: "Quel est le thème de la troisième édition du Colisée de l’éveil ?",
  answers: [
      { text: "Al Ihsaan, gage d'une servitude féconde", isCorrect: false },
      { text: "Élégance divine, principe humain : une créature digne de son créateur", isCorrect: true },
      { text: "Sous le regard de Dieu", isCorrect: false },
      { text: "La jeunesse musulmane d’un siècle à un autre", isCorrect: false },
  ],
},
{
  question: "Quelle est la date de la dernière élection législative au Sénégal ?",
  answers: [
      { text: "17 novembre 2024", isCorrect: true },
      { text: "12 décembre 2024", isCorrect: false },
      { text: "10 octobre 2024", isCorrect: false },
      { text: "15 janvier 2025", isCorrect: false },
  ],
},
{
  question: "Comment appelle-t-on un monument de pierre en forme d’aiguille terminé par une pyramide ?",
  answers: [
      { text: "Obélisque", isCorrect: true },
      { text: "Sphinx", isCorrect: false },
      { text: "Colosse", isCorrect: false },
      { text: "Statue", isCorrect: false },
  ],
},
{
  question: "Quelle est la durée de vie de Fâtima après le décès du Prophète Muhammad (PSL) ?",
  answers: [
      { text: "6 mois", isCorrect: true },
      { text: "3 ans", isCorrect: false },
      { text: "2 ans", isCorrect: false },
      { text: "1 an", isCorrect: false },
  ],
},
{
  question: "Combien de fois le mot 'Muhammad' apparaît-il dans le Coran ?",
  answers: [
      { text: "4 fois", isCorrect: true },
      { text: "3 fois", isCorrect: false },
      { text: "5 fois", isCorrect: false },
      { text: "6 fois", isCorrect: false },
  ],
},
{
  question: "Quel est le nom de la coalition créée par les partis PDS et APR au Sénégal ?",
  answers: [
      { text: "Takku-Wallu", isCorrect: true },
      { text: "Benno Bokk Yaakaar", isCorrect: false },
      { text: "Yewwi Askan Wi", isCorrect: false },
      { text: "Coalition Manko", isCorrect: false },
  ],
},
{
  question: "Quel pays d'Afrique centrale abrite l'une des plus grandes forêts tropicales au monde ?",
  answers: [
      { text: "République Démocratique du Congo", isCorrect: true },
      { text: "Gabon", isCorrect: false },
      { text: "Cameroun", isCorrect: false },
      { text: "Rwanda", isCorrect: false },
  ],
},
{
  question: "Quelle est l'année marquant la première alternance politique au Sénégal ?",
  answers: [
      { text: "2000", isCorrect: true },
      { text: "2012", isCorrect: false },
      { text: "1980", isCorrect: false },
      { text: "1993", isCorrect: false },
  ],
},
{
  question: "Qui est l'actuel président de la France ?",
  answers: [
      { text: "Emmanuel Macron", isCorrect: true },
      { text: "François Hollande", isCorrect: false },
      { text: "Nicolas Sarkozy", isCorrect: false },
      { text: "Jacques Chirac", isCorrect: false },
  ],
},
{
  question: "Que signifie 'épistémologie' ?",
  answers: [
      { text: "Étude critique des sciences, de leurs méthodes et de leurs principes", isCorrect: true },
      { text: "Étude des champignons", isCorrect: false },
      { text: "Interprétation approfondie d’un texte", isCorrect: false },
      { text: "Figure de style qui rapproche deux termes opposés", isCorrect: false },
  ],
},
{
  question: "Dans quelle région du Sénégal trouve-t-on la chute de Dindéfelo ?",
  answers: [
      { text: "Kédougou", isCorrect: true },
      { text: "Casamance", isCorrect: false },
      { text: "Tambacounda", isCorrect: false },
      { text: "Saint-Louis", isCorrect: false },
  ],
},
{
  question: "Quel était le nom du programme gouvernemental de Macky Sall ?",
  answers: [
      { text: "PSE (Plan Sénégal Émergent)", isCorrect: true },
      { text: "Plan Jappo", isCorrect: false },
      { text: "Programme Sédar Senghor", isCorrect: false },
      { text: "Emergence 2035", isCorrect: false },
  ],
},
{
  question: "Qui est l'auteur de 'La Collégienne' ?",
  answers: [
      { text: "Marouba Fall", isCorrect: true },
      { text: "Seydou Badian", isCorrect: false },
      { text: "David Diop", isCorrect: false },
      { text: "Antoine de Saint-Exupéry", isCorrect: false },
  ],
},
{
  question: "Quelle est l'unité internationale de puissance dans le SI ?",
  answers: [
      { text: "Watt", isCorrect: true },
      { text: "Joule", isCorrect: false },
      { text: "Newton", isCorrect: false },
      { text: "Ampère", isCorrect: false },
  ],
},
{
  question: "Quel reptile célèbre pour sa longévité vit aussi bien sur terre que dans l'eau ?",
  answers: [
      { text: "Tortue", isCorrect: true },
      { text: "Crocodile", isCorrect: false },
      { text: "Iguane", isCorrect: false },
      { text: "Varan", isCorrect: false },
  ],
},
{
  question: "Quelle est la science qui étudie les climats ?",
  answers: [
      { text: "Météorologie", isCorrect: true },
      { text: "Océanographie", isCorrect: false },
      { text: "Astronomie", isCorrect: false },
      { text: "Géologie", isCorrect: false },
  ],
},
{
  question: "Quel scientifique est connu pour avoir développé la théorie de l'évolutionnisme ?",
  answers: [
      { text: "Isaac Newton", isCorrect: false },
      { text: "Charles Darwin", isCorrect: true },
      { text: "Galilée", isCorrect: false },
      { text: "Albert Einstein", isCorrect: false },
  ],
},
{
  question: "Quelle est la signification du terme 'axiome' ?",
  answers: [
      { text: "Proposition considérée comme évidente", isCorrect: true },
      { text: "Maladie incurable", isCorrect: false },
      { text: "Distance entre deux planètes", isCorrect: false },
      { text: "Axe incliné", isCorrect: false },
  ],
},
{
  question: "Comment appelle-t-on une personne capable de voir dans le noir ?",
  answers: [
      { text: "Nyctalope", isCorrect: true },
      { text: "Presbyte", isCorrect: false },
      { text: "Myope", isCorrect: false },
      { text: "Astigmate", isCorrect: false },
  ],
},
{
  question: "Quelle est l'unité internationale de mesure de l'intensité électrique ?",
  answers: [
      { text: "Ampère", isCorrect: true },
      { text: "Volt", isCorrect: false },
      { text: "Ohm", isCorrect: false },
      { text: "Watt", isCorrect: false },
  ],
},
{
  question: "Dans quel pays se trouve le désert du Kalahari ?",
  answers: [
      { text: "Botswana", isCorrect: true },
      { text: "Soudan", isCorrect: false },
      { text: "Égypte", isCorrect: false },
      { text: "Mali", isCorrect: false },
  ],
},
{
  question: "Quel organe est surnommé 'ambassadeur de l’âme' dans le corps humain ?",
  answers: [
      { text: "Le cœur", isCorrect: true },
      { text: "Le cerveau", isCorrect: false },
      { text: "Les poumons", isCorrect: false },
      { text: "Le foie", isCorrect: false },
  ],
},
{
  question: "Quel est le nom du fils de Cheikh Anta Diop né en 1818 et protecteur de son terroir ?",
  answers: [
      { text: "Caago", isCorrect: false },
      { text: "Allou Kaagn", isCorrect: true },
      { text: "Samba Faye", isCorrect: false },
      { text: "Ndiaga Ndour", isCorrect: false },
  ],
},
{
  question: "Quelle franchise NBA a remporté les finals en 2024 ?",
  answers: [
      { text: "Boston Celtics", isCorrect: true },
      { text: "Los Angeles Lakers", isCorrect: false },
      { text: "Golden State Warriors", isCorrect: false },
      { text: "Miami Heat", isCorrect: false },
  ],
},
{
  question: "Quelle est la signification de CIPS dans le MJ ?",
  answers: [
      { text: "Commission d’Intelligence et de Perception Spirituelle", isCorrect: true },
      { text: "Centre pour l’Innovation et la Planification Systématique", isCorrect: false },
      { text: "Comité International de Planification Systémique", isCorrect: false },
      { text: "Collectif pour l’Innovation et le Partage Spirituel", isCorrect: false },
  ],
},
{
  question: "Quel élément détient les ressources de la dimension physique de l’homme ?",
  answers: [
      { text: "Souffle de vie", isCorrect: true },
      { text: "Esprit", isCorrect: false },
      { text: "Identité absolue", isCorrect: false },
      { text: "Noyau humain", isCorrect: false },
  ],
},

  {
      question: "Quelle est la capitale de l'Ukraine, au cœur de la guerre en 2022 ?",
      answers: [
          { text: "Minsk", isCorrect: false },
          { text: "Kiev", isCorrect: true },
          { text: "Varsovie", isCorrect: false },
          { text: "Vilnius", isCorrect: false },
      ],
  },
  {
      question: "Quel pays a accueilli la Coupe du Monde de football en 2022 ?",
      answers: [
          { text: "Qatar", isCorrect: true },
          { text: "Brésil", isCorrect: false },
          { text: "Russie", isCorrect: false },
          { text: "Afrique du Sud", isCorrect: false },
      ],
  },
  {
      question: "Qui est l'actuel président des États-Unis (2025) ?",
      answers: [
          { text: "Donald Trump", isCorrect: false },
          { text: "Joe Biden", isCorrect: true },
          { text: "Barack Obama", isCorrect: false },
          { text: "Kamala Harris", isCorrect: false },
      ],
  },
  {
      question: "Quel est le nom de la mission spatiale qui a récemment envoyé des humains sur la Lune ?",
      answers: [
          { text: "Artemis", isCorrect: true },
          { text: "Apollo", isCorrect: false },
          { text: "Mars One", isCorrect: false },
          { text: "SpaceX Lunar", isCorrect: false },
      ],
  },
  {
      question: "Quel est le pays africain qui a récemment rejoint les BRICS en 2024 ?",
      answers: [
          { text: "Nigeria", isCorrect: false },
          { text: "Égypte", isCorrect: true },
          { text: "Kenya", isCorrect: false },
          { text: "Algérie", isCorrect: false },
      ],
  },
  {
      question: "Quelle organisation a récemment publié le rapport sur le changement climatique 2024 ?",
      answers: [
          { text: "IPCC (GIEC)", isCorrect: true },
          { text: "OMS", isCorrect: false },
          { text: "UNESCO", isCorrect: false },
          { text: "FAO", isCorrect: false },
      ],
  },
  {
      question: "Quelle est la ville hôte des Jeux Olympiques 2024 ?",
      answers: [
          { text: "Paris", isCorrect: true },
          { text: "Los Angeles", isCorrect: false },
          { text: "Tokyo", isCorrect: false },
          { text: "Londres", isCorrect: false },
      ],
  },
  {
      question: "Quelle entreprise est devenue la première à atteindre une valorisation de 3 trillions de dollars en 2023 ?",
      answers: [
          { text: "Apple", isCorrect: true },
          { text: "Microsoft", isCorrect: false },
          { text: "Amazon", isCorrect: false },
          { text: "Google", isCorrect: false },
      ],
  },
  {
      question: "Quel vaccin contre le paludisme a été approuvé par l'OMS en 2023 ?",
      answers: [
          { text: "RTS,S", isCorrect: true },
          { text: "Pfizer-BioNTech", isCorrect: false },
          { text: "Moderna", isCorrect: false },
          { text: "AstraZeneca", isCorrect: false },
      ],
  },
  {
      question: "Quel pays a remporté la Coupe du Monde de Rugby 2023 ?",
      answers: [
          { text: "Afrique du Sud", isCorrect: true },
          { text: "Nouvelle-Zélande", isCorrect: false },
          { text: "Angleterre", isCorrect: false },
          { text: "France", isCorrect: false },
      ],
  },

  {
    question: "Quel pays a organisé la COP28 en 2023 ?",
    answers: [
        { text: "Émirats Arabes Unis", isCorrect: true },
        { text: "Égypte", isCorrect: false },
        { text: "France", isCorrect: false },
        { text: "Brésil", isCorrect: false },
    ],
},
{
    question: "Quelle intelligence artificielle développée par OpenAI est sortie en 2024 ?",
    answers: [
        { text: "GPT-5", isCorrect: true },
        { text: "GPT-3", isCorrect: false },
        { text: "Bard AI", isCorrect: false },
        { text: "ChatGPT Legacy", isCorrect: false },
    ],
},
{
    question: "Quel pays a envoyé la première mission habitée sur Mars en 2024 ?",
    answers: [
        { text: "États-Unis", isCorrect: true },
        { text: "Chine", isCorrect: false },
        { text: "Russie", isCorrect: false },
        { text: "Inde", isCorrect: false },
    ],
},
{
    question: "Quelle star mondiale a remporté le Ballon d’Or 2024 ?",
    answers: [
        { text: "Lionel Messi", isCorrect: false },
        { text: "Kylian Mbappé", isCorrect: true },
        { text: "Erling Haaland", isCorrect: false },
        { text: "Cristiano Ronaldo", isCorrect: false },
    ],
},
{
    question: "Quelle monnaie numérique a atteint un pic record en 2024 ?",
    answers: [
        { text: "Bitcoin", isCorrect: true },
        { text: "Ethereum", isCorrect: false },
        { text: "Dogecoin", isCorrect: false },
        { text: "Litecoin", isCorrect: false },
    ],
},
{
    question: "Quel pays a remporté les Jeux Olympiques 2024 à Paris en termes de médailles d’or ?",
    answers: [
        { text: "États-Unis", isCorrect: true },
        { text: "Chine", isCorrect: false },
        { text: "France", isCorrect: false },
        { text: "Japon", isCorrect: false },
    ],
},
{
    question: "Quel scientifique a récemment remporté le prix Nobel de Physique 2024 ?",
    answers: [
        { text: "Anne L'Huillier", isCorrect: true },
        { text: "Gérard Mourou", isCorrect: false },
        { text: "Donna Strickland", isCorrect: false },
        { text: "Alain Aspect", isCorrect: false },
    ],
},
{
    question: "Quel accord international signé en 2024 concerne la protection des océans ?",
    answers: [
        { text: "Traité de la haute mer", isCorrect: true },
        { text: "Accord de Paris 2.0", isCorrect: false },
        { text: "Protocole de Kyoto révisé", isCorrect: false },
        { text: "Pacte pour les mers bleues", isCorrect: false },
    ],
},
{
    question: "Quelle grande entreprise a annoncé sa transition vers une production 100% verte en 2024 ?",
    answers: [
        { text: "Tesla", isCorrect: true },
        { text: "Amazon", isCorrect: false },
        { text: "Microsoft", isCorrect: false },
        { text: "Apple", isCorrect: false },
    ],
},
{
    question: "Quel pays est devenu le dernier membre permanent du Conseil de Sécurité de l’ONU en 2024 ?",
    answers: [
        { text: "Inde", isCorrect: true },
        { text: "Brésil", isCorrect: false },
        { text: "Afrique du Sud", isCorrect: false },
        { text: "Allemagne", isCorrect: false },
    ],
},



    ]);
    const [score, setScore] = useState(0);

    const startQuiz = () => setStep('quiz');
    const finishQuiz = (finalScore) => {
        setScore(finalScore);
        setStep('result');
    };
    const restartQuiz = () => {
        setScore(0);
        setStep('home');
    };

    return (
        <div>
            {step === 'home' && <Home startQuiz={startQuiz} />}
            {step === 'quiz' && <Quiz questions={questions} onFinish={finishQuiz} />}
            {step === 'result' && <Result score={score} total={questions.length} restartQuiz={restartQuiz} />}
        </div>
    );
};

export default App;

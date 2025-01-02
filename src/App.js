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
  question: "Que veut dire CIPS au MJ ?",
  answers: [
      { text: "Commission Intellectuelle et Politique Supérieure", isCorrect: false },
      { text: "Commission d’Intelligence et de Perception Spirituelle", isCorrect: true },
      { text: "Centre International pour la Paix et la Spiritualité", isCorrect: false },
      { text: "Collectif Islamique de la Pensée Sénégalaise", isCorrect: false },
  ],
},
{
  question: "Quel pays est connu pour la Vallée du Grand Rift et le Kilimandjaro ?",
  answers: [
      { text: "Éthiopie", isCorrect: false },
      { text: "Tanzanie", isCorrect: true },
      { text: "Kenya", isCorrect: false },
      { text: "Ouganda", isCorrect: false },
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

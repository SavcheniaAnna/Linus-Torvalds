//Les questions et les reponses possible de test
const quizData = [
    {
        question: "Le jeu préféré de Linus Torvalds lorsqu'il était enfant :",
        answers: {
            a: "Rubik's Cube",
            b: "Le base-bal",
            c: "Tennis de table"
        },
        correctAnswer: "a"
    },
    {
        question: "Linus Torvalds a fait ses études supérieures à :",
        answers: {
            a: "Université de Cambridge",
            b: "Sorbonne",
            c: "Université d'Helsinki"
        },
        correctAnswer: "c"
    },
    {
        question: "Torvalds a téléchargé une version test de Linux 0.01 sur Internet en :",
        answers: {
            a: "1993",
            b: "1991",
            c: "1996"
        },
        correctAnswer: "b"
    },
    {
        question: "La première version stable et commercialement utilisable de Linux 1.0 a été présentée en :",
        answers: {
            a: "1994",
            b: "1998",
            c: "2000"
        },
        correctAnswer: "a"
    },
    {
        question: "Les deux principaux principes de la philosophie des systèmes UNIX mis en œuvre dans Linux 1.0 :",
        answers: {
            a: "Préférer la portabilité à l'efficacité ; Bénéficier des solutions logicielles existantes ;",
            b: "Bénéficier des solutions logicielles existantes ; Chaque fonction a un but unique et fait bien son travail ;",
            c: "Éviter les interfaces utilisateur qui limitent la capacité de l'utilisateur à interagir avec le système ; Tout est un fichier ;",
            d: "Tout est un fichier ; chaque fonction a un but unique et fait bien son travail ;",
            e: "Faire de chaque programme un 'filtre' ; Préférer la portabilité à l'efficacité ;"
        },
        correctAnswer: "d"
    },
    {
        question: "Les principales différences entre Linux et les autres systèmes d'exploitation :",
        answers: {
            a: "Open source",
            b: "Avec mises à jour réglementées",
            c: "Indépendant",
            d: "Fermé",
            e: "Payant",
        },
        correctAnswer: "a"
    },
    {
        question: "Le principal concurrent de Linux :",
        answers: {
            a: "Android",
            b: "Ubuntu",
            c: "Microsoft "
        },
        correctAnswer: "c"
    },
    {
        question: "Linux gagne de l'argent grâce à :",
        answers: {
            a: "Le code source fermé",
            b: "vente de logiciels sur CD",
            c: "La vente de services d'installation de serveurs pour les entreprises, et l'aide au maintien de leur fonctionnement."
        },
        correctAnswer: "c"
    },
    {
        question: "Distributions Linux :",
        answers: {
            a: "Ubuntu,Git,GNOME",
            b: "GNU, GNOME",
            c: "Ubuntu, GNOME, GNU"
        },
        correctAnswer: "c"
    },
    {
        question: "Le principal secret du succès de Linux :",
        answers: {
            a: "Il s'agit d'un système auto-développé qui s'améliore en ligne.",
            b: "Tous les produits sont développés par un petit nombre de programmeurs internes."
        },
        correctAnswer: "a"
    }
];

// Attend que le DOM soit entièrement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
    // Récupère les éléments HTML nécessaires
    const quizContainer = document.getElementById('quiz'); // Conteneur du quiz
    const resultsContainer = document.getElementById('results'); // Conteneur des résultats
    const submitButton = document.getElementById('submit'); // Bouton de soumission
    const memeContainer = document.getElementById('meme'); // Conteneur du mème

    // Fonction pour construire le quiz
    function buildQuiz() {
        const output = [];

        // Parcourt chaque question dans les données du quiz
        quizData.forEach((questionData, questionIndex) => {
            const answers = [];

            // Parcourt chaque réponse possible pour la question donnée
            for (const letter in questionData.answers) {
                // Ajoute chaque réponse sous forme de bouton radio à la liste des réponses
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionIndex}" value="${letter}">
                        ${letter}: ${questionData.answers[letter]}
                    </label>`
                );
            }

            // Ajoute la question et ses réponses à la sortie
            output.push(
                `<div class="question">${questionData.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        });

        // Injecte le quiz dans le conteneur HTML
        quizContainer.innerHTML = output.join('');
    }

    // Fonction pour afficher les résultats du quiz
    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        // Parcourt chaque question dans les données du quiz
        quizData.forEach((questionData, questionIndex) => {
            const answerContainer = answerContainers[questionIndex];
            const selector = `input[name=question${questionIndex}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // Vérifie si la réponse de l'utilisateur est correcte et met à jour le nombre de réponses correctes
            if (userAnswer === questionData.correctAnswer) {
                numCorrect++;
                // Met en évidence la réponse correcte en vert
                answerContainer.querySelectorAll('label').forEach(label => {
                    if (label.querySelector('input').value === questionData.correctAnswer) {
                        label.style.color = 'lightgreen';
                    }
                });
            } else {
                // Si la réponse de l'utilisateur est incorrecte, met en évidence la réponse correcte en vert et la réponse de l'utilisateur en rouge
                answerContainer.querySelectorAll('label').forEach(label => {
                    if (label.querySelector('input').value === questionData.correctAnswer) {
                        label.style.color = 'lightgreen';
                    }
                    if (label.querySelector('input').value === userAnswer) {
                        label.style.color = 'red';
                    }
                });
            }
        });

        // Affiche le nombre de réponses correctes sur le nombre total de questions
        resultsContainer.innerHTML = `${numCorrect} sur ${quizData.length} correctes`;

        // Détermine quelle image de mème afficher en fonction du nombre de réponses correctes
        let imageSrc = '';
        if (numCorrect >= 8) {
            imageSrc = 'img/img_quiz/meme_good.jpg';
        } else if (numCorrect >= 5 && numCorrect < 8) {
            imageSrc = 'img/img_quiz/meme_normal.jpg';
        } else {
            imageSrc = 'img/img_quiz/meme_bad.jpg';
        }

        // Affiche l'image de mème correspondante
        memeContainer.innerHTML = `<img src="${imageSrc}">`;
    }

    // Construit le quiz lorsque la page est chargée
    buildQuiz();

    // Ajoute un écouteur d'événements pour le clic sur le bouton de soumission
    submitButton.addEventListener('click', showResults);
});
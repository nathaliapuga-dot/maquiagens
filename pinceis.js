// Dados contendo as perguntas, opções e respostas do Quiz
const quizData = [
    {
        question: "1. Qual é a principal causa do desperdício de maquiagem pelo consumidor final?",
        options: [
            { text: "Comprar edições limitadas apenas pelo visual da embalagem.", correct: false },
            { text: "O acúmulo por impulso gerado por tendências rápidas, levando ao vencimento dos produtos.", correct: true },
            { text: "Usar a maquiagem todos os dias até o produto acabar.", correct: false }
        ]
    },
    {
        question: "2. Em relação às embalagens, qual alternativa representa uma atitude mais sustentável?",
        options: [
            { text: "Priorizar produtos que possuam sistema de refil e embalagens recicláveis.", correct: true },
            { text: "Comprar maquiagens baratas com embalagens plásticas finas para descartar logo.", correct: false },
            { text: "Escolher marcas de luxo apenas porque as caixas de papelão são maiores e mais bonitas.", correct: false }
        ]
    },
    {
        question: "3. O que define o 'equilíbrio' entre consumo e produção na beleza?",
        options: [
            { text: "A indústria produzir o dobro do que vende para garantir que nunca falte estoque.", correct: false },
            { text: "O consumidor comprar apenas o que consegue utilizar totalmente dentro do prazo de validade, sinalizando menor demanda por excessos.", correct: true },
            { text: "Parar completamente de usar maquiagem e descartar tudo o que já possui.", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Mapeamento dos elementos do DOM
const questionElement = document.getElementById("quiz-question");
const optionsContainer = document.getElementById("quiz-options");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("quiz-result");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    resultElement.innerText = "";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const div = document.createElement("div");
        div.innerText = option.text;
        div.classList.add("quiz-option");
        div.addEventListener("click", () => selectOption(div, option.correct));
        optionsContainer.appendChild(div);
    });
}

function resetState() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(selectedDiv, isCorrect) {
    const allOptions = optionsContainer.children;
    
    // Desabilita cliques adicionais após responder
    for (let opt of allOptions) {
        opt.style.pointerEvents = "none";
    }

    if (isCorrect) {
        selectedDiv.classList.add("correct");
        score++;
    } else {
        selectedDiv.classList.add("incorrect");
        // Destaca qual era a alternativa correta
        for (let i = 0; i < quizData[currentQuestionIndex].options.length; i++) {
            if (quizData[currentQuestionIndex].options[i].correct) {
                allOptions[i].classList.add("correct");
            }
        }
    }

    nextButton.style.display = "block";
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
        nextButton.style.display = "none";
    } else {
        showResult();
    }
}

function showResult() {
    resetState();
    questionElement.innerText = "Quiz Concluído!";
    nextButton.style.display = "none";
    
    let feedbackText = score === quizData.length  
        ? "✨ Parabéns! Você é um(a) consumidor(a) muito consciente!" 
        : "🌿 Bom esforço! Que tal repensar um pouco mais seus hábitos de compra na próxima vez?";

    resultElement.innerHTML = `Você acertou ${score} de ${quizData.length} perguntas.<br><br>${feedbackText}`;
    
    // Cria dinamicamente o botão para reiniciar o quiz
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Refazer Quiz";
    restartBtn.onclick = startQuiz;
    optionsContainer.appendChild(restartBtn);
}

// Inicializa o quiz assim que o arquivo JS é carregado
startQuiz();

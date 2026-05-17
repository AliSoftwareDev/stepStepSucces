const roadContainer = document.getElementById("road");
const stepDisplay = document.getElementById("current-step-num");
const buttons = document.querySelectorAll(".btn-action");
const questionArea = document.getElementById("question-area");
const questionText = document.getElementById("question-text");
const questionLevel = document.getElementById("question-level");
const optionsContainer = document.getElementById("options-container");
const timeLeftDisplay = document.getElementById("time-left");

let allQuestions = [];
let currentStep = 0; 
let selectedOptionIndex = null; 
let timerInterval = null; 
const QUESTION_TIMEOUT = 15; 

async function loadQuestion() {
    try {
        const response = await fetch("step.json");
        if (!response.ok) throw new Error("Sistem yüklenemedi! Dosya Bulunamadı.");

        const data = await response.json();
        allQuestions = data.questions;

        console.log("Veriler Başarıyla Yüklendi");
        init();
    } catch (error) {
        console.error("Hata Oluştu:", error.message);
        alert(error.message);
    }
}

function init() {
    renderRoad();
    setupEventListeners();
}

function renderRoad() {
    roadContainer.innerHTML = ""; 
    let currentRow = null;

    for (let step = 1; step <= 50; step++) {
        if ((step - 1) % 10 === 0) {
            currentRow = document.createElement("div"); 
            currentRow.className = "road-row";
            
            const rowNumber = Math.floor((step - 1) / 10) + 1;
            if (rowNumber % 2 === 0) {
                currentRow.classList.add("reverse");
            }
            roadContainer.appendChild(currentRow);
        }

        const circleElement = document.createElement("div");
        circleElement.className = "circle";
        circleElement.innerText = step;
        circleElement.dataset.id = step; 

        if (currentStep === 0) {
            circleElement.classList.add("pasif");
        } else if (step < currentStep) {
            circleElement.classList.add("completed"); 
        } else if (step === currentStep) {
            circleElement.classList.add("active"); 
        } else {
            circleElement.classList.add("pasif"); 
        }

        if (currentRow) {
            currentRow.appendChild(circleElement);
        }

        if (step % 10 !== 0) {
            const lineElement = document.createElement("div");
            lineElement.className = "road-line";

            if (currentStep > 0 && step < currentStep) {
                lineElement.classList.add("line-active");
            } else {
                lineElement.classList.add("line-pasif");
            }

            if (currentRow) {
                currentRow.appendChild(lineElement);
            }
        }
    }

    stepDisplay.innerText = currentStep === 0 ? "Başlamadı" : currentStep;
}

function setupEventListeners() {
    buttons.forEach(button => {
        const action = button.dataset.action;

        if (action === "next" || action === "finish") {
            button.disabled = currentStep === 0;
        }

        button.addEventListener("click", () => {
            if (action === "start") {
                currentStep = 1;
                toggleButtons(true);
                if (questionArea) questionArea.classList.remove("hidden");
                renderRoad();
                displayCurrentQuestion();
            } 
            else if (action === "next") {
                
                if (selectedOptionIndex === null) {
                    alert("Lütfen önce bir şık seçiniz!");
                    return;
                }

                const questionIndex = (currentStep - 1) % allQuestions.length;
                const currentQuestionData = allQuestions[questionIndex];
                const userChoiceText = currentQuestionData.options[selectedOptionIndex];
                
                const isCorrect = (selectedOptionIndex === currentQuestionData.answer) || (userChoiceText === currentQuestionData.answer);

                if (isCorrect) {
                    stopTimer(); 
                    if (currentStep >= 50) {
                        alert("🎉 Muhteşem! 50 adımlık patikayı tamamladın!");
                        currentStep = 51;
                        if (questionArea) questionArea.classList.add("hidden");
                        toggleButtons(false);
                        renderRoad();
                        return;
                    }
                    currentStep++;
                    renderRoad();
                    displayCurrentQuestion();
                } else {
                    
                    alert("❌ Yanlış Cevap! İlerleme durduruldu. Doğru şıkkı bulana kadar sonraki adıma geçemezsin!");
                }
            } 
            else if (action === "finish") {
                stopTimer();
                currentStep = 0;
                if (questionArea) questionArea.classList.add("hidden");
                toggleButtons(false);
                renderRoad();
            }
        });
    });
}

function displayCurrentQuestion() {
    if (currentStep > 50) return;

    selectedOptionIndex = null; 
    startTimer(); 

    const questionIndex = (currentStep - 1) % allQuestions.length;
    const currentQuestionData = allQuestions[questionIndex];
    
    if (questionLevel && currentQuestionData.level) {
        questionLevel.innerText = `Seviye: ${currentQuestionData.level}`;
    }
    
    if (questionText) {
        questionText.innerText = `${currentStep}. Adım: ${currentQuestionData.text}`;
    }
    
    optionsContainer.innerHTML = ""; 

    currentQuestionData.options.forEach((option, index) => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "option-btn";
        optionBtn.innerText = option;

        
        optionBtn.addEventListener("click", () => {
            
            document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
            
            
            optionBtn.classList.add("selected");
            selectedOptionIndex = index; 
        });

        optionsContainer.appendChild(optionBtn);
    });
}

function startTimer() {
    stopTimer(); 
    
    let timeLeft = QUESTION_TIMEOUT;
    if (timeLeftDisplay) timeLeftDisplay.innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeftDisplay) timeLeftDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            stopTimer();
            handleTimeout();
        }
    }, 1000);
}


function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function handleTimeout() {
    alert("⌛ Süreniz bitti! Bu soruda zaman aşımına uğradınız. Doğru cevabı bulup sonraki adıma geçmelisiniz.");
    // Mentörünün isteğine göre süre bitince ne yapacağını buraya yazabilirsin (Örn: Hak düşürme)
}

function toggleButtons(isPlaying) {
    buttons.forEach(button => {
        const action = button.dataset.action;
        if (action === "start") button.disabled = isPlaying;
        if (action === "next" || action === "finish") button.disabled = !isPlaying;
    });
}

loadQuestion();
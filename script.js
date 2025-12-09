
    // داده‌های آزمون عربی - قابل تنظیم
    const quizData = [
        {
            question: "معنی کلمه «کِتاب» در زبان عربی چیست؟",
            options: [
                "دفتر",
                "کتاب",
                "قلم",
                "مدرسه"
            ],
            correctAnswer: 1,
            explanation: "کلمه «کِتاب» در زبان عربی به معنای «کتاب» است. تلفظ آن در فارسی نیز مشابه است."
        },
        {
            question: "جمع کلمه «مُدَرِّس» (معلم) در عربی کدام است؟",
            options: [
                "مُدَرِّسون",
                "مُدَرِّسات",
                "مُدَرِّسین",
                "مُدَرِّسُون"
            ],
            correctAnswer: 3,
            explanation: "جمع مذکر سالم برای کلمه «مُدَرِّس» به صورت «مُدَرِّسُون» نوشته می‌شود."
        },
        {
            question: "معنای عبارت «اَینَ بَیتُکَ؟» چیست؟",
            options: [
                "اسم تو چیست؟",
                "خانه تو کجاست؟",
                "چند سالت است؟",
                "حالت چطور است؟"
            ],
            correctAnswer: 1,
            explanation: "عبارت «اَینَ بَیتُکَ؟» به معنی «خانه تو کجاست؟» می‌باشد."
        },
        {
            question: "کدام گزینه معادل عربی کلمه «دانش‌آموز» است؟",
            options: [
                "طالِب",
                "اُستاذ",
                "دَکتور",
                "مُهَندِس"
            ],
            correctAnswer: 0,
            explanation: "کلمه «طالِب» معادل عربی «دانش‌آموز» یا «دانشجو» می‌باشد."
        },
        {
            question: "ترجمه صحیح جمله «هذا قَلَمٌ جَدیدٌ» کدام است؟",
            options: [
                "این یک کتاب جدید است",
                "این یک دفتر جدید است",
                "این یک مداد جدید است",
                "این یک مدرسه جدید است"
            ],
            correctAnswer: 2,
            explanation: "جمله «هذا قَلَمٌ جَدیدٌ» به معنی «این یک مداد جدید است» می‌باشد."
        },
        {
            question: "معنی کلمه «مَدْرَسَةٌ» در عربی چیست؟",
            options: [
                "دانشگاه",
                "مدرسه",
                "کتابخانه",
                "بیمارستان"
            ],
            correctAnswer: 1,
            explanation: "کلمه «مَدْرَسَةٌ» به معنای «مدرسه» است."
        },
        {
            question: "مفرد کلمه «کُتُبٌ» کدام است؟",
            options: [
                "کِتابٌ",
                "کُتابٌ",
                "کَتابٌ",
                "کِتابان"
            ],
            correctAnswer: 0,
            explanation: "مفرد «کُتُبٌ» (کتاب‌ها) می‌شود «کِتابٌ» (یک کتاب)."
        },
        {
            question: "ترجمه صحیح «اَنا طالِبٌ» چیست؟",
            options: [
                "من دانش‌آموز هستم",
                "تو دانش‌آموز هستی",
                "او دانش‌آموز است",
                "ما دانش‌آموز هستیم"
            ],
            correctAnswer: 0,
            explanation: "جمله «اَنا طالِبٌ» به معنی «من دانش‌آموز هستم» می‌باشد."
        }
    ];

    // تنظیمات آزمون - قابل تغییر
    const quizConfig = {
        totalQuestions: 5, // تعداد سوالاتی که در هر آزمون نمایش داده می‌شود
        pointsPerQuestion: 20, // امتیاز هر سوال صحیح
        passingScore: 60 // حداقل نمره قبولی
    };

    // متغیرهای حالت آزمون
    let currentQuestion = 0;
    let userAnswers = [];
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let selectedQuestions = []; // آرایه‌ای برای ذخیره سوالات انتخاب شده
    let quizQuestions = []; // سوالات فعلی آزمون

    // عناصر DOM
    const quizContainer = document.getElementById('quizContainer');
    const questionContainer = document.getElementById('questionContainer');
    const questionCounter = document.querySelector('.question-counter');
    const scoreElement = document.getElementById('score');
    const correctCountElement = document.getElementById('correctCount');
    const incorrectCountElement = document.getElementById('incorrectCount');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizSummary = document.getElementById('quizSummary');
    const finalScoreElement = document.getElementById('finalScore');
    const performanceTextElement = document.getElementById('performanceText');
    const answeredCountElement = document.getElementById('answeredCount');
    const finalCorrectCountElement = document.getElementById('finalCorrectCount');
    const finalIncorrectCountElement = document.getElementById('finalIncorrectCount');
    const correctPercentageElement = document.getElementById('correctPercentage');
    const incorrectPercentageElement = document.getElementById('incorrectPercentage');
    const restartQuizBtn = document.getElementById('restartQuizBtn');

    // تابع برای انتخاب تصادفی سوالات از بانک سوالات
    function selectRandomQuestions() {
        // کپی از تمام سوالات
        let allQuestions = [...quizData];
        
        // اگر تعداد سوالات درخواستی بیشتر از موجود باشد، از همه استفاده کن
        const questionsToSelect = Math.min(quizConfig.totalQuestions, allQuestions.length);
        
        // انتخاب تصادفی سوالات
        selectedQuestions = [];
        for (let i = 0; i < questionsToSelect; i++) {
            const randomIndex = Math.floor(Math.random() * allQuestions.length);
            selectedQuestions.push(allQuestions[randomIndex]);
            allQuestions.splice(randomIndex, 1); // حذف سوال انتخاب شده از لیست
        }
        
        return selectedQuestions;
    }

    // تابع برای تنظیم مجدد آزمون
    function resetQuiz() {
        currentQuestion = 0;
        userAnswers = new Array(quizConfig.totalQuestions).fill(null);
        score = 0;
        correctCount = 0;
        incorrectCount = 0;
        
        // انتخاب سوالات تصادفی جدید
        quizQuestions = selectRandomQuestions();
        
        // به‌روزرسانی نمایش
        scoreElement.textContent = score;
        correctCountElement.textContent = correctCount;
        incorrectCountElement.textContent = incorrectCount;
        
        // نمایش بخش آزمون و مخفی کردن نتایج
        quizContainer.style.display = 'block';
        quizSummary.classList.remove('show');
        
        // نمایش اولین سوال
        displayQuestion();
    }

    // تابع برای تغییر تعداد سوالات
    function changeTotalQuestions(newCount) {
        // محدودیت‌ها
        if (newCount < 1) newCount = 1;
        if (newCount > quizData.length) newCount = quizData.length;
        
        quizConfig.totalQuestions = newCount;
        
        // محاسبه امتیاز هر سوال بر اساس تعداد کل سوالات
        quizConfig.pointsPerQuestion = Math.round(100 / newCount);
        
        // شروع مجدد آزمون با تنظیمات جدید
        resetQuiz();
        
        // نمایش پیام
        alert(`تعداد سوالات آزمون به ${newCount} سوال تغییر کرد. هر سوال ${quizConfig.pointsPerQuestion} امتیاز دارد.`);
    }

    // تابع برای اضافه کردن سوال جدید
    function addNewQuestion(question, options, correctAnswerIndex, explanation) {
        const newQuestion = {
            question: question,
            options: options,
            correctAnswer: correctAnswerIndex,
            explanation: explanation
        };
        
        quizData.push(newQuestion);
        return newQuestion;
    }

    // تابع برای نمایش سوال فعلی
    function displayQuestion() {
        // بررسی اینکه آیا سوالی برای نمایش وجود دارد
        if (quizQuestions.length === 0 || currentQuestion >= quizQuestions.length) {
            questionContainer.innerHTML = "<div class='question'>هیچ سوالی برای نمایش وجود ندارد.</div>";
            return;
        }
        
        const questionData = quizQuestions[currentQuestion];
        
        // به‌روزرسانی شمارنده سوال
        questionCounter.textContent = `سوال ${currentQuestion + 1} از ${quizQuestions.length}`;
        
        // ایجاد محتوای سوال
        let questionHTML = `
            <div class="question">${questionData.question}</div>
            <div class="options-container">
        `;
        
        // ایجاد گزینه‌ها
        questionData.options.forEach((option, index) => {
            let optionClass = "option";
            let resultIndicator = "";
            
            // اگر کاربر قبلاً این گزینه را انتخاب کرده
            if (userAnswers[currentQuestion] === index) {
                optionClass += " selected";
                
                // بررسی درست یا غلط بودن گزینه
                if (index === questionData.correctAnswer) {
                    optionClass += " correct";
                    resultIndicator = `<div class="result-indicator correct"><i class="fas fa-check"></i></div>`;
                } else {
                    optionClass += " incorrect";
                    resultIndicator = `<div class="result-indicator incorrect"><i class="fas fa-times"></i></div>`;
                }
            }
            
            // اگر گزینه درست است ولی کاربر انتخاب نکرده
            if (userAnswers[currentQuestion] !== null && index === questionData.correctAnswer) {
                optionClass += " correct";
                if (!resultIndicator) {
                    resultIndicator = `<div class="result-indicator correct"><i class="fas fa-check"></i></div>`;
                }
            }
            
            questionHTML += `
                <div class="${optionClass}" data-index="${index}">
                    ${resultIndicator}
                    <label for="option${currentQuestion}_${index}">${option}</label>
                    <input type="radio" id="option${currentQuestion}_${index}" name="option${currentQuestion}" value="${index}" ${userAnswers[currentQuestion] === index ? 'checked' : ''}>
                </div>
            `;
        });
        
        questionHTML += `</div>`;
        
        // اضافه کردن بخش توضیح اگر پاسخ داده شده
        if (userAnswers[currentQuestion] !== null) {
            questionHTML += `
                <div class="explanation show">
                    <h4><i class="fas fa-lightbulb"></i> توضیح پاسخ:</h4>
                    <p>${questionData.explanation}</p>
                </div>
            `;
        }
        
        // اضافه کردن کنترل‌های مدیریت سوالات (فقط برای توسعه‌دهنده)
        if (window.location.hash === "#admin") {
            questionHTML += `
                <div style="margin-top: 20px; padding: 10px; background: #f0f0f0; border-radius: 5px; font-size: 0.9rem;">
                    <strong>اطلاعات سوال:</strong> سوال ${currentQuestion + 1} از ${quizQuestions.length} | 
                    پاسخ صحیح: گزینه ${questionData.correctAnswer + 1} |
                    <button onclick="removeCurrentQuestion()" style="margin-right: 10px; background: #e74c3c; color: white; border: none; padding: 3px 8px; border-radius: 3px; cursor: pointer;">حذف این سوال</button>
                </div>
            `;
        }
        
        questionContainer.innerHTML = questionHTML;
        
        // اضافه کردن رویداد به گزینه‌ها
        const optionElements = document.querySelectorAll('.option');
        optionElements.forEach(option => {
            option.addEventListener('click', selectOption);
        });
        
        // به‌روزرسانی وضعیت دکمه‌ها
        updateNavigationButtons();
    }

    // تابع برای انتخاب گزینه
    function selectOption(e) {
        // اگر کاربر قبلاً به این سوال پاسخ داده، اجازه تغییر نده
        if (userAnswers[currentQuestion] !== null) return;
        
        const selectedOption = e.currentTarget;
        const optionIndex = parseInt(selectedOption.getAttribute('data-index'));
        
        // ذخیره پاسخ کاربر
        userAnswers[currentQuestion] = optionIndex;
        
        // بررسی درست یا غلط بودن پاسخ
        const isCorrect = optionIndex === quizQuestions[currentQuestion].correctAnswer;
        
        // به‌روزرسانی امتیاز و شمارنده‌ها
        if (isCorrect) {
            score += quizConfig.pointsPerQuestion;
            correctCount++;
        } else {
            incorrectCount++;
        }
        
        // به‌روزرسانی نمایش امتیاز و شمارنده‌ها
        scoreElement.textContent = score;
        correctCountElement.textContent = correctCount;
        incorrectCountElement.textContent = incorrectCount;
        
        // نمایش مجدد سوال با پاسخ
        displayQuestion();
    }

    // تابع برای به‌روزرسانی وضعیت دکمه‌های ناوبری
    function updateNavigationButtons() {
        // دکمه قبلی
        prevBtn.disabled = currentQuestion === 0;
        
        // دکمه بعدی
        nextBtn.disabled = currentQuestion === quizQuestions.length - 1;
        
        // دکمه پایان آزمون
        const answeredQuestions = userAnswers.filter(answer => answer !== null).length;
        finishBtn.disabled = answeredQuestions === 0;
        
        // تغییر متن دکمه پایان بر اساس وضعیت پاسخ‌ها
        if (answeredQuestions === quizQuestions.length) {
            finishBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> مشاهده نتایج';
        } else {
            finishBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> پایان آزمون';
        }
    }

    // تابع برای رفتن به سوال بعدی
    function nextQuestion() {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            displayQuestion();
        }
    }

    // تابع برای رفتن به سوال قبلی
    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion();
        }
    }

    // تابع برای حذف سوال فعلی (فقط برای توسعه)
    function removeCurrentQuestion() {
        if (quizQuestions.length <= 1) {
            alert("حداقل یک سوال باید وجود داشته باشد!");
            return;
        }
        
        // حذف سوال فعلی از آرایه
        quizQuestions.splice(currentQuestion, 1);
        
        // حذف پاسخ کاربر برای این سوال
        userAnswers.splice(currentQuestion, 1);
        
        // اگر سوال حذف شده آخرین سوال بود، به سوال قبلی برو
        if (currentQuestion >= quizQuestions.length) {
            currentQuestion = Math.max(0, quizQuestions.length - 1);
        }
        
        // به‌روزرسانی مجدد شمارنده‌ها
        resetCounters();
        displayQuestion();
        
        alert("سوال با موفقیت حذف شد.");
    }

    // تابع برای بازنشانی شمارنده‌ها
    function resetCounters() {
        score = 0;
        correctCount = 0;
        incorrectCount = 0;
        
        // محاسبه مجدد امتیاز بر اساس پاسخ‌های باقی مانده
        userAnswers.forEach((answer, index) => {
            if (answer !== null) {
                if (answer === quizQuestions[index].correctAnswer) {
                    score += quizConfig.pointsPerQuestion;
                    correctCount++;
                } else {
                    incorrectCount++;
                }
            }
        });
        
        // به‌روزرسانی نمایش
        scoreElement.textContent = score;
        correctCountElement.textContent = correctCount;
        incorrectCountElement.textContent = incorrectCount;
    }

    // تابع برای پایان آزمون و نمایش نتایج
    function finishQuiz() {
        // محاسبه نتایج نهایی
        const answeredCount = userAnswers.filter(answer => answer !== null).length;
        const totalQuestions = quizQuestions.length;
        const correctPercentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
        const incorrectPercentage = 100 - correctPercentage;
        
        // به‌روزرسانی نتایج در صفحه
        finalScoreElement.textContent = score;
        answeredCountElement.textContent = answeredCount;
        finalCorrectCountElement.textContent = correctCount;
        finalIncorrectCountElement.textContent = incorrectCount;
        correctPercentageElement.textContent = correctPercentage;
        incorrectPercentageElement.textContent = incorrectPercentage;
        
        // تعیین متن عملکرد
        let performanceText = "";
        let performanceIcon = "";
        
        if (answeredCount === 0) {
            performanceText = "شما به هیچ سوالی پاسخ نداده‌اید!";
            performanceIcon = "<i class='fas fa-exclamation-circle' style='color:#f39c12;'></i>";
        } else if (score >= quizConfig.passingScore) {
            performanceText = "تبریک! شما در این آزمون قبول شده‌اید.";
            performanceIcon = "<i class='fas fa-crown' style='color:#ffd166;'></i>";
        } else if (score >= quizConfig.passingScore / 2) {
            performanceText = "خوب! نزدیک قبولی هستید، کمی بیشتر تلاش کنید.";
            performanceIcon = "<i class='fas fa-thumbs-up' style='color:#2ecc71;'></i>";
        } else {
            performanceText = "نیاز به تلاش بیشتر دارید. درس‌ها را مرور کنید.";
            performanceIcon = "<i class='fas fa-graduation-cap' style='color:#e74c3c;'></i>";
        }
        
        performanceTextElement.innerHTML = `${performanceIcon} ${performanceText} (نمره قبولی: ${quizConfig.passingScore})`;
        
        // نمایش بخش نتایج و مخفی کردن بخش آزمون
        quizContainer.style.display = 'none';
        quizSummary.classList.add('show');
        
        // اسکرول به بخش نتایج
        quizSummary.scrollIntoView({ behavior: 'smooth' });
    }

    // تابع برای شروع آزمون
    function startQuiz() {
        resetQuiz();
        
        // اسکرول به بخش آزمون
        quizContainer.scrollIntoView({ behavior: 'smooth' });
        
        // نمایش پیام راهنما
        alert(`آزمون شروع شد! ${quizConfig.totalQuestions} سوال تصادفی برای شما انتخاب شده است. هر سوال ${quizConfig.pointsPerQuestion} امتیاز دارد.`);
    }

    // تابع برای بازگشت به صفحه اصلی
    function goToHome() {
        window.location.href = "index.html"; // فرض می‌کنیم صفحه اصلی index.html نام دارد
    }

    // اضافه کردن کنترل‌های مدیریت به صفحه (فقط برای توسعه)
    function addAdminControls() {
        if (window.location.hash !== "#admin") return;
        
        const adminPanel = document.createElement('div');
        adminPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(12, 59, 46, 0.9);
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 300px;
        `;
        
        adminPanel.innerHTML = `
            <h4 style="margin-bottom: 10px; color: #ffd166;">کنترل‌های مدیریت آزمون</h4>
            <div style="margin-bottom: 10px;">
                <label style="display: block; margin-bottom: 5px;">تعداد سوالات:</label>
                <input type="number" id="questionCountInput" value="${quizConfig.totalQuestions}" min="1" max="${quizData.length}" style="width: 60px; padding: 5px; border-radius: 3px; border: none;">
                <button onclick="applyQuestionCount()" style="background: #ffd166; color: #0c3b2e; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 5px; cursor: pointer;">اعمال</button>
            </div>
            <div>
                <button onclick="addSampleQuestion()" style="background: #2ecc71; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; width: 100%; margin-bottom: 5px;">اضافه کردن سوال نمونه</button>
                <button onclick="showQuestionStats()" style="background: #3498db; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; width: 100%;">نمایش آمار</button>
            </div>
        `;
        
        document.body.appendChild(adminPanel);
    }

    // تابع برای اعمال تعداد سوالات جدید
    function applyQuestionCount() {
        const input = document.getElementById('questionCountInput');
        const newCount = parseInt(input.value);
        
        if (isNaN(newCount) || newCount < 1 || newCount > quizData.length) {
            alert(`لطفا عددی بین 1 تا ${quizData.length} وارد کنید.`);
            return;
        }
        
        changeTotalQuestions(newCount);
    }

    // تابع برای اضافه کردن سوال نمونه
    function addSampleQuestion() {
        const sampleQuestion = addNewQuestion(
            "معنی کلمه «قَلَمٌ» چیست؟",
            ["میز", "مداد", "کتاب", "دفتر"],
            1,
            "کلمه «قَلَمٌ» به معنای «مداد» یا «قلم» است."
        );
        
        alert(`سوال نمونه اضافه شد! اکنون ${quizData.length} سوال در بانک سوالات وجود دارد.`);
        
        // اگر در حال آزمون هستیم، می‌توانیم آن را به آزمون فعلی اضافه کنیم
        if (quizQuestions.length < quizConfig.totalQuestions) {
            quizQuestions.push(sampleQuestion);
            userAnswers.push(null);
            displayQuestion();
        }
    }

    // تابع برای نمایش آمار سوالات
    function showQuestionStats() {
        const stats = `
            <strong>آمار بانک سوالات:</strong><br>
            - تعداد کل سوالات: ${quizData.length}<br>
            - سوالات در این آزمون: ${quizQuestions.length}<br>
            - سوالات پاسخ داده شده: ${userAnswers.filter(a => a !== null).length}<br>
            - سوالات پاسخ داده نشده: ${userAnswers.filter(a => a === null).length}<br>
            - نمره فعلی: ${score} از ${quizQuestions.length * quizConfig.pointsPerQuestion}
        `;
        
        alert(stats);
    }

    // تنظیم رویدادها
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    finishBtn.addEventListener('click', finishQuiz);
    startQuizBtn.addEventListener('click', startQuiz);
    restartQuizBtn.addEventListener('click', resetQuiz);

    // شروع اولیه
    resetQuiz();
    
    // اضافه کردن کنترل‌های مدیریت اگر نیاز باشد
    addAdminControls();

    // تغییر وضعیت منوی ناوبری هنگام اسکرول
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.position = 'sticky';
            nav.style.top = '0';
            nav.style.zIndex = '1000';
            nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.position = 'relative';
            nav.style.boxShadow = 'none';
        }
    });

    // اضافه کردن توابع به scope سراسری برای دسترسی از طریق کنسول
    window.changeTotalQuestions = changeTotalQuestions;
    window.addNewQuestion = addNewQuestion;
    window.removeCurrentQuestion = removeCurrentQuestion;
    window.applyQuestionCount = applyQuestionCount;
    window.addSampleQuestion = addSampleQuestion;
    window.showQuestionStats = showQuestionStats;
    
    // راهنمای استفاده برای توسعه‌دهنده
    console.log(`
    ============================================
    راهنمای مدیریت آزمون:
    
    1. تغییر تعداد سوالات: changeTotalQuestions(عدد)
       مثال: changeTotalQuestions(10)
    
    2. اضافه کردن سوال جدید: addNewQuestion(سوال, [گزینه‌ها], شماره‌گزینه‌صحیح, توضیح)
       مثال: addNewQuestion("سوال جدید؟", ["گزینه 1", "گزینه 2", "گزینه 3", "گزینه 4"], 0, "توضیح سوال")
    
    3. حذف سوال جاری: removeCurrentQuestion()
    
    4. برای فعال کردن پنل مدیریت، به آدرس #admin بروید:
       window.location.hash = "#admin"
       سپس صفحه را رفرش کنید.
    ============================================
    `);
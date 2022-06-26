//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_box = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const que_text = document.querySelector(".que_text");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timecount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector(".time_line");
const timeOFF = quiz_box.querySelector(".time_text");

start_btn.onclick = () => {
    info_box.classList.add("activeInfo");//show the info box
}
exit_box.onclick = () => {
    info_box.classList.remove("activeInfo");//hide the info box
}
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.add("activeQuiz");//show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}
let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let widthvalues = 0;
let userscore = 0;
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box")
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    window.location.reload();
}

quit_quiz.onclick = () => {
    window.location.reload();
}

next_btn.onclick = () => {
    console.log(que_count);
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthvalues);
        next_btn.style.opacity = 0;
    } else {
        console.log("Questions compeleted");
        shoeResultBox();
    }


}

//getting questions and options form array
function showQuestions(index) {
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let tickicon = '<div class="icon tick"><i class="fas fa-check"></i>';
let crossicon = '<div class="icon cross"><i class="fas fa-times"></i>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOption = option_list.children.length;

    if (userAns == correctAns) {
        userscore += 1;
        console.log(userscore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeEnd", tickicon);
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeEnd", crossicon);
        //if answers is incorrect then automatically selected the correct answer
        for (let i = 0; i < allOption; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeEnd", tickicon);
            }
        }
    }
    // once user selected dissable all options
    for (let i = 0; i < allOption; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.opacity = 1;
}
function shoeResultBox() {
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.remove("activeQuiz");//hide the quiz box
    result_box.classList.add("activeResult");//show the quiz box result
    const scoreText = result_box.querySelector(".score_text");
    if (userscore > 3) {
        let scoreTag = '<span>and Congrats &#128526;, You got <p>' + userscore + '</p> out of <p>' + questions.length + ' </p></span>';
        scoreText.innerHTML = scoreTag;
    } else if (userscore > 1) {
        let scoreTag = '<span>and nice &#128513;, You got <p>' + userscore + '</p> out of <p>' + questions.length + ' </p></span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>and sorry &#128532;, You got only <p>' + userscore + '</p> out of <p>' + questions.length + ' </p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timecount.textContent = time;
        time--;
        if (time < 9) {
            let addzero = timecount.textContent;
            timecount.textContent = "0" + addzero;
        }
        if (time < 0) {
            clearInterval(counter);
            timecount.textContent = "00";
            timeOFF.textContent = "Time Over";

            let correctAns = questions[que_count].answer;
            let allOption = option_list.children.length;
            for (let i = 0; i < allOption; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    //option_list.children[i].insertAjacentmentHTML("beforend",tickicon);
                }
            }
            // once user selected dissable all options
            for (let i = 0; i < allOption; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.opacity = 1;
        }
    }
}
function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}


function queCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

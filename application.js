$(document).ready(function() {
	resetQuiz();
});

var resetQuiz = function() {
	responseArray = [];
	questionCount = 0;
	finishedQuiz = false; 

	questions = [{ 
		q: "What is the capital of the US?", 
		choices: ["Washington DC", "NYC", "Silicon Valley"], 
		correct: 0
	}, {
		q: "What is the capital of China?", 
		choices: ["Beijing", "NYC", "Silicon Valley"], 
		correct: 0
	}, {
		q: "What is the capital of the Canada?", 
		choices: ["Ottawa", "NYC", "Silicon Valley"], 
		correct: 0
	}, {
		q: "What is the capital of the Mexico?", 
		choices: ["Mexico City", "NYC", "Silicon Valley"], 
		correct: 0
	}];

	q1 = questions[0];
	q2 = questions[1];
	q3 = questions[2];
	q4 = questions[3];

	answerKey = [q1.correct, q2.correct, q3.correct, q4.correct];

	loadQuestion();
}

var storeAnswer = function() {		
	var selected = $("input[name='choice']:checked"); //Q why if move out of function, doesn't work
	if (selected.length) {
		responseArray.push(parseInt(selected.val())); //parseInt(string) => integer
		questionCount++; //move to storeAnswer function?
		$('.radio').removeAttr('checked'); //clear answers from prior question
	 } else {
		 alert("You haven't selected an answer!");
	 }
}

var loadQuestion = function() {
	if (questionCount < questions.length) {
		// questionCount++; //move to storeAnswer function? Q: why if this is here that it goes infinite
		$('#question_text').text('(Question ' + (questionCount + 1) + ' of ' + questions.length + '): ' + questions[questionCount].q); //load question text
		$("label[for='choice0']").text(questions[questionCount].choices[0]); //load answer choices
		$("label[for='choice1']").text(questions[questionCount].choices[1]);
		$("label[for='choice2']").text(questions[questionCount].choices[2]);
	} else {
		alert("End of quiz! Check your answers!");
		finishedQuiz = true;
		addAnswerButton();
		addResetButton();
	}
}

var addAnswerButton = function() {
	var answerButton = $('<input type="button" name="submit" value="Check Answers" class="dynamic" id="check_answer" />');
	$('#answer_choices').append(answerButton);
}

var checkAnswer = function() {
	var correctAnswers = 0;
	for (var i = 0; i < responseArray.length; i++) {
		if (responseArray[i] === answerKey[i]) {
			correctAnswers++;
		}
	}
	alert('Congrats! You got ' + correctAnswers + ' correct answers!');
}

var addResetButton = function() {
	var resetButton = $('<input type="button" name="submit" value="Reset Quiz" class="dynamic" id="reset_quiz" />');
	$('#answer_choices').append(resetButton);
}

$('#submit_answer').on('click', function() { //rolls over array if use submit button
	if (!finishedQuiz) { 
		storeAnswer();
		loadQuestion(); 
		// return false;
		// event.preventDefault(); // Prevent the default form behaviour -- why does this work
	} else {
		alert("Reset the quiz!");
	}
	return false; // Prevent the default form behaviour 
});

$('#answer_choices').on('click', '#check_answer', function() {
	checkAnswer();
});

$('#answer_choices').on('click', '#reset_quiz', function() {
	resetQuiz();
});


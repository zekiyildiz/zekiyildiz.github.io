var names = ["Ben", "Joel", "Judy", "Anne"];
var scores = [88, 98, 77, 88];

var $ = function (id) { return document.getElementById(id); };



window.onload = function () {
	$("display_results").onclick = displayResults;
	$("display_scores").onclick = displayScores;
	$("add").onclick = addScore;
	$("name").focus();
	
	
};


function addScore() {
	const name = $("name").value;
	const score = parseFloat($("score").value); // <-- fix burada

	if (name === "" || isNaN(score)) {
		alert("Please fill in both fields!");
		return;
	}
	if (score < 0 || score > 100) {
		alert("You must enter a name and a valid score.");
		return;
	}

	names.push(name);
	scores.push(score);

	$("name").value = "";
	$("score").value = "";
	$("name").focus();
}


document.getElementById("add").addEventListener("click", addScore);




function displayResults()
{
	var average = 0;
	var max = 0;
	var maxPerson;
	var sum =0;
	for(var i=0;i<scores.length;i++)
	{
		if(scores[i] > max){
			max = scores[i];
			maxPerson = names[i];
		}
		//average= (average*(i)+scores[i])/(i+1);
		sum += scores[i];
	}

	average = sum / names.length;

	document.getElementById("results").innerHTML="<h2> Results </h2><br /> Average score is "+average + "<br \>" +
		"<br /> High score = " + maxPerson+ " with a score of "+max+"<br \> "

}
function displayScores() {
	let str = "<h2>Scores</h2>";
	str += "<table>";
	str += "<tr><th style='text-align: left; width: 100px;'>Name</th><th style='text-align: left; width: 80px;'>Score</th></tr>";

	for (let i = 0; i < names.length; i++) {
		str += `<tr><td>${names[i]}</td><td style='text-align: left;'>${scores[i]}</td></tr>`;
	}

	str += "</table>";
	document.getElementById("scores_table").innerHTML = str;
}




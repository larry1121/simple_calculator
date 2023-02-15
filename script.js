const historyValueEl = document.getElementById("history-value");
const outputValueEl = document.getElementById("output-value");

function getHistory() {
	return historyValueEl.innerText;
}

function printHistory(num) {
	historyValueEl.innerText = num;
}

function getOutput() {
	return outputValueEl.innerText;
}

function printOutput(num) {
	outputValueEl.innerText = num === "" ? num : getFormattedNumber(num);
}

function getFormattedNumber(num) {
	if (num === "-") {
		return "";
	}
	const n = Number(num);
	return n.toLocaleString("en");
}

function reverseNumberFormat(num) {
	return Number(num.replace(/,/g, ""));
}

document.addEventListener("click", (event) => {
	const target = event.target;
	if (target.classList.contains("operator")) {
		handleOperatorClick(target.id);
	} else if (target.classList.contains("number")) {
		handleNumberClick(target.id);
	}
});

function handleOperatorClick(operatorId) {
	if (operatorId === "clear") {
		printHistory("");
		printOutput("");
	} else if (operatorId === "backspace") {
		const output = reverseNumberFormat(getOutput()).toString();
		if (output) {
			const newOutput = output.substr(0, output.length - 1);
			printOutput(newOutput);
		}
	} else {
		const output = getOutput();
		const history = getHistory();
		if (output !== "" || history !== "") {
			const num = output === "" ? output : reverseNumberFormat(output);
			let newHistory = history + num;
			if (operatorId === "=") {
				const result = eval(newHistory);
				printOutput(result);
				printHistory("");
			} else {
				newHistory += operatorId;
				printHistory(newHistory);
				printOutput("");
			}
		}
	}
}

function handleNumberClick(numberId) {
	const output = reverseNumberFormat(getOutput());
	if (!isNaN(output)) {
		const newOutput = output + numberId;
		printOutput(newOutput);
	}
}

const startButton = document.querySelector(".start-button");
const firstScreen = document.querySelector("#first-screen");
const secondScreen = document.querySelector("#second-screen");
const backHomeButton = document.querySelector(".back-home-button");

function lockInstructionScreen() {
	document.body.classList.add("instruction-lock");
}

function unlockInstructionScreen() {
	document.body.classList.remove("instruction-lock");
}

if (startButton && secondScreen) {
	if (window.location.hash !== "#second-screen") {
		document.body.classList.add("pre-start-lock");
		unlockInstructionScreen();
		window.scrollTo(0, 0);
	} else {
		document.body.classList.remove("pre-start-lock");
		window.setTimeout(lockInstructionScreen, 120);
	}

	startButton.addEventListener("click", function (event) {
		event.preventDefault();
		document.body.classList.remove("pre-start-lock");
		secondScreen.scrollIntoView({ behavior: "smooth", block: "start" });
		window.setTimeout(lockInstructionScreen, 720);
	});
}

if (backHomeButton && firstScreen) {
	backHomeButton.addEventListener("click", function (event) {
		event.preventDefault();
		unlockInstructionScreen();
		firstScreen.scrollIntoView({ behavior: "smooth", block: "start" });
		window.setTimeout(function () {
			document.body.classList.add("pre-start-lock");
		}, 720);
	});
}

const gameButton = document.querySelector(".game-button");

if (gameButton) {
	gameButton.addEventListener("click", function (event) {
		event.preventDefault();

		const targetUrl = gameButton.getAttribute("href") || "game.html";
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (prefersReducedMotion) {
			window.location.href = targetUrl;
			return;
		}

		if (document.body.classList.contains("to-game")) {
			return;
		}

		document.body.classList.add("to-game");
		window.setTimeout(function () {
			window.location.href = targetUrl;
		}, 700);
	});
}

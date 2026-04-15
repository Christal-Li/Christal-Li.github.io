const startButton = document.querySelector(".start-button");
const firstScreen = document.querySelector("#first-screen");
const secondScreen = document.querySelector("#second-screen");
const backHomeButton = document.querySelector(".back-home-button");
const infoButton = document.querySelector(".info-button");
const infoPopup = document.querySelector("#info-popup");

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

if (infoButton && infoPopup) {
	const popupCloseTargets = infoPopup.querySelectorAll("[data-info-close]");

	function openInfoPopup() {
		infoPopup.hidden = false;
		window.requestAnimationFrame(function () {
			infoPopup.classList.add("is-open");
		});
		infoButton.setAttribute("aria-expanded", "true");
		document.body.classList.add("info-open");
	}

	function closeInfoPopup() {
		infoPopup.classList.remove("is-open");
		infoButton.setAttribute("aria-expanded", "false");
		document.body.classList.remove("info-open");

		window.setTimeout(function () {
			if (!infoPopup.classList.contains("is-open")) {
				infoPopup.hidden = true;
			}
		}, 240);
	}

	infoButton.addEventListener("click", function () {
		if (infoPopup.hidden) {
			openInfoPopup();
			return;
		}

		closeInfoPopup();
	});

	popupCloseTargets.forEach(function (target) {
		target.addEventListener("click", closeInfoPopup);
	});

	window.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && !infoPopup.hidden) {
			closeInfoPopup();
		}
	});
}

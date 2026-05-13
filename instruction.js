const gameButton = document.querySelector(".game-button");
const backHomeButton = document.querySelector(".back-home-button");

if (backHomeButton) {
	backHomeButton.addEventListener("click", function (event) {
		event.preventDefault();

		const targetUrl = backHomeButton.getAttribute("href") || "index.html";
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (prefersReducedMotion) {
			window.location.href = targetUrl;
			return;
		}

		if (document.body.classList.contains("to-index")) {
			return;
		}

		document.body.classList.add("to-index");
		window.setTimeout(function () {
			window.location.href = targetUrl;
		}, 700);
	});
}

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

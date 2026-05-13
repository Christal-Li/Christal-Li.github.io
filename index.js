const startButton = document.querySelector(".start-button");
const infoButton = document.querySelector(".info-button");
const infoPopup = document.querySelector("#info-popup");

if (startButton) {
	startButton.addEventListener("click", function (event) {
		event.preventDefault();

		const targetUrl = startButton.getAttribute("href") || "instruction.html";
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

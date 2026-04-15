const ENDING_STORAGE_KEY = "littleRedCollectedEndings";
const endingCatalog = [
	"Ending - Legacy of the Red Hood",
	"Ending - Iron Trail Hunter",
	"Ending - Hard-Won Dawn",
	"Ending - Lesson in the Dark",
];

const endingData = {
	"Ending - Legacy of the Red Hood": {
		title: "Ending - Legacy of the Red Hood",
		text: "You and Grandmother move as one team. The wolf is fully restrained and dragged outside before it can recover. Grandmother smiles, tired but proud: \"You did not borrow my strength. You grew your own.\" The red hood becomes a symbol of your shared legacy.",
		image: "pic/ending1.png",
	},
	"Ending - Iron Trail Hunter": {
		title: "Ending - Iron Trail Hunter",
		text: "Your physical training carries the fight. The wolf is beaten back and forced to flee injured. Grandmother squeezes your shoulder and laughs softly: \"That discipline saved us. Next, sharpen your eyes to match your power.\"",
		image: "pic/ending2.png",
	},
	"Ending - Hard-Won Dawn": {
		title: "Ending - Hard-Won Dawn",
		text: "You free Grandmother after a rough struggle. The wolf escapes into the pines, but both of you survive. Grandmother wraps the hood tighter around you: \"You stood up today. Keep training body and mind together.\"",
		image: "pic/ending3.png",
	},
	"Ending - Lesson in the Dark": {
		title: "Ending - Lesson in the Dark",
		text: "The rescue succeeds too late and with heavy cost. Grandmother, still gentle, holds your shaking hand: \"This is not your end, Red. We train again at sunrise.\" Her kindness keeps your resolve alive.",
		image: "pic/ending4.png",
	},
};

let collectedEndings = loadCollectedEndings();

const endingTitle = document.getElementById("endingTitle");
const endingText = document.getElementById("endingText");
const endingImage = document.getElementById("endingImage");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");
const collectionBtn = document.getElementById("collectionBtn");
const endingModal = document.getElementById("endingModal");
const resetCollectionBtn = document.getElementById("resetCollectionBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const endingCollectionCount = document.getElementById("endingCollectionCount");
const endingCollectionList = document.getElementById("endingCollectionList");

function loadCollectedEndings() {
	try {
		const raw = localStorage.getItem(ENDING_STORAGE_KEY);
		if (!raw) {
			return [];
		}

		const parsed = JSON.parse(raw);
		if (Array.isArray(parsed)) {
			return parsed.filter((ending) => endingCatalog.includes(ending));
		}
	} catch (error) {
		console.error("Failed to load ending collection", error);
	}

	return [];
}

function saveCollectedEndings() {
	localStorage.setItem(ENDING_STORAGE_KEY, JSON.stringify(collectedEndings));
}

function unlockEnding(title) {
	if (!collectedEndings.includes(title)) {
		collectedEndings.push(title);
		saveCollectedEndings();
	}

	renderEndingCollection();
}

function renderEndingCollection() {
	const unlockedCount = collectedEndings.length;
	endingCollectionCount.textContent = `${unlockedCount} / ${endingCatalog.length} unlocked`;
	collectionBtn.textContent = `Ending Collection (${unlockedCount}/${endingCatalog.length})`;

	endingCollectionList.innerHTML = "";
	endingCatalog.forEach((title) => {
		const item = document.createElement("li");
		if (collectedEndings.includes(title)) {
			const jumpButton = document.createElement("button");
			jumpButton.type = "button";
			jumpButton.className = "ending-link-btn";
			jumpButton.textContent = `Unlocked: ${title}`;
			jumpButton.addEventListener("click", () => {
				closeEndingModal();
				loadEndingContent(title);
			});
			item.appendChild(jumpButton);
		} else {
			item.className = "locked";
			item.textContent = "Locked ending: ???";
		}
		endingCollectionList.appendChild(item);
	});
}

function openEndingModal() {
	renderEndingCollection();
	endingModal.hidden = false;
	closeModalBtn.focus();
}

function closeEndingModal() {
	endingModal.hidden = true;
	collectionBtn.focus();
}

function resetEndingCollection() {
	const shouldReset = window.confirm("Reset ending collection? This will clear all unlocked endings and return to the locked state.");
	if (!shouldReset) {
		return;
	}

	collectedEndings = [];
	localStorage.removeItem(ENDING_STORAGE_KEY);
	renderEndingCollection();
	endingModal.hidden = true;
	collectionBtn.focus();
}

// Load ending data from sessionStorage or from collection click
function loadEndingData() {
	const endingDataStorage = sessionStorage.getItem("endingData");
	if (endingDataStorage) {
		try {
			const ending = JSON.parse(endingDataStorage);
			loadEndingContent(ending.title);
			sessionStorage.removeItem("endingData");
			unlockEnding(ending.title);
			return;
		} catch (error) {
			console.error("Failed to load ending data", error);
		}
	}

	// Fallback: avoid blank page when entering ending.html without sessionStorage.
	if (collectedEndings.length > 0) {
		const latestUnlockedEnding = collectedEndings[collectedEndings.length - 1];
		loadEndingContent(latestUnlockedEnding);
	}
}

function loadEndingContent(title) {
	const ending = endingData[title];
	if (ending) {
		endingTitle.textContent = ending.title;
		endingText.textContent = ending.text;
		endingImage.src = ending.image;
		endingImage.alt = ending.title;
	}
}

// Event listeners
if (restartBtn) {
	restartBtn.addEventListener("click", function () {
		window.location.href = "game.html";
	});
}

if (homeBtn) {
	homeBtn.addEventListener("click", function () {
		window.location.href = "index.html";
	});
}

if (collectionBtn) {
	collectionBtn.addEventListener("click", openEndingModal);
}

if (closeModalBtn) {
	closeModalBtn.addEventListener("click", closeEndingModal);
}

if (resetCollectionBtn) {
	resetCollectionBtn.addEventListener("click", resetEndingCollection);
}

if (endingModal) {
	endingModal.addEventListener("click", (event) => {
		if (event.target.dataset.closeModal === "true") {
			closeEndingModal();
		}
	});
}

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && !endingModal.hidden) {
		closeEndingModal();
	}
});

// Load ending data on page load
loadEndingData();
renderEndingCollection();


const initialState = {
	confidence: 2,
	observation: 2,
	training: 2,
	bond: 2,
};

const ENDING_STORAGE_KEY = "littleRedCollectedEndings";
const endingCatalog = [
	"Ending - Legacy of the Red Hood",
	"Ending - Iron Trail Hunter",
	"Ending - Hard-Won Dawn",
	"Ending - Lesson in the Dark",
];

let collectedEndings = loadCollectedEndings();

const scenes = {
	gift: {
		title: "Chapter 1 - Grandmother's Gift",
		text: "Before sunrise, Grandmother wraps a deep-red hood around your shoulders. Her palms are rough from years of hunting, but gentle as warm wool. \"The forest does not fear you, Red. So do not fear it. Fear the voices that try to make you smaller than you are.\"",
		choices: [
			{
				text: "Nod and repeat her words. You carry them like a rhythm in your chest.",
				effects: { confidence: 1, bond: 1 },
				next: "training",
			},
			{
				text: "Ask her to tell you one more hunting lesson before you go.",
				effects: { observation: 1, bond: 1 },
				next: "training",
			},
			{
				text: "Rush to leave early, thinking speed matters most.",
				effects: { bond: -1 },
				next: "training",
			},
		],
	},
	training: {
		title: "Chapter 2 - Body Training Routine",
		text: "On the edge of the trees, you remember your years with Grandmother: hill sprints, log carries, balance drills on wet stones. \"Strength is kindness to your future self,\" she always said with a grin.",
		choices: [
			{
				text: "Hard training: sprint uphill with weighted packs before departure.",
				effects: { training: 2, confidence: 1 },
				next: "departure",
			},
			{
				text: "Balanced training: run, stretch, and breathing drills.",
				effects: { training: 1, observation: 1, confidence: 1 },
				next: "departure",
			},
			{
				text: "Skip warmup and save all energy for the road.",
				effects: { training: -1, confidence: -1 },
				next: "departure",
			},
		],
	},
	departure: {
		title: "Chapter 3 - Into the Forest",
		text: "Grandmother is ill, so you carry food alone. This route has been your classroom for ten years. Fern patterns, bird silence, bent grass, damp wind from the north. The forest knows your footsteps.",
		choices: [
			{
				text: "Move at a controlled pace and check trail signs every few minutes.",
				effects: { observation: 2 },
				next: "wolf",
			},
			{
				text: "Power-walk with your training rhythm and keep posture steady.",
				effects: { training: 1, confidence: 1 },
				next: "wolf",
			},
			{
				text: "Take a shortcut through unfamiliar brush to gain time.",
				effects: { observation: -1, confidence: -1 },
				next: "wolf",
			},
		],
	},
	wolf: {
		title: "Chapter 4 - The Wolf's Voice",
		text: "A giant wolf blocks the path, eyes bright with calculation. \"A small girl all alone? Are you sure your strength is real, or just a story your grandmother told you?\" Its words push against your mind more than your body.",
		choices: [
			{
				text: "Stay calm, answer once, and step around without giving more attention.",
				effects: { confidence: 1, observation: 1 },
				next: "cabin",
			},
			{
				text: "Use strong stance and controlled breath from training to resist the pressure.",
				effects: { confidence: 1, training: 1 },
				next: "cabin",
			},
			{
				text: "Argue with the wolf until your focus begins to shake.",
				effects: { confidence: -2 },
				next: "cabin",
			},
		],
	},
	cabin: {
		title: "Chapter 5 - Silent Signal at the Cabin",
		text: "You arrive. The door is ajar. Through the curtain gap: Grandmother tied to a chair, still upright and fierce. Her eyes soften the moment she sees you. With one finger she draws a tiny arrow on her knee toward the stove-side cabinet.",
		choices: [
			{
				text: "Observe first: count the wolf's patrol steps and read her signal precisely.",
				effects: { observation: 2, bond: 1 },
				next: "plan",
			},
			{
				text: "Whisper from the back wall to reassure her before moving in.",
				effects: { confidence: 1, bond: 2 },
				next: "plan",
			},
			{
				text: "Rush the front entrance and trust raw power.",
				effects: { training: 1, observation: -2 },
				next: "plan",
			},
		],
	},
	plan: {
		title: "Chapter 6 - Build the Plan",
		text: "You enter from the rear window and open the cabinet: rope, old hunting hooks, and a jar of eye-stinging herb powder. Grandmother had prepared for worst cases for years. In the dark, your pulse steadies.",
		choices: [
			{
				text: "Set a decoy noise outside, then trap route and powder strike.",
				effects: { observation: 1, confidence: 1 },
				next: "attack",
			},
			{
				text: "Use your training: close distance fast, then bind with rope leverage.",
				effects: { training: 2 },
				next: "attack",
			},
			{
				text: "Pause and listen for Grandmother's breathing pattern to time your move.",
				effects: { bond: 1, observation: 1 },
				next: "attack",
			},
		],
	},
	attack: {
		title: "Chapter 7 - Strike and Rescue",
		text: "You kick over a bucket outside. The wolf turns. You move. Powder bursts into its eyes, rope snaps tight around its legs, and the room erupts in claws and wood splinters. Grandmother's voice cuts through the chaos: \"Steady, Red. You already know how.\"",
		choices: [
			{
				text: "Keep pressure with trained footwork until the wolf collapses.",
				effects: { training: 1, confidence: 1 },
				next: "resolve",
			},
			{
				text: "Adjust rope knots twice to secure it before it adapts.",
				effects: { observation: 1, confidence: 1 },
				next: "resolve",
			},
			{
				text: "Free Grandmother first, trusting her to cover the final move with you.",
				effects: { bond: 2, confidence: 1 },
				next: "resolve",
			},
		],
	},
};

const endingByScore = (state) => {
	const total = state.confidence + state.observation + state.training + state.bond;

	if (
		state.confidence >= 4 &&
		state.observation >= 4 &&
		state.training >= 4 &&
		state.bond >= 4
	) {
		return {
			title: "Ending - Legacy of the Red Hood",
			text: "You and Grandmother move as one team. The wolf is fully restrained and dragged outside before it can recover. Grandmother smiles, tired but proud: \"You did not borrow my strength. You grew your own.\" The red hood becomes a symbol of your shared legacy.",
		};
	}

	if (state.training >= 6 && total >= 16) {
		return {
			title: "Ending - Iron Trail Hunter",
			text: "Your physical training carries the fight. The wolf is beaten back and forced to flee injured. Grandmother squeezes your shoulder and laughs softly: \"That discipline saved us. Next, sharpen your eyes to match your power.\"",
		};
	}

	if (total >= 12) {
		return {
			title: "Ending - Hard-Won Dawn",
			text: "You free Grandmother after a rough struggle. The wolf escapes into the pines, but both of you survive. Grandmother wraps the hood tighter around you: \"You stood up today. Keep training body and mind together.\"",
		};
	}

	return {
		title: "Ending - Lesson in the Dark",
		text: "The rescue succeeds too late and with heavy cost. Grandmother, still gentle, holds your shaking hand: \"This is not your end, Red. We train again at sunrise.\" Her kindness keeps your resolve alive.",
	};
};

let state = { ...initialState };
let currentSceneId = "gift";

const confidenceStat = document.getElementById("confidenceStat");
const observationStat = document.getElementById("observationStat");
const trainingStat = document.getElementById("trainingStat");
const bondStat = document.getElementById("bondStat");
const sceneTitle = document.getElementById("sceneTitle");
const sceneText = document.getElementById("sceneText");
const choiceList = document.getElementById("choiceList");
const restartBtn = document.getElementById("restartBtn");
const backBtn = document.querySelector(".back-btn");
const collectionBtn = document.getElementById("collectionBtn");
const endingModal = document.getElementById("endingModal");
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
				sessionStorage.setItem("endingData", JSON.stringify({
					title,
				}));
				window.location.href = "ending.html";
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

function clampValue(value) {
	return Math.max(0, Math.min(value, 8));
}

function applyEffects(effects = {}) {
	state.confidence = clampValue(state.confidence + (effects.confidence || 0));
	state.observation = clampValue(state.observation + (effects.observation || 0));
	state.training = clampValue(state.training + (effects.training || 0));
	state.bond = clampValue(state.bond + (effects.bond || 0));
}

function renderStats() {
	confidenceStat.textContent = `Confidence: ${state.confidence}`;
	observationStat.textContent = `Observation: ${state.observation}`;
	trainingStat.textContent = `Training Intensity: ${state.training}`;
	bondStat.textContent = `Grandma Bond: ${state.bond}`;
}

function renderScene(scene) {
	sceneTitle.textContent = scene.title;
	sceneText.textContent = scene.text;
	choiceList.innerHTML = "";

	scene.choices.forEach((choice) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "choice-btn";
		button.textContent = choice.text;
		button.addEventListener("click", () => {
			applyEffects(choice.effects);
			renderStats();

			if (choice.next === "resolve") {
				showEnding();
				return;
			}

			currentSceneId = choice.next;
			renderCurrentScene();
		});
		choiceList.appendChild(button);
	});
}

function showEnding() {
	const ending = endingByScore(state);
	unlockEnding(ending.title);
	
	// Store ending data in sessionStorage for ending.html to retrieve
	sessionStorage.setItem("endingData", JSON.stringify({
		title: ending.title,
		text: ending.text
	}));
	
	// Redirect to ending page
	window.location.href = "ending.html";
}

function renderCurrentScene() {
	restartBtn.hidden = true;
	renderScene(scenes[currentSceneId]);
}

function restartGame() {
	state = { ...initialState };
	currentSceneId = "gift";
	renderStats();
	renderCurrentScene();
}

restartBtn.addEventListener("click", restartGame);

if (backBtn) {
	backBtn.addEventListener("click", (event) => {
		event.preventDefault();
		const shouldLeave = window.confirm(
			"Returning now will not save your current game progress. Do you want to continue?"
		);

		if (shouldLeave) {
			window.location.href = "index.html";
		}
	});
}

collectionBtn.addEventListener("click", openEndingModal);
closeModalBtn.addEventListener("click", closeEndingModal);
endingModal.addEventListener("click", (event) => {
	if (event.target.dataset.closeModal === "true") {
		closeEndingModal();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && !endingModal.hidden) {
		closeEndingModal();
	}
});

restartGame();
renderEndingCollection();


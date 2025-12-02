const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

// === SPIELZUSTAND ======================================

const questions = [
  // 20 Fragen zu International Assignments
  {
    text: "Was ist ein typisches Ziel eines International Assignments?",
    options: [
      "Urlaub für Mitarbeitende ermöglichen",
      "Know-how und Unternehmenswerte in neue Märkte bringen",
      "Büromieten im Heimatland sparen",
      "Mitarbeitende für schlechtes Verhalten bestrafen",
    ],
    correctIndex: 1,
  },
  {
    text: "Welche Phase beschreibt man typischerweise im Kultur-Schock-Modell?",
    options: [
      "Euphorie, Kulturschock, Anpassung",
      "Wut, Trauer, Verleugnung",
      "Analyse, Planung, Umsetzung",
      "Training, Assessment, Feedback",
    ],
    correctIndex: 0,
  },
  {
    text: "Was ist für eine gute Vorbereitung auf ein Auslandsassignment besonders wichtig?",
    options: [
      "Nur technische Schulungen im Fachgebiet",
      "Interkulturelles Training und Informationen zum Gastland",
      "Keine Informationen, damit alles ‚frisch‘ erlebt wird",
      "Ausschließlich Sprachtraining",
    ],
    correctIndex: 1,
  },
  {
    text: "Was versteht man unter ‚Repatriation‘ im Kontext von International Assignments?",
    options: [
      "Die Auswahl eines Expatriates",
      "Die Rückkehr und Reintegration nach dem Auslandseinsatz",
      "Die Beantragung eines Visums",
      "Die Suche nach Schulen im Gastland",
    ],
    correctIndex: 1,
  },
  {
    text: "Welcher Faktor ist ein typischer Erfolgsfaktor für ein Assignment?",
    options: [
      "Unklare Zieldefinition",
      "Keine Einbindung der Familie",
      "Starke Unterstützung durch HR und Führungskraft",
      "Keine Kontaktaufnahme zur Heimatorganisation",
    ],
    correctIndex: 2,
  },
  {
    text: "Was ist ein Risiko bei schlecht gemanagten International Assignments?",
    options: [
      "Höhere Identifikation mit dem Unternehmen",
      "Geringe Kosten",
      "Erhöhte Fluktuation nach der Rückkehr",
      "Verbessertes Employer Branding",
    ],
    correctIndex: 2,
  },
  {
    text: "Welche Rolle spielt die Partner:in/Familie bei einem Assignment?",
    options: [
      "Keine, da es ein rein berufliches Thema ist",
      "Sie ist oft entscheidend für das Gelingen oder Scheitern",
      "Nur bei sehr langen Assignments relevant",
      "Nur bei Assignments in gefährliche Länder relevant",
    ],
    correctIndex: 1,
  },
  {
    text: "Was gehört typischerweise zu den Leistungen eines Expatriate-Pakets?",
    options: [
      "Nur das reguläre Gehalt",
      "Gehalt, Auslandszulagen, Unterkunfts-/Schulzuschüsse",
      "Nur ein einmaliger Bonus",
      "Nur ein Firmenwagen im Heimatland",
    ],
    correctIndex: 1,
  },
  {
    text: "Welche Kompetenz ist für Führungskräfte im Ausland besonders wichtig?",
    options: [
      "Nur Fachwissen",
      "Interkulturelle Sensibilität und Anpassungsfähigkeit",
      "Strikte Durchsetzung der Heimatkultur",
      "Alle Entscheidungen alleine zu treffen",
    ],
    correctIndex: 1,
  },
  {
    text: "Was ist ein sinnvolles Ziel-Nachgespräch nach einem Assignment?",
    options: [
      "Keine Nachbereitung, die Person soll direkt weitermachen",
      "Sammeln von Lernerfahrungen und Transfer ins Unternehmen",
      "Nur Kritik an Fehlentscheidungen",
      "Nur Rückgabe von Arbeitsmitteln",
    ],
    correctIndex: 1,
  },
  {
    text: "Was beschreibt ein Short-Term Assignment?",
    options: [
      "Einsatz von wenigen Wochen bis zu ca. 3 Monaten",
      "Einsatz von mindestens 10 Jahren",
      "Ein rein virtuelles Assignment ohne Reisen",
      "Ein Jobwechsel innerhalb desselben Standorts",
    ],
    correctIndex: 0,
  },
  {
    text: "Welcher Aspekt ist für die Auswahl von Expatriates wichtig?",
    options: [
      "Nur die aktuelle Gehaltsstufe",
      "Nur die Betriebszugehörigkeit",
      "Fachliche + persönliche + interkulturelle Eignung",
      "Nur Sprachzertifikate",
    ],
    correctIndex: 2,
  },
  {
    text: "Was versteht man unter 'Dual Career' im Expat-Kontext?",
    options: [
      "Zwei Verträge für eine Person",
      "Wenn auch die Partner:in eine berufliche Perspektive braucht",
      "Zwei Auslandsaufenthalte hintereinander",
      "Zwei Gehälter vom selben Arbeitgeber",
    ],
    correctIndex: 1,
  },
  {
    text: "Welches Instrument unterstützt die kulturelle Vorbereitung?",
    options: [
      "Nur technische Produktschulung",
      "Interkulturelles Training und Länderbriefing",
      "Ausschließlich E-Learning zu Compliance",
      "Nur ein Welcome-Dinner",
    ],
    correctIndex: 1,
  },
  {
    text: "Was ist häufig eine Herausforderung bei der Rückkehr (Repatriation)?",
    options: [
      "Zu viel Urlaub",
      "Unterforderung oder unklare Rolle im Heimatland",
      "Zu wenig Kontakte im Ausland",
      "Neue Sprache im Heimatland",
    ],
    correctIndex: 1,
  },
  {
    text: "Was hilft, den Wissenstransfer nach einem Assignment zu sichern?",
    options: [
      "Keine Gespräche, um Zeit zu sparen",
      "Geplante Debriefings und Lessons Learned",
      "Nur private Gespräche mit Kolleg:innen",
      "Nicht über das Assignment sprechen",
    ],
    correctIndex: 1,
  },
  {
    text: "Welche Funktion hat eine Assignment Policy?",
    options: [
      "Eine Reisekostenrichtlinie für Urlaub",
      "Regelwerk zu Leistungen, Prozessen und Verantwortlichkeiten",
      "Nur eine Liste der Visa-Anforderungen",
      "Eine Übersicht über alle Standorte",
    ],
    correctIndex: 1,
  },
  {
    text: "Was kann ein Grund sein, ein Assignment abzubrechen?",
    options: [
      "Zu gutes Wetter im Gastland",
      "Schwere familiäre oder gesundheitliche Gründe",
      "Zu viele Geschäftsreisen",
      "Lange Vorlaufzeit",
    ],
    correctIndex: 1,
  },
  {
    text: "Was ist ein 'Host Country National' (HCN)?",
    options: [
      "Mitarbeitende aus dem Heimatland",
      "Mitarbeitende aus dem Gastland",
      "Mitarbeitende aus einem Drittland",
      "Externe Berater:innen",
    ],
    correctIndex: 1,
  },
  {
    text: "Warum nutzen Unternehmen International Assignments?",
    options: [
      "Um Beförderungen zu vermeiden",
      "Zum Aufbau internationaler Führungskräfte und Netzwerke",
      "Um Mitarbeitende zu kontrollieren",
      "Um nur Kosten zu reduzieren",
    ],
    correctIndex: 1,
  },
];

let gameState = {
  groups: {
    g1: { name: "Gruppe 1", correct: 0 },
    g2: { name: "Gruppe 2", correct: 0 },
    g3: { name: "Gruppe 3", correct: 0 },
  },
  currentQuestionIndex: null,
  askedIndices: [],
  currentAnswers: {},
  gameOver: false,
};

function resetGameState() {
  gameState = {
    groups: {
      g1: { name: "Gruppe 1", correct: 0 },
      g2: { name: "Gruppe 2", correct: 0 },
      g3: { name: "Gruppe 3", correct: 0 },
    },
    currentQuestionIndex: null,
    askedIndices: [],
    currentAnswers: {},
    gameOver: false,
  };
}

// === SOCKET.IO =========================================

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("register", (payload) => {
    socket.data.role = payload.role; // 'host' oder 'group'
    socket.data.groupId = payload.groupId || null;

    socket.emit("stateUpdate", {
      groups: gameState.groups,
      gameOver: gameState.gameOver,
    });

    if (gameState.currentQuestionIndex !== null) {
      const q = questions[gameState.currentQuestionIndex];
      socket.emit("newQuestion", {
        index: gameState.currentQuestionIndex,
        text: q.text,
        options: q.options,
      });
    }
  });

  socket.on("setGroups", (data) => {
    if (socket.data.role !== "host") return;

    resetGameState();
    if (data && data.groups) {
      ["g1", "g2", "g3"].forEach((id) => {
        if (data.groups[id]?.name) {
          gameState.groups[id].name = data.groups[id].name;
        }
      });
    }
    io.emit("stateUpdate", {
      groups: gameState.groups,
      gameOver: gameState.gameOver,
    });
  });

  socket.on("nextQuestion", () => {
    if (socket.data.role !== "host") return;
    if (gameState.gameOver) return;

    const remaining = [];
    for (let i = 0; i < questions.length; i++) {
      if (!gameState.askedIndices.includes(i)) remaining.push(i);
    }

    if (remaining.length === 0) {
      io.emit("noMoreQuestions");
      return;
    }

    const randomIndex = remaining[Math.floor(Math.random() * remaining.length)];
    gameState.currentQuestionIndex = randomIndex;
    gameState.askedIndices.push(randomIndex);
    gameState.currentAnswers = {};

    const q = questions[randomIndex];

    io.emit("newQuestion", {
      index: randomIndex,
      text: q.text,
      options: q.options,
    });
  });

  socket.on("answer", (payload) => {
    if (socket.data.role !== "group") return;
    if (gameState.gameOver) return;
    const groupId = socket.data.groupId;
    if (!groupId || !gameState.groups[groupId]) return;

    const { optionIndex } = payload || {};
    if (typeof optionIndex !== "number") return;
    if (gameState.currentQuestionIndex === null) return;

    if (gameState.currentAnswers[groupId]) {
      return;
    }

    const q = questions[gameState.currentQuestionIndex];
    const correct = optionIndex === q.correctIndex;

    gameState.currentAnswers[groupId] = { correct };

    if (correct && gameState.groups[groupId].correct < 10) {
      gameState.groups[groupId].correct += 1;
    }

    socket.emit("answerResult", { correct });

    io.emit("stateUpdate", {
      groups: gameState.groups,
      gameOver: gameState.gameOver,
    });

    const winners = Object.entries(gameState.groups)
      .filter(([_, g]) => g.correct >= 10)
      .map(([id, g]) => ({ id, name: g.name }));

    if (winners.length > 0) {
      gameState.gameOver = true;
      io.emit("gameOver", { winners });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

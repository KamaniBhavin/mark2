var readlineSync = require("readline-sync")

function Welcome(leadersBoard) {
  var userName = ""
  while (userName.length == 0) {
    var userName = readlineSync.question("Enter your name: ")
    if (userName.length == 0) console.log("\nPlease enter your name to start :(")
  }

  console.log("Hi " + userName + ", Welcome.\nProcessing please wait...\n")
  console.log("The game is about famous american sitcom \"FRIENDS\". You need to answer questions from the option on some very famous incidents from the series :)\n")

  leadersBoard.set(userName, 0)

  return userName
}

function Game(leadersBoard, questions, userName) {

  questions.forEach((q) => {
    console.log(q.question)

    var selected = readlineSync.keyIn(q.options.join("\n").concat("\n"), {
      limit: q.options.map((o) => o.split(".")[0]),
      limitMessage: "Please select from the given options!"
    })


    if (q.answer.find(a => a == selected)) {
      var currentScore = leadersBoard.get(userName)
      leadersBoard.set(userName, currentScore += 1)
    }

  })
}

function Scores(leadersBoard, questions, userName) {
  var finalScore = leadersBoard.get(userName)
  console.log("Your score is: " + finalScore)

  if (finalScore == questions.length) {
    console.log("Well that was \"UNAGI!\"")
  } else {
    console.log("I think \"You were on a \"BREAK\" :(")
  }
}


function Play() {
  var leadersBoard = new Map()

  var questions = [
    {
      question: "\nHow many seasons of Friends are there?",
      options: ["A. 10", "B. 12", "C. 11", "D. 9"],
      answer: ["A", "a"]
    },
    {
      question: "\nHow many sisters does Joey have?",
      options: ["A. 10", "B. 7", "C. 9", "D. 5"],
      answer: ["B", "b"]
    },
    {
      question: "\nWhat item does Ross purchase for himself as part of his 1999 New Year’s Resolutions?",
      options: ["A. Digital camera", "B. Arcade machine", "C. Leather pants", "D. Wonder-broom"],
      answer: ["C", "c"]
    },
    {
      question: "\nWhich of Joey’s sisters does Chandler kiss?",
      options: ["A. Mary Therese", "B. Mary Angela", "C. Dina", "D. Cookie"],
      answer: ["B", "b"]
    },
    {
      question: "\nHow many pages were in the letter Rachel wrote to Ross (front and back!)?",
      options: ["A. 17", "B. 12", "C. 18", "D. 20"],
      answer: ["C", "c"]
    }
  ]

  var user = Welcome(leadersBoard)
  Game(leadersBoard, questions, user)
  Scores(leadersBoard, questions, user)

}

do {
  Play()
} while(readlineSync.keyInYN("Do you wish to play again?"))


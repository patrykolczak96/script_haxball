const gameConfig = {
  roomName: "FUTSAL 3X3 JP 2.0",
  maxPlayers: 16,
  playerName: "HOST",
  public: false,
  geo: {
    code: "PL",
    lat: 52,
    lon: 19
  },
  // password: "meczligowy" // for league matches
};

const config = {
  showGoalInfo: true,
  chatEnabled: true,
  muteNewPlayers: false,
  adminPassword: "yourpassword" //superadmin password, use !slogin
};

const prefixes = {
  message: "👉👉👉",
  cmd: "!"
};

let superAdmins = [0];
let mutedPlayers = [];
let noCmdPlayers = []; //  list players, which have block commands
let afkPlayers = [];
let authenticatedAdmins = [];

let timeForEndMatch = 0;
let timeLimitReached = false;

const maps = {
  futsal: `{

	"name" : "Futsal 3x3 by TMAX",

	"width" : 800,

	"height" : 350,

	"bg" : { "type" : "hockey", "kickOffRadius" : 80 },

	"vertexes" : [
		/* 0 */ { "x" : -700, "y" : 300, "cMask" : ["ball" ] },
		/* 1 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ], "color" : "FF0000" },
		/* 2 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ], "color" : "FF0000" },
		/* 3 */ { "x" : -700, "y" : -300, "cMask" : ["ball" ] },
		/* 4 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ], "color" : "0C00B5" },
		/* 5 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ], "color" : "0C00B5" },
		/* 6 */ { "x" : 0, "y" : 330, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 7 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 8 */ { "x" : 0, "y" : -80, "bCoef" : 0, "cMask" : [ ] },
		/* 9 */ { "x" : 0, "y" : -330, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 10 */ { "x" : -740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 11 */ { "x" : 740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "curve" : 0 },
		/* 12 */ { "x" : -740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 13 */ { "x" : 740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "curve" : 0 },
		/* 14 */ { "x" : -700, "y" : -215, "cMask" : ["ball" ] },
		/* 15 */ { "x" : -500, "y" : -50, "bCoef" : 0, "cMask" : [ ] },
		/* 16 */ { "x" : 700, "y" : -215, "cMask" : ["ball" ] },
		/* 17 */ { "x" : 500, "y" : -50, "bCoef" : 0, "cMask" : [ ] },
		/* 18 */ { "x" : -700, "y" : 215, "cMask" : ["ball" ] },
		/* 19 */ { "x" : -500, "y" : 50, "bCoef" : 0, "cMask" : [ ] },
		/* 20 */ { "x" : 700, "y" : 215, "cMask" : ["ball" ] },
		/* 21 */ { "x" : 500, "y" : 50, "bCoef" : 0, "cMask" : [ ] },
		/* 22 */ { "x" : 700, "y" : 300, "cMask" : ["ball" ] },
		/* 23 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ] },
		/* 24 */ { "x" : 0, "y" : 300, "bCoef" : 0, "cMask" : [ ] },
		/* 25 */ { "x" : 0, "y" : -300, "bCoef" : 0, "cMask" : [ ] },
		/* 26 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 27 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 28 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 29 */ { "x" : 696, "y" : -300, "cMask" : ["ball" ] },
		/* 30 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 31 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 32 */ { "x" : -705, "y" : 300, "cMask" : ["ball" ] },
		/* 33 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 34 */ { "x" : 709, "y" : 300, "cMask" : ["ball" ] },
		/* 35 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 36 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 37 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 38 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 39 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 40 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 41 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 42 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 43 */ { "x" : -700, "y" : -215, "cMask" : ["ball" ] },
		/* 44 */ { "x" : -500, "y" : -50, "bCoef" : 0, "cMask" : [ ] },
		/* 45 */ { "x" : -700, "y" : -215, "cMask" : ["ball" ], "color" : "000000" },
		/* 46 */ { "x" : -500, "y" : -50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 47 */ { "x" : -700, "y" : -215, "cMask" : ["ball" ] },
		/* 48 */ { "x" : -500, "y" : -50, "bCoef" : 0, "cMask" : [ ] },
		/* 49 */ { "x" : -500, "y" : -50, "bCoef" : 0, "cMask" : [ ] },
		/* 50 */ { "x" : -500, "y" : 50, "bCoef" : 0, "cMask" : [ ] },
		/* 51 */ { "x" : -500, "y" : -50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 52 */ { "x" : -500, "y" : 50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 53 */ { "x" : -500, "y" : -50, "bCoef" : 0, "cMask" : [ ] },
		/* 54 */ { "x" : -500, "y" : 50, "bCoef" : 0, "cMask" : [ ] },
		/* 55 */ { "x" : -700, "y" : 215, "cMask" : ["ball" ] },
		/* 56 */ { "x" : -500, "y" : 50, "bCoef" : 0, "cMask" : [ ] },
		/* 57 */ { "x" : -700, "y" : 215, "cMask" : ["ball" ], "color" : "000000" },
		/* 58 */ { "x" : -500, "y" : 50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 59 */ { "x" : -700, "y" : 215, "cMask" : ["ball" ] },
		/* 60 */ { "x" : -500, "y" : 50, "bCoef" : 0, "cMask" : [ ] },
		/* 61 */ { "x" : -700, "y" : -300, "cMask" : ["ball" ] },
		/* 62 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ] },
		/* 63 */ { "x" : -700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 64 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 65 */ { "x" : -700, "y" : 300, "cMask" : ["ball" ] },
		/* 66 */ { "x" : 700, "y" : 300, "cMask" : ["ball" ] },
		/* 67 */ { "x" : -700, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 68 */ { "x" : 700, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 69 */ { "x" : 0, "y" : 300, "bCoef" : 0, "cMask" : [ ] },
		/* 70 */ { "x" : 0, "y" : -300, "bCoef" : 0, "cMask" : [ ] },
		/* 71 */ { "x" : 0, "y" : 300, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 72 */ { "x" : 0, "y" : -300, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 73 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 74 */ { "x" : 0, "y" : -80, "bCoef" : 0, "cMask" : [ ] },
		/* 75 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "000000" },
		/* 76 */ { "x" : 0, "y" : -80, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 77 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 78 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		/* 79 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "000000" },
		/* 80 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "000000" },
		/* 81 */ { "x" : 700, "y" : 215, "cMask" : ["ball" ] },
		/* 82 */ { "x" : 500, "y" : 50, "bCoef" : 0, "cMask" : [ ] },
		/* 83 */ { "x" : 700, "y" : 215, "cMask" : ["ball" ], "color" : "000000" },
		/* 84 */ { "x" : 500, "y" : 50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 85 */ { "x" : 500, "y" : -50, "bCoef" : 0, "cMask" : [ ] },
		/* 86 */ { "x" : 500, "y" : 50, "bCoef" : 0, "cMask" : [ ] },
		/* 87 */ { "x" : 500, "y" : -50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 88 */ { "x" : 500, "y" : 50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 89 */ { "x" : 700, "y" : -215, "cMask" : ["ball" ] },
		/* 90 */ { "x" : 500, "y" : -50, "bCoef" : 0, "cMask" : [ ] },
		/* 91 */ { "x" : 700, "y" : -215, "cMask" : ["ball" ], "color" : "000000" },
		/* 92 */ { "x" : 500, "y" : -50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 93 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 94 */ { "x" : -740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 95 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 96 */ { "x" : -740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 97 */ { "x" : -740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 98 */ { "x" : -740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 99 */ { "x" : -740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "curve" : 0 },
		/* 100 */ { "x" : -740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "curve" : 0 },
		/* 101 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 102 */ { "x" : -740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 103 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 104 */ { "x" : -740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 105 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 106 */ { "x" : 740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 107 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 108 */ { "x" : 740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 109 */ { "x" : 740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "curve" : 0 },
		/* 110 */ { "x" : 740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "curve" : 0 },
		/* 111 */ { "x" : 740, "y" : -80, "bCoef" : 0.1, "cMask" : ["ball" ], "curve" : 0 },
		/* 112 */ { "x" : 740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ], "curve" : 0 },
		/* 113 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 114 */ { "x" : 740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 115 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 116 */ { "x" : 740, "y" : 80, "bCoef" : 0.1, "cMask" : ["ball" ] },
		/* 117 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 118 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 119 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 120 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 121 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 122 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 123 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 124 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ] },
		/* 125 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ], "color" : "000000" },
		/* 126 */ { "x" : -700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 127 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 128 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 129 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 130 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 131 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 132 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 133 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 134 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ] },
		/* 135 */ { "x" : -700, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 136 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ], "color" : "000000" },
		/* 137 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 138 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 139 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 140 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 141 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ] },
		/* 142 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 143 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ] },
		/* 144 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 145 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ] },
		/* 146 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 147 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ] },
		/* 148 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ] },
		/* 149 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ] },
		/* 150 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ], "color" : "000000" },
		/* 151 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 152 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 153 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 154 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 155 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 156 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 157 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 158 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 159 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ] },
		/* 160 */ { "x" : 700, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 161 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ], "color" : "000000" },
		/* 162 */ { "x" : -710, "y" : -85, "cMask" : ["ball" ] },
		/* 163 */ { "x" : -710, "y" : -300, "cMask" : ["ball" ] },
		/* 164 */ { "x" : -710, "y" : 300, "cMask" : ["ball" ] },
		/* 165 */ { "x" : -710, "y" : 85, "cMask" : ["ball" ] },
		/* 166 */ { "x" : 710, "y" : -85, "cMask" : ["ball" ] },
		/* 167 */ { "x" : 710, "y" : -300, "cMask" : ["ball" ] },
		/* 168 */ { "x" : 710, "y" : 300, "cMask" : ["ball" ] },
		/* 169 */ { "x" : 710, "y" : 85, "cMask" : ["ball" ] },
		/* 170 */ { "x" : -705, "y" : 300, "cMask" : ["ball" ] },
		/* 171 */ { "x" : -705, "y" : 85, "cMask" : ["ball" ] },
		/* 172 */ { "x" : -705, "y" : -85, "cMask" : ["ball" ] },
		/* 173 */ { "x" : -705, "y" : -300, "cMask" : ["ball" ] },
		/* 174 */ { "x" : 705, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 175 */ { "x" : 705, "y" : 85, "cMask" : ["ball" ], "color" : "000000" },
		/* 176 */ { "x" : 705, "y" : -85, "cMask" : ["ball" ] },
		/* 177 */ { "x" : 705, "y" : -300, "cMask" : ["ball" ] },
		/* 178 */ { "x" : -700, "y" : 300, "bCoef" : 0, "cMask" : [ ] },
		/* 179 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -675.3333339691162, "y" : -303, "color" : "00B3FF" },
		/* 180 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -675.3333339691162, "y" : -338, "color" : "00B3FF" },
		/* 181 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -660.3333339691162, "y" : -340, "color" : "00B3FF" },
		/* 182 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -695.3333339691162, "y" : -340, "color" : "00B3FF" },
		/* 183 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -657.3333339691162, "y" : -304, "color" : "00B3FF" },
		/* 184 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -635.3333339691162, "y" : -314, "color" : "00B3FF" },
		/* 185 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -623.3333339691162, "y" : -341, "color" : "00B3FF" },
		/* 186 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -621.3333339691162, "y" : -306, "color" : "00B3FF" },
		/* 187 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -612.3333339691162, "y" : -304, "color" : "00B3FF" },
		/* 188 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -598.3333339691162, "y" : -340, "color" : "00B3FF" },
		/* 189 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -588.3333339691162, "y" : -302, "color" : "00B3FF" },
		/* 190 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -591.3333339691162, "y" : -314, "color" : "00B3FF" },
		/* 191 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -605.3333339691162, "y" : -316, "color" : "00B3FF" },
		/* 192 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -591.3333339691162, "y" : -344, "color" : "00B3FF" },
		/* 193 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -544.3333339691162, "y" : -303, "color" : "00B3FF" },
		/* 194 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -548.3333339691162, "y" : -336, "color" : "00B3FF" },
		/* 195 */ { "bCoef" : 0.2, "cMask" : ["ball" ], "x" : -573.3333339691162, "y" : -302, "color" : "00B3FF" },
		/* 196 */ { "x" : -227.86953919310145, "y" : 43.83002080544577, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 197 */ { "x" : -224.343547691685, "y" : -180.8352614689371, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 198 */ { "x" : 443.13046080689855, "y" : -90.16997919455423, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 199 */ { "x" : 362.656452308315, "y" : -35.83526146893709, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 200 */ { "x" : -151.86953919310145, "y" : 43.83002080544577, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 201 */ { "x" : -226.343547691685, "y" : -31.83526146893709, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 202 */ { "x" : 360.13046080689855, "y" : 42.83002080544577, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 203 */ { "x" : 363.656452308315, "y" : -181.8352614689371, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 204 */ { "x" : 72.65645230831501, "y" : -17.83526146893709, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 205 */ { "x" : 438.13046080689855, "y" : 41.83002080544577, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 206 */ { "x" : 363.656452308315, "y" : -33.83526146893709, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 207 */ { "x" : -144.86953919310145, "y" : -87.16997919455423, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 208 */ { "x" : -225.343547691685, "y" : -32.83526146893709, "bCoef" : 0, "cMask" : [ ], "curve" : 0 },
		/* 209 */ { "x" : -270, "y" : 42, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "5E5E5E" },
		/* 210 */ { "x" : -262, "y" : -107, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "5E5E5E" },
		/* 211 */ { "x" : 318, "y" : 39, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "5E5E5E" },
		/* 212 */ { "x" : 328, "y" : -109, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "5E5E5E" },
		/* 213 */ { "x" : -700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 214 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 215 */ { "x" : -700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 216 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 217 */ { "x" : -700, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 218 */ { "x" : 700, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 219 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "000000" },
		/* 220 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "000000" },
		/* 221 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "color" : "000000" },
		/* 222 */ { "x" : 0, "y" : -80, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 223 */ { "x" : 0, "y" : 300, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 224 */ { "x" : 0, "y" : -300, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 225 */ { "x" : 700, "y" : 215, "cMask" : ["ball" ], "color" : "000000" },
		/* 226 */ { "x" : 500, "y" : 50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 227 */ { "x" : 500, "y" : -50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 228 */ { "x" : 500, "y" : 50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 229 */ { "x" : 700, "y" : -215, "cMask" : ["ball" ], "color" : "000000" },
		/* 230 */ { "x" : 500, "y" : -50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 231 */ { "x" : 700, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 232 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ], "color" : "000000" },
		/* 233 */ { "x" : 700, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 234 */ { "x" : 700, "y" : 80, "cMask" : ["ball" ], "color" : "000000" },
		/* 235 */ { "x" : 700, "y" : -80, "cMask" : ["ball" ], "color" : "000000" },
		/* 236 */ { "x" : 700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 237 */ { "x" : -700, "y" : -80, "cMask" : ["ball" ], "color" : "000000" },
		/* 238 */ { "x" : -700, "y" : -300, "cMask" : ["ball" ], "color" : "000000" },
		/* 239 */ { "x" : -500, "y" : -50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 240 */ { "x" : -500, "y" : 50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 241 */ { "x" : -700, "y" : -215, "cMask" : ["ball" ], "color" : "000000" },
		/* 242 */ { "x" : -500, "y" : -50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 243 */ { "x" : -700, "y" : 215, "cMask" : ["ball" ], "color" : "000000" },
		/* 244 */ { "x" : -500, "y" : 50, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		/* 245 */ { "x" : -700, "y" : 300, "cMask" : ["ball" ], "color" : "000000" },
		/* 246 */ { "x" : -700, "y" : 80, "cMask" : ["ball" ], "color" : "000000" }

	],

	"segments" : [
		{ "v0" : 2, "v1" : 3, "vis" : false, "cMask" : ["ball" ] },
		{ "v0" : 6, "v1" : 7, "bCoef" : 0.1, "vis" : false, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		{ "v0" : 7, "v1" : 8, "bCoef" : 0.1, "curve" : 180, "curveF" : 6.123233995736766e-17, "vis" : false, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ] },
		{ "v0" : 8, "v1" : 7, "bCoef" : 0.1, "curve" : 180, "curveF" : 6.123233995736766e-17, "vis" : false, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ] },
		{ "v0" : 8, "v1" : 9, "bCoef" : 0.1, "vis" : false, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
		{ "v0" : 2, "v1" : 10, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "FF0000" },
		{ "v0" : 5, "v1" : 11, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "1100FF" },
		{ "v0" : 1, "v1" : 12, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "FF0000" },
		{ "v0" : 4, "v1" : 13, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "1100FF" },
		{ "v0" : 10, "v1" : 12, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "FF0000", "curve" : 0 },
		{ "v0" : 11, "v1" : 13, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "1100FF", "curve" : 0 },
		{ "v0" : 14, "v1" : 15, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ] },
		{ "v0" : 17, "v1" : 16, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ] },
		{ "v0" : 19, "v1" : 18, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ] },
		{ "v0" : 20, "v1" : 21, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ] },
		{ "v0" : 15, "v1" : 19, "bCoef" : 0, "curve" : 10, "curveF" : 11.430052302761343, "cMask" : [ ] },
		{ "v0" : 21, "v1" : 17, "bCoef" : 0, "curve" : 10, "curveF" : 11.430052302761343, "cMask" : [ ] },
		{ "v0" : 0, "v1" : 22, "cMask" : ["ball" ] },
		{ "v0" : 3, "v1" : 23, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 24, "v1" : 25, "bCoef" : 0, "cMask" : [ ] },
		{ "v0" : 8, "v1" : 7, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ] },
		{ "v0" : 27, "v1" : 26, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ] },
		{ "v0" : 2, "v1" : 1, "bCoef" : 0, "cMask" : [ ], "color" : "FF0000" },
		{ "v0" : 5, "v1" : 4, "bCoef" : 0, "cMask" : [ ], "color" : "0C00B5" },
		{ "v0" : 28, "v1" : 29, "vis" : false, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 31, "v1" : 32, "vis" : false, "cMask" : ["ball" ], "color" : "FF0000" },
		{ "v0" : 33, "v1" : 34, "vis" : false, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 43, "v1" : 44, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ] },
		{ "v0" : 45, "v1" : 46, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 49, "v1" : 50, "bCoef" : 0, "curve" : 10, "curveF" : 11.430052302761343, "cMask" : [ ] },
		{ "v0" : 51, "v1" : 52, "bCoef" : 0, "curve" : 10, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 56, "v1" : 55, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ] },
		{ "v0" : 58, "v1" : 57, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 61, "v1" : 62, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 63, "v1" : 64, "cMask" : ["ball" ], "color" : "000000", "curve" : 0 },
		{ "v0" : 65, "v1" : 66, "cMask" : ["ball" ] },
		{ "v0" : 67, "v1" : 68, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 69, "v1" : 70, "bCoef" : 0, "cMask" : [ ] },
		{ "v0" : 71, "v1" : 72, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 73, "v1" : 74, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ] },
		{ "v0" : 76, "v1" : 75, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 77, "v1" : 78, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ] },
		{ "v0" : 79, "v1" : 80, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 81, "v1" : 82, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ] },
		{ "v0" : 83, "v1" : 84, "bCoef" : 0, "curve" : 90.28396138075733, "curveF" : 1.0000000000000002, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 86, "v1" : 85, "bCoef" : 0, "curve" : 10, "curveF" : 11.430052302761343, "cMask" : [ ] },
		{ "v0" : 88, "v1" : 87, "bCoef" : 0, "curve" : 10, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 90, "v1" : 89, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ] },
		{ "v0" : 92, "v1" : 91, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 93, "v1" : 94, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "FF0000" },
		{ "v0" : 95, "v1" : 96, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "FF0000" },
		{ "v0" : 97, "v1" : 98, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "FF0000", "curve" : 0 },
		{ "v0" : 99, "v1" : 100, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "FF0000", "curve" : 0 },
		{ "v0" : 101, "v1" : 102, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "FF0000" },
		{ "v0" : 103, "v1" : 104, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "FF0000" },
		{ "v0" : 105, "v1" : 106, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "1100FF" },
		{ "v0" : 107, "v1" : 108, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "1100FF" },
		{ "v0" : 109, "v1" : 110, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "1100FF", "curve" : 0 },
		{ "v0" : 111, "v1" : 112, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "1100FF", "curve" : 0 },
		{ "v0" : 113, "v1" : 114, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "1100FF" },
		{ "v0" : 115, "v1" : 116, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "1100FF" },
		{ "v0" : 125, "v1" : 126, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 136, "v1" : 135, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 150, "v1" : 151, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 161, "v1" : 160, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 162, "v1" : 163, "vis" : false, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 164, "v1" : 165, "vis" : false, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 166, "v1" : 167, "vis" : false, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 168, "v1" : 169, "vis" : false, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 170, "v1" : 171, "vis" : false, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 172, "v1" : 173, "vis" : false, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "v0" : 174, "v1" : 175, "vis" : false, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 176, "v1" : 177, "vis" : false, "cMask" : ["ball" ], "color" : "FFFFFF" },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 179, "v1" : 180 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 181, "v1" : 182 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 183, "v1" : 181 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 181, "v1" : 184 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 184, "v1" : 185 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 185, "v1" : 186 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 187, "v1" : 188 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 188, "v1" : 189 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 190, "v1" : 191 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 192, "v1" : 193 },
		{ "color" : "00B3FF", "bCoef" : 0.2, "cMask" : ["ball" ], "v0" : 194, "v1" : 195 },
		{ "v0" : 197, "v1" : 196, "bCoef" : 0, "curve" : 0, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "5E5E5E" },
		{ "v0" : 199, "v1" : 198, "bCoef" : 0, "curve" : 0, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "5E5E5E" },
		{ "v0" : 201, "v1" : 200, "bCoef" : 0, "curve" : 0, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "5E5E5E" },
		{ "v0" : 203, "v1" : 202, "bCoef" : 0, "curve" : 0, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "5E5E5E" },
		{ "v0" : 206, "v1" : 205, "bCoef" : 0, "curve" : 0, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "5E5E5E" },
		{ "v0" : 208, "v1" : 207, "bCoef" : 0, "curve" : 0, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "5E5E5E" },
		{ "v0" : 209, "v1" : 210, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ], "color" : "5E5E5E" },
		{ "v0" : 211, "v1" : 212, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ], "color" : "5E5E5E" },
		{ "v0" : 213, "v1" : 214, "cMask" : ["ball" ], "color" : "000000", "curve" : 0 },
		{ "v0" : 215, "v1" : 216, "cMask" : ["ball" ], "color" : "000000", "curve" : 0 },
		{ "v0" : 217, "v1" : 218, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 219, "v1" : 220, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 222, "v1" : 221, "bCoef" : 0, "curve" : 180, "curveF" : 6.123233995736766e-17, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 223, "v1" : 224, "bCoef" : 0, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 225, "v1" : 226, "bCoef" : 0, "curve" : 90.28396138075733, "curveF" : 1.0000000000000002, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 228, "v1" : 227, "bCoef" : 0, "curve" : 10, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 230, "v1" : 229, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 232, "v1" : 231, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 235, "v1" : 236, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 237, "v1" : 238, "cMask" : ["ball" ], "color" : "000000" },
		{ "v0" : 239, "v1" : 240, "bCoef" : 0, "curve" : 10, "curveF" : 11.430052302761343, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 241, "v1" : 242, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 244, "v1" : 243, "bCoef" : 0, "curve" : 89.99999999999999, "curveF" : 1.0000000000000002, "cMask" : [ ], "color" : "000000" },
		{ "v0" : 246, "v1" : 245, "cMask" : ["ball" ], "color" : "000000" }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -300, "cMask" : ["ball" ] },
		{ "normal" : [0,-1 ], "dist" : -300, "cMask" : ["ball" ] },
		{ "normal" : [0,1 ], "dist" : -349, "bCoef" : 0.2 },
		{ "normal" : [0,-1 ], "dist" : -330, "bCoef" : 0.2 },
		{ "normal" : [1,0 ], "dist" : -740, "bCoef" : 0.2 },
		{ "normal" : [-1,0 ], "dist" : -756, "bCoef" : 0.2 }

	],

	"goals" : [
		{ "p0" : [-708,-80 ], "p1" : [-708,80 ], "team" : "red" },
		{ "p0" : [708,80 ], "p1" : [708,-80 ], "team" : "blue" }

	],

	"discs" : [
		{ "pos" : [-700,80 ], "radius" : 7, "bCoef" : 1, "invMass" : 0 },
		{ "pos" : [-700,-80 ], "radius" : 7, "bCoef" : 1, "invMass" : 0 },
		{ "pos" : [700,83 ], "radius" : 7, "bCoef" : 1, "invMass" : 0 },
		{ "pos" : [700,-80 ], "radius" : 7, "bCoef" : 1, "invMass" : 0 }

	],

	"playerPhysics" : {
		"bCoef" : 0,
		"acceleration" : 0.11,
		"kickingAcceleration" : 0.11,
		"kickStrength" : 7

	},

	"ballPhysics" : {
		"radius" : 6.4,
		"color" : "FF11"

	},

	"spawnDistance" : 250,

	"traits" : {
		

	}
}
   `
};

let ball = {
  kickedBy: {
    player: null,
    time: null,
  },
  touchedBy: {
    player: null,
    time: null
  },
  assistingPlayer: null
};

let goals = {};
let ownGoals = {};
let assists = {};
let cmdManager;
let nextPauseAction = true; // used when user is afk/non-afk and command !p
let bans = {};

const room = new HBInit(gameConfig);
room.setCustomStadium(maps.futsal);

room.onPlayerBallKick = ballKick;
room.onTeamGoal = teamGoal;
room.onPlayerChat = messageFromChat;
room.onPlayerKicked = kickPlayer;
room.onPlayerAdminChange = changeAdmin;
room.onPlayerJoin = newPlayer;
room.onPlayerLeave = leavePlayer;
room.onPlayerTeamChange = playerChangeTeam;
room.onGameTick = checkInGame;
room.onGameStart = startGame;
room.onGamePause = () => nextPauseAction = false;
room.onGameUnpause = () => nextPauseAction = true;
room.onGameStop = showAfkPlayers; // it works when message "read/blue won match" and after few second "gracze afk: ...", if admins quickly change players dont see message who is afk
room.onStadiumChange = blockChangeStadium;

class CmdManager { // code responsible for cmd from another script
  constructor() {
    this.cmds = [];
  }

  add(cmd) {
    this.cmds.push(cmd);
  }

  remove(cmd) {
    let index = this.cmds.indexOf(cmd);
    if (index !== -1) {
      this.cmds.splice(index, 1);
    }
  }

  findCmd(message) {
    for (let cmd of this.cmds) {
      let regex = cmd.getBaseRegex();
      if (regex.exec(message)) {
        return cmd;
      }
    }

    return null;
  }

  extractArguments(cmd, message) {
    let regex = cmd.getFullRegex();
    let match = regex.exec(message);
    if (match) {
      let args = [];
      for (let i = 1; match[i] !== undefined; i++) {
        args.push(match[i]);
      }
      return { args };
    }

    return { error: cmd.getHelpText() };
  }

  listAdminCmds() {
    let list = [];
    for (let cmd of this.cmds) {
      if (cmd.onlyAdmin) {
        list.push(prefixes.cmd + cmd.cmd);
      }
    }

    return list;
  }

  listPlayerCmds() {
    let list = [];
    for (let cmd of this.cmds) {
      if (!cmd.onlyAdmin && !cmd.onlySuperAdmin) {
        list.push(prefixes.cmd + cmd.cmd);
      }
    }

    return list;
  }
}

class Cmd {
  constructor(config, func) {
    this.cmd = config.cmd;
    this.params = config.params || null;
    this.paramsOptional = config.paramsOptional || false;
    this.showInChat = config.showInChat || false;
    this.onlyAdmin = config.onlyAdmin || false;
    this.onlySuperAdmin = config.onlySuperAdmin || false;
    this.helpText = config.helpText || null;
    this.func = func;
  }

  canPlayerExecute(player) {
    if (this.onlySuperAdmin && !isSuperAdmin(player))
      return false;
    if (this.onlyAdmin && !player.admin)
      return false;
    return true;
  }

  execute(args) {
    return this.func.apply(null, args);
  }

  getHelpText() {
    let params = "";
    for (let param in this.params) {
      params += ` ${param}`;
    }
    let message = `Użyj ${prefixes.cmd}${this.cmd}${params}`;
    if (this.helpText) {
      message += `  (${this.helpText})`;
    }

    return message;
  }

  getBaseRegex() {
    return new RegExp(`^${this.cmd}\\b`);
  }

  getFullRegex() {
    let list = "";
    if (this.paramsOptional) {
      list = "(?:";
    }

    for (let param in this.params) {
      list += ` ${this.params[param]}`;
    }

    if (this.paramsOptional) {
      list += ")?";
    }

    return new RegExp(`^${this.cmd}${list}$`);
  }
}

let setPlayerAfkCmd = new Cmd({ cmd: "afk", showInChat: true }, (invokedBy) => {
    if (!isPlayerAfk(invokedBy)) {
      setPlayerAfk(invokedBy);
      sendMessage(`Gracz ${invokedBy.name} zaraz wraca`, invokedBy);
    }
  });

let setPlayerBackCmd = new Cmd({ cmd: "jj", showInChat: true }, (invokedBy) => {
  unsetPlayerAfk(invokedBy);
  sendMessage(`Gracz ${invokedBy.name} jest z powrotem`, invokedBy);
});

let listAfkPlayers = new Cmd({ cmd: "lafk", showInChat: true }, (invokedBy) => {
  showAfkPlayers(invokedBy);
});

let mutePlayerByName = new Cmd({ cmd: "mute", params: { name: "(.+)" }, onlyAdmin: true }, (invokedBy, nameToMute) => {
  let players = room.getPlayerList().filter(player => player.name.includes(nameToMute));

  if (players.length === 1) {
    process(players);
  } else if (!players.length) {
    sendMessage(`${nameToMute} nie został odnaleziony`);
  } else {
    players = players.filter(player => player.name === nameToMute);
    if (players.length === 1) {
      process(players);
    } else {
      sendMessage(`Znaleziono wielu graczy pasujących do wzorca ${nameToMute}`);
    }
  }

  function process(players) {
    let player = players[0];
    if (isPlayerMuted(player)) {
      unmutePlayer(player);
      sendMessage(`${player.name} został odciszony przez ${invokedBy.name}`);
    } else {
      mutePlayer(player);
      sendMessage(`${player.name} został wyciszony przez ${invokedBy.name}`);
    }
  }
});

let mutePlayerById = new Cmd({ cmd: "muteid", params: { id: "(\\d+)" }, onlyAdmin: true }, (invokedBy, idToMute) => {
  let player = room.getPlayerList().filter(player => player.id === Number(idToMute))[0];

  if (player) {
    if (isPlayerMuted(player)) {
      unmutePlayer(player);
      sendMessage(`${player.name} został odciszony przez ${invokedBy.name}`);
    } else {
      mutePlayer(player);
      sendMessage(`${player.name} został wyciszony przez ${invokedBy.name}`);
    }
  } else {
    sendMessage(`Gracz o id ${idToMute} nie został znaleziony`);
  }
});

let muteNewPlayers = new Cmd({ cmd: "mutenew", onlyAdmin: true }, (invokedBy) => {
  config.muteNewPlayers = !config.muteNewPlayers;
  if (config.muteNewPlayers) {  
    sendMessage(`Chat został wyłączony dla nowych graczy przez ${invokedBy.name}`);
  }
  else {
    sendMessage(`Chat został włączony dla nowych graczy przez ${invokedBy.name}`);
    clearAllMutes();
  }
});

let silentMutePlayerByName = new Cmd({ cmd: "smute", params: { name: "(.+)" }, onlyAdmin: true }, (invokedBy, nameToMute) => {
  let players = room.getPlayerList().filter(player => player.name.includes(nameToMute));

  if (players.length === 1) {
    process(players);
  } else if (players.length > 1) {
    players = players.filter(player => player.name === nameToMute);
    if (players.length === 1) {
      process(players);
    }
  }

  function process(players) {
    let player = players[0];
    if (isPlayerMuted(player)) {
      unmutePlayer(player);
    } else {
      mutePlayer(player);
    }
  }
});

/* not necessary, i can mute with "login" , id is harder, code from 1st script
let silentMutePlayerById = new Cmd({ cmd: "smuteid", params: { id: "(\\d+)" }, onlyAdmin: true }, (invokedBy, idToMute) => {
  let player = room.getPlayerList().filter(player => player.id === Number(idToMute))[0];

  if (player) {
    if (isPlayerMuted(player)) {
      unmutePlayer(player);
    } else {
      mutePlayer(player);
    }
  }
});
*/
let superAdminLogin = new Cmd({ cmd: `slogin ${config.adminPassword}` }, (invokedBy) => {
  if (!invokedBy.admin) {
    room.setPlayerAdmin(invokedBy.id, true);
    setSuperAdmin(invokedBy);
  }
});

let adminLogout = new Cmd({ cmd: "logout", onlyAdmin: true }, (invokedBy) => {
  room.setPlayerAdmin(invokedBy.id, false);
});

let clearBans = new Cmd({ cmd: "clearbans", onlyAdmin: true }, (invokedBy) => {
  clearAllBans(invokedBy.name);
});

let clearMutes = new Cmd({ cmd: "clearmutes", onlyAdmin: true }, (invokedBy) => {
  clearAllMutes(invokedBy.name);
});

let toggleChat = new Cmd({ cmd: "togglechat", onlyAdmin: true }, (invokedBy) => {
  if (config.chatEnabled) {
    sendMessage(`Chat został wyłączony przez ${invokedBy.name}`);
    config.chatEnabled = false;
  } else {
    config.chatEnabled = true;
    sendMessage(`Chat został włączony przez ${invokedBy.name}`);
  }
});

let muteAll = new Cmd({ cmd: "muteall", onlyAdmin: true }, (invokedBy) => {
  const players = room.getPlayerList().filter(player => player.id !== 0);
  for (let player of players) {
    if (player.name !== invokedBy.name)
      mutePlayer(player);
  }
  sendMessage(`Wszyscy gracze zostali wyciszeni przez ${invokedBy.name}`);
});

let clearNoCmdPlayers = new Cmd({ cmd: "clearnocmd", onlyAdmin: true }, (invokedBy) => {
  clearAllNoCmdPlayers(invokedBy.name);
});
/*  
let loadClassicMap = new Cmd({cmd: "big", onlyAdmin: true}, (invokedBy) => {
  room.setCustomStadium(maps.futsal);
});
let loadBigMap = new Cmd({cmd: "futsal", onlyAdmin: true}, (invokedBy) => {
  room.setCustomStadium(maps.futsal);
});
 */
let listTopOGPlayers = new Cmd({ cmd: "otop10", showInChat: true }, (invokedBy) => {
  let props = Object.keys(ownGoals).map(function (key) {
    return { key: key, value: this[key] };
  }, ownGoals);

  props.sort((p1, p2) => p2.value - p1.value);
  let top10 = props.splice(0, 10);
  let pos = 1;
  if (top10.length) {
    sendMessage("Top10 Strzelców do własnej bramki: ", invokedBy);
  }
  while (top10.length) {
    let tmp = top10.splice(0, 5);
    let message = tmp.map(e => `${pos++}. ${e.key}: ${e.value}`).join(", ");
    sendMessage(message, invokedBy);
  }
});

let listTopPlayers = new Cmd({ cmd: "top10", showInChat: true }, (invokedBy) => {
  let props = Object.keys(goals).map(function (key) {
    return { key: key, value: this[key] };
  }, goals);

  props.sort((p1, p2) => p2.value - p1.value);
  let top10 = props.splice(0, 10);
  let pos = 1;
  if (top10.length) {
    sendMessage("Top10 Strzelców: ", invokedBy);
  }
  while (top10.length) {
    let tmp = top10.splice(0, 5);
    let message = tmp.map(e => `${pos++}. ${e.key}: ${e.value}`).join(", ");
    sendMessage(message, invokedBy);
  }
});

let listTopAssistingPlayers = new Cmd({ cmd: "atop10", showInChat: true }, (invokedBy) => {
  let props = Object.keys(assists).map(function (key) {
    return { key: key, value: this[key] };
  }, assists);

  props.sort((p1, p2) => p2.value - p1.value);
  let top10 = props.splice(0, 10);
  let pos = 1;
  if (top10.length) {
    sendMessage("Top10 Asystujących: ", invokedBy);
  }
  while (top10.length) {
    let tmp = top10.splice(0, 5);
    let message = tmp.map(e => `${pos++}. ${e.key}: ${e.value}`).join(", ");
    sendMessage(message, invokedBy);
  }
});

let listPlayerStats = new Cmd({ cmd: "stats", params: { name: "(.+)" }, showInChat: true }, (invokedBy, playerName) => {
  let goal_scorers = Object.keys(goals).filter(scorer => scorer.includes(playerName));
  let assist_scorers = Object.keys(assists).filter(scorer => scorer.includes(playerName));

  let goal_score;
  let assist_score;
  let player = null;

  if (goal_scorers.length && assist_scorers.length) {
    goal_score = goals[goal_scorers[0]];
    assist_score = assists[assist_scorers[0]];

    player = goal_scorers[0];
  } else if (goal_scorers.length) {
    assist_score = 0;
    goal_score = goals[goal_scorers[0]];
    player = goal_scorers[0];
  } else if (assist_scorers.length) {
    goal_score = 0;
    assist_score = assists[assist_scorers[0]];
    player = assist_scorers[0];
  } else {
    goal_scorers = goal_scorers.filter(scorer => scorer === playerName);
    if (goal_scorers.length && assist_scorers.length) {
      goal_score = goals[goal_scorers[0]];
      assist_score = assists[assist_scorers[0]];
      player = goal_scorers[0];
    } else {
      return sendMessage(`Znaleziono wielu graczy pasujących do wzorca ${playerName}`);
    }
  }

  player = player || playerName;
  sendMessage(`Gracz ${player} bramek ${goal_score}, asyst ${assist_score}`, invokedBy);


});

let listPlayerGoals = new Cmd({ cmd: "goals", params: { name: "(.+)" }, showInChat: true }, (invokedBy, playerName) => {
  let scorers = Object.keys(goals).filter(scorer => scorer.includes(playerName));
  let score;
  let player = null;

  if (scorers.length === 1) {
    score = goals[scorers[0]];
    player = scorers[0];
  } else if (!scorers.length) {
    score = 0;
  } else {
    scorers = scorers.filter(scorer => scorer === playerName);
    if (scorers.length === 1) {
      score = goals[scorers[0]];
      player = scorers[0];
    } else {
      return sendMessage(`Znaleziono wielu graczy pasujących do wzorca ${playerName}`);
    }
  }

  player = player || playerName;
  sendMessage(`Gracz ${player} bramek ${score}`, invokedBy);
});

let listPlayerOwnGoals = new Cmd({ cmd: "owngoals", params: { name: "(.+)" }, showInChat: true }, (invokedBy, playerName) => {
  let scorers = Object.keys(ownGoals).filter(scorer => scorer.includes(playerName));
  let score;
  let player = null;

  if (scorers.length === 1) {
    score = ownGoals[scorers[0]];
    player = scorers[0];
  } else if (!scorers.length) {
    score = 0;
  } else {
    scorers = scorers.filter(scorer => scorer === playerName);
    if (scorers.length === 1) {
      score = ownGoals[scorers[0]];
      player = scorers[0];
    } else {
      return sendMessage(`Znaleziono wielu graczy pasujących do wzorca ${playerName}`);
    }
  }

  player = player || playerName;
  sendMessage(`Gracz ${player} bramek samobójczych ${score}`, invokedBy);
});

let listPlayerAssists = new Cmd({ cmd: "assists", params: { name: "(.+)" }, showInChat: true }, (invokedBy, playerName) => {
  let scorers = Object.keys(assists).filter(scorer => scorer.includes(playerName));
  let score;
  let player = null;

  if (scorers.length === 1) {
    score = assists[scorers[0]];
    player = scorers[0];
  } else if (!scorers.length) {
    score = 0;
  } else {
    scorers = scorers.filter(scorer => scorer === playerName);
    if (scorers.length === 1) {
      score = assists[scorers[0]];
      player = scorers[0];
    } else {
      return sendMessage(`Znaleziono wielu graczy pasujacych do wzorca ${playerName}`);
    }
  }

  player = player || playerName;
  sendMessage(`Gracz ${player} asyst ${score}`, invokedBy);
});

let listPlayerCmds = new Cmd({ cmd: "komendy", showInChat: true }, (invokedBy) => {
  let list = cmdManager.listPlayerCmds();
  list = list.filter(cmd => !cmd.includes("login"));
  while (list.length) {
    let cmds = list.splice(0, 11);
    sendMessage(cmds.join(" "), invokedBy);
  }
});

let listAdminCmds = new Cmd({ cmd: "akomendy", onlyAdmin: true }, (invokedBy) => {
  let list = cmdManager.listAdminCmds();
  list = list.filter(cmd => !cmd.includes("login"));
  while (list.length) {
    let cmds = list.splice(0, 8);
    sendMessage(cmds.join(" "), invokedBy);
  }
});

let freeSlotCmd = new Cmd({ cmd: "slot", onlyAdmin: true }, (invokedBy) => {
  freeSlot(invokedBy);
});

let listPlayers = new Cmd({ cmd: "players", paramsOptional: true, params: { pattern: "(.+)" }, onlyAdmin: true }, (invokedBy, pattern) => {
  let players = room.getPlayerList();
  if (pattern)
    players = players.filter(player => player.name.includes(pattern));

  for (let player of players) {
    sendMessage(`Gracz ${player.name}, id ${player.id}`);
  }
});

let goalInfoCmd = new Cmd({ cmd: "showgoal", onlyAdmin: true }, (invokedBy) => {
  config.showGoalInfo = !config.showGoalInfo;
  sendMessage(`Informacje o golu zostały ${config.showGoalInfo ? "włączone" : "wyłączone"} przez ${invokedBy.name}`);
});

let giveSuperadmin = new Cmd({ cmd: "givesa", params: { name: "(.+)" }, onlySuperAdmin: true }, (invokedBy, playerName) => {
  const player = room.getPlayerList().filter(player => player.name === playerName)[0];
  if (player && !isSuperAdmin(player)) {
    setSuperAdmin(player);
    sendMessage("");
  }
});

let stopCmdForPlayerByName = new Cmd({cmd: "nocmd", params: { name: "(.+)" }, onlyAdmin: true, helpText: "blokuje komendy dla gracza"}, (invokedBy, playerName) => {
  let players = room.getPlayerList().filter(player => player.name.includes(playerName));

  if (players.length === 1) {
    process(players);
  } else if (!players.length) {
    sendMessage(`${playerName} nie został odnaleziony`);
  } else {
    players = players.filter(player => player.name === playerName);
    if (players.length === 1) {
      process(players);
    } else {
      sendMessage(`Znaleziono wielu graczy pasujących do wzorca ${playerName}`);
    }
  }
  
  function process(players) {
    let player = players[0];
    if (player.id === invokedBy.id) {
      return sendMessage("Nie możesz pozbawić sam siebie możliwości wykonywania komend");
    }
    if (canPlayerInvokeCmd(player)) {
      blockCmdForPlayer(player);
      sendMessage(`Gracz ${player.name} został pozbawiony możliwości wywoływania komend przez ${invokedBy.name}`);
    } else {
      unblockCmdForPlayer(player);
      sendMessage(`Gracz ${player.name} otrzymał możliwość wywoływania komend przez ${invokedBy.name}`);
    }
  }
});

let stopCmdForPlayerById = new Cmd({ cmd: "nocmdid", params: { player_id: "(\\d+)" }, onlyAdmin: true, helpText: "blokuje komendy dla gracza"}, (invokedBy, playerId) => {
  let player = room.getPlayerList().filter(player => player.id === Number(playerId))[0];

  if (player) {
    if (canPlayerInvokeCmd(player)) {
      blockCmdForPlayer(player);
      sendMessage(`Gracz ${player.name} został pozbawiony możliwości wywoływania komend przez ${invokedBy.name}`);
    } else {
      unblockCmdForPlayer(player);
      sendMessage(`Gracz ${player.name} otrzymał możliwość wywoływania komend przez ${invokedBy.name}`);
    }
  } else {
    sendMessage(`Gracz o ID ${playerId} nie został odnaleziony`);
  }
});

let pauseGameCmd = new Cmd({ cmd: "p", showInChat: true }, (invokedBy) => {
  if (invokedBy.team !== 0) {
    if (nextPauseAction) {
      sendMessage(`Gra zatrzymana przez gracza ${invokedBy.name}`);
    } else {
      sendMessage(`Gra wznowiona przez gracza ${invokedBy.name}`);
    }
    room.pauseGame(nextPauseAction);
  }
});

let randomTeams = new Cmd({cmd: "random", params: { team_size: "(\\d+)" }, showInChat: true, onlyAdmin: true}, (invokedBy, playersInTeam) => {
  playersInTeam = Number(playersInTeam);
  let players = room.getPlayerList().filter(player => player.id !== 0);
  players = players.filter(player => player.team !== 0 || !isPlayerAfk(player));

  if (playersInTeam * 2 > players.length) {
    return sendMessage(`Nie ma wystarczającej liczby graczy (pomijając graczy AFK) aby wylosować ${playersInTeam}-osobowe drużyny`);
  }

  const freePlayers = players.filter(player => player.team === 0);
  const redPlayers = players.filter(player => player.team === 1);
  const bluePlayers = players.filter(player => player.team === 2);

  if (redPlayers.length > playersInTeam || bluePlayers.length > playersInTeam) {
    return sendMessage(`Drużyny są liczniejsze niż ${playersInTeam} graczy, musisz przenieść zawodników na ławkę`);
  }

  function getFreePlayer() {
    let randomId = getRandomInt(0, freePlayers.length - 1);
    let player = freePlayers[randomId];
    freePlayers.splice(randomId, 1);
    return player;
  }

  while (freePlayers && (redPlayers.length < playersInTeam || bluePlayers.length < playersInTeam)) {
    let message = "";

    if (redPlayers.length < playersInTeam) {
      let player = getFreePlayer();
      room.setPlayerTeam(player.id, 1);
      redPlayers.push(player);
      message += `${player.name} ==> Red, `;
    }

    if (bluePlayers.length < playersInTeam) {
      let player = getFreePlayer();
      room.setPlayerTeam(player.id, 2);
      bluePlayers.push(player);
      message += `${player.name} ==> Blue, `;
    }

    sendMessage(message);
  }
});

cmdManager = new CmdManager();
cmdManager.add(mutePlayerByName);
cmdManager.add(mutePlayerById);
cmdManager.add(silentMutePlayerByName);
// cmdManager.add(silentMutePlayerById);
cmdManager.add(superAdminLogin);
cmdManager.add(adminLogout);
cmdManager.add(clearBans);
// cmdManager.add(loadClassicMap);
// cmdManager.add(loadBigMap);
cmdManager.add(listPlayerGoals);
cmdManager.add(listPlayerStats);
cmdManager.add(listPlayerCmds);
cmdManager.add(listAdminCmds);
cmdManager.add(freeSlotCmd);
cmdManager.add(randomTeams);
cmdManager.add(listPlayers);
cmdManager.add(listTopPlayers);
cmdManager.add(goalInfoCmd);
cmdManager.add(giveSuperadmin);
cmdManager.add(stopCmdForPlayerByName);
cmdManager.add(stopCmdForPlayerById);
cmdManager.add(clearMutes);
cmdManager.add(clearNoCmdPlayers);
cmdManager.add(muteAll);
cmdManager.add(toggleChat);
cmdManager.add(muteNewPlayers);
cmdManager.add(listPlayerAssists);
cmdManager.add(listTopAssistingPlayers);
cmdManager.add(setPlayerAfkCmd);
cmdManager.add(setPlayerBackCmd);
cmdManager.add(listAfkPlayers);
cmdManager.add(listTopOGPlayers);
cmdManager.add(listPlayerOwnGoals);
cmdManager.add(pauseGameCmd);

// href to functions
function blockChangeStadium(newStadiumName, byPlayer) {
  if ( (byPlayer.name != "Jakub Piotrowski v2.0" && byPlayer.id != 0) || !isSuperAdmin(byPlayer)) {
    room.setCustomStadium(maps.futsal);
    sendMessage("Nie wolno zmieniać mapy");
  }
}

function startGame() {
  ball.kickedBy = null;
  ball.touchedBy = null;
  ball.assistingPlayer = null;

  let players = room.getPlayerList().filter(player => player.team !== 0 && isPlayerAfk(player));
  if (players.length === 1) {
    sendMessage(`Gracz ${players[0].name} jest AFK`);
    room.pauseGame(true);
  } else if (players.length > 1) {
    sendMessage(`Gracze ${players.map(player => player.name).join(", ")} są AFK`);
    room.pauseGame(true);
  }

  timeForEndMatch = 0;
  timeLimitReached = false;
}

function checkInGame() {
  let players = room.getPlayerList();
  let ballPosition = room.getBallPosition();
  let ballRadius = 10;
  let playerRadius = 15;
  let triggerDistance = ballRadius + playerRadius + 0.01;


  for (let player of players) {
    if (!player.position) continue;

    let distanceToBall = pointDistance(player.position, ballPosition);
    if (distanceToBall < triggerDistance) {
      updateAssistingPlayer(player);

      let time = Date.now();
      let touch = { time, player };
      ball.touchedBy = touch;
    }
  }
  var scores = room.getScores()

  if (scores.time > timeForEndMatch + 10 * 5 * 6 ) {
    timeforEndMatch = scores.time;
    room.stopGame();
    room.sendChat("Koniec meczu. Proszę wybrać nowe drużyny"); // after 5 minutes
  }

  if (!timeLimitReached && scores.time >= (scores.timeLimit + 1)) {
    timeLimitReached = true;
    room.sendChat("Zostały dwie minuty dodatkowego czasu gry") // 3:01 room.sendChat
  }

}


function playerChangeTeam(player) {
  if (player.id === 0) {
    room.setPlayerTeam(0, 0);
  }

  if (player.team !== 0 && isPlayerAfk(player)) {
    sendMessage(`Gracz ${player.name} jest AFK`);
    room.pauseGame(true);
  }
}
function leavePlayer(player) {
  unsetPlayerAfk(player);
  unsetSuperAdmin(player);
  updateAdmins();
  if (player.team !== 0 && room.getScores()) {
    let players = room.getPlayerList().filter(player => player.team === 0 && !isPlayerAfk(player));
    players = players.filter(player => player.id !== 0);
    if (players.length) {
      room.pauseGame(true);
      sendMessage("Gracz z boiska opuścił serwer. Są dostępni gracze na ławce.");
    }
  }
}

function newPlayer(player) {
  updateAdmins();
  if (config.muteNewPlayers) {
    mutePlayer(player);
  }
  sendMessage(`${player.name} - miło Cię widzieć 😊😊😊`)
}

function changeAdmin(changedPlayer, byPlayer) {
  if (!changedPlayer.admin && (isSuperAdmin(changedPlayer) || authenticatedAdmins.includes(changedPlayer.id) && !isSuperAdmin(byPlayer))) {
    if (byPlayer !== null && byPlayer.name !== game.playerName) {
      room.setPlayerAdmin(changedPlayer.id, true);
      room.setPlayerAdmin(byPlayer.id, false);

      sendMessage("Próba odebrania uprawnień adminowi wyższej rangi!");
    }
  }
}

function kickPlayer(kickedPlayer, reason, ban, byPlayer) {
  if (isSuperAdmin(kickedPlayer) || authenticatedAdmins.includes(kickedPlayer.id) && !isSuperAdmin(byPlayer)) {
    if (ban) room.clearBans();
    room.kickPlayer(byPlayer.id, "Tak się bawić nie będziemy", true);
  }

  let banInfo = {};
  banInfo.banned = kickedPlayer.name;
  banInfo.admin = byPlayer.name;
  banInfo.reason = reason;
  banInfo.isBan = ban;
  banInfo.time = new Date();

  if (!bans[byPlayer.id]) {
    bans[byPlayer.id] = [];
  }
  bans[byPlayer.id].unshift(banInfo);


  if (!authenticatedAdmins.includes(byPlayer.id) && !isSuperAdmin(byPlayer)) {
    let playerBans = bans[byPlayer.id].filter(ban => ban.isBan);
    if (playerBans.length >= 5) {
      let lastBan = playerBans[0];
      let banToCompare = playerBans[4];
      let dateDiff = lastBan.time - banToCompare.time;
      if (dateDiff <= 1000 * 60 * 5) {
        clearAllBans("Admina");
        room.kickPlayer(byPlayer.id, "żegnaj trollu", true);
      }
    }
  }
}

function teamGoal(team) {
  let scorer;

  if (ball.kickedBy && ball.touchedBy) {
    if (ball.kickedBy.time > ball.touchedBy.time) {
      scorer = ball.kickedBy.player;
    } else {
      scorer = ball.touchedBy.player; //we want goals only after kicks by player
      // scorer = ball.kickedBy.player; 
    }
  } else if (ball.kickedBy) {
    scorer = ball.kickedBy.player;
  } else if (ball.touchedBy) {
    // scorer = ball.touchedBy.player; case when one player on pitch only TOUCHED ball - is very 
    scorer = "troll strzelec";
  }

  const players = room.getPlayerList().filter(player => player.id !== 0)
  if (players.length > 4) {  // goal since 5 players(without host) on
    if (scorer) {
      let ownGoal = scorer.team !== team;
      let assistOccured = ball.assistingPlayer && !ownGoal && ball.assistingPlayer.team === team && ball.assistingPlayer.id !== scorer.id;

      if (config.showGoalInfo) {
        let message = `Gola ${ownGoal ? "samobójczego" : ""} zdobył gracz ${scorer.name}`; // message after goal/owngoal
        if (assistOccured) {
          message += ` (${ball.assistingPlayer.name})`; // +message after assists
        }
        sendMessage(message);
      }

      if (ownGoal) {
        let score = ownGoals[scorer.name] || 0;
        ownGoals[scorer.name] = score + 1;
      } else {
        let score = goals[scorer.name] || 0;
        goals[scorer.name] = score + 1;
      }

      if (assistOccured) {
        let score = assists[ball.assistingPlayer.name] || 0;
        assists[ball.assistingPlayer.name] = score + 1;
      }
    }
  }
  ball.kickedBy = null;
  ball.touchedBy = null;
}

function messageFromChat(player, message) {
  if (message.startsWith(prefixes.cmd)) { // "!"
    if (!canPlayerInvokeCmd(player)) return false;

    let showMessage = parseCmd(player, message.substring(1));
    return showMessage && (!isPlayerMuted(player) && config.chatEnabled || isSuperAdmin(player));
  }

  return !isPlayerMuted(player) && config.chatEnabled || isSuperAdmin(player);
}

function ballKick(player) {
  updateAssistingPlayer(player);
  let time = Date.now();
  let kick = { time, player };
  ball.kickedBy = kick;
}

function parseCmd(player, message) {
  let cmd = cmdManager.findCmd(message);
  if (cmd) {
    if (cmd.canPlayerExecute(player)) {
      let response = cmdManager.extractArguments(cmd, message);
      if (response.error) {
        sendMessage(response.error, player);
      } else {
        let args = response.args;
        args.unshift(player);
        cmd.execute(args);
      }
      return cmd.showInChat;
    }

    return false;
  }

  return !message.includes("login");
}

function sendMessage(message, initiator) {
  if ((!initiator || !isPlayerMuted(initiator)) && (config.chatEnabled || initiator && isSuperAdmin(initiator))) {
    room.sendChat(prefixes.message + message);
  }
}

function isPlayerMuted(player) {
  return mutedPlayers.includes(player.id);
}

function mutePlayer(player) {
  mutedPlayers.push(player.id);
}

function unmutePlayer(player) {
  let index = mutedPlayers.indexOf(player.id);
  if (index !== -1) {
    mutedPlayers.splice(index, 1);
  }
}

function isSuperAdmin(player) {
  return superAdmins.includes(player.id);
}

function setSuperAdmin(player) {
  superAdmins.push(player.id);
}

function unsetSuperAdmin(player) {
  let index = superAdmins.indexOf(player.id);
  if (index !== -1) {
    superAdmins.splice(index, 1);
  }
}

function canPlayerInvokeCmd(player) {
  return !noCmdPlayers.includes(player.id);
}

function blockCmdForPlayer(player) {
  noCmdPlayers.push(player.id);
}

function unblockCmdForPlayer(player) {
  let index = noCmdPlayers.indexOf(player.id);
  if (index !== -1) {
    noCmdPlayers.splice(index, 1);
  }
}

function showMapCmds() {
  // sendMessage(`Wpisz ${prefixes.cmd}big lub ${prefixes.cmd}futsal aby załadować mapę futsalową`);
  sendMessage('Nie zmieniamy mapy');
}

function updateAdmins() {
  const players = room.getPlayerList().filter(player => player.id != 0);
  if (players.length == 0) return;
  if (players.find(player => player.admin) != null) return;

  let id = getRandomInt(0, players.length - 1);
  let newAdmin = players[id];
  room.setPlayerAdmin(newAdmin.id, true);

  sendMessage(`Gracz ${newAdmin.name} został wytypowany na Admina`);
  sendMessage(`Player ${newAdmin.name} has been arbitrary chosen as Admin`);
  showMapCmds();
}
function freeSlot(invokedBy) {
  const players = room.getPlayerList().filter(player => player.id !== 0);
  if (players.length !== game.maxPlayers) return;

  for (let player of players) {
    if (player.team === 0 && !player.admin && !isSuperAdmin(player)) {
      return room.kickPlayer(player.id, "Potrzebny slot");
    }
  }

  for (let player of players) {
    if (!player.admin && !isSuperAdmin(player)) {
      return room.kickPlayer(player.id, "Potrzebny slot");
    }
  }

  for (let player of players) {
    if (!isSuperAdmin(player)) {
      if (invokedBy !== undefined && invokedBy.id !== player.id) {
        return room.kickPlayer(player.id, "Potrzebny slot");
      }
    }
  }

  sendMessage("Musisz ręcznie wyrzucić gracza z pokoju");
  console.log("You must kick player manually, all players are privileged");
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearAllBans(initiator) {
  room.clearBans();
  sendMessage(`Bany zostały skasowane przez ${initiator}`);
}

function clearAllMutes(initiator) {
  mutedPlayers = [];
  if (initiator) {
    sendMessage(`Wszyscy wyciszeni gracze zostali odciszeni przez ${initiator}`);
  }
}

function clearAllNoCmdPlayers(initiator) {
  noCmdPlayers = [];
  sendMessage(`Wszyscy gracze bez możliwości używania komend dostali ją z powrotem od ${initiator}`);
}

function isPlayerAfk(player) {
  return afkPlayers.includes(player.id);
}

function setPlayerAfk(player) {
  afkPlayers.push(player.id);
  if (player.team !== 0) {
    room.setPlayerTeam(player.id, 0);
  }
}

function unsetPlayerAfk(player) {
  let index = afkPlayers.indexOf(player.id);
  if (index !== -1) {
    afkPlayers.splice(index, 1);
  }
}

function updateAssistingPlayer(initiatingPlayer) {
  let candidate = null;

  if (ball.kickedBy && ball.touchedBy) {
    if (ball.kickedBy.time > ball.touchedBy.time) {
      candidate = ball.kickedBy.player;
    } else {
      candidate = ball.touchedBy.player;
    }
  } else if (ball.kickedBy) {
    candidate = ball.kickedBy.player;
  } else if (ball.touchedBy) {
    candidate = ball.touchedBy.player;
  }

  if (candidate && candidate.id !== initiatingPlayer.id) {
    ball.assistingPlayer = candidate;
  }
}

function showAfkPlayers(invokedBy) {
  let players = room.getPlayerList().filter(player => isPlayerAfk(player));

  let line = players.length ? "Gracze AFK: " : "Aktualnie nie ma graczy zadeklarowanych AFK";
  while (players.length) {
    let tmp = players.splice(0, 5);
    line += tmp.map(player => player.name).join(", ");
    sendMessage(line, invokedBy);
    line = "";
  }
}

function pointDistance(p1, p2) {
  let d1 = p1.x - p2.x;
  let d2 = p1.y - p2.y;
  return Math.sqrt(d1 * d1 + d2 * d2);
}
function showNotificationAboutAFK() {
  sendMessage("Użyj !afk aby zasygnalizować nieobecność");
  let delay = 500;
  setTimeout(() => {
    sendMessage("Wpisz !jj aby oznajmić powrót");
    setTimeout(() => {
      sendMessage("Aby zobaczyć kto jest AFK wprowadź !lafk");
    }, delay)
  }, delay)
}
/* code for download and load stats but doesnt work
function download(data, filename, type) {
  var file = new Blob([data], { type: type });
  var a = document.createElement("a"),
    url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}


function backupServerData() {
  let data = {};
  data.goals = goals;
  data.assists = assists;
  data.ownGoals = ownGoals;
  data.bans = bans;

  let jsonData = JSON.stringify(data);
  download(jsonData, "server_stats.txt", "text/plain");

}

function restoreServerData(dataContent) {

  let data = JSON.parse(dataContent);

  if (data.goals) {
    goals = data.goals;
  }
  if (data.assists) {
    assists = data.assists;
  }
  if (data.ownGoals) {
    ownGoals = data.ownGoals;
  }
  if (data.bans) {
    bans = data.bans;
  }
}


function loadData() {goals: {}, assists: {}, ownGoals:{ } };
*/

function saveDatawithLS(){ // two functions to save&&load stats with interval in the same time. if u dont close tab you have always access to window.localStorage.getItem
  let stats = {};
  stats.goals = goals;
  stats.assists = assists;
  stats.ownGoals = ownGoals;
  let val = JSON.stringify(stats);
  window.localStorage.setItem("stats", val);
}

function loadDatawithLS(){
  let stats;
  if (!(localStorage.getItem("stats"))) { // checking for the first use
    stats = {};
  } else { stats = JSON.parse(localStorage.getItem("stats"));
  goals = stats.goals;
  assists = stats.assists;
  ownGoals = stats.ownGoals;
  }
}

// i've changed code responsible for save&&load,so i've used this func, structures same as loaddata..() 1 difference stats ={ goals: {...}, assists: {...}, ownGoals: {...} } and record values to goals,assists,owngoals...
// firstLoadData(); 
let clearBansInterval = setInterval(clearAllBans, 1000 * 60 * 30, "JP 2.0");
let clearMutesInterval = setInterval(clearAllMutes, 1000 * 60 * 30, "JP 2.0");
let clearNoCmdInterval = setInterval(clearAllNoCmdPlayers, 1000 * 60 * 60, "JP 2.0");
let backupServerDataInterval = setInterval(saveDatawithLS, 10000);
let loadBackupServerDataInterval = setInterval(loadDatawithLS, 10000);

let afkNotificationInterval = setInterval(showNotificationAboutAFK, 1000 * 60 * 15);
events = {
	tutorial: {
		npcs: {
			greeter: {
				convs: {
					"init": {
						answers: {
							"whatNow": "reqName",
							"skip": "reqName",
							"introduce": (npc) => {
								do {
									player.name = prompt(lang.misc_enterName)
								} while (player.name == null || player.name == "")
								npc.convStatus = "personalQInt"
							}
						}
					},
					"reqName": {
						answers: {
							"introduce": (npc) => {
								do {
									player.name = prompt(lang.misc_enterName)
								} while (player.name == null || player.name == "")
								npc.convStatus = "personalQInt"
							},
							"decline": "decName"
						}
					},
					"decName": {
						mood: "annoyed",
						answers: {
							"giveUp": (npc) => {
								do {
									player.name = prompt(lang.misc_enterName)
								} while (player.name == null || player.name == "")
								npc.convStatus = "personalQInt"
							}
						}
					},
					"personalQInt": {
						replace: [
							() => player.name
						],
						answers: {
							"cat": "personalQOut",
							"dog": "personalQOut",
						}
					},
					"personalQOut": {
						answers: {
							"defensive": "final",
							"curious": "final"
						}
					},
					"final": {
						update: (npc, lastNpc) => {
							if (!lastNpc || !lastNpc.equals(npc.pos)) npc.convStatus = "after"
						},
						begin: (npc) => {
							setBlock([0, 4], 0)
						}
					},
					"after": {}
				}
			},
			trainer: {
				convs: {
					init: {
						answers: {
							accept: () => {
								game.player.items.push(items.pickaxe.create("stone"))

								return "order"
							}
						}
					},
					order: {
						update: (npc) => {
							var done = true
							for (let pos of [[7, -1], [8, -1], [9, -1], [7, -2], [8, -2], [9, -2], [7, -3], [8, -3], [9, -3]]) {
								if (getBlock(pos) != 0) {
									done = false
									break
								}
							}
							if (done) npc.convStatus = "final"
						}
					},
					final: {
						update: (npc, lastNpc) => {
							if (!lastNpc || !lastNpc.equals(npc.pos)) npc.convStatus = "reenter"
						}
					}
				}
			},
			ambBlocked: {
				convs: {
					init: {
						update: (npc) => {
							if (getBlock([5, 13]) == 0) {
								npc.convStatus = "final"
								player.money += 20
							}
						}
					}
				}
			}
		}
	}
}
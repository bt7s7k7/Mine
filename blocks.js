blocks = [
	{ //0
		draw: (pos) => {
			util.drawTileBox(pos, colors.voidGrey)
		},
		name: lang.tile_air,
		minable: false,
		walkable: true,
		walkTime: 1,
		transparent: true
	},
	{ //1
		draw: (pos) => {
			util.drawTileBox(pos, util.makeVariedColor([127, 127, 127], pos, 50))
		},
		name: lang.tile_stone,
		hardness: 0,
		minable: true,
		walkable: false,
		onMine: (pos) => {
			setBlock(pos, 0)
			util.giveMaterial("cobble", 1)
		},
		mineTime: 1,
		transparent: false
	},
	{ //2
		draw: (pos) => {
			util.drawBricks(pos, colors.orange.mul(0.9), colors.orange)

		},
		name: lang.tile_wall,
		hardness: 1,
		minable: true,
		walkable: false,
		onMine: (pos) => {
			setBlock(pos, 0)
			util.giveMaterial("clay", 1)
		},
		mineTime: 1,
		transparent: false
	},
	{ //3
		draw: (pos) => {
			blocks[2].draw(pos)
		},
		name: lang.tile_comp_wall,
		hardness: Infinity,
		minable: false,
		walkable: false,
		transparent: false
	},
	{ //4
		draw: (pos) => {
			util.drawTileBox(pos, colors.aqua.mul(0.5))
			repeat(2, i => {
				var [x, y] = transform(pos).add([-1, 0])
				var [xe, ye] = transform(pos.add([1, 1]))
				var ya = y.lerp(ye, Math.random(1, false, animTimer(Infinity, 1) ^ i + pos[1]))
				ctx.setColor(colors.aqua).line([x, ya], [xe, ya])
			})
		},
		name: lang.tile_forceField,
		hardness: Infinity,
		minable: false,
		walkable: false,
		transparent: true
	},
	{ //5
		draw: (pos) => {
			blocks[0].draw(pos)
			var npc = game.npcs[pos[0] + ":" + pos[1]]
			util.drawHuman(pos, npc.color)
		},
		name: lang.tile_npc,
		minable: false,
		walkable: false,
		transparent: true
	},
	{ //6
		draw: (pos) => {
			util.drawTileBox(pos, colors.voidGrey)
			util.drawTileBox(pos.add([0.1, 0.75]), [255, 213, 150], [0.8, 0.25])
			util.drawTileBox(pos, colors.brown, [1, 0.8])
		},
		name: lang.tile_table,
		minable: false,
		walkable: false,
		transparent: true
	},
	{ //7
		draw: (pos) => {
			if (pos.join(":") in game.npcProxies) {
				if (game.npcProxies[pos.join(":")].block in blocks) {
					blocks[game.npcProxies[pos.join(":")].block].draw(pos)
				} else util.drawTileBox(pos, colors.pink)
			} else {
				util.drawTileBox(pos, colors.pink)
			}
		},
		name: (pos) => {
			if (pos.join(":") in game.npcProxies) {
				if (game.npcProxies[pos.join(":")].block in blocks) {
					return blocks[game.npcProxies[pos.join(":")].block].name
				} else return "ERR: Invalid NPCProxy block (" + game.npcProxies[pos.join(":")].block + ")"
			} else {
				return "ERR: Invalid NPCProxy, not found"
			}
		},
		minable: false,
		walkable: false,
		transparent: true
	},
	{ //8
		draw: (pos) => {
			util.drawTileBox(pos,colors.voidGrey)
			var begin = transform(pos.add([0.2, 0.2]))
			var size = transformSize([0.6, 0.6])
			var width = transformSize([0.1, 0])[0]
			ctx.setColor(colors.yellow).box(begin, size)
				.setColor(colors.brown)
				.rect(begin, size, width)
				.line(begin, begin.add(size), width)
		},
		walkable: false,
		minable: true,
		transparent: true,
		mineTime: 1,
		hardness: 0,
		onMine: (pos) => {
			setBlock(pos, 0)
			var toGive = Math.random(30, true)
			game.player.money += toGive
			log(makeLocal(lang.msg_moneyGot,toGive))
		},
		name: lang.tile_lootBox_money
	}
]
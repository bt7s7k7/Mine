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
		mineTime: 0.5,
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
				var ya = y.lerp(ye, Math.random(1, false, animTimer(Infinity, 1) ^ i))
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
			util.drawHuman(pos,npc.color)
		},
		name: lang.tile_npc,
		minable: false,
		walkable: false,
		transparent: true
	}
]
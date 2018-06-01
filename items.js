items = {
	pickaxe: {
		materials: {
			stone: {
				mineLevel: 1,
				name: lang.item_stonePick,
				maxDurability: 100,
				canBreak: true
			}
		},
		mineLevels: [
			lang.b_stone,
			lang.b_coal,
			lang.b_diamond,
			lang.b_obsidian,
			lang.b_cobalt
		],
		create: (materialName, mineLevelOverride = null, canBreak = null, durOverride = null, nameOverride = null, special = {}) => {
			var material = items.pickaxe.materials[materialName]
			if (typeof material != "object") throw new Error("Material " + materialName + " does not exist")
			return {
				mineLevel: (typeof mineLevelOverride == "number") ? mineLevelOverride : material.mineLevel,
				name: (typeof nameOverride == "string") ? nameOverride : material.name,
				maxDurability: (typeof durOverride == "number") ? durOverride : material.maxDurability,
				durability: (typeof durOverride == "number") ? durOverride : material.maxDurability,
				canBreak: (typeof canBreak == "boolean") ? canBreak : material.canBreak,
				type: "pickaxe",
				special
			}
		},
		getName: (item) => {
			return item.name + " " + (item.canBreak ? "(" : "[") + item.durability + "/" + item.maxDurability + (item.canBreak ? ")" : "]")
		},
		getDesc: (item) => {
			return item.name + "\n" + lang.abs_dur + ": " + item.durability + "/" + item.maxDurability + "\n" + lang.abs_mineLevel + ": " + (item.mineLevel >= 0 && item.mineLevel < mineLevels.length ? mineLevels[item.mineLevel] : item.mineLevel) + "\n " + lang.abs_canBreak + ": " + item.canBreak.toString()
		},
		use: (item, pos) => {
			var block = blocks[getBlock(pos)]
			if (block.minable) {
				if (block.hardness <= item.mineLevel) {
					if (item.durability > 0) {
						block.onMine(pos)
						log(makeLocal(lang.msg_mined, block.name, block.mineTime))
						item.durability--
						if (item.durability <= 0) {
							log(makeLocal(lang.msg_itemBroken, item.name))
							return true
						}
					} else {
						log(makeLocal(lang.msg_pickBroken, item.name))
					}
				} else {
					log(makeLocal(lang.msg_blockTooHard(block.name, item.name)))
				}
			} else {
				log(makeLocal(lang.msg_blockNotMinable, block.name))
			}
		}
	}
}
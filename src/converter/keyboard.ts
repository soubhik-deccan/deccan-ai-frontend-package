export function convertCharacter(
	char: string,
	shift: boolean,
	mainLayoutShiftSplit: string[][],
	mainLayoutSplit: string[][],
	supportLayoutShiftSplit: string[][],
	supportLayoutSplit: string[][]
): string {
	let val;
	if (shift) {
		val = char;
		const _eShiftLayout = mainLayoutShiftSplit;
		const _tShiftLayout = supportLayoutShiftSplit;
		for (let i = 0; i < _eShiftLayout.length; i++) {
			const index = _eShiftLayout[i].indexOf(val);
			if (index !== -1) {
				const res = ignoreCharacters(
					_tShiftLayout[i][index]
				);
				return res;
			}
		}
	} else {
		val = char.toLowerCase();
		const _eLayout = mainLayoutSplit;
		const _tLayout = supportLayoutSplit;

		for (let i = 0; i < _eLayout.length; i++) {
			const index = _eLayout[i].indexOf(val);
			if (index !== -1) {
				const res = ignoreCharacters(_tLayout[i][index]);
				return res;
			}
		}
	}
	return char;
}

export const ignoreCharacters = (val: string) => {
	if (["{//}"].includes(val)) {
		return "";
	}
	return val;
};

export const applySplitOnLayout = (
	layout: string[]
): string[][] => {
	return layout.map((row) => row.split(" "));
};

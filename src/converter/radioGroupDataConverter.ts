type TInputItemProps = {
	question: string;
	answer: string;
	reason?: string;
};

type TOutputProps = {
	selectedOptions: { [key: string]: string };
	supportedTexts: { [key: string]: string };
};

export const convertArrayToObject = (
	input: TInputItemProps[] | null | undefined
): TOutputProps => {
	if (!input) {
		return {
			selectedOptions: {},
			supportedTexts: {},
		};
	}

	return input.reduce(
		(acc, item) => {
			acc.selectedOptions[item.question] =
				item.answer || "";
			acc.supportedTexts[item.question] = item.reason || "";
			return acc;
		},
		{
			selectedOptions: {},
			supportedTexts: {},
		} as TOutputProps
	);
};

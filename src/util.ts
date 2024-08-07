/**
 * Thanks chatGPT
 * @param x number of days before today
 * @returns array of strings in 'yyyy-MM-dd' format
 */
export const generateXDaysFormatyyyyMMdd = (x: number): string[] => {
	const dates: string[] = []; // Array to hold the formatted dates
	const currentDate = new Date(); // Starting point is today

	for (let i = 0; i < x; i++) {
		// Format the date as 'yyyy-MM-dd'
		const formattedDate = currentDate.toISOString().split("T")[0];

		// Push the formatted date into the array
		dates.push(formattedDate);

		// Subtract one day
		currentDate.setDate(currentDate.getDate() - 1);
	}

	return dates;
};

/**
 * @returns today string in 'yyyy-MM-dd' format
 */
export const getTodayYyyyMmDd = (): string => {
	return generateXDaysFormatyyyyMMdd(1)[0];
};

/**
 * @returns yesterday string in 'yyyy-MM-dd' format
 */
export const getYesterdayYyyyMmDd = (): string => {
	return generateXDaysFormatyyyyMMdd(2)[1];
};

/**
 * @returns day before yesterday string in 'yyyy-MM-dd' format
 */
export const getDayBeforeYesterdayYyyyMmDd = (): string => {
	return generateXDaysFormatyyyyMMdd(3)[2];
};

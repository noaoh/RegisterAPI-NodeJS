export let formatDate = (dateToFormat: Date): string => {
	return (dateToFormat.getFullYear() + "-"
		+ ("0" + (dateToFormat.getMonth() + 1)).slice(-2) + "-"
		+ ("0" + dateToFormat.getDate()).slice(-2) + "T"
		+ ("0" + dateToFormat.getHours()).slice(-2) + ":"
		+ ("0" + dateToFormat.getMinutes()).slice(-2) + ":"
		+ ("0" + dateToFormat.getSeconds()).slice(-2) + ".");
};


// adapted from https://stackoverflow.com/questions/10134237/javascript-random-integer-between-two-numbers#10134261ToFormat.getMilliseconds().toString());
/**
 * Returns a random number between min and max (inclusive)
 */
export const randomFloat = (min: number, max: number): number => {
	return Math.random() * (max - min) + min;
};

/**
 * Returns a random integer between min and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export const randomInt = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

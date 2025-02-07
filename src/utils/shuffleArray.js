// Implementation of Fisher-Yates Shuffle algorithm to pick random data from the API and display cards in a random order
export default function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		// Move backwards through the array
		const j = Math.floor(Math.random() * (i + 1)); // Pick a random element in the array

		const temp = array[i];
		array[i] = array[j]; // Switch the last element of the array with the random element that was picked
		array[j] = temp;
	}
	return array;
}

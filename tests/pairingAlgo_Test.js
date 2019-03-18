  import { pairingAlgo } from '../Algorithim/pairingAlgo.js';

  const ara = [{mentor:'ab', mentee:'cd', score:40},{mentor:'ab', mentee:'dc', score:20},{mentor:'ba', mentee:'cd', score:60},{mentor:'ba', mentee:'dc', score:30}];
  const menteess = [];
  const mentors = [];
  let ara1 = new Map();
/**
* Takes an object property and creates an array of just one attribute 
*takes ine array and ine attribute.
*/
console.log(addToSeperateArray(ara, "menteess", mentees))
console.log(addToSeperateArray(ara, "mentorss", mentors)) 

/**
* Should Log an Array of all mentees
*/



/**
*Should create a map of all Mentor Mentee score pairings.
*/

fillMap(ara,ara1);
console.log(ara1)

/**
*Should print a map of all Mentor Mentee score pairings.
*/

/**
*Should get the score of a Mentor Mentee pairing.
*/
console.log(getScore(ara1,menntorss[1],menteess[1]))
/**
*Should return the score of Mentor[1] & Mentee[1].
*/


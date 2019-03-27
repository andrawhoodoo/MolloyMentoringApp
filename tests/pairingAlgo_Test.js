  import { pairingAlgo } from '../Algorithim/pairingAlgo.js';

  const ara = [
{mentor:'a', mentee:'1', score:10},{mentor:'b', mentee:'1', score:20},{mentor:'c', mentee:'1', score:30},{mentor:'d', mentee:'1', score:90},
{mentor:'a', mentee:'2', score:40},{mentor:'b', mentee:'2', score:50},{mentor:'c', mentee:'2', score:60},{mentor:'d', mentee:'2', score:40},
{mentor:'a', mentee:'3', score:70},{mentor:'b', mentee:'3', score:80},{mentor:'c', mentee:'3', score:90},{mentor:'d', mentee:'3', score:80},
{mentor:'a', mentee:'4', score:30},{mentor:'b', mentee:'4', score:60},{mentor:'c', mentee:'4', score:40},{mentor:'d', mentee:'4', score:10}
];
  const ara2 = [{mentor:'ab', mentee:'cd', score:40},{mentor:'ab', mentee:'dc', score:20},{mentor:'ba', mentee:'cd', score:60}];
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
* Should Log an Array of all mentors
*/
console.log('')
/**
*Should create a map of all Mentor Mentee score pairings.
*/
fillMap(ara,ara1);
console.log(ara1)
/**
*Should print a map of all Mentor Mentee score pairings.
*/
console.log('')
/**
*Should get the score of a Mentor Mentee pairing.
*/
console.log(getScore(ara1,menntorss[1],menteess[1]))
/**
*Should return the score of Mentor[1] & Mentee[1].
*/
console.log('')
/**
*Should get a subArray from an array without whatever index is selected.
*/
let blek = subArray(2,menntorss)
console.log(blek)
/**
*Should return an array without index 2.
*/
console.log('')
/**
*Should get the score of an array.
*/
console.log(getArrayScore(ara))
/**
*Should return the score of ara.
*/
console.log('')
/**
*Should get the max array.
*/
console.log(maxArray(ara,ara2))
/**
*Should return the higher scoring array.
*/
console.log('')

//Time it took to comeplete an array of 16 pairs
let time = new Date().getTime();
let a1 = findBestPairs(mentors,0,menteess,ara1);
console.log(a1);
console.log(new Date().getTime() - time);
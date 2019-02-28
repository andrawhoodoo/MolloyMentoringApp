import {Scores} from '../api/scores'
import {MentorPairs} from '../api/mentorPairs'

const ara = Scores.find({}).fetch();

let addToSepArray = (pull,pullFor,arr) => 
  for(let i = 0; i<pull.length; i++){
   if(pull[i].pullFor != (for(let j = 0; j<pull.length; j++){return arr[j]})){
     arr.push(pull[i].pullFor)
   }
  }
};

const mentees = [];
const mentors = [];
addToSepArray(ara,mentee,mentees);
addToSepArray(ara,mentor,mentors);

let memo = new Map();
let ara1 = new Map();

let fillMap = (arr,map) =>{
  for(let i = 0; i<arr.length-1; i++){
    map.set((arr[i].mentor + arr[i].mentee), arr[i].score)
  }
};

fillMap(ara,ara1);

let getScore = (map, mentor, mentee) =>{
  return map.get(mentor+mentee)
};

let subArray = (index, arr) => {
  let acc = [];
  for(let i = 0; i < mentors.length; i++){
    if(i != index){
      acc.push(mentors[i])
    }
  }
  return acc
};

let getArrayScore = (arr) =>{
  let acc = 0;
  for(let i = 0; i<arr.length; i++){
    acc = acc + arr[i].score
  }
  return acc
};

let maxArray = (arr1,arr2) =>{
  if(getArrayScore(arr1) > getArrayScore(arr2)){
    return arr1
  }
  else return arr2
};

let findBestPairs = (mentors,indexM,mentees,mapOfScores) =>{
  let makeTable = (index,acc) => {
    if(index < mentors.length){
      if(memo.has(indexM)){return memo.get(indexM)}
      else{ memo.set(indexM,
      makeTable(index+1, maxArray(bestPairs(mentors,indexM+1, subArray(index,mentees)).concat({mentor:mentor[indexM], mentee:mentee[index], score:getScore(mapOfScores,mentor[indexM],mentee[index])}), acc)))
      return memo.get(indexM)
      }
    }
    else return acc
  }
  makeTable(0,[])
};

let writeToDB = (arr) => {
  for(let i=0; i<arr.length; i++){
    MentorPairs.insert({mentorId:arr[i].mentor, menteeId:arr[i].mentee})
  }
}

writeToDB(findBestPairs(mentors,0,mentees,ara1));
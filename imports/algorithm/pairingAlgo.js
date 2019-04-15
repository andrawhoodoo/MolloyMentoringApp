import { Meteor } from 'meteor/meteor';
import { MentorPairs } from '../api/mentorpairs';
import { Answers } from '../api/answers';
import { Scores } from '../api/scores';
import { Groups } from '../api/groups';

Meteor.subscribe('answersData');
Meteor.subscribe('scoresData');
Meteor.subscribe('groupsData');


export const pair = groupId => {

const currentGroup = Groups.findOne({_id:groupId});
    let currentSurveyId = currentGroup.surveyId;
    let mentorsPool = currentGroup.mentors_pool;
    let menteesPool = currentGroup.mentees_pool;
    let ara = [];


let scoreAnswers = (array1, array2) => {
  let currentScore = 0;
  for(let i=0; i < array1.length; i++) {
    if(array1[i].selections === array2[i].selections) {
      currentScore = currentScore + 1;
    }
  }
  // Convert score to decimal from 0-1
  currentScore = (currentScore/array1.length);
  return currentScore;
};

let createAra = () => {
  for(let i = 0; i < mentorsPool.length; i++) {
     const mentorAnswers = Answers.find({userId: mentorsPool[i], surveyId: currentSurveyId}).fetch();
      for(let j = 0; j < menteesPool.length; j++) {
          const menteeAnswers = Answers.find({userId: menteesPool[j], surveyId: currentSurveyId}).fetch();
          ara.push({mentor: mentorsPool[i], mentee: menteesPool[j], score: scoreAnswers(mentorAnswers, menteeAnswers)});
      }
    }
};

createAra();
  
  const mentees = menteesPool;
  const mentors = mentorsPool;
  let ara1 = new Map();

  let fillMap = (arr,map) =>{
    for(let i = 0; i<arr.length; i++){
      map.set((arr[i].mentor + arr[i].mentee), arr[i].score)
    }
  };

  fillMap(ara,ara1);

  let getScore = (map, mentor, mentee) =>{
    return map.get(mentor+mentee)
  };
  
  let subArray = (index, arr) => {
    let acc = [];
    for(let i = 0; i < arr.length; i++){
      if(i != index){
        acc.push(arr[i])
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
      if(indexM < mentors.length){
        if(index < mentees.length){
          return makeTable(index+1, maxArray(findBestPairs(mentors,indexM+1, subArray(index,mentees),mapOfScores).concat([{mentor:mentors[indexM], mentee:mentees[index], score:getScore(mapOfScores,mentors[indexM],mentees[index])}]), acc))
        }
        else return acc
      }
      else return acc
    };
    return makeTable(0,[])
  };

  let writeToDB = (arr) => {
    for(let i=0; i<arr.length; i++){
      Meteor.call('createPair', arr[i].mentor, arr[i].mentee, groupId);
      //MentorPairs.insert({mentorId:arr[i].mentor, menteeId:arr[i].mentee})
    }
  }
  writeToDB(findBestPairs(mentors,0,mentees,ara1));
}
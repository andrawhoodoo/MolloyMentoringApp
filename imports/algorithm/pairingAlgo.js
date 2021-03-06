import { Meteor } from 'meteor/meteor';
import { Groups } from '../api/groups';
import { Scores } from '../api/scores';
import { MentorPairs } from '../api/mentorpairs';

Meteor.subscribe('scoresData');
Meteor.subscribe('groupsData');


export const pair = groupId => {
  const myGroup = Groups.findOne({_id: groupId});
  const surveyId = myGroup.surveyId;
  const ara = Scores.find({surveyId: surveyId}).fetch();
  let addToSepArray = (pull,pullFor,arr) => {
    for(let i = 0; i<pull.length; i++) {
      if(arr.indexOf(pull[i][pullFor]) == -1){
        arr.push(pull[i][pullFor]);
      }
    }
  };
  
  const mentees = [];
  const mentors = [];
  addToSepArray(ara,"mentee",mentees);
  addToSepArray(ara,"mentor",mentors);

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
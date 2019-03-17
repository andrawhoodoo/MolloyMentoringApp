import { Meteor } from 'meteor/meteor';

import { Answers } from '../api/answers';
import { Scores } from '../api/scores';
import { Groups } from '../api/groups';

Meteor.subscribe('answersData');
Meteor.subscribe('scoresData');
Meteor.subscribe('groupsData');


export const scoreGroupMembers = groupId => {
  let currentGroup = Groups.findOne({_id:groupId});
  let currentSurveyId = currentGroup.surveyId;
  
  let mentorsPool = currentGroup.mentors_pool;
  let menteesPool = currentGroup.mentees_pool;

  /**
   * given arrays of answers from Answers db, decide if option selected is the same for each question answered. increase score for matched answers.
   */
  const scoreAnswers = (array1, array2) => {
    let currentScore = 0;
    for(let i=0; i < array1.length - 1; i++) {
      for(let j=0; j < array2.length - 1; j++) {
        if(array1[i].selections === array2[j].selections) {
          currentScore = currentScore + 1;
        }
      }
    }
    // Convert score to decimal from 0-1
    currentScore = currentScore/array1.length;
    return currentScore;
  };
  for(let i = 0; i < mentorsPool.length - 1; i++) {
    const mentorAnswers = Answers.find({userId: mentorsPool[i].id, surveyId: currentSurveyId});
    for(let j = 0; j < menteesPool.length - 1; j++) {
      const menteeAnswers = Answers.find({userId: menteesPool[j].id, surveyId: currentSurveyId});
      Meteor.call('addScore', mentorsPool[i].id, menteesPool[j].id, currentSurveyId, scoreAnswers(mentorAnswers, menteeAnswers));
    }
  }
}
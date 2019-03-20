import { Meteor } from 'meteor/meteor';

import { Answers } from '../api/answers';
import { Scores } from '../api/scores';
import { Groups } from '../api/groups';

Meteor.subscribe('answersData');
Meteor.subscribe('scoresData');
Meteor.subscribe('groupsData');


/**
* given arrays of answers from Answers db, decide if option selected is the same for each question answered. increase score for matched answers.
*/
const scoreAnswers = (array1, array2) => {
	let currentScore = 0;
	for(let i=0; i < array1.length; i++) {
		if(array1[i].selections === array2[i].selections) {
			currentScore = currentScore + 1;
		}
	}
	// Convert score to decimal from 0-1
	console.log('total score: ', currentScore);
	currentScore = (currentScore/array1.length);
	console.log('percent score: ', currentScore);
	return currentScore;
};

export const scoreGroupMembers = groupId => {
	let currentGroup = Groups.findOne({_id:groupId});
  	let currentSurveyId = currentGroup.surveyId;

  	let mentorsPool = currentGroup.mentors_pool;
  	let menteesPool = currentGroup.mentees_pool;

  	for(let i = 0; i < mentorsPool.length; i++) {
    	const mentorAnswers = Answers.find({userId: mentorsPool[i], surveyId: currentSurveyId}).fetch();
		console.log(mentorAnswers);
    	for(let j = 0; j < menteesPool.length; j++) {
      		const menteeAnswers = Answers.find({userId: menteesPool[j], surveyId: currentSurveyId}).fetch();
      		Meteor.call('addScore', mentorsPool[i], menteesPool[j], currentSurveyId, scoreAnswers(mentorAnswers, menteeAnswers));
    	}
  	}
}
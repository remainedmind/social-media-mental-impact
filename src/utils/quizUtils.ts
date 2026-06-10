export type ProfileId = 'anchor' | 'spectator' | 'connected' | 'fatigue';

export interface QuizResult {
  score: number;
  profileId: ProfileId;
  titleKey: any; // We'll use any here or generic string to avoid tight coupling in utils
  descriptionKey: any;
  philosophicalConceptKey: any;
  insightKey: any;
}

export const getResultFromScore = (score: number): QuizResult => {
  if (score <= 8) {
    return {
      score,
      profileId: 'anchor',
      titleKey: "quiz.resTitle1",
      descriptionKey: "quiz.resDesc1",
      philosophicalConceptKey: "quiz.resPhil1",
      insightKey: "quiz.resIns1"
    };
  } else if (score <= 12) {
    return {
      score,
      profileId: 'spectator',
      titleKey: "quiz.resTitle2",
      descriptionKey: "quiz.resDesc2",
      philosophicalConceptKey: "quiz.resPhil2",
      insightKey: "quiz.resIns2"
    };
  } else if (score <= 16) {
    return {
      score,
      profileId: 'connected',
      titleKey: "quiz.resTitle3",
      descriptionKey: "quiz.resDesc3",
      philosophicalConceptKey: "quiz.resPhil3",
      insightKey: "quiz.resIns3"
    };
  } else {
    return {
      score,
      profileId: 'fatigue',
      titleKey: "quiz.resTitle4",
      descriptionKey: "quiz.resDesc4",
      philosophicalConceptKey: "quiz.resPhil4",
      insightKey: "quiz.resIns4"
    };
  }
};

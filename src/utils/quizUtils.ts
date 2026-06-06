export interface QuizResult {
  score: number;
  profileId: 'anchor' | 'spectator' | 'connected' | 'fatigue';
  title: string;
  description: string;
  philosophicalConcept: string;
  insight: string;
}

export const getResultFromScore = (score: number): QuizResult => {
  if (score <= 8) {
    return {
      score,
      profileId: 'anchor',
      title: "The Anchored (Grounded and Present)",
      description: "You use social media when you need to, but it doesn't control your day. You're comfortable putting the phone down and just being in the real world.",
      philosophicalConcept: "Stoic Control (Focusing on what's in your power)",
      insight: "You've figured out how to draw a line between what's on the screen and your actual peace of mind. Keep protecting those quiet, offline moments."
    };
  } else if (score <= 12) {
    return {
      score,
      profileId: 'spectator',
      title: "The Spectator (The Silent Scroller)",
      description: "You don't post much, but you spend a lot of time watching from the sidelines. While it feels harmless, you might be using digital noise to fill every single quiet space in your day.",
      philosophicalConcept: "Pascal's Diversion (Avoiding the quiet room)",
      insight: "It's easy to scroll just to avoid being alone with your thoughts. Try leaving your phone in another room for 10 minutes today and see how it feels."
    };
  } else if (score <= 16) {
    return {
      score,
      profileId: 'connected',
      title: "The Hyper-Connected (Living for the Feed)",
      description: "You are deeply caught in the posting and validation loop. You feel a constant urge to check reactions, which can make you feel like you're performing a version of yourself rather than just living.",
      philosophicalConcept: "Baudrillard's Simulacra (The copy replacing the real)",
      insight: "You might find yourself editing a copy of your life for others to double-tap. Try doing something fun today—like a walk or a meal—without taking a single photo."
    };
  } else {
    return {
      score,
      profileId: 'fatigue',
      title: "The Fatigue-Bound (The Burned Out Scroller)",
      description: "You feel exhausted, empty, or anxious after using your phone, but opening the apps has become an automatic habit. You've hit digital burnout.",
      philosophicalConcept: "Byung-Chul Han's Fatigue Society (We exploit ourselves)",
      insight: "You don't need to be more productive or optimize your screen time. The best fix is just permission to stop, close the tabs, and do absolutely nothing for a bit."
    };
  }
};

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
      title: "Kotwica (Obecny i uziemiony)",
      description: "Korzystasz z mediów społecznościowych wtedy, kiedy potrzebujesz, ale nie kontrolują one Twojego dnia. Bez problemu potrafisz odłożyć telefon i po prostu być w świecie rzeczywistym.",
      philosophicalConcept: "Stoicka kontrola (Skupienie na tym, co leży w naszej mocy)",
      insight: "Wiesz, jak wyznaczyć granicę między ekranem a własnym spokojem ducha. Pielęgnuj te chwile ciszy offline."
    };
  } else if (score <= 12) {
    return {
      score,
      profileId: 'spectator',
      title: "Widz (Cichy obserwator)",
      description: "Rzadko publikujesz, ale spędzasz sporo czasu na bezgłośnym obserwowaniu tablicy. Choć wydaje się to nieszkodliwe, możesz używać cyfrowego szumu, by zagłuszyć każdą wolną chwilę ciszy w ciągu dnia.",
      philosophicalConcept: "Rozrywka Pascala (Ucieczka przed samotnością w pokoju)",
      insight: "Łatwo jest przewijać ekran, byle tylko nie zostać sam na sam ze swoimi myślami. Spróbuj dziś zostawić telefon w innym pokoju na 10 minut i zobacz, jak się z tym czujesz."
    };
  } else if (score <= 16) {
    return {
      score,
      profileId: 'connected',
      title: "Hiper-Połączony (Życie pod tablicę)",
      description: "Tkwisz głęboko w pętli publikowania i szukania aprobaty. Odczuwasz ciągłą potrzebę sprawdzania reakcji, przez co możesz czuć, że odgrywasz rolę przed innymi, zamiast po prostu żyć.",
      philosophicalConcept: "Symulakry Baudrillarda (Kopia zastępująca rzeczywistość)",
      insight: "Możesz złapać się na tworzeniu kopii swojego życia na pokaz. Spróbuj dziś zrobić coś przyjemnego — pójść na spacer lub zjeść posiłek — bez robienia ani jednego zdjęcia."
    };
  } else {
    return {
      score,
      profileId: 'fatigue',
      title: "Wyczerpany (Syzyf przewijania)",
      description: "Po korzystaniu z telefonu czujesz zmęczenie, pustkę lub lęk, ale otwieranie aplikacji stało się już automatycznym nawykiem. Doświadczasz cyfrowego wypalenia.",
      philosophicalConcept: "Społeczeństwo zmęczenia Byung-Chul Hana (Autoeksploatacja)",
      insight: "Nie musisz być bardziej produktywny ani optymalizować czasu przed ekranem. Najlepszym lekarstwem jest pozwolenie sobie na zatrzymanie się, zamknięcie kart i robienie absolutnie niczego przez chwilę."
    };
  }
};

import os
from fpdf import FPDF

class DigitalDetoxPDF(FPDF):
    def header(self):
        # Draw a terracotta colored line at the top
        self.set_fill_color(184, 125, 103) # terracotta #b87d67
        self.rect(0, 0, 210, 5, "F")
        
    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.set_text_color(94, 102, 97) # #5e6661
        self.cell(0, 10, f'Echa Ekranu | Strona {self.page_no()} z {self.pages_count}', align='C')

def create_guide_pdf():
    pdf = DigitalDetoxPDF()
    
    # Load Arial system font that supports Polish characters
    font_path = '/System/Library/Fonts/Supplemental/Arial.ttf'
    font_bold_path = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
    font_italic_path = '/System/Library/Fonts/Supplemental/Arial Italic.ttf'
    
    pdf.add_font('Arial', '', font_path)
    pdf.add_font('Arial', 'B', font_bold_path)
    pdf.add_font('Arial', 'I', font_italic_path)
    
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.alias_nb_pages()
    
    # PAGE 1: COVER & INTRODUCTION
    pdf.add_page()
    
    # Background tint (Warm stone paper: #f7f3ed -> 247, 243, 237)
    pdf.set_fill_color(247, 243, 237)
    pdf.rect(0, 5, 210, 292, "F")
    
    pdf.set_y(40)
    # Title
    pdf.set_font('Arial', 'B', 28)
    pdf.set_text_color(33, 38, 35) # #212623 deep charcoal
    pdf.multi_cell(0, 12, "ECHA EKRANU", align='C')
    
    pdf.ln(5)
    # Subtitle
    pdf.set_font('Arial', 'B', 16)
    pdf.set_text_color(184, 125, 103) # #b87d67 terracotta
    pdf.multi_cell(0, 8, "Twój Przewodnik po Cyfrowym Wytchnieniu", align='C')
    
    pdf.ln(5)
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(94, 102, 97) # #5e6661
    pdf.cell(0, 6, "Projekt semestralny z zakresu etyki cyfrowej i praktycznej filozofii", new_x="LMARGIN", new_y="NEXT", align='C')
    
    # Divider line
    pdf.ln(10)
    pdf.set_draw_color(184, 125, 103)
    pdf.set_line_width(0.5)
    pdf.line(40, pdf.get_y(), 170, pdf.get_y())
    
    # Intro Content
    pdf.ln(15)
    pdf.set_font('Arial', 'B', 13)
    pdf.set_text_color(33, 38, 35)
    pdf.cell(0, 8, "Dlaczego potrzebujemy cyfrowego detoksu?", new_x="LMARGIN", new_y="NEXT", align='L')
    
    pdf.ln(4)
    pdf.set_font('Arial', '', 10.5)
    pdf.set_text_color(33, 38, 35)
    
    intro_p1 = (
        "W świecie zdominowanym przez algorytmy i nieustanny szum informacyjny łatwo zgubić "
        "kontakt z samym sobą. Każdy polubienie, powiadomienie i chwila spędzona na bezwiednym "
        "przewijaniu tablicy wyczerpują nasze zasoby dopaminy. Przekształcamy nasze realne życie "
        "w cyfrowe obrazy, żyjąc bardziej dla wirtualnego awatara niż dla siebie."
    )
    pdf.multi_cell(0, 6.5, intro_p1)
    
    pdf.ln(6)
    intro_p2 = (
        "Ten krótki przewodnik powstał po to, aby pomóc Ci zrobić krok wstecz. Nie chodzi o całkowite "
        "odrzucenie technologii, ale o odzyskanie kontroli nad własną uwagą i przywrócenie obecności "
        "w świecie offline."
    )
    pdf.multi_cell(0, 6.5, intro_p2)
    
    # Quote box
    pdf.ln(15)
    pdf.set_fill_color(230, 237, 230) # sage green light: #e6ede6
    pdf.set_draw_color(122, 140, 120) # sage green: #7a8c78
    pdf.set_line_width(1)
    
    # Draw standard quote card
    pdf.set_font('Arial', 'I', 10.5)
    pdf.set_text_color(33, 38, 35)
    
    quote_text = (
        "\"Żyjemy w świecie, w którym jest coraz więcej informacji, a coraz mniej znaczenia.\"\n"
        "— Jean Baudrillard, Symulakry i symulacja"
    )
    pdf.multi_cell(0, 6.5, quote_text, border="L", fill=True)
    
    # PAGE 2: 5-DAY CHALLENGE
    pdf.add_page()
    
    # Background tint
    pdf.set_fill_color(247, 243, 237)
    pdf.rect(0, 5, 210, 292, "F")
    
    pdf.set_y(15)
    pdf.set_font('Arial', 'B', 18)
    pdf.set_text_color(184, 125, 103)
    pdf.cell(0, 10, "5-Dniowe Wyzwanie Cyfrowego Detoksu", new_x="LMARGIN", new_y="NEXT", align='C')
    
    pdf.ln(5)
    pdf.set_font('Arial', '', 10)
    pdf.set_text_color(94, 102, 97)
    pdf.multi_cell(0, 5, "Wprowadzaj te małe zmiany stopniowo, dzień po dniu. Obserwuj, jak reaguje Twój umysł.", align='C')
    
    challenges = [
        ("Dzień 1: Poranna cisza", "Przez pierwszą godzinę po przebudzeniu nie dotykaj telefonu. Zamiast tego zjedz spokojne śniadanie, popatrz przez okno lub zrób krótką rozciąganie. Zauważ, jak brak porannej stymulacji wpływa na resztę Twojego dnia."),
        ("Dzień 2: Kwarantanna powiadomień", "Wyłącz wszystkie powiadomienia w telefonie oprócz bezpośrednich połączeń i wiadomości tekstowych od bliskich. Wyłącz plakietki (czerwone kropki) na ikonach aplikacji społecznościowych."),
        ("Dzień 3: Spacer offline", "Idź na 30-minutowy spacer zupełnie bez telefonu. Zostaw go w domu lub wyłącz w kieszeni. Skup się wyłącznie na dźwiękach natury, krokach i własnych przemyśleniach."),
        ("Dzień 4: Strefa wolna od ekranu", "Wyznacz w domu strefę, w której ekrany są całkowicie zakazane. Może to być łóżko w sypialni lub stół kuchenny. Telefon zostaw w innym pomieszczeniu. Odkryj przestrzeń bez pingu."),
        ("Dzień 5: Radykalna nuda", "Usiądź wygodnie w ciszy na 10 minut bez żadnego zajęcia (telefonu, książki, muzyki). Pozwól swoim myślom swobodnie płynąć. Zaakceptuj nudę jako przestrzeń do refleksji.")
    ]
    
    pdf.ln(5)
    for title, desc in challenges:
        # Day card container
        pdf.set_fill_color(250, 248, 245) # card bg: #faf8f5
        pdf.set_draw_color(227, 221, 213) # border: #e3ddd5
        pdf.set_line_width(0.5)
        
        # Title
        pdf.set_font('Arial', 'B', 11)
        pdf.set_text_color(184, 125, 103)
        pdf.cell(0, 7, title, border=1, new_x="LMARGIN", new_y="NEXT", align='L', fill=True)
        
        # Description
        pdf.set_font('Arial', '', 9.5)
        pdf.set_text_color(33, 38, 35)
        pdf.multi_cell(0, 5, desc, border=1, align='L', fill=True)
        pdf.ln(3)
        
    # PAGE 3: MEDITATIONS & SUPPORT
    pdf.add_page()
    
    # Background tint
    pdf.set_fill_color(247, 243, 237)
    pdf.rect(0, 5, 210, 292, "F")
    
    pdf.set_y(15)
    pdf.set_font('Arial', 'B', 15)
    pdf.set_text_color(33, 38, 35)
    pdf.cell(0, 10, "Trzy myśli na gorsze chwile", new_x="LMARGIN", new_y="NEXT", align='L')
    
    meditations = [
        ("1. Zależność i wolność (Byung-Chul Han)", "Współczesny świat uczy nas, że musimy być stale widoczni i produktywni. Kiedy czujesz przymus przewijania tablicy lub odpisania na powiadomienie, zatrzymaj się. Prawdziwa wolność to także wolność do nieuczestniczenia i do odpoczynku."),
        ("2. Rzeczywistość kontra kopia (Jean Baudrillard)", "Profile społecznościowe to tylko symbole, wyreżyserowane kopie naszego życia. Nie porównuj swojego wnętrza ze skrupulatnie ułożonymi cyfrowymi obrazami innych ludzi. Twoje prawdziwe, codzienne, nieidealne chwile są cenniejsze niż ich wirtualny odpowiednik."),
        ("3. Skupienie na tym, co Twoje (Mądrość stoicka)", "Algorytmy społecznościowe są zaprojektowane tak, by przechwytywać Twoją uwagę. Nie masz wpływu na to, co algorytm próbuje Ci pokazać, ale masz pełną kontrolę nad tym, jak na to reagujesz. Ty decydujesz, kiedy odkładasz telefon.")
    ]
    
    pdf.ln(3)
    for m_title, m_desc in meditations:
        pdf.set_font('Arial', 'B', 11)
        pdf.set_text_color(122, 140, 120) # sage
        pdf.cell(0, 6, m_title, new_x="LMARGIN", new_y="NEXT", align='L')
        pdf.set_font('Arial', '', 9.5)
        pdf.set_text_color(33, 38, 35)
        pdf.multi_cell(0, 5.5, m_desc)
        pdf.ln(5)
        
    # Crisis support box
    pdf.ln(5)
    pdf.set_fill_color(240, 229, 225) # terracotta soft bg
    pdf.set_draw_color(184, 125, 103)
    pdf.set_line_width(1)
    
    # Outer rect for support banner
    pdf.set_font('Arial', 'B', 13)
    pdf.set_text_color(184, 125, 103)
    pdf.cell(0, 8, " Pamiętaj, nie jesteś sam", border=1, new_x="LMARGIN", new_y="NEXT", align='L', fill=True)
    
    pdf.set_font('Arial', '', 9.5)
    pdf.set_text_color(33, 38, 35)
    support_text = (
        "Jeśli czujesz się przytłoczony, samotny lub Twoje samopoczucie stale się pogarsza, "
        "nie wahaj się szukać profesjonalnej pomocy. W Polsce działają bezpłatne i anonimowe infolinie wsparcia:\n\n"
        "• Telefon Zaufania dla Dzieci i Młodzieży: 116 111 (całodobowo)\n"
        "• Kryzysowy Telefon Zaufania dla Dorosłych: 116 123 (codziennie 14:00 - 22:00)\n"
        "• Fundacja Twarze Depresji: twarzedepresji.pl\n\n"
        "Wyloguj się z sieci, zaloguj do życia. Zadbaj o siebie."
    )
    pdf.multi_cell(0, 5.5, support_text, border=1, align='L', fill=True)
    
    # Save the file
    output_path = '/Users/remainedmind/ESSE/IT/Web/MikadoDiploma/public/cyfrowy_detoks_przewodnik.pdf'
    pdf.output(output_path)
    print(f"PDF successfully generated at: {output_path}")

if __name__ == "__main__":
    create_guide_pdf()

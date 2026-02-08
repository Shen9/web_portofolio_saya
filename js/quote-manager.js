// Daily Quote Manager
class DailyQuoteManager {
    constructor() {
        this.quotes = [
            "I don't rush. I build things that last.",
            "Silence is where I think best.",
            "Progress doesn't need applause.",
            "I choose clarity over noise.",
            "Not everything needs to be shared.",
            "I work quietly. Results speak.",
            "I'm not slow. I'm deliberate.",
            "Consistency beats intensity.",
            "I trust logic more than hype.",
            "Calm mind. Clear execution.",
            "I don't chase attention. I build value.",
            "Thinking is my unfair advantage.",
            "Depth matters more than speed.",
            "I move forward, even if no one notices.",
            "Simple ideas. Serious execution.",
            "If there is no way, then make one."
        ];
        
        this.storageKey = 'dailyQuote';
        this.dateKey = 'quoteDate';
    }
    
    /**
     * Get today's date in YYYY-MM-DD format
     */
    getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    /**
     * Get random quote
     */
    getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        return this.quotes[randomIndex];
    }
    
    /**
     * Get the current quote for the day
     */
    getDailyQuote() {
        const today = this.getTodayDate();
        const savedDate = localStorage.getItem(this.dateKey);
        const savedQuote = localStorage.getItem(this.storageKey);
        
        // Jika sudah ada quote untuk hari ini, return quote tersebut
        if (savedDate === today && savedQuote) {
            return savedQuote;
        }
        
        // Jika tanggal berbeda atau belum ada quote, generate quote baru
        const newQuote = this.getRandomQuote();
        localStorage.setItem(this.storageKey, newQuote);
        localStorage.setItem(this.dateKey, today);
        
        return newQuote;
    }
    
    /**
     * Initialize and display the quote
     * Updates both hero section and quote-of-the-day box
     */
    init(elementId = 'dailyQuote') {
        const quote = this.getDailyQuote();
        
        // Update hero section
        const heroElement = document.getElementById(elementId);
        if (heroElement) {
            heroElement.textContent = `"${quote}"`;
            heroElement.style.animation = 'fadeInQuote 0.8s ease-in';
        }
        
        // Update quote-of-the-day box
        const quoteOfTheDayElement = document.getElementById('quoteOfTheDay');
        if (quoteOfTheDayElement) {
            quoteOfTheDayElement.textContent = `"${quote}"`;
            quoteOfTheDayElement.style.animation = 'fadeInQuote 0.8s ease-in';
        }
        
        return quote;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const quoteManager = new DailyQuoteManager();
    quoteManager.init('dailyQuote');
});

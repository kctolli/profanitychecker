import dictionary from "./Profanity-Dictionary.json";

export default class ProfanityChecker {
    private readonly word: string;

    public constructor (word = "") {
        this.word = word;
    }

    public isClean = () => this.hasBadWord().length === 0;
    public isProfane = () => !this.isClean() || false;

    /**
     * Check for the presence of bad words in the input word.
     *
     * @return {Array} list of bad words with their language
     */
    private hasBadWord() {
        if (!this.word) return [];

        const badWordsList = dictionary.filter(value => {
            const pattern = new RegExp(`\\b${value['word']}\\b`, 'iu');
            return pattern.test(this.word);
        });

        return badWordsList.map(value => ({
            language: value['language'],
            word: value['word'],
        }));
    }

    /***********************************************
     * Public static methods
    ************************************************/
    public static readonly dictionary = dictionary;
    public static getDictionary = () => dictionary;

    /**
     * Retrieves a dictionary of words for a specific language.
     *
     * @param {string} language - The language for which the dictionary is to be retrieved
     * @return {string[]} The array of words in the specified language
     */
    public static getDictionaryByLanguage = (language) => {
        const dictionaryLang = []
        dictionary.map((item) => {
            if (item.language == language) {
                // @ts-ignore
                dictionaryLang.push(item?.word);
            }
        })
        return dictionaryLang;
    };

    /**
     * Retrieves a list of bad words based on the specified locale.
     *
     * @param {string} locale - The locale for which to retrieve the bad words. Defaults to an empty string.
     * @return {string[]} The list of bad words based on the specified locale, or the default dictionary if no locale is provided.
     */
    public static getBadWords = (locale = "") => 
        !locale ? dictionary : ProfanityChecker.getDictionaryByLanguage(locale);
    
    /**
     * Retrieves the number of bad words in the specified locale.
     *
     * @param {string} locale - The locale for which to retrieve the number of bad words. Defaults to an empty string.
     * @return {number} The number of bad words in the specified locale, or the default dictionary if no locale is provided.
     */
    public static getNumberOfBadWords = (locale = "") => 
        ProfanityChecker.getBadWords(locale).length;
}

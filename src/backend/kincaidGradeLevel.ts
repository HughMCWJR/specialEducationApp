export function getGradeLevelOfSentence(sentence: string): number {

    let totalSyllables = 0;
    let totalWords = 0;
    const totalSentences = 1;

    const vowels = ['a','e','i','o','u',"y"];
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'z'];

    const characters = sentence.split("");

    let justSawVowel = false;
    let inWord = false;

    for (const character of characters) {

        const isVowel = vowels.includes(character);
        const isConsonant = isVowel ? false : consonants.includes(character);

        if (!inWord && (isVowel || isConsonant)) {

            inWord = true;
            totalWords += 1;

        }

        if (inWord) {

            if (isVowel) {

                if (!justSawVowel) {

                    justSawVowel = true;
                    totalSyllables += 1;
                    
                }

            } else if (isConsonant) {

                justSawVowel = false;

            } else if (character === " ")
                inWord = false;

        }

    }

    const gradeLevel = 0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59;

    console.log(sentence);
    console.log(totalWords);
    console.log(totalSyllables);
    console.log(gradeLevel);

    return gradeLevel;

}
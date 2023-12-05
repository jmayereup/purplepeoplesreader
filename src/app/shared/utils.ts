export function addLineBreaks(text: string): string {
    let result = text.replace(/(?<!Mr|Mrs|Dr|Ms)([.?!"])\s+/g, '$1\n');
    result = result.replace(/(\*|\#)/gm, '');
    return result;
}

export function removeLineBreaks(str: string): string {
    return str.replace(/(\r\n|\n|\r|\*|\#)/gm, '');
}

export function extractWord(line: string) {
    let lineArray: Array<string> = line.split(/:|-/);
    return lineArray;
}


export const languages = [
    { name: "Arabic", code: "ar" },
    { name: "Chinese", code: "zh-CN" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en-CA" },
    { name: "Filipino", code: "fil" },
    { name: "French", code: "fr" },
    { name: "German", code: "de-AT" },
    { name: "Hindi", code: "hi" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Korean", code: "ko" },
    { name: "Portuguese", code: "pt" },
    { name: "Russian", code: "ru" },
    { name: "Spanish", code: "es-MX" },
    { name: "Thai", code: "th" },
    { name: "Ukrainian", code: "uk" }
];

export function assignLanguageCode(languageName: string) {
    const language = languages.find(lang => {
        return lang.name.toLowerCase() === languageName.toLowerCase()
    });
    return language?.code || 'en-CA';

}



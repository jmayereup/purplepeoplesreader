import { LessonsLanguageOptions, LessonsTagsOptions } from "./pocketbase-types";

export function stripMarkdown(text: string): string {
    return text
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove image tags
        .replace(/\[.*?\]\(.*?\)/g, '') // Remove link tags
        .replace(/[`*_{}[\]()#+\-!]/g, '') // Remove other Markdown characters, but keep periods
        .replace(/(^|\s)(#{1,6}\s)(.*)/g, '$1$3') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Bold text
        .replace(/\*(.*?)\*/g, '$1') // Italic text
        .replace(/~~(.*?)~~/g, '$1') // Strikethrough
        .replace(/>`+/g, ''); // Blockquotes
}

export function addLineBreaks(text: string): string {
    let result = text.replace(/(?<!Mr|Mrs|Dr|Ms)([.?!"])\s+/g, '$1\n');
    result = result.replace(/(\**|\#)/gm, '');
    return result;
}


export function addLineBreaksWithTranslatedDivs(text: string): string {
    
  
    // const cleanText = removeMD(text);
    const cleanText = stripMarkdown(text);

    let result: string = cleanText.replace(/(?<!Mr|Mrs|Dr|Ms)([¿¡.?!"])\s+/g, '$1\n');

    // Duplicate each div and add class/attribute
    const translatedDivs: string[] = [];
    const originalDivs = result.split('\n');

    originalDivs.forEach((line: string) => {
        if(line.trim().length > 0) {
            translatedDivs.push(`<div class="original" translate="no">${line}</div>`);
            translatedDivs.push(`<div class="translated" translate="yes">${line}</div>`);
        }
    });

    // Join the original and translated divs
    result = translatedDivs.join('\n');

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
    { name: "Chinese", code: "zh" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en" },
    { name: "Filipino", code: "fil" },
    { name: "French", code: "fr" },
    { name: "German", code: "de" },
    { name: "Hindi", code: "hi" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Korean", code: "ko" },
    { name: "Portuguese", code: "pt" },
    { name: "Russian", code: "ru" },
    { name: "Spanish", code: "es" },
    { name: "Thai", code: "th" },
    { name: "Ukrainian", code: "uk" }
];

export function assignLanguageCode(languageName: string) {
    const language: { name: string, code: string } | undefined = languages.find(lang => {
        return lang.name.toLowerCase() === languageName.toLowerCase();
    });
    return language?.code || 'en-CA';
}

export const TAG_VALUES = Object.values(LessonsTagsOptions);
export const LANG_VALUES = Object.values(LessonsLanguageOptions);



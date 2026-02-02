import { useState, useEffect } from 'react';

const VERSES = [
    { text: "For where two or three are gathered in my name, there am I among them.", reference: "Matthew 18:20" },
    { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", reference: "Joshua 1:9" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
    { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", reference: "Isaiah 40:31" },
    { text: "The Lord is my shepherd, I lack nothing.", reference: "Psalm 23:1" },
    { text: "I can do all this through him who gives me strength.", reference: "Philippians 4:13" },
    { text: "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11" },
    { text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.", reference: "Lamentations 3:22-23" },
    { text: "Let all that you do be done in love.", reference: "1 Corinthians 16:14" },
    { text: "And we know that in all things God works for the good of those who love him.", reference: "Romans 8:28" },
    { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7" },
    { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", reference: "Proverbs 18:10" },
    { text: "He enables my feet like hinds' feet, and sets me on my high places.", reference: "Habakkuk 3:19" },
    { text: "My flesh and my heart may fail, but God is the strength of my heart and my portion forever.", reference: "Psalm 73:26" },
    { text: "A friend loves at all times, and a brother is born for a time of adversity.", reference: "Proverbs 17:17" },
    { text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself.", reference: "Matthew 6:34" },
    { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28" },
    { text: "I have fought the good fight, I have finished the race, I have kept the faith.", reference: "2 Timothy 4:7" },
    { text: "The Lord is near to all who call on him, to all who call on him in truth.", reference: "Psalm 145:18" },
    { text: "Do not be overcome by evil, but overcome evil with good.", reference: "Romans 12:21" },
];

export function useWeeklyVerse() {
    const [verse, setVerse] = useState(VERSES[0]);

    useEffect(() => {
        // Calculate the current week number of the year (1-52)
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);
        const week = Math.floor(day / 7);

        // Deterministically select a verse based on the week number
        // The modulo (%) operator ensures it loops back to the start if we have fewer verses than weeks
        const verseIndex = week % VERSES.length;
        
        setVerse(VERSES[verseIndex]);
    }, []);

    return verse;
}

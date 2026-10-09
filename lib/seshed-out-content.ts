/**
 * All Seshed Out — paid content.
 *
 * SERVER ONLY. This file is imported by the /api/seshed-out/content route and
 * nowhere else, so none of this text is shipped to the browser unless the
 * buyer has been verified. Never import it from a "use client" component.
 */

export type Task = { id: string; label: string };

export type Week = {
  id: string;
  number: number;
  days: string;
  theme: string;
  intro: string;
  tasks: Task[];
};

export type Phase = {
  id: string;
  number: number;
  title: string;
  days: string;
  blurb: string;
  tomLine: string;
  weeks: Week[];
};

function tasks(week: number, labels: string[]): Task[] {
  return labels.map((label, i) => ({ id: `w${week}-t${i + 1}`, label }));
}

export const PLAN: Phase[] = [
  {
    id: "phase-1",
    number: 1,
    title: "Cut down and stabilise",
    days: "Days 1-30",
    blurb:
      "The goal of the first month is a smaller, calmer baseline, not a hero streak. You're collecting data and changing the setup so the next two months are easier.",
    tomLine:
      "If your Monday looks worse than your Saturday felt good, the maths isn't working. We're fixing the maths.",
    weeks: [
      {
        id: "w1",
        number: 1,
        days: "Days 1-7",
        theme: "Know your numbers",
        intro:
          "Write down every drink for a week, no judgement. Note where, when, who with, and how you felt the next day.",
        tasks: tasks(1, [
          "Log every drink for 7 days: what, where, who with",
          "Score each next day out of 10 for sleep, mood and energy",
          "Spot your danger hour: when do you most want a drink?",
          "Add up what you spent on drink this week",
          "Read the safety note. If you drink heavily every day, book a chat with your GP before cutting down",
        ]),
      },
      {
        id: "w2",
        number: 2,
        days: "Days 8-14",
        theme: "Reset the house",
        intro:
          "Remove or hide what's in the house. Stock the swaps: decent alcohol-free options, good coffee, something to look forward to at 6pm.",
        tasks: tasks(2, [
          "Clear out or hide the alcohol at home",
          "Buy three swaps you actually like (alcohol-free beer, good coffee, soda and lime)",
          "Pick your 6pm replacement ritual",
          "Put the tracker on your phone home screen",
          "Keep logging drinks and next-day scores",
        ]),
      },
      {
        id: "w3",
        number: 3,
        days: "Days 15-21",
        theme: "Pick your ceiling",
        intro:
          "Choose a weekly limit you can keep, written down in advance. Pick two drink-free days and protect them.",
        tasks: tasks(3, [
          "Write your weekly limit down before the week starts",
          "Choose two drink-free days and put them in your calendar",
          "Tell one person your limit",
          "Plan one social thing that isn't built around drinking",
          "Finish the week under your ceiling",
        ]),
      },
      {
        id: "w4",
        number: 4,
        days: "Days 22-30",
        theme: "The 6pm problem",
        intro:
          "Plan the hard hour (usually the evening). Build a routine for it: walk, shower, espresso, call someone.",
        tasks: tasks(4, [
          "Write your plan for the hardest hour of the day",
          "Use your replacement ritual on five evenings",
          "Note each craving: what triggered it and what helped",
          "Review month one: biggest win, biggest wobble",
          "Reward yourself with something that isn't a drink",
        ]),
      },
    ],
  },
  {
    id: "phase-2",
    number: 2,
    title: "Rebuild",
    days: "Days 31-60",
    blurb:
      "By now you've got a baseline. This month is about what the extra time, money and energy are for, because a plan with nothing to replace the drink eventually fails.",
    tomLine:
      "You didn't give up the sesh, you changed the format. Have an espresso, keep the banter.",
    weeks: [
      {
        id: "w5",
        number: 5,
        days: "Days 31-37",
        theme: "Sleep",
        intro:
          "Fix the basics: fixed wake time, screens off earlier, caffeine cut-off. Notice how the morning feels.",
        tasks: tasks(5, [
          "Pick a fixed wake-up time and hit it five days out of seven",
          "Switch screens off 30 minutes earlier",
          "Set a caffeine cut-off time and stick to it",
          "Rate your morning mood each day",
          "Notice one thing that's better than month one",
        ]),
      },
      {
        id: "w6",
        number: 6,
        days: "Days 38-45",
        theme: "Move",
        intro:
          "Pick one thing you'll actually do: walks, gym, five-a-side. Small and regular beats big and abandoned.",
        tasks: tasks(6, [
          "Choose one activity you'll actually do (walks, gym, five-a-side)",
          "Do three sessions this week",
          "Invite someone to join you",
          "Note how you feel afterwards",
          "Keep your drink-free days",
        ]),
      },
      {
        id: "w7",
        number: 7,
        days: "Days 46-52",
        theme: "The money",
        intro:
          "Add up what you used to spend. Move it somewhere you can see it, whether that's a pot, a treat or a goal.",
        tasks: tasks(7, [
          "Work out what you used to spend on drink each week",
          "Move that amount into a pot you can see",
          "Pick something you want to spend it on",
          "Check what you've saved so far",
          "Tell someone about the goal",
        ]),
      },
      {
        id: "w8",
        number: 8,
        days: "Days 53-60",
        theme: "Your people",
        intro:
          "Tell one person what you're doing. Find the mates who don't need a drink to turn up.",
        tasks: tasks(8, [
          "Tell one person what you're doing",
          "Make two plans that don't involve alcohol",
          "Spend time with the mate who doesn't need a drink to turn up",
          "Review month two: what's changed?",
          "Decide what you'll keep into month three",
        ]),
      },
    ],
  },
  {
    id: "phase-3",
    number: 3,
    title: "Socialising",
    days: "Days 61-90",
    blurb:
      "The last month takes everything you've built into real life: nights out, weddings, work dos and Christmas parties. This is where plans usually break, so keep the Sesh Survival Guide close.",
    tomLine:
      "The aim isn't to avoid the sesh. It's to turn up, enjoy it, and wake up with a good ROI.",
    weeks: [
      {
        id: "w9",
        number: 9,
        days: "Days 61-67",
        theme: "Scout the night",
        intro:
          "Before any event, plan the night: who, where, when you leave, what you'll drink, how you get home.",
        tasks: tasks(9, [
          "Pick an upcoming social event",
          "Plan who, where, when you leave and how you get home",
          "Decide your drink order before you arrive",
          "Tell someone your plan",
          "Read the Sesh Survival Guide",
        ]),
      },
      {
        id: "w10",
        number: 10,
        days: "Days 68-75",
        theme: "The first one",
        intro:
          "Go to one low-stakes social event using the survival guide. Review it the next day.",
        tasks: tasks(10, [
          "Go to one low-stakes social event using the guide",
          "Always have a drink in your hand",
          "Use at least one line from the survival guide",
          "Leave when you planned to",
          "Score the next day and write one line on what worked",
        ]),
      },
      {
        id: "w11",
        number: 11,
        days: "Days 76-82",
        theme: "The hard one",
        intro:
          "Take on the harder event: a big night, a party, a place with old habits. Have your exit plan ready.",
        tasks: tasks(11, [
          "Pick the harder event (big night, party, old habits)",
          "Write your exit plan",
          "Know your danger moment and what you'll do",
          "Leave on your terms",
          "Review the night: what was the ROI?",
        ]),
      },
      {
        id: "w12",
        number: 12,
        days: "Days 83-90",
        theme: "Keep it",
        intro:
          "Decide what stays: your ceiling, your drink-free days, your routines. Write your own rules for the next 90 days.",
        tasks: tasks(12, [
          "Decide your ceiling going forward",
          "Choose which drink-free days stay",
          "Write your own rules for the next 90 days",
          "Give the whole 90 days a final ROI score",
          "Share one win with someone",
        ]),
      },
    ],
  },
];

export const ALL_TASK_IDS: string[] = PLAN.flatMap((p) =>
  p.weeks.flatMap((w) => w.tasks.map((t) => t.id))
);

export const SURVIVAL_GUIDE = {
  title: "The Sesh Survival Guide",
  intro:
    "A night out has three parts. Have a plan for each one, and screenshot this so it's on your phone when you need it.",
  sections: [
    {
      id: "pre",
      title: "Pre-sesh",
      points: [
        "Decide in advance how many drinks you'll have, or that you won't have any. Say it to someone.",
        "Eat properly before you go. Hungry plus social is a bad combination.",
        "Know your exit: when you're leaving, how you're getting home, who knows.",
        "Have your drink order ready, so you're not choosing at the bar.",
      ],
    },
    {
      id: "mid",
      title: "Mid-sesh",
      points: [
        "Always have a drink in your hand, whether it's an alcohol-free beer, soda and lime or an espresso. It stops the \"what are you having?\" questions.",
        "Alternate a soft drink with each alcoholic one if you're drinking.",
        "Pick your danger moment (usually round three) and have a plan for it.",
        "Leave when the night peaks, not when it turns.",
      ],
    },
    {
      id: "post",
      title: "Morning-after",
      points: [
        "Water, food, daylight, a walk. In that order.",
        "Score it: what was the ROI? Write one line about what made it good or bad.",
        "No punishing yourself. One rough night is data, not failure.",
      ],
    },
  ],
  lines: {
    title: "What to say when you're pushed to drink",
    items: [
      {
        situation: "Mates insisting",
        line: "\"Not tonight, I'm on a plan, but I'm staying for the banter.\"",
      },
      {
        situation: "Being bought a round",
        line: "\"I'll take a [soft drink], cheers.\" Say it first, before they order.",
      },
      {
        situation: "Work event",
        line: "\"I'm driving / I've got an early start.\" You don't owe anyone a reason.",
      },
      {
        situation: "Someone who won't drop it",
        line: "\"I'm good, thanks.\" Repeat it, change the subject, move on.",
      },
    ],
  },
};

export const SAFETY_NOTE =
  "If you drink heavily every day, do not stop suddenly without medical advice. Stopping abruptly after heavy, regular drinking can be dangerous, so speak to your GP first. This plan is coaching and structure, not medical care, and it isn't a substitute for either.";

/**
 * Videos. Files live in the PRIVATE Supabase Storage bucket named in
 * VIDEO_BUCKET. Upload them with exactly these file names (or change the
 * names here). Anything missing shows as "coming soon" on the page.
 */
export const VIDEO_BUCKET = "seshed-out-videos";

export const INTRO_VIDEO = {
  file: "intro.mp4",
  title: "Start here: how this works",
  description:
    "Tom explains the plan, what's included and how to use the tracker.",
};

export const EXCLUSIVE_VIDEOS = [
  {
    id: "dd1",
    file: "deep-dive-1.mp4",
    title: "Exclusive Deep Dive 1",
    description: "A full breakdown of a sesh that went wrong.",
  },
  {
    id: "dd2",
    file: "deep-dive-2.mp4",
    title: "Exclusive Deep Dive 2",
    description: "A sesh scored through the lens of ROI.",
  },
  {
    id: "dd3",
    file: "deep-dive-3.mp4",
    title: "Exclusive Deep Dive 3",
    description: "A night out done the new way, scored honestly.",
  },
];

/** Optional downloadable copy of the survival guide, in the same private bucket. */
export const SURVIVAL_GUIDE_PDF = "survival-guide.pdf";

import { H3Event, } from "h3";

declare global {
  interface User {
    id?: string;
    name: string;
    email: string;
    passwd: string;
  }

  interface Lesson {
    id: number
    lang: string
    nativeLang: string
    createUserId: number
    isShare: number
    createdAt: string
    desc: string
    title: string
    interactions: Interaction[]
    tag: string // travel, winter, ...
    urlCover: string
  }

  interface Interaction {
    phrases: string[]
    translations: string[]
    urlImage: string
    videoId: string
    vInit: number
    vEnd: number
    about: string,
  }

  interface DataToken {
    id: number
    email: string
    createdAt: string
    name: string
    birthday: any
    iat: number
    exp: number
  }

  interface ApiEvent extends H3Event {
    dataToken: DataToken
  }

  interface PlayVideo {
    videoId: string,
    startSeconds: number,
    endSeconds: number,
    playbackRate?: 1 | 0.5 | 1.5
  }

  interface Word {
    id: number;
    word: string;
  }

  interface LessonScore {
    hits: number;
    errors: number;
    // time: number;
  }

  //dados do tipo de lesson
  interface InteractionType {
    type: "audio" | "learn" | "learn-audio";
    interaction: Interaction;
    isHit: boolean;
    phrase: string;
    translation: string;
    isInverse: boolean;
    isAcceleratedAudio: boolean;
  }

}
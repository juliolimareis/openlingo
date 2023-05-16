import { userSession, } from "~/server/utils/validations";

export default defineEventHandler(async event => {
  const { id } = userSession(event);

  return db.lesson.findMany({
    where:{ userLesson: { some: { userId: id } } },
    include: { language_lesson_langIdTolanguage: true, language_lesson_nativeLangIdTolanguage: true }
  });
});
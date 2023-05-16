import { userSession, } from "~/server/utils/validations";

export default defineEventHandler(async event => {
  const lessonId = Number(event?.context?.params?.id);
  const { id } = userSession(event);

  const lesson = await db.lesson.findMany({
    where:{
      id: lessonId,
      userLesson: { some: { userId: id } }
    }
  });

  if(!lesson.length){
    createError({ statusCode: 404 });
  }

  return lesson[0];
});
export default defineEventHandler(async event => {
  const id = Number(event?.context?.params?.id);

  if(id){
    return db.lesson.findUnique({
      where:{ id },
      include: { userLesson: true }
    });
  }
});
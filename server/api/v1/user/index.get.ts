
export default defineEventHandler((event) => {
  const { dataToken: { id } } = event as ApiEvent;

  return db.user.findUnique({
    where: { id },
    select: basicUseSelectForToken
  });
});
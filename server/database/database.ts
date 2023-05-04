export default function database<T>(tableName: string){
  const { prisma } = globalThis;

  // update(id: number, data: T): Promise<T> {
  //   return this.prisma[this.tableName].update({
  //     data,
  //     where: {
  //       id: Number(id),
  //     },
  //   });
  // }

  // async delete(id: number): Promise<void> {
  //   await this.prisma[this.tableName].delete({
  //     where: {
  //       id: Number(id),
  //     },
  //   });
  // }

  // fetch(id: number): Promise<T> {
  //   return this.prisma[this.tableName].findUnique({
  //     where: {
  //       id: Number(id),
  //     },
  //   });
  // }

  // function create(data: T): Promise<T> {
  //   return prisma[tableName].create({ data });
  // }

  // function fetchAll(): Promise<T[]> {
  //   return prisma[tableName].findMany();
  // }

  // return { create, fetchAll };
}
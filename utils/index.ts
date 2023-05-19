export const capitalizeFirstLetter = (str: string) =>
  str.split(" ").map((l, i) => {
    if(i === 0){
      return l.charAt(0).toUpperCase() + l.slice(1);
    }

    return l;
  }).join(" ");

export function shuffleArray<T = any>(arr: Array<T>){
  return arr.map(v => ({ v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v }) => v);
}

export const randomInt = (max: number) => Math.floor(Math.random() * max);

export const capitalizeFirstLetter = (str: string) =>
  str.split(" ").map((l, i) => {
    if(i === 0){
      return l.charAt(0).toUpperCase() + l.slice(1);
    }

    return l;
  }).join(" ");


import fs from "fs";
import { execSync, exec, } from "child_process";
import { isEmpty, } from "class-validator";

// const fs = require("fs");
// const exec = require("child_process");

const fileName = "text-video";

export interface VideoText {
	time: number
	link: string
	text: string
}

export default function useVideo() {
  let warnings: string[] = [];

  //!* alerta link repetido
  //!* verificar se texto foi gravado, caso não alerta como warning
  async function getSubtitle(links: string[]) {
	  warnings = [];
	  //valida e recebe o array com links válidos
	  // let currentLinks = await verifyLinks(links);
	  const currentLinks = links; //await verifyLinks(links);

	  if(currentLinks.length > 0){
	    for (let i = 0; i < currentLinks.length; i++) {
	      await execSync(getCommandTextVideo(currentLinks[i]));

	      const text = await fs.readFileSync(getFileNameGenerateCommand(), "utf8");

	      if (text && !isEmpty(text)) {
	        await cleanFile();

          return text;

	        // await processText(text, currentLinks[i]);
	      } else{
	        warnings.push("ERROR_READ_FILE: ".concat(currentLinks[i]));
	      }
	    }
	  }
  }

  //verifica se links são válidos, e retorna um array de link que devem ser processados
  // async function verifyLinks(links: string[]): Promise<string[]> {
  //   let corrects: string[] = [];
  //   let currentLinks: string[] = [];

  //   //verifica se tem link repetido e cria uma nova lista
  //   for(let i = 0; i < links.length; i++) {
  //     if(links.indexOf(links[i]) != i) {
  //       warnings.push("DUPLICATE_LINK: ".concat(links[i]));
  //     }else{
  //       corrects.push(links[i]);
  //     }
  //   }

  //   //caso tenha links corretos
  //   if(corrects.length > 0){
  //     //inicio verificação links válidos
  //     for (let i = 0; i < corrects.length; i++) {
  //       //verifica se link é válido
  //       if (validateLink(corrects[i])) {
  //         //verifica se tem link cadastrado no banco
  //         let linkEnabled = formatLink(corrects[i]);
  //         let linkSearch = await videoProvider.findLink(linkEnabled);
  //         //verifica se obteve resultado na pesquisa

  //         if(linkSearch.length > 0){
  //           warnings.push(Message.LINK_EXIST.replace("{link}", corrects[i]));
  //         }else{
  //           currentLinks.push(corrects[i]);
  //         }
  //       }else{
  //         warnings.push(Message.INVALID_LINK.replace("{link}", corrects[i]));
  //       }
  //     }
  //   }

  //   return currentLinks;
  // }

  async function cleanFile(): Promise<void>{
	  //limpa o arquivo text-video.vtt
	  await fs.writeFileSync(getFileNameGenerateCommand(), "");
  }

  /**
	 * embed => https://www.youtube.com/embed/qV_EtCPiY4g
	 * watch => https://www.youtube.com/watch?v=qV_EtCPiY4g
	 * @param [embed]
	 * @description recebe um link no formato [watch] e retorna o link no formato [embed]
	 * @returns String
	 */
  function formatLink(link: string): string {
	  let arrLink = link.split("/");
	  let idVideo = arrLink[3].split("v=")[1];

	  return `https://www.youtube.com/embed/${idVideo}`;
  }

  // async function getVideos(): Promise<VideoTextDocument[]> {
  //   return await videoProvider.listVideos();
  // }

  // async function findVideos(text: string): Promise<VideoTextDocument[]> {
  //   return await videoProvider.find(text);
  // }

  async function processText(text: string, fullLink: string) {
	  let rows: string[] = [];
	  let rowClean: string[] = [];
	  let rowsOriginal: string[] = [];
	  let videoTexts: VideoText[] = [];

	  rowsOriginal = text.split("\n");
	  delete rows[rows.length - 1];
	  delete rows[rows.length - 2];
	  delete rows[rows.length - 3];

	  //cria um novo array somente com as linhas em branck
	  rowsOriginal.forEach(row => {
	    if (!isEmpty(row) && row.trim().length > 0) {
	      rowClean.push(row);
	    }
	  });

	  //limpando o arquivo
	  for (let i = 0; i < rowClean.length; i++) {
	    if (rowClean[i] && rowClean[i].includes("<c>")) {
	      delete rowClean[i - 1];
	      delete rowClean[i];
	      delete rowClean[i + 1];
	    }
	  }
	  //cria um novo array para ser guardado
	  rowClean.forEach(row => {
	    rows.push(row);
	  });
	  //salva as linhas do arquivo
	  for (let i = 4; i < rows.length; i++) {
	    if (rows[i] && rows[i + 1] && rows[i].includes("-->")) {
	      let time = getTime(rows[i]);

	      i++;
	      let text = rows[i];
	      let link = getLinkEmbed(fullLink);

	      videoTexts.push(getVideoText(time, link, text));
	    }
	  }

	  return videoTexts;
  }

  // async function saveTexts(videoTexts: VideoText[]): Promise<void> {
  //   await videoTexts.forEach(async video => {
  //     await videoProvider.dispatchVideo(video).catch(() => {
  //       throw new InternalServerError("ERRO_videoProvider");
  //     });
  //   });
  // }

  //converte o tempo inicial para segundos
  function getTime(row: string): number {
	  let arrRow = row.split(" ");
	  let arrTime = arrRow[0].split(":");
	  let h = parseInt(arrTime[0]);
	  let s = parseInt(arrTime[1]);
	  let m = parseInt(arrTime[2].split(".")[0]);
	  let time = (((h * 60) * 60) + (s * 60)) + m;

	  return time;
  }

  //gera o link embed
  function getLinkEmbed(fullLink: string): string {
	  let arrLink = fullLink.split("v=");

	  return `https://www.youtube.com/embed/${arrLink[1]}`;
  }

  //gera o objeto
  function getVideoText(time: number, link: string, text: string): VideoText {
	  return {
	    time,
	    link,
	    text
	  };
  }

  function validateLink(link: string): boolean {
	  let part1 = link.split("://");

	  if (part1.length > 1 && part1[0] == "https") {
	    let part2 = part1[1].split(".");

	    if (part2.length > 2 && part2[0] == "www" && part2[1] == "youtube" && part2[2].includes("com")) {
	      let part3 = part1[1].split("/");

	      if (part3[1].includes("watch?v=")) {
	        let part4 = part3[1].split("v=");

	        if (part4.length > 1) {
	          let part5 = part4[1].split("&");

	          if (part5.length == 1) {
	            return true;
	          }
	        }
	      }
	    }
	  }

	  return false;
  }

  async function execCommand(command: string) {
	  return await exec(command, (error: any) => {
	    if (error) {
	      console.log(`error: ${error.message}`);

	      return false;
	    }

	    return true;
	  });
  }

  function getCommandTextVideo(url: string) {
	  return `youtube-dl --skip-download --write-auto-sub --sub-lang pt --sub-format vtt "${url}" -o ${fileName}`;
  }

  function getFileNameGenerateCommand(): string {
	  return `${fileName}.pt.vtt`;
  }

  return { getSubtitle };
}
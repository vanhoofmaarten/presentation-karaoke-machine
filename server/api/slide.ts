// import pMap from "p-map";
import { parse } from "node-html-parser";
import shuffle from "../../lib/shuffle";

export interface Slide {
  keyword: string;
  synonyms: string[];
  imageUrl: string;
}

const BASE_URL = "https://pkm.mrtnvh.com";
const KEYWORD_HTML_SELECTOR = ".blok_syn a:not(#expand_addsyn, [onclick^=warn_wm_tv])";

const getFullUrlAsURL = (path: string) => new URL(`${BASE_URL}${path}`);

async function getSynonymsOfKeyword(keyword: string, max: number) {
  const html = await fetch("https://puzzel.woordenboek.nu/zoek_synoniemen.php", {
    method: "POST",
    body: `zoekwoord=${keyword}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((res) => res.text());

  
  const root = parse(html);
  const keywords = root.querySelectorAll(KEYWORD_HTML_SELECTOR).map((element) => element.text);
  return shuffle(keywords).slice(0, max);
}

async function getRandomImageUrl() {
  return (await fetch("https://source.unsplash.com/random/1920x1080")).url;
}

async function getSlideByKeyword(keyword: string) {
  return {
    keyword,
    synonyms: await getSynonymsOfKeyword(keyword, 3),
    imageUrl: await getRandomImageUrl(),
  };
}

export default defineEventHandler(async (event) => {
  const url = getFullUrlAsURL(event.req.originalUrl);
  const keyword = url.searchParams.get("keyword");
  const slide = await getSlideByKeyword(keyword);
  return slide;
});

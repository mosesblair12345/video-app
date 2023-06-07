import dead from "../assets/dead.png";
import mino from "../assets/mino.png";
import vituko from "../assets/vituko.png";
import deadVideo from "../assets/dead.mp4";
import minoVideo from "../assets/mino.mp4";
import airtel from "../assets/airtel.png";
import ewallet from "../assets/ewallet.png";
import mastercard from "../assets/mastercard.png";
import mpesa from "../assets/mpesa.png";
import mvisal from "../assets/mvisal.png";
import visa from "../assets/visa.png";

export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "movies",
    url: "/movies",
  },
  {
    id: 3,
    text: "series",
    url: "/series",
  },
  {
    id: 4,
    text: "kids",
    url: "/kids",
  },
];

export const carousel = [
  {
    id: 1,
    name: "dead",
    url: dead,
    genres: "Adventure, Action",
    buttonText: "play",
  },
  {
    id: 2,
    name: "mino",
    url: mino,
    genres: "Adventure, Action",
    buttonText: "play",
  },
  {
    id: 3,
    name: "vituko",
    url: vituko,
    genres: "Adventure, Action",
    buttonText: "play",
  },
];

export const moviesVideo = [
  {
    id: 1,
    name: "dead",
    imgSrc: dead,
    videoSrc: deadVideo,
  },
  {
    id: 2,
    name: "mino",
    imgSrc: mino,
    videoSrc: minoVideo,
  },
];
export const payment = [
  {
    id: 1,
    name: "airtel",
    url: airtel,
  },
  {
    id: 2,
    name: "ewallet",
    url: ewallet,
  },
  {
    id: 3,
    name: "mastercard",
    url: mastercard,
  },
  {
    id: 4,
    name: "mpesa",
    url: mpesa,
  },
  {
    id: 5,
    name: "mvisal",
    url: mvisal,
  },
  {
    id: 6,
    name: "visa",
    url: visa,
  },
];

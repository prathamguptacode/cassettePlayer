import { createContext } from "react";
import { musicList } from "../_layout";

const MusicContext = createContext<musicList | null>(null)


export default MusicContext

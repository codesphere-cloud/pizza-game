import '../sass/index.sass'

import {Slot} from "./Slot";
import { WinnerForm } from './WinnerForm';

const config = {
    inverted: true, // true: reels spin from top to bottom; false: reels spin from bottom to top
};


new Slot(document.getElementById("slot")!, config, new WinnerForm(document.querySelector(".winner-form")!));

import { MINIMUM_HEIGHT } from "./game.mjs"
import { MINIMUM_WIDTH } from "./game.mjs"

const language = {
    en:{
        TERMINAL_SIZE: (width, height) =>
    `The terminal is too small to start playing the game! Please resize to ${MINIMUM_WIDTH}x${MINIMUM_HEIGHT}.\n,`,
        WAITING_FOR_CORRECT_SIZE:"Waiting for the player to resize the terminal, before launching the game.",
        GAME_START:"Start Game.",
        SHIP_PLACEMENT_TEXT_1: "Ship placement phase\nIt is time to position the ships!\n Player one, get ready to place your ships\n player two has to look away.",
        SHIP_PLACEMENT_TEXT_2:", It is now player two's turn to place out their ships\n, player one must now look away.",
        MAP_LAYOUT_PROMPT: "Map Layout.",
        EXIT_GAME_PROMPT: "Exit Game.",
        SWITCH_LANGUAGE_PROMPT: "Change game language.",
        CONTROL_INPUT_PROMPT: "Controls:",
        MOVEMENT_KEY: "Use the arrow keys to move the cursor around on the playing board.",
        ROTATE_SHIP_KEY:" Press the R button to rotate your ship in a chosen lane.",
        CONFIRM_SHIP_PLACEMENT_KEY:" Press the ENTER key to confirm the chosen placement of your ship.",
        SHIPS_TO_PLACE_PROMPT: "Current total amount of ships to place:",
        SPACES_PROMPT:" Spaces."








        
    },
    no:{
        TERMINAL_SIZE: (width, height) =>
    `Terminalen er for liten til å starte spillet! Endre størrelsen til ${MINIMUM_WIDTH}x${MINIMUM_HEIGHT}.\n,`,
        WAITING_FOR_CORRECT_SIZE:"Venter på at spilleren justerer terminal vinduet, før spillet starter.",
        GAME_START:"Start Spillet.",
        SHIP_PLACEMENT_TEXT_1: "Skip plasserings fase\nDet er tid for å plassere skipene!\n Spiller en, gjør deg klar til å plassere ut skipene dine\n spiller to må nå se bort.",
        SHIP_PLACEMENT_TEXT_2: "Det er nå andre spillers tur til å plassere ut skipene sine\n, spiller en må nå se bort",
        MAP_LAYOUT_PROMPT: "Kart Oversikt.",
        EXIT_GAME_PROMPT: "Avslutt spill.",
        SWITCH_LANGUAGE_PROMPT: "Bytt spill språk.",
        CONTROL_INPUT_PROMPT: "Kontrollere:",
        MOVEMENT_KEY: "Bruk piltastene til å bevege pekeren rundt på spille brettet.",
        ROTATE_SHIP_KEY: " Trykk på R tasten for å rotere skipet ditt i den valgte kolonnen.",
        CONFIRM_SHIP_PLACEMENT_KEY:" Trykk på ENTER for å bekrefte valgt posisjon av skipet ditt.",
        SHIPS_TO_PLACE_PROMPT: "Nåværende totalt antall skip som må plasseres:",
        SPACES_PROMPT: " Plasser."










    }
}

let selectedlanguage = language.en;
function setLanguage(lang){
    if (language[lang]){
        selectedlanguage = language[lang];
    }
}

function retrieveLanguage(){
    return selectedlanguage;
}

export { language, setLanguage, retrieveLanguage }; 
import { ANSI } from "./utils/ansi.mjs";
import { print, clearScreen } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import { FIRST_PLAYER, SECOND_PLAYER } from "./consts.mjs";
import createMenu from "./utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createInnBetweenScreen from "./game/innbetweenScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";
import { language, setLanguage, retrieveLanguage } from "./dictionary.mjs";

const MAIN_MENU_ITEMS = buildMenu();

const GAME_FPS = 1000 / 60;
const MINIMUM_HEIGHT = 24;
const MINIMUM_WIDTH = 80;
let currentState = null;
let gameLoop = null;
let waitingForTerminalResize = false;
let mainMenuScene = null;
let checkIfPausedForResize = false;

setLanguage("en");

function checkTerminalResolution() {
  const width = process.stdout.columns;
  const height = process.stdout.rows;

  if (width < MINIMUM_WIDTH || height < MINIMUM_HEIGHT) {
    if (!waitingForTerminalResize) {
      waitingForTerminalResize = true;
      clearScreen();
      print(retrieveLanguage().TERMINAL_SIZE(MINIMUM_WIDTH, MINIMUM_HEIGHT));
      if (gameLoop) clearInterval(gameLoop);
    }
    return false;
  } else {
    if (waitingForTerminalResize) {
      waitingForTerminalResize = false;
      clearScreen();
      startGameLoop();
    }
    return true;
  }
}

function startGameLoop() {
  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(update, GAME_FPS);
}

(function initialize() {
    print(ANSI.HIDE_CURSOR);
  clearScreen();

  mainMenuScene = createMenu(MAIN_MENU_ITEMS);
  SplashScreen.next = mainMenuScene;
  currentState = SplashScreen;

  if (checkTerminalResolution()) {
    startGameLoop();
  } else {
    print(retrieveLanguage().WAITING_FOR_CORRECT_SIZE);
  }

  process.stdout.on("resize", () => {
    checkTerminalResolution();
  });
})();

function update(){
    if (checkIfPausedForResize) return;

  currentState.update(GAME_FPS);
  currentState.draw(GAME_FPS);

  if (currentState.transitionTo != null) {
    currentState = currentState.next;
    print(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    }
}


function buildMenu() {
    let menuItemCount = 0;
    return [
        {
            text: retrieveLanguage().GAME_START, id: menuItemCount++, action: function () {
                clearScreen();
                let innbetween = createInnBetweenScreen();
                innbetween.init(retrieveLanguage().SHIP_PLACEMENT_TEXT_1, () => {

                    let p1map = createMapLayoutScreen();
                    p1map.init(FIRST_PLAYER, (player1ShipMap) => {


                        let innbetween = createInnBetweenScreen();
                        innbetween.init(retrieveLanguage().SHIP_PLACEMENT_TEXT_2, () => {
                            let p2map = createMapLayoutScreen();
                            p2map.init(SECOND_PLAYER, (player2ShipMap) => {
                                return createBattleshipScreen(player1ShipMap, player2ShipMap);
                            })
                            return p2map;
                        });
                        return innbetween;
                    });

                    return p1map;

                }, 3);
                currentState.next = innbetween;
                currentState.transitionTo = retrieveLanguage().MAP_LAYOUT_PROMPT;
            }
        },
        { 
            text: retrieveLanguage().EXIT_GAME_PROMPT,
            id: menuItemCount++,
            action: function () { print(ANSI.SHOW_CURSOR);
                clearScreen();
                process.exit();
             } 
        },
        {
        text: retrieveLanguage().SWITCH_LANGUAGE_PROMPT,
      id: menuItemCount++,
      action: function () {
        const selectedLanguage = retrieveLanguage();
        if (retrieveLanguage() === language.en) {
          setLanguage("no");
        } else {
          setLanguage("en");
        }
        clearScreen();
        mainMenuScene = createMenu(buildMenu());
        currentState = mainMenuScene;
            },
        },
    ];
}

export {MINIMUM_HEIGHT};
export {MINIMUM_WIDTH};
export {retrieveLanguage};
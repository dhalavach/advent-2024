import { readInput } from './utils.js';

const input = await readInput('./input-19.txt');

function canConstruct(target, wordBank) {
  const dp = Array(target.length + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i <= target.length; i++) {
    if (dp[i]) {
      for (const word of wordBank) {
        if (target.slice(i, i + word.length) === word) {
          dp[i + word.length] = true;
        }
      }
    }
  }

  return dp[target.length];
}

const targetStringArr = input.split('\n');
//console.log(targetStringArr);
const inputString =
  'wuwuwb, brwguu, bbb, ubb, rrgw, rwguuw, wuwuug, rwu, wgb, urrg, bburgrgw, brrwub, rgwr, uw, gbb, bgggrr, wuw, bgb, gbgwgb, uu, gwwu, bwub, ugg, rbr, gggwuw, rwgu, gbbuwugg, ubwwbg, gru, rbw, uuw, uwu, ubuw, wrg, grb, uru, gur, bbgg, bug, rgrb, wgur, br, bwwgruu, ubgbw, ruwg, buu, uuwrrgr, wrw, bbgr, ggbg, burbw, wgu, gwgg, u, grbw, rubrwb, bwu, wbwruwg, wwuurg, wbbrbgu, rgb, gwbww, uruu, brgwr, ruru, grrgub, bbg, guuur, bwbgr, bggb, bbguw, rww, uwrr, uwrgr, ur, wgrb, rbb, rbrub, rguggb, gug, rwb, wru, ubbbbub, urug, burgur, urrgbw, rgr, wbr, uuww, wrr, urw, uwurwb, buw, wwg, bgg, ggw, gbubgw, bw, wrub, gwg, rgwbr, rwbruu, bwug, uwbr, urbbbgw, ggb, burrubbu, wr, rur, gbbu, rrw, rbbrwgb, rwwww, ggurw, wugwggw, rwuggg, brguggb, brb, rgur, bgbw, bwgr, rgu, bugww, rbwr, gurrgur, grwbr, uug, bwru, bb, rguurbbg, wububgg, wwu, wbw, ugrw, ugbwuw, rwrrgw, gub, rbrrguu, wrgg, bguuw, gbugrw, wuur, bg, wwbgr, rwr, gwu, rrbgwgbw, bur, wrug, wrgbu, gbbw, rwg, uwgwb, bgbbbb, rrwwuu, rrgg, gwgur, ruww, grrgrb, gbuwwg, ggrb, uugwgu, ubbrgu, rbbru, wurw, b, uwurr, ubbr, rgugwbr, bgbwbgg, gr, rwww, gubgbgr, bgr, ug, grr, wuuruur, gw, rub, uwggu, bgw, uwg, gwr, bbrgr, bbru, urb, buuu, bbwguwb, ww, wrbww, gbwbwrw, grwr, gww, gbr, uggbgu, wruu, brwgu, gbwgu, r, wuwr, rurr, ugr, ubgbr, ubbwg, rggrb, wrggb, ggggbg, uruwg, uwbgb, bgwwwur, gbruu, grrbgb, rwgbuwrw, bu, rwwr, rgrwru, uwr, wrrur, rug, rwrwgr, gwbwbrru, uggbru, wrb, ruwbu, uugbr, wbgg, rbu, bgwwr, ggr, rwbwgr, rbbg, buurug, wgguu, wrwwg, gguw, rrg, guww, rgg, uguwbw, bgu, grw, rgugggw, uwrw, rburw, gbwgur, wugbubg, uww, wbb, ggu, ruwr, rrbb, wwr, gg, bwrbuw, ubu, rrr, ruubgg, wgbrr, wg, grgb, gubw, buubg, buur, bwuw, wugwwuug, rwgbw, guwg, bbbw, brrww, rgbgb, rubr, bbbu, wwbbggr, bggbuww, bwugwgu, rbubr, grbbu, grubgu, bwg, wgr, wwbww, wu, bgbrw, wug, wwrw, ugb, uwgr, rr, gbggr, gwrr, grrrw, urg, rbg, rgw, buuwuw, uwgbr, wrbu, wuggb, ruwu, wggwb, wwubbb, uwwgbwu, wgg, wrbuwgbb, ugub, wbu, wbuwwgu, wrwuwbuw, ugwgbbuu, bwgb, wgw, rgbwrrbb, uur, brug, wrbrg, ugw, rru, rugru, rggg, rbrgwr, guur, grwugrr, gugu, gubg, uubbu, gbwugb, rw, uuburg, gwwbu, grg, gbu, bbwbrbg, ubr, wur, rrubggu, bru, gwbb, bbr, bwbbrg, brrbggbr, wbbgw, brw, guu, rbww, bwb, wgurrbu, bgrwbr, bbruwu, rrugg, rb, bwr, grrbbbbw, bwbggwwg, wbg, bub, gwrrb, ubg, grrwgu, brrwru, bruwg, brr, rwbwrbg, urr, ggwbu, wgbrbgb, gwuw, wugwb, rrgbww, grgug, gwugg, gu, ubuuuu, wgrgbr, bbu, ggg, bguwb, ggrbrubr, guuu, wggrwwuw, ubrwgbr, bugwu, wwug, gb, wwwbg, ru, uwb, rrbuuu, buugw, rubwb, rrb, uub, rbubb, ggbrb, brgw, bww, wwbr, guw, bgur, ggwg, wurbr, wbubbr, ubub, gwb, bgwu, wwb, wurwuuu, gbw, ubrbur, uuuw, rbur, bgwg, grgbbbuu, ubw, rgbg, ugu, bwgwg, wwggbr, rguw, wub, wwru, bwrrwgu, uuu, uurrwwr, bguw, grru, buww, bbggrb, ubgb, brbrurw, ub, brgb, bwbwuwg, brub, wwbw, wwbwwrg, www, rwbubb, wbrugggw, grbug, ruu, urubu, gbbbrwu, bbugg, w, gwwrb, bgruuwrg, wugbg';
const wordBank = inputString.split(',').map((el) => el.trim());
const result = targetStringArr
  .map((target) => {
    let flag = canConstruct(target, wordBank);
    if (flag) return 1;
    else return 0;
  })
  .reduce((a, b) => a + b, 0);

console.log(result);

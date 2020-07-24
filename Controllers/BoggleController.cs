using System.Collections.Generic;
using System.Linq;
using bctTask.Helpers;
using bctTask.Models;
using Microsoft.AspNetCore.Mvc;

namespace bctTask.Controllers
{
    [Route("api/[controller]")]
    public class BoggleController : Controller
    {
        //Singleplayer game result calculation
        [HttpPost("[action]")]
        public int CalculateBoggleResult([FromBody] string[] words)
        {
            int calculatedScore = 0;
            string[] uniqueWords = words.Distinct().ToArray();

            for (int i = 0; i < uniqueWords.Length; i++)
            {
                calculatedScore += BoggleHelper.getPointsByWord(uniqueWords[i]);
            }

            return calculatedScore;
        }

        //Multiplayer game result calculation
        [HttpPost("[action]")]
        public IEnumerable<Player> CalculateMultiplayerBoggleResult([FromBody] Player[] players)
        {
            List<Player> playerResults = new List<Player>(players);
            List<string> allWords = BoggleHelper.getAllWords(playerResults);

            for (int i = 0; i < playerResults.Count; i++)
            {
                int calculatedScore = 0;
                string[] uniqueWords = playerResults[i].Words.Distinct().ToArray();

                for (int j = 0; j < uniqueWords.Length; j++)
                {
                    //Calculates points only for the unique words
                    if (allWords.Where(x => x == uniqueWords[j]).Count() == 1)
                    {
                        calculatedScore += BoggleHelper.getPointsByWord(uniqueWords[j]);
                    }
                }

                playerResults[i].Result = calculatedScore;
            }

            return playerResults;
        }


    }
}



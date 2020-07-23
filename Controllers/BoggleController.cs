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


        
    }
}



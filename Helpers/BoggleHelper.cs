using bctTask.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bctTask.Helpers
{
    public class BoggleHelper
    {
        public static List<string> getAllWords(List<Player> players)
        {
            List<string> allWords = new List<string>();
            for (int i = 0; i < players.Count; i++)
            {
                allWords.AddRange(players[i].Words);
            }

            return allWords;
        }

        public static int getPointsByWord(string word)
        {
            int wordLength = word.Length;
            int points = 0;

            switch (wordLength)
            {
                case 0:
                case 1:
                case 2: points = 0; break;
                case 3:
                case 4: points = 1; break;
                case 5: points = 2; break;
                case 6: points = 3; break;
                case 7: points = 5; break;
                default: points = 11; break;
            }

            return points;
        }
    }
}

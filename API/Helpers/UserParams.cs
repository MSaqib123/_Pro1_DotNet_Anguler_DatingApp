using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    //==== Setting Default Value to Pagination =====
    public class UserParams
    {
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        //Encapsulation of MaxPageSize
        private const int MaxPageSize = 50;
        public int PageSize
        {
            //===== Old Way =====
            // get { return _pageSize; }
            // set { _pageSize = (value > MaxPageSize) ? MaxPageSize : value; }

            //===== New =======
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }


        public string? Gender { get; set; }

        //Exclude current login user from the result
        public string? CurrentUsername { get; set; }


        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 100;


        public string OrderBy { get; set; } = "lastActive";
    }
}
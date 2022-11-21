using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace m5_chat
{
    public class NotificationClient
    {
        public NotificationClient()
        {
            Groups = new HashSet<string>();
        }        
        public string Name { get; set; }
        public virtual ICollection<string> Groups { get; set; }
    }
}

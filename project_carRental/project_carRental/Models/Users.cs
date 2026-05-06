namespace project2.models
{
    public class Details
    {
        public int Id { get ; set; } 

        public required string name {get ; set ;}

        public required string password {get ; set;}

        public required string email {get ; set ;}

        public required string role {get;set;}

        public required string status {get;set;}
    }
}
class Config {
    // public apiBaseUrl = 'https://travlize.com/api/v1/';
    //  public apiBaseUrl = 'https://api.travlize.com/api/v1/';
    public apiBaseUrl = 'http://localhost:8000/api/v1/';
    //    cookies expires after 8 days
    public cookiesExpiryDate = 60 * 60 * 8;

 }
 export const config = new Config();

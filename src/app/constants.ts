
export class AppConstants {
    public static API_DOMAIN = 'https://api.a117.sudo.org.au';
    public static CLIENT_ID = '1';
    public static GRANT_TYPE = 'password';
    public static CLIENT_SECRET = 'Gt3PKGqmzkrQLGruX61XFaJqd6jl1MdQyRigSMYB';
    public static SCOPE = '';
    public static ALL = "all";
}

export class ApiEndpoints {
    public static OAUTH_TOKEN = AppConstants.API_DOMAIN + '/oauth/token';
    public static API = AppConstants.API_DOMAIN + '/api';
    public static USER = ApiEndpoints.API + '/user';
    public static USER_CREATE = ApiEndpoints.USER + '/create';
    public static UNITS = ApiEndpoints.API + '/units';
    public static UNITS_ALL = ApiEndpoints.UNITS + '/all';
    public static COURSES = ApiEndpoints.API + '/courses';
}

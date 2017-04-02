
export class AppConstants {
    public static API_DOMAIN = 'https://api.a117.sudo.org.au';
    public static CLIENT_ID = '1';
    public static GRANT_TYPE = 'password';
    public static CLIENT_SECRET = 'Gt3PKGqmzkrQLGruX61XFaJqd6jl1MdQyRigSMYB';
    public static SCOPE = '';
}

export class ApiEndpoints {
    // USER
    public static OAUTH_TOKEN = AppConstants.API_DOMAIN + '/oauth/token';
    public static API = AppConstants.API_DOMAIN + '/api';
    public static USER = ApiEndpoints.API + '/user';
    public static USER_CREATE = ApiEndpoints.USER + '/create';

    // UNITS
    // To get an individual unit append id
    public static UNITS = ApiEndpoints.API + '/units';

    // COURSES
    // To get an individual course append id
    public static COURSES = ApiEndpoints.API + '/courses';

    // FACULTIES
    public static FACULTIES = ApiEndpoints.API + '/faculties';

    // SEARCH (Will change to use url params for search term)
    public static SEARCH_ALL = ApiEndpoints.API + '/search';
    public static SEARCH_COURSE = ApiEndpoints.SEARCH_ALL + '/courses';
    public static SEARCH_UNIT = ApiEndpoints.SEARCH_ALL + '/units';
}

export class ApiExtensions {
    // COMMENTS
    // Use with units to create a url like:
    // /api/unit/{unit_id}/comment/{comment_id}
    public static COMMENTS = '/comments';
    public static COURSEUNITS = '/units';
}

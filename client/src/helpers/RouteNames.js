export const RouteIndex = "/";
export const RouteAdminSignin = "/auth/admin";
export const RouteClientSignin = "/auth/client/login";
export const RouteClientSignup = "/auth/client/signup";

//Blog Routes
export const RouteBlogs = "/content/blogs";
export const RouteBlogCreate = "/content/blog/create";
export const RouteBlogEdit = "/content/blog/edit/id";
export const RouteBlogDetails = "/content/blog/id";

//Project Routes
export const RouteProjects = "/content/projects";
export const RouteProjectCreate = "/content/project/create";
export const RouteProjectEdit = "/content/project/edit/id";
export const RouteProjectDetails = "/content/project/id";

//Chatbot Routes
export const RouteChatbot = "/project/one/chatbot";

//Hireme Routes
export const RouteHireme = "/hireme/app";
export const RouteHiremeTrack = "/hireme/track";

//Create Routes
export const RouteCreate = "/create/app";
export const RouteCreateTrack = "/create/track";

//Documentation Routes
export const RouteDocs = "/docs";

//News
export const RouteNews = "/stayupdated";
export const RouteKathmanduPost = "/stayupdated/kathmandupost";
export const RouteTechPana = "/stayupdated/techpana";
export const RouteEkantipur = "/stayupdated/ekantipur";

//prep-routes
export const RouteProgress = "/progress";
export const RouteProgressCreate = "/progress/create";
export const RouteProgressDetail = (id) => {
  if (id) {
    return `/progress/detail/${id}`;
  } else {
    return "/progress/detail/:id";
  }
};

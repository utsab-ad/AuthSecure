export const RouteIndex = "/"
export const RouteSignup = "/auth/signup"
export const RouteLogin = "/auth/login"

export const RouteHome = "/users"

export const RouteBlogs = "/blogs"
export const RouteCreateBlog = "/blog/create"
export const RouteEditBlog = (blogid) => {
    
    if(blogid) {
        return `/blog/update/${blogid}`
    } else {
        return "/blog/update/:blogid"
    }

}
export const RouteBlogDetail = (blogid) => {
    
    if(blogid) {
        return `/blog/detail/${blogid}`
    } else {
        return "/blog/detail/:blogid"
    }

}

export const RouteDeleteBlog = "/blog/delete/:id"
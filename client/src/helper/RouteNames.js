export const RouteIndex = "/"
export const RouteSignup = "/auth/signup"
export const RouteLogin = "/auth/login"
export const RouteLoginVerify = "/otp/login"

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

export const RouteRequestDetail = (requestid) => {
    
    if(requestid) {
        return `/offer/detail/${requestid}`
    } else {
        return "/offer/detail/:requestid"
    }

}

export const RouteDeleteRequest = "/request/delete/:id"

export const RouteDeleteBlog = "/blog/delete/:id"

export const RouteIntern = "/hireme/intern"
export const RouteHireme = "/hireme"
export const RouteHiremeVerify = "/otp/hireme"
export const RouteHiremeRequests = "/offer-verification"
export const RouteTrackApplication = "/track-application"
export const RouteCreate = "/create"
export const RouteLandingPageForm = "/create/landingpg"
export const RoutePortfolioPageForm = "/create/portfolio"

export const RouteTest = "/test"
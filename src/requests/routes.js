const routes = {
    signUp: "/api/user/signup",
    logIn: "/api/user/login",
    forgotPassword: "/api/user/reset-password",
    changePassword: "/api/user/change-password",
    getUser: "/api/user/",
    addMatch: "/api/match/createMatch",
    addStaff: "/api/staff/",
    addStadium: "/api/stadium/",
    getStaff: "/api/staff/?startDate=",
    getStadium: "/api/stadium/?startDate=",
    getTeam: "/api/team/?startDate=",
    updateUser: "/api/user",
    verifyUser: "/api/user/verify/",
    deleteUser: "/api/user/deleteUser/",
    getNotVerifiedUser: "/api/user/notVerifiedUsers",
    getallUser: "/api/user/allUsers",
    getMatch: "/api/match/getMatch/",
    getUsersReservations: "/api/ticket/",
    getFutureMatches:"/api/match/getFutureMatches",
    updateMatch:"/api/match/updateMatch/",
    reserveTicket:"/api/ticket/reserve/",
    cancelTicket:"/api/ticket/cancel-reservation/",

    

}
export default routes 
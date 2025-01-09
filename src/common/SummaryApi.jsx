export const baseUrl = 'http://localhost:8080'

const SummaryApi = {
    register: {
        url: '/api/user/register',
        method : 'post'
    },
    login: {
        url:'/api/user/login',
        method: 'post'
    },
    forgotPassword: {
        url:'/api/user/forgetPassword',
        method:'put'
    },
    verifyOtp: {
        url:'/api/user/verifyOtp',
        method: 'put'
    },
    resetPassword : {
        url :'/api/user/resetPassword',
        method : 'put'
    }
}

export default SummaryApi
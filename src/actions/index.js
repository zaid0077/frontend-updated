export const signIn = (data) => {
    return {
        type: 'SIGN_IN',
        payload: data
    }
}

export const dashboardData = (data) => {
    return {
        type: 'DASHBOARD_DATA',
        payload: data
    }
}
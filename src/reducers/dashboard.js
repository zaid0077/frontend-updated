const dashboardReducer = (state = '', action) => {
    switch(action.type) {
        case 'DASHBOARD_DATA':
            return {
                taskList: action.payload.dashboardData.taskList,
                totalTasks: action.payload.dashboardData.total,
                completeTasks: action.payload.dashboardData.complete,
                incompleteTasks: action.payload.dashboardData.incomplete,
                chartData: {
                    completes: action.payload.dashboardData.complete,
                    incomplete: action.payload.dashboardData.incomplete,
                }
            }
        default:
            return false
    }
}

export default dashboardReducer
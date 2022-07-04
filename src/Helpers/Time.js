export const epochToElapsed = (epochString) => {
    const epoch = parseInt(epochString);

    const elapsedTime = Date.now() - epoch;
    const elapsedMinutes = (elapsedTime / (1000 * 60)).toFixed(0);
    const elapsedHours = (elapsedTime / (1000 * 60 * 60)).toFixed(0);

    if (elapsedHours < 1) {
        return `${elapsedMinutes} minutes ago`
    }

    if (elapsedHours < 24) {
        return `${elapsedHours} hours ago`
    }

    const date = new Date(epoch);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[date.getMonth()];
    const day = date.getDate();
    
    return `${month} ${day}`
}

export const epochToDate = (epochString) => {
    const epoch = parseInt(epochString);

    const date = new Date(epoch);
    const year = date.getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${day} ${month} ${year}`

}
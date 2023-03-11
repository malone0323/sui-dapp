import moment from "moment/moment";

export const calculateTimeAgo = (dateTime) => {
    const now = moment(); // Current time
    const past = moment(dateTime); // Convert input date/time to moment object

    const duration = moment.duration(now.diff(past)); // Calculate the duration
    const days = Math.floor(duration.asDays()); // Get days
    const hours = duration.hours(); // Get remaining hours
    const minutes = duration.minutes(); // Get remaining minutes

    return { days, hours, minutes };
};
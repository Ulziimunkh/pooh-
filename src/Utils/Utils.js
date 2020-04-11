export const CalculateAge = (birthday) => {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const ChatMessageTime = (timestamp) => {
  const moment = require("moment");
  let datetime = moment(timestamp);
  let retStr = "";
  let now = moment();
  let dayDiff = now.diff(datetime, "days");
  if (dayDiff < 7) {
    let timeStr = datetime.format("h:mm a");
    if (dayDiff > 1) {
      retStr = "Last " + datetime.format("dddd ") + timeStr;
    } else if (dayDiff === 1) {
      retStr = "Yesterday " + timeStr;
    } else if (dayDiff < 1) {
      let hourDiff = now.diff(datetime, "hours");
      if (hourDiff < 1) {
          let minDiff = now.diff(datetime, "minutes");
            if(minDiff < 1){
                retStr = datetime.startOf("sec").fromNow();
            }else{
                retStr = datetime.startOf("min").fromNow();
            }
      } else {
        retStr = datetime.startOf("hour").fromNow();
      }
    }
  } else {
    retStr = datetime.format("MMM Do YY, h:mm a");
  }
  return retStr;
};

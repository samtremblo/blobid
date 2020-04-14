//V222222222222

class Data {

  constructor(title, data) {
    this.title = title;
    this.data = data;


  }
  //return a formated date base on argument
  returnDate() {


    if (arguments[0] == 'day') {//return yesterday-1

      let today = new Date();
      today.setDate(today.getDate() - 2);
      let dd = String(today.getDate())//.padStart(2, '0');
      let mm = String(today.getMonth() + 1)//.padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let str_yyyy = yyyy.toString();
      let yy = str_yyyy.substr(2, 3);
      today = mm + '/' + dd + '/' + yy;
      return today
    } else if (arguments[0] == 'week') {//return a week from today

      let today = new Date();
      today.setDate(today.getDate() - 7);
      let dd = String(today.getDate())//.padStart(2, '0');
      let mm = String(today.getMonth() + 1)//.padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let str_yyyy = yyyy.toString();
      let yy = str_yyyy.substr(2, 3);
      today = mm + '/' + dd + '/' + yy;
      return today
    } else if (arguments[0] == 'month') {//return a month from today

      let today = new Date();
      today.setDate(today.getDate() - 30);
      let dd = String(today.getDate())//.padStart(2, '0');
      let mm = String(today.getMonth() + 1)//.padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let str_yyyy = yyyy.toString();
      let yy = str_yyyy.substr(2, 3);
      today = mm + '/' + dd + '/' + yy;
      return today
    } else {//return yesterday
      let today = new Date();
      today.setDate(today.getDate() - 1);
      let dd = String(today.getDate())//.padStart(2, '0');
      let mm = String(today.getMonth() + 1)//.padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let str_yyyy = yyyy.toString();
      let yy = str_yyyy.substr(2, 3);
      today = mm + '/' + dd + '/' + yy;
      return today
    }

  }


  //return total of all time worldwide
  returnWWAllTime() {

    let today = this.returnDate()


    let temp = this.data.getColumn(today);
    let total = 0;

    for (let item of temp) {
      let t = parseInt(item, 10);
      total += t;

    }

    return total

  }

  //return ww based on given period of time
  returnWW(time) {

    let today = this.returnDate();

    let timeBefore = this.returnDate(time);

    let temp_today = this.data.getColumn(today);
    let temp_timeBefore = this.data.getColumn(timeBefore);

    let total = 0;
    let index = 0

    for (let item of temp_today) {

      let t_today = parseInt(item, 10);

      let t_timeBefore = parseInt(temp_timeBefore[index], 10);
      let t = t_today - t_timeBefore;
      total += t;

      index++;
    }
    return total

  }

  // return at specified location based on given period of time
  returnLoc(loc, time) {


    let country = this.data.findRows(loc, "Country/Region");
    let timeBefore;

    let total = 0;


    if (time == 'day') timeBefore = 1;
    if (time == 'week') timeBefore = 7;
    if (time == 'month') timeBefore = 30;


    let length = this.data.getColumnCount() - 1;

    if (country.length > 1) {

      let temp_total = 0;
      for (let item of country) {

        if (time == 'week' || 'month') {
          let temp_today = item.get(length);
          let temp_timeBefore = item.get(length - timeBefore);


          temp_total += parseInt(temp_today, 10) - parseInt(temp_timeBefore, 10);


        } else if (time == 'day') {
          let temp_today = item.get(length);
          temp_total += parseInt(temp_today, 10);
        }
        total = temp_total;
      }

    } else {

      if (time == 'week' || 'month') {

        let temp_today = country[0].get(length);
        let temp_timeBefore = country[0].get(length - timeBefore);
        total = parseInt(temp_today, 10) - parseInt(temp_timeBefore, 10);
      } else if (time == 'day') {
        let temp_today = country[0].get(length);
        total = parseInt(temp_today, 10);
      }
    }


    return total


  }



}


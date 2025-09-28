export const CalculaToScond =  (datetime: string | '') => {
    let date = '';
    if (datetime === '' ) {
        date = new Date() + '1000';
    } else {
        date = datetime
    }
    let dateconver = new Date(date)
    let datenow = new Date().getTime();
    let dateend =  new Date(dateconver?.getTime()).getTime();  
   // how can change to second
    let second = (dateend - datenow) / 1000; 
    if(second>0){
        return second;
    }else{
        return 0;
    }
}
//CALENDAR YAMAMOTO
const newDate = new Date();
const jsYear = newDate.getFullYear();
const jsMonth = newDate.getMonth();
const jsDate = newDate.getDate();
const jsWeek = newDate.getDay();
//jsYear = 1;
const weekStr = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const today_id = `${jsYear}/${jsMonth}/${jsDate}`;
window.onload = function() {
    const calendarElm = document.querySelector('#calendar_wrapper');
    if (null !== calendarElm) {
        showCalender(calendarElm, jsYear, jsMonth);
    }
};

const dateFormatter = (date: Date) => {
    const fY = date.getFullYear();
    const fM = date.getMonth();
    const fD = date.getDate();
    const fDate = `${fY}/${fM + 1}/${fD}`;
    return fDate;
};
const showCalender = (calbox: Element, Y: number, M: number) => {
    calbox.textContent = null;
    const calendarSource = createCalender(calbox, Y, M);
    calbox.appendChild(calendarSource);
};
const createCalender = (calbox: Element, Y: number, M: number) => {
    const NEXTmonth = new Date(Y, M + 1, 1);
    const PREVmonth = new Date(Y, M - 1, 1);
    const calendarHeader = document.createElement('div');
    calendarHeader.className = 'calendar_header';

    const hd_text = document.createTextNode(`${Y}/${M + 1}`);
    calendarHeader.appendChild(hd_text);

    //btn
    const PREV_btn = document.createElement('button');
    PREV_btn.className = 'prev_btn';
    const prevbtn_text = document.createTextNode('prev');
    PREV_btn.appendChild(prevbtn_text);
    PREV_btn.addEventListener('click', function() {
        showCalender(calbox, PREVmonth.getFullYear(), PREVmonth.getMonth());
    });
    calendarHeader.appendChild(PREV_btn);

    const NEXT_btn = document.createElement('button');
    NEXT_btn.className = 'next_btn';
    const nextbtn_text = document.createTextNode('next');
    NEXT_btn.append(nextbtn_text);
    NEXT_btn.addEventListener('click', function() {
        showCalender(calbox, NEXTmonth.getFullYear(), NEXTmonth.getMonth());
    });
    calendarHeader.appendChild(NEXT_btn);

    //CALENDAR GENERATE
    const start_date = new Date(Y, M, 1);
    const end_date = new Date(Y, M + 1, 0);
    const lastmonth_end_date = new Date(Y, M, 0);
    const firstweek_num = start_date.getDay();
    const end_date_num = end_date.getDate();
    const lastmonth_end_date_num = lastmonth_end_date.getDate();
    const calendar_container = document.createElement('div');
    calendar_container.className = 'calendar_container';
    const calendar_table = document.createElement('table');
    calendar_table.className = 'calendar_table';
    let cal_date_num: number;
    let cal_data_date: string;
    let date_num = 1;
    calendar_container.appendChild(calendarHeader);
    let calendarHtml = '';
    calendarHtml += `<thead>`;

    for (let i = 0; i < weekStr.length; i++) {
        const week_name = weekStr[i];
        calendarHtml += `<th>${week_name}</th>`;
    }
    calendarHtml += `</thead>`;
    calendarHtml += `<tbody>`;
    for (let j = 0; j < 6; j++) {
        calendarHtml += `</tr>`;
        for (let k = 0; k < 7; k++) {
            const week_class = weekStr[k];
            if (j === 0 && k < firstweek_num) {
                cal_date_num = lastmonth_end_date_num - firstweek_num + 1 + k;
                cal_data_date = dateFormatter(new Date(Y, M - 1, cal_date_num));
            } else if (date_num > end_date_num && j !== 0) {
                if (k === 0) {
                    break;
                }
                cal_date_num = date_num - end_date_num;
                cal_data_date = dateFormatter(new Date(Y, M + 1, cal_date_num));
                date_num++;
            } else {
                cal_date_num = date_num;
                cal_data_date = dateFormatter(new Date(Y, M, cal_date_num));
                date_num++;
            }
            calendarHtml += `<td data-date="${cal_data_date}">${cal_date_num}</td>`;
        }
        calendarHtml += `</tr>`;
    }
    calendarHtml += `</tbody>`;

    calendar_table.insertAdjacentHTML('beforeend', calendarHtml);

    calendar_container.appendChild(calendar_table);
    return calendar_container;
};

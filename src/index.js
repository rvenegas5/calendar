// Calendar with JS
document.addEventListener("DOMContentLoaded", () => {
  const createCalendar = (actualYear, locale) => {
    const weekOfDays = [...Array(7).keys()];
    const intlWeekOfDay = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const months = [...Array(12).keys()];
    const intl = new Intl.DateTimeFormat(locale, { month: "long" });
    const element = document.querySelector('div');

    document.getElementById('down').addEventListener('click',() => {
      element.scrollTo({
        top: element.scrollTop + window.innerHeight,
        behavior: 'smooth'
      });
    });

    document.getElementById('up').addEventListener('click',() => {
      element.scrollTo({
        top: element.scrollTop - window.innerHeight,
        behavior: 'smooth'
      });
    });

    const weekDayNames = weekOfDays.map((weekDayIndex) => {
      const date = new Date(2021, 10, weekDayIndex + 1);
      const weekDayName = intlWeekOfDay.format(date);
      return weekDayName;
    });
    const renderedWeekDays = weekDayNames
      .map((weekDayName) => {
        return `<li class="day-name">${weekDayName}</li>`;
      }).join("");

    const calendar = months.map((monthKey) => {
      //TODO: Fix and explain this
      const monthName = intl.format(new Date(actualYear, monthKey));
      const nextMonthIndex = monthKey + 1;
      const daysOfMonth = new Date(actualYear, nextMonthIndex, 0).getDate();
      const startsOn = new Date(actualYear, monthKey, 1).getDay();
      return {
        monthName,
        daysOfMonth,
        startsOn,
      };
    });

    const html = calendar
      .map(({ daysOfMonth, monthName, startsOn }) => {
        const days = [...Array(daysOfMonth).keys()];
        const dayClass = `class="first-day" style='--first-day-start:${startsOn}'`;
        const renderedDays = days
          .map((day, index) => {
            return `<li ${index === 0 ? dayClass : ""}>${day + 1}</li>`;
          }).join("");
        return `<div class='month'><h1>${monthName} ${actualYear}</h1><ol>${renderedWeekDays} ${renderedDays}</ol></div>`;
      }).join("");

    element.innerHTML = html;
  };

  createCalendar(2021, "en");
});

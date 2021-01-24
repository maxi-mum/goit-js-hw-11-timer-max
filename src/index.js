import refs from './refs/timerRefs';
// console.log(refs);
import css from './css/style.css';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }
  updateClockface() {
    const nowDate = Date.now();
    const time = this.targetDate - nowDate;
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.seconds.textContent = `${seconds}`;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
  timeFinish(time) {
    if (this.targetDate - Date.now() < 0) {
      clearInterval(this.setInt);
      refs.timerRef.textContent = '"Time is out”';
      refs.timerRef.style.textShadow =
        '0 0 5px white, 0 0 10px white, 0 0 15px white, 0 0 20px rebeccapurple';
      refs.timerRef.style.fontSize = '50px';
    }
  }

  setInt = setInterval(() => {
    this.updateClockface();
    this.timeFinish();
  }, 1000);
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 00:00:00 2021'),
});
timer.updateClockface();

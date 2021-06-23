const path = require('path');

console.log(path.join('/','Volumes'));

// const rxjs = require('rxjs');
// const operators = require('rxjs/operators');
//
// const source = rxjs.interval(1000); //1s
//
// const stop1 = new rxjs.Subject();
// const stop2 = new rxjs.Subject();
//
// const s1 = source.pipe(
//   operators.takeUntil(stop1),
//   operators.sample(rxjs.interval(2000)),
//
//   // operators.single( (v) => v === 2),
//   operators.switchMap(v => {
//     if (v > 4) {
//       return rxjs.of(v + 1);
//     }
//     return  operators.skipWhile(1);
//   }),
//
//   // operators.filter(v => v!= undefined),
//   // operators.single( (v) => v != undefined),
//
//   // operators.skipWhile(v => {
//   //   const rs = v == undefined;
//   //   console.log('debug', rs);
//   //   return rs;
//   // }),
// ).subscribe(v => console.log(2, v));
// const s2 = source.pipe(
//   operators.takeUntil(stop2),
//   operators.sample(rxjs.interval(5000)),
// ).subscribe(v => console.log(5, v));
//
// setTimeout(() => {
//   stop1.next(true);
// }, 14_000);
//
// setTimeout(() => {
//   stop2.next(true);
// }, 11_000);
//
// console.log('waiting to stop');

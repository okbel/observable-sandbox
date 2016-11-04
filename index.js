import Rx, { Observable } from 'rxjs'

/*
 Rx.Subject is both an Observer and Observable, so it handles both publish and subscribe.
*/

// const subject = new Rx.Subject()
// const subscription = subject.subscribe(data => {
//     console.log(`this is data:${data}`)
// }); //subscribe returns a subscription
// subject.next('foo');
// subject.next('another data');

// subscription.unsubscribe();


/*
 Rx.Subject is both and Observable and an Observer
 */

const ob = Observable.interval(500).map(item => {
  return item * 2
})

ob.subscribe((value) => {
 console.log('hello', value)
}, (err) => {
  // Some error
}, () => {
  // On Completion
})

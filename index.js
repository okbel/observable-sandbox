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

// const ob = Observable.interval(500).map(item => {
//   return item * 2
// })
//
// ob.subscribe((value) => {
//  console.log('hello', value)
// }, (err) => {
//   // Some error
// }, () => {
//   // On Completion
// })

var movieLists = [
  {
    name: "Instant Queue",
    videos : [
      {
        "id": 70111470,
        "title": "Die Hard",
        "boxarts": [
          { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
          { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
        ],
        "url": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "boxarts": [
          { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
          { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

        ],
        "url": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id: 432534, time: 65876586 }]
      }
    ]
  },
  {
    name: "New Releases",
    videos: [
      {
        "id": 65432445,
        "title": "The Chamber",
        "boxarts": [
          { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
          { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
        ],
        "url": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 4.0,
        "bookmark": []
      },
      {
        "id": 675465,
        "title": "Fracture",
        "boxarts": [
          { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
          { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
          { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
        ],
        "url": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": 5.0,
        "bookmark": [{ id: 432534, time: 65876586 }]
      }
    ]
  }
];

// Use one or more map, concatAll, and filter calls to create an array with the following items
// [
//	 {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
//	 {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
//	 {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
//	 {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
// ];

const go = function () {
  return movieLists
          .map(movieList => movieList.videos
            .map(video => video.boxarts
              .filter(boxart => boxart.width === 150)
              .map(boxart => ({
                id: video.id,
                title: video.title,
                boxart: boxart.url
              }))
  ))
}

console.log(JSON.stringify(go(), null, 4));

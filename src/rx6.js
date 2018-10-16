import { Observable } from "rxjs"
import { finalize } from "rxjs/operators"

export default function mountDisposableComponent(mount, unmount) {
  return Observable.create( observer => {
    mount(
      observer.next.bind(observer),
      observer.complete.bind(observer),
      observer.error.bind(observer)
    )
  }).pipe(
    finalize(unmount)
  )
}
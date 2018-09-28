import { Observable } from "rx";
import { Observable as Observable6 } from "rxjs"
import { finalize } from "rxjs/operators"

export default function mountComponent(mount, unmount) {
  return Observable.create(observer => {
    mount(
      observer.onNext.bind(observer),
      observer.onCompleted.bind(observer),
      observer.onError.bind(observer)
    );
  }).finally(unmount);
}

export function mountDisposableComponent(mount, unmount) {
  return Observable6.create( observer => {
    mount(
      observer.next.bind(observer),
      observer.complete.bind(observer),
      observer.error.bind(observer)
    )
  }).pipe(
    finalize(unmount)
  )
}
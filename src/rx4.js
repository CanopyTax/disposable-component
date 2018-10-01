import { Observable } from "rx";

export default function mountComponent(mount, unmount) {
  return Observable.create(observer => {
    mount(
      observer.onNext.bind(observer),
      observer.onCompleted.bind(observer),
      observer.onError.bind(observer)
    );
  }).finally(unmount);
}

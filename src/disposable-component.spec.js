import mountComponent from './rx4.js';
import mountDisposableComponent  from './rx6.js';

describe('Disposable Component', function() {
  it('should execute the mount life-cycle lazily', function() {
    const mount = jasmine.createSpy();
    const unmount = jasmine.createSpy();

    mountComponent(mount, unmount);

    expect(mount).not.toHaveBeenCalled();
    expect(unmount).not.toHaveBeenCalled();

    mountComponent(mount, unmount).subscribe(data => {
    });

    expect(mount).toHaveBeenCalled();
    expect(unmount).not.toHaveBeenCalled();
  });

  it('should unmount when the subscription is disposed', function() {
    const mount = jasmine.createSpy();
    const unmount = jasmine.createSpy();

    mountComponent(mount, unmount);

    expect(mount).not.toHaveBeenCalled();
    expect(unmount).not.toHaveBeenCalled();

    mountComponent(mount, unmount).subscribe(data => {
    }).dispose();

    expect(mount).toHaveBeenCalled();
    expect(unmount).toHaveBeenCalled();
  });

  it('should publish data to the subscription', function() {
    const mount = function(onNext, onError, onCompleted) {
      onNext(1);
      onNext(2);
    };
    const unmount = jasmine.createSpy();
    const onData = jasmine.createSpy();

    mountComponent(mount, unmount).subscribe(onData);

    expect(onData).toHaveBeenCalledWith(1);
    expect(onData).toHaveBeenCalledWith(2);
  });

  it('should publish errors to the subscription', function() {
    const mount = function(onNext, onCompleted, onError) {
      onError('aah');
    };
    const unmount = jasmine.createSpy();
    const onError = jasmine.createSpy();

    mountComponent(mount, unmount).subscribe(() => {}, onError);

    expect(onError).toHaveBeenCalledWith('aah');
  });

  it('should publish errors to the subscription', function() {
    const mount = function(onNext, onCompleted, onError) {
      onCompleted();
    };

    const onCompleted = jasmine.createSpy();

    mountComponent(mount, () => {}).finally(onCompleted).subscribe(() => {}, () => {});

    expect(onCompleted).toHaveBeenCalled();
  });
});

describe('Disposable Component rx6', function() {
  it('should execute the mount life-cycle lazily', function() {
    const mount = jasmine.createSpy();
    const unmount = jasmine.createSpy();

    mountDisposableComponent(mount, unmount);

    expect(mount).not.toHaveBeenCalled();
    expect(unmount).not.toHaveBeenCalled();

    mountDisposableComponent(mount, unmount).subscribe(data => {
    });

    expect(mount).toHaveBeenCalled();
    expect(unmount).not.toHaveBeenCalled();
  });

  it('should unmount when the subscription is disposed', function() {
    const mount = jasmine.createSpy();
    const unmount = jasmine.createSpy();

    mountDisposableComponent(mount, unmount);

    expect(mount).not.toHaveBeenCalled();
    expect(unmount).not.toHaveBeenCalled();

    mountDisposableComponent(mount, unmount).subscribe(data => {
    }).unsubscribe();

    expect(mount).toHaveBeenCalled();
    expect(unmount).toHaveBeenCalled();
  });

  it('should publish data to the subscription', function() {
    const mount = function(next, error, complete) {
      next(1);
      next(2);
    };
    const unmount = jasmine.createSpy();
    const onData = jasmine.createSpy();

    mountDisposableComponent(mount, unmount).subscribe(onData);

    expect(onData).toHaveBeenCalledWith(1);
    expect(onData).toHaveBeenCalledWith(2);
  });

  it('should publish errors to the subscription', function() {
    const mount = function(next, complete, error) {
      error('aah');
    };
    const unmount = jasmine.createSpy();
    const error = jasmine.createSpy();

    mountDisposableComponent(mount, unmount).subscribe(() => {}, error);

    expect(error).toHaveBeenCalledWith('aah');
  });
});

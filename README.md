# disposable-component
Disposable-component provides a simple reactive API for mounting and
unmounting components to the DOM. This is useful for cross framework
interop inside your single-page-app.

[![npm version](https://img.shields.io/npm/v/disposable-component.svg?style=flat-square)](https://www.npmjs.org/package/disposable-component)
[![Build Status](https://img.shields.io/travis/CanopyTax/disposable-component.svg?style=flat-square)](https://travis-ci.org/CanopyTax/disposable-component)

## Setup

```
npm install --save rx disposable-component
```

### Usage
A simple example would be to use `disposable-component` to build a
react-modal:

```js
import mountComponent from "disposable-component";
import React from "react";
import ReactDOM from "react-dom";

function showModal(El, props) {
  return mountComponent(
    function mount(onNext, onCompleted, onError) {
      el = document.createElement("div");
      document.body.appendChild(el);

      ReactDOM.render(
        <El {...props} close={onCompleted} onNext={onNext} />,
        el
      );
    },
    function unmount() {
      ReactDOM.unmountComponentAtNode(el);
      el.parentNode.removeChild(el);
    }
  );
}

const subscription = showModal(function MyModal() {
  return (
    <div>
      <h1>My Modal</h1>
      <button onClick={this.props.onCompleted}>Close</button>
      <button onClick={this.props.onNext.bind(null, 1)}>Save</button>
    </div>
  );
}).subscribe(
  data => console.log(data),
  err => console.error(err)
);

subscription.dispose(); // close the modal
```

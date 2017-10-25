# React data form builder

## Install

```
yarn add react-chtr-form
```

## Basic use case

```
import { ChtrForm } from 'react-chtr-form';
import 'react-chtr-form/chtr-form.css';  // to load the css

render( <ChtrForm  label="I am a form!" 
  display={{ 
    type: 'hash', 
    display: [ 
      {type: 'text', label: 'Email Address', name: "email", required: true}, 
      {type: 'password', label: "password", name: "password", required: true} ] }}/>, 
      document.getElementById( 'app' ) 
); 
```

# Mindset

`react-chtr-form` was created to manage complex data structures.  A single configuration is used to describe both the data structure and the form.  The configuration is designed have a minimal feel/code footprint, with the ability to tune or change almost anything.  The idea is to be able to create an manage an infinitly scaling form/data structure that is only limited by browser resoruces.

Objects are typically displayed in containers; Containers represent data structures.  Example: if you want the form to manage a list ( Array Object ) the first container would be a type: list.  The display contents would then represent list elements.


# Terms

* path
Paths are a list that represent where in the object structure this thing exists.

# Getting Data out

`ChtrFrom` provides a collection of callback handlers that return a semi deep copy of the the internal data.

## Callbacks

| name | When its called | Arguments |
| ---- | --------------- | --------- |
| onChange | when a field changes | (data,path) |
| onSubmit | when the submit button is pressed | (data) |
| onReset  | when the reset button is pressed  | () |



# Plugins

| Plugin      |       Type           |
| ----------- | -------------------- |
| text        | input                |
| password    | password             |
| textarea    | textarea             |
| select      | select               |
| multiselect | select multiple      |
| radio       | radio                |
| checkbox    | checkbox             |
| add         | subform add          |
| hash        | container for hashes |
| list        | container for lists  |
| watch       | chooses a container based on an item being watched |

# Input Examples

## Select box


This example shows how to manage a scalar value with a select box.

```
<ChtrForm display={{ type: 'select', input: "", required: true, label: "Select Test", data: [{ value: "one", label: "option one" }, { value: 'two', label: "Option two" }] }}/>
```

## input text box

## password

## textarea

## multiselect

## radio

## checbox

# Container Examples

## list

## hash

## add

# Watch example(s)

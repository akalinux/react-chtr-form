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

Objects are typically displayed in containers; Containers represent data structures.  Example: if you want the form to manage a list ( Array Object ) the first container would be a `type: list`,  and the display contents would then represent list elements. 


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

Each plugin has its on css, and each css class can be passed in as an argument.

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

## Input Examples

### Select box

* **Example**

This example shows how to manage a scalar value with a select box.

```
<ChtrForm display={
  { 
    type: 'select', 
    input: "", 
    required: true, 
    label: 
    "Select Test", 
    data: [
      { value: "one", label: "Option one" }, 
      { value: 'two', label: "Option two" }
    ] 
  }
}/>
```

* **Options**

| option | description |
| ------ | ----------- |
| data | Array of Objects: { value: "value", label: "display text } |
| input | The default selected value "" if you don't want anything selected |
| required | true|false, denotes if the field is required for the onSubmit action to be called |
| label | display text |
| disabled | true|false, denotes if this field is disabled |

* **CSS Options**

The select plugin has the following css options

| option | default value |
| ------ | ------------- |
| classNameSelectRow | ChtrFormSelectRow |
| classNameSelectHeader | ChtrFormSelectHeader  | 
| classNameSelectCell | chtr-form-select-cell  | 
| classNameSelectCellDefault | chtr-form-select-cell  | 
| classNameSelectCellError | chtr-form-select-cell-error  | 
| classNameSelect | ChtrFormSelect  | 
| classNameSelectDefault | ChtrFormSelect  | 
| classNameSelectError | ChtrFormSelectError  | 
| classNameSelectOption | chtr-form-select-option  | 
| classNameSelectOptionDefault | chtr-form-select-option  | 
| classNameSelectOptionError | chtr-form-select-option-error |


### input text box

### password

### textarea

### multiselect

### radio

### checbox

## Container Examples

### list

### hash

### add

# Watch example(s)

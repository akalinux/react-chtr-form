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

* **path** Path(s) are a list that represent where in the object structure this thing exists.
* **scalar** primitive data value

# Getting Data out

`ChtrFrom` provides a collection of callback handlers that return a semi deep copy of the the internal data.


## ChtrForm Options

* **Arguments**

| option | description |
| ------ | ----------- |
| data | data structure to be displayed |
| display | form/data structure configuration |
|    showSubmit | default: true, show or hide the submit button |
|    showReset | default: true, show or hide the reset button |
|    submitText | default "Submit", submit button text |
|    resetText | default "Rest", submit button reset |
|    formError | default: false, State for the form ( error: true\|false ) |
|    name | default "form", used for internal key geneation ( recommended this be set to something unique ) |
|    label | default "", header text of the form |
|    errorText | default "Some fields are not filled out properly" |

* **Event Handlers**

| name | When its called | Arguments |
| ---- | --------------- | --------- |
| onChange | when a field changes | (data,path) |
| onSubmit | when the submit button is pressed | (data) |
| onReset  | when the reset button is pressed  | () |

* **Css Options**

ChtrForm uses the following CSS Classes, and each class can be passed in as an argument.

| option | default value |
| ------ | ------------- |
|    classNameFormContainer | chtr-form-container |
|    classNameFormHeader | chtr-form-header |
|    classNameHeaderLine | "" |
|    classNameSubmitRow | chtr-form-submit-row |
|    classNameFormDiv | "" |
|    classNameButton | ChtrFormSubmit |
|    classNameFormError | chtr-form-error |


# Default Plugins

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
| watch       | chooses a configuration based on an item being watched |

## Input Examples

### input text box ( text plugin )

* **Example**

This example shows how to manage a scalar value with a text input.

```
<ChtrForm display={
  { 
    type: 'text', 
    input: "", 
    required: true, 
    label: "input test", 
  }
}/>
```

* **Options**

| option | description |
| ------ | ----------- |
| input  | default value |
| required | true\|false determines if this field is required |
| validate | function(currentValue), must return true if the value is valid false if it is not |
| disabled | true\|false determines if the field is disabled |

* **CSS Options**

| option | default value |
| ------ | ------------- |
|    classNameInputText | ChtrFormDefaultsInputText |
|    classNameInputTextCheckFailed | ChtrFormDefaultsInputTextfailed |
|    classNameInputLabel | ChtrFormLabel |
|    classNameInputContainer | chtr-form-input-container |
|    classNameInputTextDefault | ChtrFormDefaultsInputText |


### Password ( password plugin )

* **Example**

This example shows how to manage a scalar value with a text input.

```
<ChtrForm display={
  { 
    type: 'password', 
    input: "", 
    required: true, 
    label: "password test", 
  }
}/>
```

* **Options**

| option | description |
| ------ | ----------- |
| input  | default value |
| required | true\|false determines if this field is required |
| validate | function(currentValue), must return true if the value is valid false if it is not |
| disabled | true\|false determines if the field is disabled |

* **CSS Options**

| option | default value |
| ------ | ------------- |
|    classNameInputText | ChtrFormDefaultsInputText |
|    classNameInputTextCheckFailed | ChtrFormDefaultsInputTextfailed |
|    classNameInputLabel | ChtrFormLabel |
|    classNameInputContainer | chtr-form-input-container |
|    classNameInputTextDefault | ChtrFormDefaultsInputText |

### Textarea ( textarea plugin )

* **Example**

This example shows how to manage a scalar value with a textarea.

```
<ChtrForm display={
  { 
    type: 'textarea', 
    input: "", 
    required: true, 
    label: "password test", 
  }
}/>
```

* **Options**

| option | description |
| ------ | ----------- |
| input  | default value |
| required | true\|false determines if this field is required |
| validate | function(currentValue), must return true if the value is valid false if it is not |
| disabled | true\|false determines if the field is disabled |

* **CSS Options**

| option | default value |
| ------ | ------------- |
|    classNameInputText | chtr-form-textarea |
|    classNameInputTextCheckFailed | chtr-form-textarea-error |
|    classNameInputLabel | chtr-form-label |
|    classNameInputContainer | chtr-form-textarea-container |
|    classNameInputTextDefault | chtr-form-textarea-container |


### Select box ( select plugin )

* **Example**

This example shows how to manage a scalar value with a select box.

```
<ChtrForm display={
  { 
    type: 'select', 
    input: "", 
    required: true, 
    label: "Select Test", 
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
| required | true\|false, denotes if the field is required for the onSubmit action to be called |
| label | display text |
| disabled | true\|false, denotes if this field is disabled |

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

### Radio Set ( radio plugin )

* **Example**

This example shows how to manage a scalar value with a radio set.

```
<ChtrForm display={
  { 
    type: 'radio', 
    input: "", 
    required: true, 
    label: "Raidio Test", 
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
| required | true\|false, denotes if the field is required for the onSubmit action to be called |
| label | display text |
| disabled | true\|false, denotes if this field is disabled |

* **CSS Options**

| option | default value |
| ------ | ------------- |
|        classNameInputRaidio | ChtrFormDefaultsInputRaidio |
|        classNameRadioCellIndent | chtr-form-radio-indent |
|        classNameRadioHeader | ChtrFormRadioHeader |
|        classNameRaidoRow | chtr-form-raidio-row |
|        classNameRaidioRowContainer | chtr-form-raidio-row-container |
|        classNameRadioButtonCell | chtr-form-radio-button-cell |
|        classNameRadioButtonCellDefault | chtr-form-radio-button-cell |
|        classNameRadioButtonCellFailed | chtr-form-radio-button-cell-failed |

### Multiple Select ( multiselect plugin )

* **Example**

This example shows how to manage a scalar value with a multiple select.

```
<ChtrForm display={
  { 
    type: 'multiselect', 
    input: [], 
    required: true, 
    label: "Milti Select Test", 
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
| input | Array of selected values, [] if you don't want anything selected |
| required | true\|false, denotes if the field is required for the onSubmit action to be called |
| label | display text |
| disabled | true\|false, denotes if this field is disabled |
| size| default: 5, sets how many records will be shown |

* **CSS Options**

| option | default value |
| ------ | ------------- |
|    classNameSelectRow | ChtrFormSelectRow |
|    classNameSelectHeader | ChtrFormSelectHeader |
|    classNameSelectCell | chtr-form-select-cell |
|    classNameSelectCellDefault | chtr-form-select-cell |
|    classNameSelectCellError | chtr-form-select-cell-error |
|    classNameSelect | chtr-form-select-multi |
|    classNameSelectOption | chtr-form-select-option |
|    classNameSelectOptionDefault | chtr-form-select-option |
|    classNameSelectOptionError | chtr-form-select-option-error |
    
### CheckBox ( checbox plugin )

* **Example**

This example shows how to manage a scalar value with a multiple select.

```
<ChtrForm display={
  { 
    type: 'checkbox', 
    label: "Label Example", 
  }
}/>
```

* **Options**

| option | description |
| ------ | ----------- |
| input | true\|false, if not set defaults to false |
| required | true\|false, denotes if the field is required for the onSubmit action to be called |
| label | display text |
| disabled | true\|false, denotes if this field is disabled |

* **CSS Options**

| option | default value |
| ------ | ------------- |
|    classNameFormCheckboxLeft | chtr-form-label-right |
|    classNameFormCheckboxRight | chtr-form-element-left |
|    classNameFormCheckboxContainer | chter-form-input-container |
|    classNameFormCheckBox | chtr-form-input-checkbox |
|    classNameFormCheckBoxDefault | chtr-form-input-checkbox |
|    classNameFormCheckBoxError | chtr-form-input-checkbox-error |
|    classNameFormCheckboxRightError | chtr-form-label-right-error |
|    classNameFormCheckBoxRightDefault | chtr-form-label-right |

## Container Examples

Containers represent Data structures of type Array or Object.  Containers make it possible to move beyond a scalar value.

### list ( list plugin )

* **Example**

This example shows how to manage a list of text inputs.

```
<ChtrForm display={{
  "type": "list",
  "label": "Test Set 1",
  "canMove": true,
  "canDelete": true,
  "display": [
    {
      "type": "text",
      "label": "test One",
      "required": true
    },
    {
      "type": "text",
      "label": "Test Two",
      "required": true
    }]
    }}
/>
```

* **Options**

| option | description |
| ------ | ----------- |
|    deleteText | default "Delete", text of the delete button |
|    moveUpText | default value "^", text of the move up button |
|    moveDownText | default value "v", text of the move down button |
|    canMove | false, enables or disables the move option  |
|    canDelete | false, enables or disables the delete option |
|    headerText | default "I am a list", sets the header text for the list block |
| display | Array that contains the plugins options to display |



* **CSS Options**

| option | default value |
| ------ | ------------- |    
|    classNameListContainer | chtr-form-container |
|    classNameListRow | chtr-form-container-list-row |
|    classNameListButton | ChtrFormSubmit |
|    classNameListCell | chtr-form-container-list-cell |
|    classNameListButtonContainer | chtr-form-container-list-cell-buttons |
|    classNameHidden | ChtrFormHidden |
|    classNameSmallerWidth | chtr-form-container-smaller-row |
|    classNameListHeader | chtr-form-container-list-header |

### hash

* **Example**

This example shows how to manage a hash of text and password inputs. 

```
<ChtrForm display={{
        label: "Simple Hash example",
        display: {
            type: 'hash',
            display: [
                { type: 'text', label: 'Email Address', name: "email", required: true },
                { type: 'password', label: "password", name: "password", required: true }
            ]
        }
    }}
/>
```


* **Options**

| option | description |
| ------ | ----------- |

* **CSS Options**
| option | default value |
| ------ | ------------- |    
| display | Array that contains the plugins options to display |
|    classNameListContainer | chtr-form-container | 
|    classNameHashRow | chtr-form-container-hash-row | 
|    classNameHashCell | chtr-form-container-hash-cell | 
|    classNameListHeader | chtr-form-container-list-header | 

### add

## Watch example(s)

# Built in demo

The project contains a very basic demo which can be accessed by by issuing the following commands, in the project folder.

```
npm run demo
```

From there the demo/index.html can be viewed locally.

'use strict';
import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { ChtrForm, ChtFormElements } from '../build/chtr-form.js';
import { cloneObject, mergeObjects, objectsDiffer, cloneProps } from 'react-chtr-object-methods';


class FormDemo extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {};
        this.state.form = cloneObject( FormDemo.demos['basictext'] );
        this.state.currentDemo = 'basictext';
        this.state.data = this.state.form.data;
        this.state.display = this.state.form.display;

        this.setDemo = this.setDemo.bind( this );
        this.handleDataChange = this.handleDataChange.bind( this );
        this.handleReset = this.handleReset.bind( this )
    }

    handleReset() {
        this.setDemo( this.state.currentDemo );
    }

    setDemo( demo ) {
        const form = cloneObject( FormDemo.demos[demo] );
        const data = cloneObject( form.data );
        const display = cloneObject( form.display );
        this.setState( { form: form, data: data, display: display, currentDemo: demo } );
    }

    handleDataChange( form ) {
        this.setState( { form: form } );
    }

    render() {

        return (
            <div>
                <div className="demo-header"> Form Demo</div>
                <div>
                    <input type="button" value="Scalar Scalar" onClick={this.setDemo.bind( this, "basictext" )} />
                    <input type="button" value="Hash Example" onClick={this.setDemo.bind( this, "hash" )} />
                    <input type="button" value="Basic Add" onClick={this.setDemo.bind( this, "basicadd" )} />
                    <input type="button" value="Add to list with Multiple subforms" onClick={this.setDemo.bind( this, "add" )} />
                    <input type="button" value="Complex List Example" onClick={this.setDemo.bind( this, "listwithdelete" )} />
                    <input type="button" value="Watch Example" onClick={this.setDemo.bind( this, "watch" )} />

                </div>
                <div className="demo-container">
                    <div className="demo-cell-30">
                        <div className="demo-topic">Display Settings</div>
                        <div><div className="demo-json"><pre>{JSON.stringify( this.state.display, null, 2 )}</pre></div></div>
                    </div>
                    <div className="demo-cell-30">
                        <div>Current Data</div>
                        <div><div className="demo-json"><pre>{JSON.stringify( this.state.form.data, null, 2 )}</pre></div></div>
                    </div>

                    <div className="demo-cell-40">
                        <div className="demo-topic">Rendered Form</div>
                        <div><ChtrForm {...this.state.form} onReset={this.handleReset} onChange={this.handleDataChange} /></div></div>
                </div>
            </div> );
    }
}

FormDemo.demos = {
    basictext: {
        label: "Scalar Text input demo",
        data: "",
        display: { label: "Text Input", type: 'text', required: true }
    },
    hash: {
        label: "Simple Hash example",
        display: {
            type: 'hash',
            display: [
                { type: 'text', label: 'Email Address', name: "email", required: true },
                { type: 'password', label: "password", name: "password", required: true }
            ]
        }
    },
    add: {
        label: "Add to list",
        display: {
            type: 'add',
            add: ['forms'],
            form: {
                display: {
                    type: 'hash', display: [
                        { name: 'label', type: 'text', label: "label", required: true },
                        { name: 'value', type: 'text', label: "value", required: true },
                        {
                            name: 'forms', type: 'select', label: "Choose the subform", data: [{ value: 'Informal', label: 'informal' }, { value: 'Formal', label: 'formal' }]
                        }
                    ]
                }
            },
            list: {
                canMove: true,
                canDelete: true,
                label: 'sets added', display: [],
            },
            chooser: {
                Informal: {
                    label: 'Form One',
                    type: 'hash',
                    display: [
                        { name: 'label', type: 'text', label: "label", required: true },
                        { name: 'value', type: 'text', label: "value", required: true },
                    ]
                },
                Formal: {
                    label: 'Form Two',
                    type: 'hash',
                    display: [
                        { name: 'label', type: 'text', label: "Nomenclature", required: true },
                        { name: 'value', type: 'text', label: "Assignment", required: true },
                        { name: 'select', type: 'select', label: 'Choose One', required: true, data: [{ label: 'one', value: 'one' }, { label: 'two', value: 'two' }] }
                    ]
                }
            },

        }
    },
    listwithdelete: {
        display: {
            type: 'list',
            label: "Test Set 1",
            canMove: true,
            canDelete: true,
            display: [
                { type: 'text', label: "test One", required: true },
                { type: 'text', label: "Test Two", required: true },
                { type: 'checkbox', label: "example checkbox", input: "" },
                { required: true, type: 'radio', name: "", label: "Raidio Set", input: "", data: [{ value: "one", label: "exampleOne" }, { value: "two", label: "exampleTwo" }] },
                { type: 'select', input: "", required: true, label: "Select Test", data: [{ value: "one", label: "option one" }, { value: 'two', label: "Option two" }] },
                {
                    type: 'multiselect', input: [], required: true, label: "Multi Select", data: [
                        { value: "one", label: "option one" },
                        { value: 'two', label: "Option two" },
                        { value: 'three', label: "Option three" },
                        { value: 'four', label: "Option four" },
                        { value: 'five', label: "Option five" },
                    ]
                },
                { type: 'textarea', label: "Text Area", required: true },
                { type: 'text', label: "test Six" },
                {
                    label: "Test Set 1, SubSet 2",
                    type: 'hash',
                    display: [
                        { name: 'a', type: 'text', label: "Sub Test One" },
                        { name: 'b', type: 'text', label: "Sub Test Two" },
                        { name: 'c', type: 'text', label: "Sub Test Threee" },
                    ]
                }
            ]
        },
        label: "Complex list demo",
    },
    basicadd: {
        label: 'Basic Add',
        display: {
            type: 'add',
            add: {
                type: 'hash', display: [
                    { name: 'label', type: 'text', label: "label", required: true },
                    { name: 'value', type: 'text', label: "value", required: true }
                ]
            },
            form: {
                display: {
                    type: 'hash', display: [
                        { name: 'label', type: 'text', label: "label", required: true },
                        { name: 'value', type: 'text', label: "value", required: true }
                    ]
                }
            },
            list: {
                canMove: true,
                canDelete: true,
                label: 'sets added', display: [],
            }

        }
    },
    watch: {
        label: "Watch Example",
        display: {
            type: 'hash',
            display: [
                {
                    type: 'select',
                    label: 'choose a subform',
                    input: 'one',
                    name: "choose",
                    data: [
                        { value: 'one', label: 'Form One' },
                        { value: 'two', label: 'Form Two' }
                    ],
                },
                {
                    type: 'watch',
                    name: 'subform',
                    watch: ['choose'],
                    setDisplay: 'one',
                    displays: {
                        one: { type: 'text', label: 'test' },
                        two: { type: 'checkbox', label: 'subform checkbox' },
                    },
                }

            ]
        }
    }
};


FormDemo.demos.add.data = ChtFormElements['add'].buildData( FormDemo.demos.add );
FormDemo.demos.hash.data = ChtFormElements['hash'].buildData( FormDemo.demos.hash.display );
FormDemo.demos.listwithdelete.data = ChtFormElements['list'].buildData( FormDemo.demos.listwithdelete.display );
FormDemo.demos.basicadd.data = ChtFormElements['add'].buildData( FormDemo.demos.basicadd.display );
FormDemo.demos.watch.data = ChtFormElements['hash'].buildData( FormDemo.demos.watch.display );
render( <FormDemo />, document.getElementById( 'app' ) );

// End of the demo file

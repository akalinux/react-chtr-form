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
                    <input type="button" value="Add to a list" onClick={this.setDemo.bind( this, "add" )} />
                </div>
                <div className="demo-container">
                    <div className="demo-cell">
                        <div className="demo-topic">Display Settings</div>
                        <div><div className="demo-json"><pre>{JSON.stringify( this.state.display, null, 2 )}</pre></div></div>
                    </div>
                    <div className="demo-cell">
                        <div>Current Data</div>
                        <div><div className="demo-json"><pre>{JSON.stringify( this.state.form.data, null, 2 )}</pre></div></div>
                    </div>

                    <div className="demo-cell">
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
                { type: 'text', label: "password", name: "password", required: true }
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
                    ]
                }
            },

        }
    }
};


FormDemo.demos.add.data = ChtFormElements['add'].buildData( FormDemo.demos.add );
FormDemo.demos.hash.data = ChtFormElements['hash'].buildData( FormDemo.demos.hash.display);

render( <FormDemo />, document.getElementById( 'app' ) );

// End of the demo file

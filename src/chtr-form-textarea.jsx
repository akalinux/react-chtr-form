import React, { Component, PropTypes } from 'react';
import { ChtFormElements, ChtrFormCss } from './chtr-form-elements.jsx';
import { cloneObject, mergeObjects, objectsDiffer, cloneProps  } from 'react-chtr-object-methods';

class ChtrFormTextArea extends React.Component {

    static buildData( props ) {

        const input = props.hasOwnProperty( 'input' ) ? props.input : ChtrFormTextArea.defaultProps.input;
        return input == null ? "" : input;
    }

    constructor( props ) {
        super( props );
        this.state = cloneProps( props );
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmitCheck = this.handleSubmitCheck.bind( this );
    }

    handleSubmitCheck() {
        this.handleValidate();

    }

    handleValidate() {

        const target = cloneObject(this.state);
        if ( (this.state.required && this.state.input.length <= 0) || !this.props.validate(this.state.input) ) {
            target['classNameInputText'] = this.props.classNameInputTextCheckFailed;
            this.props.onValidate( this.state.dataPath, this.state.displayPath, target,false );
        } else {
            target['classNameInputText'] = this.props.classNameInputTextDefault;
            this.props.onValidate( this.state.dataPath, this.state.displayPath, target,true );
        }
    }
    
    componentWillUnmount() {
        this.props.root.deleteSubmitCheck( this.state.dataPath );
    }

    componentDidMount() {
        const instance=this;
        this.props.root.registerSubmitCheck( this.state.dataPath, this.handleSubmitCheck );
    }

    handleChange( e ) {

        this.state.input = e.target.value;
        this.props.onChange( this.state.dataPath, this.state.displayPath, this.state );
    }

    componentWillReceiveProps( props ) {
        this.props.root.deleteSubmitCheck( this.state.dataPath );
        this.setState( cloneProps( props ) );
        this.props.root.registerSubmitCheck( props.dataPath, this.handleSubmitCheck );
    }


    render() {

        return (
            < div className={this.state.classNameInputContainer} >
                <div className={this.state.classNameInputLabel}>{this.state.label}</div>
                
                <textarea
                    ref={(input) => this.input=input}
                    value={this.state.input}
                    disabled={this.state.disabled}
                    className={this.state.classNameInputText}
                    type="text"
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

const css = {
    classNameInputText: "chtr-form-textarea",
    classNameInputTextCheckFailed: "chtr-form-textarea-error",
    classNameInputLabel: "chtr-form-label",
    classNameInputContainer: "chtr-form-textarea-container",
    classNameInputTextDefault: "chtr-form-textarea-container",
};
ChtrFormCss['textarea']=css;

ChtrFormTextArea.defaultProps = {
    onChange: function( displayPath, dataPath, props ) { },
    input: "",
    name: 'default-input',
    label: "Input:",
    disabled: false,
    displayPath: [],
    dataPath: [],
    required: false,
    validate: function () { return true},
};

Object.assign(ChtrFormTextArea.defaultProps,css);

ChtFormElements['textarea'] = ChtrFormTextArea;


// end of the package


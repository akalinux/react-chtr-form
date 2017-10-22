import React, { Component, PropTypes } from 'react';
import { ChtFormElements, ChtrFormCss } from './chtr-form-elements.js';
import { cloneObject, mergeObjects, objectsDiffer, cloneProps  } from 'react-chtr-object-methods';

class ChtrFormCheckBox extends React.Component {
    constructor( props ) {
        super( props );
        this.state = cloneProps( props, ['root'] );
        //this.state.input=ChtrFormCheckBox.buildData(props);
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmitCheck = this.handleSubmitCheck.bind( this );
    }

    handleSubmitCheck() {
        this.handleValidate();

    }
    static buildData( props ) {

        
        if(props.hasOwnProperty( 'input' )) {
          let input=props.input;
          if(input==null) {
              return false;
          } else if(typeof(input)!='boolean') {
              return false;
          } else {
              return input;
          }
          
            
        } else {
            return false;
        } 
    }


    /**
     * This function fires when when validation is requried.
     */
    handleValidate() {

        const target = cloneObject( this.state );
        if ( ( this.state.required && typeof(this.state.input)!='boolean' ) ) {
            target['classNameFormCheckBox'] = this.props.classNameFormCheckBoxError;
            target['classNameFormCheckboxRight'] = this.props.classNameFormCheckboxRightError;
            this.props.onValidate( this.state.dataPath, this.state.displayPath, target, false );
        } else {
            target['classNameFormCheckBox'] = this.props.classNameFormCheckBoxDefault;
            target['classNameFormCheckboxRight'] = this.props.classNameFormCheckboxRightDefault;
            this.props.onValidate( this.state.dataPath, this.state.displayPath, target, true );
        }
    }

    handleChange( e ) {
        this.state.input = e.target.checked;
        this.props.onChange( this.state.dataPath, this.state.displayPath, this.state );
    }

    componentWillReceiveProps( newProps ) {
        this.props.root.deleteSubmitCheck( this.state.dataPath );
        this.setState( cloneProps( newProps, ['root'] ) );
        this.props.root.registerSubmitCheck( newProps.dataPath, this.handleSubmitCheck );;
    }
    componentWillUnmount() {
        this.props.root.deleteSubmitCheck( this.state.dataPath );
    }

    componentDidMount() {
        this.props.root.registerSubmitCheck( this.state.dataPath, this.handleSubmitCheck );
    }


    render() {

        return (
            < div className={this.state.classNameFormInputContainer} >
                <div className={this.state.classNameFormCheckboxLeft}>{this.state.label}</div>
                <div className={this.state.classNameFormCheckboxRight}>
                    <input checked={typeof(this.state.input)=='boolean' ? this.state.input : false} disabled={this.state.disabled} className={this.state.classNameFormCheckBox} type="checkbox" onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

ChtrFormCheckBox.defaultProps = {
    classNameFormCheckboxLeft: "chtr-form-label-right",
    classNameFormCheckboxRight: "chtr-form-element-left",
    classNameFormCheckboxContainer: 'chter-form-input-container',
    classNameFormCheckBox: 'chtr-form-input-checkbox',
    classNameFormCheckBoxDefault: 'chtr-form-input-checkbox',
    classNameFormCheckBoxError: 'chtr-form-input-checkbox-error',
    classNameFormCheckboxRightError: "chtr-form-label-right-error",
    classNameFormCheckBoxRightDefault: "chtr-form-label-right",
    input: false,
    offset: 0,
    disabled: false,
    label: '',
    required: true,
};


ChtFormElements['checkbox']=ChtrFormCheckBox;

// end of the package


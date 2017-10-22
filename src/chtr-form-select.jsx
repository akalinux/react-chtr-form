import React, { Component, PropTypes } from 'react';
import { ChtFormElements, ChtrFormCss } from './chtr-form-elements.jsx';
import { cloneObject, mergeObjects, objectsDiffer, cloneProps  } from 'react-chtr-object-methods';

class ChtrFormSelect extends React.Component {
    

    static buildData( props ) {
        let input;
        if ( props.hasOwnProperty( 'input' ) ) {
            input = props.input;
        }

        if ( input == null && props.data.length > 0 && props.data[0].hasOwnProperty('value') && props.data[0].value!=null) {
            input = props.data[0].value;
        } else {
            return "";
        }
        return input;
    }

    constructor( props ) {
        super( props );
        this.state = cloneProps(props);
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmitCheck=this.handleSubmitCheck.bind(this);
    }

    handleSubmitCheck() {
        this.handleValidate();
    }

    matchOptions( input ) {
        for (let id in this.state.data) {
            if ( input == this.state.data[id].value ) {
                return true;
            }
        }
        return false;
    }

    handleValidate() {

        const target = cloneObject( this.state );
        if ( this.state.required && !this.matchOptions( this.state.input ) ) {
            target['classNameSelectCell'] = this.state.classNameSelectCellError
            target['classNameSelectOption'] = this.state.classNameSelectOptionError;
            target['classNameSelect']=this.state.classNameSelectError;
            this.props.onValidate( this.state.dataPath, this.state.displayPath, target, false );
        } else {
            target['classNameSelectCell'] = this.state.classNameSelectCellefault;
            target['classNameSelectOption'] = this.state.classNameSelectOptionDefault;
            target['classNameSelect']=this.state.classNameSelectDefault;
            this.props.onValidate( this.state.dataPath, this.state.displayPath, target, true );
        }
    }
    
    componentWillReceiveProps( props ) {
        this.props.root.deleteSubmitCheck( this.state.dataPath );
        this.setState( cloneProps( props ) );
        this.props.root.registerSubmitCheck( props.dataPath, this.handleSubmitCheck );
    }
    
    componentWillUnmount() {
        this.props.root.deleteSubmitCheck( this.state.dataPath );
    }

    componentDidMount() {
        this.props.root.registerSubmitCheck( this.state.dataPath, this.handleSubmitCheck );
    }

    handleChange( e ) {
        this.state.input = e.target.value;
        this.props.onChange( this.state.dataPath, this.state.displayPath, this.state );
    }

    renderFields() {
        const instance=this;
        let id=0;
        return this.state.data.map(function (opt) {
            const key=instance.state.displayPath.join('-') + '-option-' + id++;
            return (<option key={key} className={instance.state.classNameSelectOption} defaultValue={instance.state.input === opt.value} value={opt.value}>{opt.label}</option>)
        });
    }


    render() {
        return (
            < div className={this.state.classNameSelectRow} >
                {this.state.label != "" ? <div className={this.state.classNameSelectHeader} >{this.state.label}</div> : ""}
                <div className={this.state.classNameSelectCell}><select disabled={this.state.disabled} className={this.state.classNameSelect} value={this.state.input} onChange={this.handleChange}>
                {this.renderFields()}
                </select>
                </div>
            </div>
        );
    }
}

const css={
    classNameSelectRow: "ChtrFormSelectRow",
    classNameSelectHeader: "ChtrFormSelectHeader",
    classNameSelectCell: "chtr-form-select-cell",
    classNameSelectCellDefault: "chtr-form-select-cell",
    classNameSelectCellError: "chtr-form-select-cell-error",
    classNameSelect: "ChtrFormSelect",
    classNameSelectDefault: "ChtrFormSelect",
    classNameSelectError: "ChtrFormSelectError",
    classNameSelectOption: "chtr-form-select-option",
    classNameSelectOptionDefault: "chtr-form-select-option",
    classNameSelectOptionError: "chtr-form-select-option-error",
};

ChtrFormSelect.defaultProps = {
    handleUpdate: function( state ) { },
    input: "",
    data: [],
    label: "",
    disabled: false,
    name: 'default-select',
};

Object.assign(ChtrFormSelect.defaultProps,css);
ChtFormElements['select'] = ChtrFormSelect;

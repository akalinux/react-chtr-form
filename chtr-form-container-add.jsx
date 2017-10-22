import React, { Component, PropTypes } from 'react';
import { ChtFormElements, ChtrFormCss } from './chtr-form-elements.jsx';
import { cloneObject, mergeObjects, objectsDiffer, cloneProps  } from 'react-chtr-object-methods';
import { ChtrList } from './chtr-form-container-list.jsx';
import { ChtrForm } from './chtr-form.jsx';


class ChtFormContainerAdd extends React.Component {

    static buildData( props ) {

        return ChtrList.buildData( { display: props.displayList } );
    }
    constructor( props ) {
        super( props );
        const state = cloneProps( props );
        this.state = state;
    }

    renderList() {
        const displayPath = this.state.displayPath.slice( 0 );
        const dataPath = this.state.dataPath.slice( 0 );
        displayPath.push( 'list' );
        const args = {};
        Object.assign( args, this.state.list, { type: 'list' } );
        console.log(this.props.root);
        return this.props.root.renderObject( args, displayPath, dataPath );
    }

    renderForm() {
        const args={};
        Object.assign(args,ChtFormContainerAdd.defaultFormProps,this.state.form);
        console.log(args);
        
        return <ChtrForm {...args} />
    }
    
    render() {
        return (
            <div>
                <div>
                    {this.renderForm()}
                </div>
                <div>
                    {this.renderList()}
                </div>
            </div>
        );
    }
}
const formCss = {};
const css = {};

ChtFormContainerAdd.defaultFormProps = {

};

Object.assign( ChtFormContainerAdd.defaultFormProps, formCss );

ChtFormContainerAdd.defaultProps = {
    from: {},
    list: {},
};
Object.assign( ChtFormContainerAdd.defaultProps, css );

ChtFormElements['add']=ChtFormContainerAdd;

// End of the module
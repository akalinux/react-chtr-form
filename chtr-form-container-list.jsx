'use strict';
import React, { Component, PropTypes } from 'react';
import { cloneObject, mergeObjects, objectsDiffer, cloneProps } from './ChtrObjectMethods.jsx';
import { ChtFormElements, ChtrFormCss } from './chtr-form-elements.jsx';

class ChtrList extends React.Component {

    static buildData( props ) {
        const display = props.display;
        const data = [];

        for ( let id in display ) {
            const form = display[id];
            data[id] = ChtFormElements.hasOwnProperty( form.type ) ? ChtFormElements[form.type].buildData( form ) : null;
        }

        return data;
    }

    constructor( props ) {
        super( props );

        this.state=cloneProps(props);
        this.handleMoveUp = this.handleMoveUp.bind( this );
    }

    componentWillReceiveProps(props) {
 
        this.setState(cloneProps(props));
    }

    handleMoveUp( record, dataPath, displayPath, e ) {
        this.props.root.handleMove( dataPath, displayPath, -1 );
    }

    handleMoveDown( record, dataPath, displayPath, e ) {
        this.props.root.handleMove( dataPath, displayPath, 1 );
    }

    handleDelete( record, dataPath, displayPath, e ) {
        this.props.root.handleDelete( record, dataPath,displayPath );
    }

    renderRow( row, id, baseDisplayPath ) {

        const displayPath = baseDisplayPath.slice( 0 );
        displayPath.push( id );
        const dataPath = this.state.dataPath.slice( 0 );
        dataPath.push( id );
        const keyPath=displayPath.slice(0);
        keyPath.push('listItem',id);
        const key = this.props.root.genKey(keyPath);
        const display = this.props.root.renderObject( row, displayPath, dataPath );
        const canMoveUp = !( id > 0 );
        const canMoveDown = !( id < this.state.display.length - 1 );
        return (
            <div key={key} className={this.state.classNameListRow}>

                <div className={this.state.classNameListCell}>{display}</div>
                <div className={this.state.classNameListCell}>
                <div className={this.state.classNameListButtonContainer}>
                    <input className={this.state.canMove ? this.state.classNameListButton : this.state.classNameHidden} disabled={canMoveUp} type="button" onClick={this.handleMoveUp.bind( this, id, dataPath, displayPath )} value={this.state.moveUpText} />
                    <input className={this.state.canMove ? this.state.classNameListButton : this.state.classNameHidden} disabled={canMoveDown} type="button" onClick={this.handleMoveDown.bind( this, id, dataPath, displayPath )} value={this.state.moveDownText} />
                    <input className={this.state.canDelete ? this.state.classNameListButton : this.state.classNameHidden} type="button" onClick={this.handleDelete.bind( this, id, dataPath, displayPath )} value={this.state.deleteText} />
                </div>
                </div>
            </div>
        );
    }
    render() {
        const display = this.state.display;
        let id = -1;
        const instance = this;
        const baseDisplayPath = this.state.displayPath.slice( 0 );
        baseDisplayPath.push( 'display' );

        return (
            <div className={this.state.classNameListContainer}>
                <div className={this.state.classNameListRow} >
                <div className={this.state.classNameListHeader}>{this.state.label}</div>
                </div>
            <div className={this.state.classNameListRow} >
                {this.state.display.map( function( row ) {
                    ++id;
                    return instance.renderRow( row, id, baseDisplayPath );
                } )}
                </div>
            </div> );
    }
}

const css = {
    classNameListContainer: "chtr-form-container",
    classNameListRow: "chtr-form-container-list-row",
    classNameListButton: "ChtrFormSubmit",
    classNameListCell: "chtr-form-container-list-cell",
    classNameListButtonContainer: "chtr-form-container-list-cell-buttons",
    classNameHidden: "ChtrFormHidden",
    classNameSmallerWidth: "chtr-form-container-smaller-row",
    classNameListHeader: "chtr-form-container-list-header",
};

Object.assign( ChtrFormCss, css );
ChtrList.defaultProps = {
    displayPath: [],
    dataPath: [],
    display: [],
    deleteText: "Delete",
    moveUpText: "^",
    moveDownText: "v",
    canMove: false,
    canDelete: false,
    headerText: "I am a list",
};

Object.assign( ChtrList.defaultProps, css );
ChtFormElements['list'] = ChtrList;

module.exports={
        ChtrList: ChtrList,
}

// end of the module
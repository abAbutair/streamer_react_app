import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import Modal from "../Modal";
import history from "../../history";
import {fetchStream, deleteStream} from "../../actions";

const StreamDelete = ({fetchStream, deleteStream, match, stream}) => {
    useEffect(() => {
        fetchStream(match.params.id);
    }, [fetchStream, match]);

    const onDeleteClick = () => {
        deleteStream(match.params.id);
    };

    const actions = (
        <React.Fragment>
            <button className="ui button negative" onClick={onDeleteClick}>Delete</button>
            <Link to='/' className="ui button">Cancel</Link>
        </React.Fragment>
    );

    const renderContent = !stream ? "Are you sure you want to delete this stream?" : `Are you sure you want to delete the stream with title: ${stream.title}?`;

    return (
        <Modal title="Delete Stream" content={renderContent} actions={actions} onDismiss={() => history.push("/")}/>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);
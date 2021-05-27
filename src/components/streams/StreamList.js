import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchStreams} from "../../actions";
import {Link} from "react-router-dom";

const StreamList = ({fetchStreams, streams, currentUserId, isSignedIn}) => {
    useEffect(() => {
        fetchStreams();
    }, [fetchStreams]);

    const renderAdminButtons = (stream) => {
        if (stream.userId === currentUserId) {
            return (
                <div className="right floated content">
                    <Link to = {`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to = {`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    };

    const renderAdminCreateButton = () => {
        if (isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            );
        }
    };

    // if it uses Object.entries()
    // const renderedStreams = streams.map(stream => {
    //     const [streamKey, streamValue] = stream;
    //
    //     return (
    //         <div key={streamKey}>
    //             <div>{streamValue.id}</div>
    //         </div>
    //     );
    // });

    // if it uses Object.values()
    const renderedStreams = streams.map(stream => {
        return (
            <div key={stream.id} className="item">
                {renderAdminButtons(stream)}
                <i className="large middle aligned icon camera"/>
                <div className="content">
                    <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                    <div className="description">
                        {stream.description}
                    </div>
                 </div>
            </div>
        );
    });

    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {renderedStreams}
            </div>
            {renderAdminCreateButton()}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, {fetchStreams})(StreamList);
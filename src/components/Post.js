import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    Image,
    View
} from 'react-native';
import { connect } from 'react-redux';

import Author from './Author';
import Comments from './Comments';
import AddComment from './AddComment';

class Post extends Component {
    render() {
        const addComment = this.props.name ?
            <AddComment postId={this.props.id} /> : null
        return (
            <View style={styles.container}>
                <Image source={{ uri: this.props.image }} style={styles.image} />
                <Author email={this.props.email} nickname={this.props.nickname} />
                <Comments comments={this.props.comments} />
                {addComment}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: Dimensions.get('window').width * 3 / 4,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
    },
});

const mapStateToProps = ({ user }) => {
    return {
        name: user.name
    }
}

export default connect(mapStateToProps)(Post);
// export default connect(mapStateToProps, null)(Post);
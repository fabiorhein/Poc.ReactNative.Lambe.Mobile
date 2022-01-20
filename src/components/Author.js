import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Gravatar } from 'react-native-gravatar';

export default props => {
    return (
        <View style={styles.container}>
            <Gravatar options={{ email: props.email, secure: true }}
                style={styles.avatar} />
            <Text style={styles.nickname}>{props.nickname}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginHorizontal: 15,
    },
    nickname: {
        color: '#444',
        fontSize: 14,
        marginVertical: 10,
        fontWeight: 'bold'
    }
});
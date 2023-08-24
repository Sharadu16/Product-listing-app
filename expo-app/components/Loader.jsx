import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const Loader = ({loading}) => {
  return (
    <View style={[styles.horizontal]}>
        {
            loading ? (
                <ActivityIndicator size="large" color="#00ff00" />
            ) : null
        }
      
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
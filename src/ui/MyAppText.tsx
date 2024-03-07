import { Text, StyleSheet } from 'react-native'

export const MyAppText = ({children, style}) => (
    <Text style={[styles.textStyles, style ]}>
        {children}
    </Text>
)

const styles = StyleSheet.create({
    textStyles: {
        fontFamily: 'montserrat_semibold',
    }
})

MyAppText.defaultProps = {
    style: {}
};
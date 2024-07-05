import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { ButtonColors } from '@/constants/Colors'; //

interface Props {
    title: string;
    buttonStyle: any;
    onPress: any;
    buttonType: string;
}

const ButtonTypes = {
    NUMBER: 'NUMBER',
    OPERATOR: 'OPERATOR',
};

const Button = ({ title, onPress, buttonStyle, buttonType }: Props) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                {
                    backgroundColor: ButtonColors[buttonType][0],
                },
                pressed && {
                    backgroundColor: ButtonColors[buttonType][1],
                },
                buttonStyle,
            ]}
            onPressOut={onPress}
        >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: PropTypes.object,
    buttonType: PropTypes.oneOf(Object.values(ButtonTypes)), //Object.keys 함수는 객체의키만 배열로 반환
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 60,
        color: '#ffffff',
    },
});

export { ButtonTypes }; //export 는 여러개를 내보낼 수 있고, 중괄호{}를 사용해야 한다.
export default Button; //default는 하나밖에 사용할 수 없다

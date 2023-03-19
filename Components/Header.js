import { View, Text } from "react-native";
import Styles from "../Style/Styles";

export default function Header() {
    return (
        <View style={Styles.header}>
            <Text style={Styles.headerText}>
                Mini-yatzee
            </Text>
        </View>
    )
}
import { Text, View } from "react-native"
import Styles from "../Style/Styles"
export default function Footer() {
    return (
        <View style={Styles.footer}>
            <Text style={Styles.footerText}>
                Author: Juho Karppinen
            </Text>
        </View>
    )
}
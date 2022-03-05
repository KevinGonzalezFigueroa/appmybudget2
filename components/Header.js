import { TouchableHighlight, View, Text, StyleSheet } from "react-native";

const Header = ({ balance, setShowModal }) => {
  return (
    <View>
      <Text style={styles.header}>Su balance es: {balance}</Text>
      <Button title="Nueva transacción" onPress={() => setShowModal(true)}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});

export default Header;
